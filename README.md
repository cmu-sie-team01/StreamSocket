# StreamSocket
StreamSocket is a video-sharing application that can automatically generate subtitles and translate speech to different languages. The three main components of the project are the front-end UI, backend logic such as database management and user authentication, and machine learning models for speech-to-text, text-to-text and text-to-speech tasks.

TODO: screenshot of UI

# Front-end
We used React to build our application's user interface.

# Back-end
We used Django as the web framework to host our application's database.

# Machine Learning
For English speech transcription we compare two different model architectures: Listen Attend Spell and Wav2Vec2
Datasets used for training/testing include:
LibriSpeech: http://www.openslr.org/12/
Timit: https://www.kaggle.com/datasets/mfekadu/darpa-timit-acousticphonetic-continuous-speech
Noisy Speech Database: https://datashare.ed.ac.uk/handle/10283/2791
