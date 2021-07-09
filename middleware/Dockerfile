FROM python:3.7

WORKDIR /app/middleware

COPY requirements.txt /app/middleware/

RUN pip install -r requirements.txt
RUN python -m spacy download en_core_web_sm
RUN python -m nltk.downloader stopwords
RUN python -m nltk.downloader punkt
RUN python -m nltk.downloader averaged_perceptron_tagger
RUN python -m nltk.downloader universal_tagset
RUN python -m nltk.downloader wordnet
RUN python -m nltk.downloader brown
RUN python -m nltk.downloader maxent_ne_chunker
RUN pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-2.3.1/en_core_web_sm-2.3.1.tar.gz

EXPOSE 5002

ENV NAME venv