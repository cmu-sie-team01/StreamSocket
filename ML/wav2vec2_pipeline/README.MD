**Run inference on the Wav2Vec2 model as follows:**


-> cd to Scripts folder and run ./activate to activate virtual environment

-> cd ..


**With default parameters:**

-> python wav2vec2_inference.py -i <inputfile> -o <outputfile>


**With optional arguments:**

-> python wav2vec2_inference.py -i <inputfile> -o <outputfile> -c char_limit -p periodic_limit


**Required inputs:**

<inputfile> -- input audio filepath (wav or flac)

<outputfile> -- output srt filepath


**Optional inputs:**

char_limit -- character limit per line for captioning

periodic_limit -- time limit per phrase (in seconds) for captioning



p232_021.wav can be used as an input audio filepath example for development purposes

transcription_output.srt.txt can be used as the output filepath for development purposes
