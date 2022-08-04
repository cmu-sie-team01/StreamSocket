from transformers import pipeline
import librosa
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
import pyroomacoustics.denoise as denoise
import sys


MAPPING = {
    ### arabic ###
    "ar": 250001,
    ### german ###
    "de": 250003,
    ### english ###
    "en": 250004, 
    ### catalan ###
    "ca": 250005,
    ### estonian ###
    "et": 250006,
    ### welsh ###
    "cy": 250007,
    ### japanese ###
    "ja": 250012,
    ### latvian ###
    "lv": 250017,
    ### turkish ###
    "tr": 250023,
    ### chinese ? ###
    "zh": 250025,
    ### persian ###
    "fa": 250029,
    ### indonesian ###
    "id": 250032,
    ### mongolian ###
    "mn": 250037,
    ### swedish ###
    "sv": 250042,
    ### tamil ###
    "ta": 250044,
    ### slovenian ###
    "sl": 250052,
    ### french fr ###
    ### spanish es ###
    ### italian it ###
    ### russian ru ###
    ### portuguese pt ###
    ### dutch nl ###
}

def transcribe(filepath):
    ### automatically detects language and transcribes to English
    ### should actually be able to transcribe to language of choice but still trying to do that.
    
    ### load audio file
    y, sr = librosa.load(filepath, sr=16000)

    ### noisereduce
    noise_reduce = denoise.spectral_subtraction.apply_spectral_sub(y, nfft=512, db_reduc=25, lookback=12, beta=30, alpha=1)

    tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")

    ### select correct `forced_bos_token_id`
    forced_bos_token_id = MAPPING["ar"]

    ### https://huggingface.co/facebook/wav2vec2-xls-r-2b-22-to-16
    asr = pipeline("automatic-speech-recognition", model="facebook/wav2vec2-xls-r-2b-22-to-16", feature_extractor="facebook/wav2vec2-xls-r-2b-22-to-16")

    translation = asr(noise_reduce, forced_bos_token_id=tokenizer.lang_code_to_id['ar_AR'])
    return translation['text']

def audio_to_eng_text(filepath):
    ### Works for:
    # French (fr), German (de), Spanish (es), Catalan (ca), Italian (it), 
    # Russian (ru), Chinese (zh-CN), Portuguese (pt), Persian (fa), Estonian (et), 
    # Mongolian (mn), Dutch (nl), Turkish (tr), Arabic (ar), Swedish (sv-SE), 
    # Latvian (lv), Slovenian (sl), Tamil (ta), Japanese (ja), Indonesian (id), 
    # Welsh (cy)
    
    ### load audio file
    y, sr = librosa.load(filepath, sr=16000)

    ### noisereduce
    noise_reduce = denoise.spectral_subtraction.apply_spectral_sub(y, nfft=512, db_reduc=25, lookback=12, beta=30, alpha=1)

    ### https://huggingface.co/facebook/wav2vec2-xls-r-2b-21-to-en
    asr = pipeline("automatic-speech-recognition", model="facebook/wav2vec2-xls-r-2b-21-to-en", feature_extractor="facebook/wav2vec2-xls-r-2b-21-to-en")

    translation = asr(noise_reduce)
    
    return translation['text']

def text_translate(input_str, src_lang='en_XX', output_lang='es_XX'):
    ### options are:
    # Arabic (ar_AR),       Czech (cs_CZ),       German (de_DE),    English (en_XX),    Spanish (es_XX),
    # Estonian (et_EE),     Finnish (fi_FI),     French (fr_XX),    Gujarati (gu_IN),   Hindi (hi_IN),
    # Italian (it_IT),      Japanese (ja_XX),    Kazakh (kk_KZ),    Korean (ko_KR),     Lithuanian (lt_LT),
    # Latvian (lv_LV),      Burmese (my_MM),     Nepali (ne_NP),    Dutch (nl_XX),      Romanian (ro_RO),
    # Russian (ru_RU),      Sinhala (si_LK),     Turkish (tr_TR),   Vietnamese (vi_VN), Chinese (zh_CN),
    # Afrikaans (af_ZA),    Azerbaijani (az_AZ), Bengali (bn_IN),   Persian (fa_IR),    Hebrew (he_IL),
    # Croatian (hr_HR),     Indonesian (id_ID),  Georgian (ka_GE),  Khmer (km_KH),      Macedonian (mk_MK),
    # Malayalam (ml_IN),    Mongolian (mn_MN),   Marathi (mr_IN),   Polish (pl_PL),     Pashto (ps_AF),
    # Portuguese (pt_XX),   Swedish (sv_SE),     Swahili (sw_KE),   Tamil (ta_IN),      Telugu (te_IN),
    # Thai (th_TH),         Tagalog (tl_XX),     Ukrainian (uk_UA), Urdu (ur_PK),       Xhosa (xh_ZA), 
    # Galician (gl_ES),     Slovene (sl_SI)

    ### https://huggingface.co/facebook/mbart-large-50-many-to-many-mmt
    model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")
    tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")
    tokenizer.src_lang = src_lang
    tokenized_input = tokenizer(input_str, return_tensors="pt")
    generated_tokens = model.generate(**tokenized_input, forced_bos_token_id=tokenizer.lang_code_to_id[output_lang])
    translated = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
    return translated

def translate_srt(src_filepath, output_filepath, src_lang='en_XX', output_lang='es_XX'):
    ### translate between srt files ###
    
    ### https://huggingface.co/facebook/mbart-large-50-many-to-many-mmt
    model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")
    tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")
    tokenizer.src_lang = src_lang

    ### read transcriptions from input srt file
    # https://docs.fileformat.com/video/srt/
    try:
        with open(src_filepath, 'r') as f:
            ### list of each line in input file without newline characters
            lines = [line.rstrip() for line in f]

    except FileNotFoundError:
        print('Unable to find output file path:', output_filepath)
        sys.exit()
    
    ### write transcriptions into output srt file
    i = 1
    time_format = False
    try:
        with open(output_filepath, 'w') as f:
            for line in lines:
                ### indexing lines come first
                if str(i) == line:
                    ### extra newline between different indices
                    if i != 1:
                        f.write('\n')
                    f.write(line)
                    f.write('\n')
                    time_format = True
                    i += 1
                ### timestamp lines come next
                elif time_format == True:
                    f.write(line)
                    f.write('\n')
                    time_format = False
                ### transcription lines come after -- these are translated
                else:
                    tokenized_input = tokenizer(line, return_tensors="pt")
                    generated_tokens = model.generate(**tokenized_input, forced_bos_token_id=tokenizer.lang_code_to_id[output_lang])
                    translated_line = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]
                    f.write(translated_line)
                    f.write('\n')
    except FileNotFoundError:
        print('Unable to find output file path:', output_filepath)
        sys.exit()

# filepath = 'p232_021.wav'
# print(transcribe(filepath))
# print(text_translate('When the sunlight strikes raindrops in the air, they act as a prism and form a rainbow.', output_lang='es_XX'))