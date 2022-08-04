from pyAudioAnalysis import audioSegmentation as aS
from convert_time_format import convert_time_format
import pyroomacoustics.denoise as denoise
import getopt
import librosa
import moviepy.editor as mp
from better_profanity import profanity
from split_helper import split_phrases, split_segments
import sys
import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Tokenizer, pipeline
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
from urllib.request import urlopen, urlretrieve

def main(argv):
    ### read command line arguments
    try:
        opts, args = getopt.getopt(argv,"hi:o:c:p",["ifile=","ofile=","char_limit=", "periodic_limit="])
    except getopt.GetoptError:
        print('python xlsr_inference.py -i <inputfile> -o <outputfile> -c char_limit -p periodic_limit')
        sys.exit(2)
    input_filepath, output_filepath, char_limit, periodic_limit = '', '', 40, 4
    for opt, arg in opts:
        if opt == '-h':
            print('Usage: python xlsr_inference.py -i <inputfile> -o <outputfile> -c char_limit -p periodic_limit')
            sys.exit()
        ### input audio filepath (wav or flac)
        elif opt in ("-i", "--ifile"):
            input_filepath = arg
        ### output srt filepath
        elif opt in ("-o", "--ofile"):
            output_filepath = arg
        ### character limit per line for captioning
        elif opt in ("-c", "--char_limit"):
            char_limit = arg
        ### time limit per phrase (in seconds) for captioning
        elif opt in ("-p", "--periodic_limit"):
            periodic_limit = arg

    ### check to make sure input and output files are valid
    if input_filepath == '':
        raise FileNotFoundError('No file provided as input. Please use -i <inputfile> as part of command-line arguments')
    if output_filepath == '':
        raise FileNotFoundError('No file provided as output. Please use -o <outputfile> as part of command-line arguments')

    ### load flac or wav file
    try:
        url = input_filepath
        video_name = "video.mp4"
        filename = "audio.wav"
        urlretrieve(url, video_name)

        audio_detached = mp.VideoFileClip(video_name)
        # audio_detached = mp.VideoFileClip(url)
        audio_detached.audio.write_audiofile(filename)

        audio, sr = librosa.load(filename, sr=16000)
        # audio, sr = soundfile.read(input_filepath, samplerate=16000)
    except FileNotFoundError:
        print('Unable to find input file path:', input_filepath)
        sys.exit()

    ### load pipeline with model and feature extractor
    asr = pipeline("automatic-speech-recognition", model="facebook/wav2vec2-xls-r-2b-21-to-en", feature_extractor="facebook/wav2vec2-xls-r-2b-21-to-en")

    # https://github.com/tyiannak/pyAudioAnalysis/blob/944f1d777bc96717d2793f257c3b36b1acf1713a/pyAudioAnalysis/audioSegmentation.py#L670
    ### segment limits
    segmentLimits = aS.silence_removal(audio, sr, 0.05, 0.05, 1.0, 0.2)

    ### subdivide segments further based on periodic limit
    periodic_split = []
    for start, end in segmentLimits:
        if end - start < periodic_limit:
            periodic_split.append([start, end])
        else:
            periodic_split += split_segments(start, end, periodic_limit)
    segmentLimits = periodic_split

    ### process each segment
    transcriptions_nsfw = []
    ### need a safe for work version as well
    transcriptions_sfw = []
    # for start, end in segmentLimits:
    for start, end in segmentLimits:
        split_audio, sr = librosa.load(filename, sr=16000, offset=start, duration=end - start)

        # https://pyroomacoustics.readthedocs.io/en/pypi-release/pyroomacoustics.denoise.spectral_subtraction.html
        ### spectral subtraction
        noise_reduced = denoise.spectral_subtraction.apply_spectral_sub(split_audio, nfft=512, db_reduc=25, lookback=12, beta=30, alpha=1)
        
        ### run model
        t = asr(noise_reduced)['text']

        if len(t) > 0:
            transcriptions_nsfw.append(t)
            ### filter profanity for sfw users
            t_censored = profanity.censor(t, '-')
            transcriptions_sfw.append(t_censored)

    ### write transcriptions into output srt file -- one for each language
    # https://docs.fileformat.com/video/srt/

    ### language list
    lang_list = ['ar_AR', 'cs_CZ', 'de_DE', 'en_XX', 'es_XX', 'et_EE', 'fi_FI', 'fr_XX', 
    'gu_IN', 'hi_IN', 'it_IT', 'ja_XX', 'kk_KZ', 'ko_KR', 'lt_LT', 'lv_LV', 'my_MM', 
    'ne_NP', 'nl_XX', 'ro_RO', 'ru_RU', 'si_LK', 'tr_TR', 'vi_VN', 'zh_CN', 'af_ZA', 
    'az_AZ', 'bn_IN', 'fa_IR', 'he_IL', 'hr_HR', 'id_ID', 'ka_GE', 'km_KH', 'mk_MK',
    'ml_IN', 'mn_MN', 'mr_IN', 'pl_PL', 'ps_AF', 'pt_XX', 'sv_SE', 'sw_KE', 'ta_IN', 'te_IN',
    'th_TH', 'tl_XX', 'uk_UA', 'ur_PK', 'xh_ZA', 'gl_ES', 'sl_SI']

    ### text translation model
    ### https://huggingface.co/facebook/mbart-large-50-many-to-many-mmt
    model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")
    tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")
    tokenizer.src_lang = 'en_XX'

    nsfw = True
    for transcriptions in [transcriptions_nsfw, transcriptions_sfw]:
        i = 0
        for lang in lang_list:
            i += 1
            # print(str(i) + '/' + str(len(lang_list)))
            if nsfw:
                output_filepath_per_lang = output_filepath[:-4] + '_' + lang + '_nsfw.srt'
            else:
                output_filepath_per_lang = output_filepath[:-4] + '_' + lang + '_sfw.srt'
            try:
                with open(output_filepath_per_lang, 'w', encoding='utf-8') as f:
                    ### one for each segment
                    for t in range(len(transcriptions)):
                        f.write(str(t+1))
                        f.write('\n')
                        ### convert segment limits from seconds to hours:minutes:seconds,milliseconds 00:00:00,000 format
                        f.write(convert_time_format(segmentLimits[t][0]) + ' --> ' + convert_time_format(segmentLimits[t][1]))
                        f.write('\n')
                        ### translate the transcription if necessary
                        segment = transcriptions[t]
                        if lang != tokenizer.src_lang:
                            tokenized_input = tokenizer(transcriptions[t], return_tensors="pt")
                            generated_tokens = model.generate(**tokenized_input, forced_bos_token_id=tokenizer.lang_code_to_id[lang])
                            segment = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
                        ### split segments into multiple lines based on character limit per line
                        lines = split_phrases(segment, char_limit)
                        for line in lines:
                            f.write(line) 
                            f.write('\n')
                        f.write('\n')
            except FileNotFoundError:
                print('Unable to find output file path:', output_filepath_per_lang)
                sys.exit()
        nsfw = False

if __name__ == "__main__":
   main(sys.argv[1:])