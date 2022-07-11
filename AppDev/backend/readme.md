Install Python packages in Python virtual environment for backend development

`$ pip install -r requirements.txt`

Generate requirements.txt automatically

`$ pip freeze > requirements.txt`

Run django develop server

`python manage.py runserver`

You can add IP address or port number after this command to specify them

`python manage.py runserver 0.0.0.0:8080`

Mac m1 pip sentencepiece install error:
Ref https://github.com/google/sentencepiece/issues/608
Solution:

brew install cmake
brew install pkgconfig
download from:
https://pypi.org/project/sentencepiece/#files
pip -v install  sentencepiece-0.1.96.tar.gz

