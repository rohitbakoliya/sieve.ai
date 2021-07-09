FROM ubuntu:20.04

RUN apt-get update -y

RUN apt-get install -y \
        build-essential \
        python3.7 \ 
        python3-pip

RUN mkdir -p usr/src/app/middleware

WORKDIR /usr/src/app/middleware/

COPY ./middleware/ /usr/src/app/middleware/

RUN pip install -r requirements.txt
RUN python3 -m nltk.downloader stopwords
RUN python3 -m nltk.downloader punkt
RUN python3 -m nltk.downloader averaged_perceptron_tagger
RUN python3 -m nltk.downloader universal_tagset
RUN python3 -m nltk.downloader wordnet
RUN python3 -m nltk.downloader brown
RUN python3 -m nltk.downloader maxent_ne_chunker
RUN pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-2.3.1/en_core_web_sm-2.3.1.tar.gz
RUN nohup python3 app.py > log.txt 2>&1 &



WORKDIR /usr/src/app

COPY ./webapp/package.json ./

COPY ./webapp/api/package.json ./api/
COPY ./webapp/api/yarn.lock ./api/


COPY ./webapp/client/package.json ./client/
COPY ./webapp/client/yarn.lock ./client/

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get install -y software-properties-common
RUN apt-get install -y npm

RUN npm install npm@latest -g

RUN apt remove cmdtest
RUN apt remove yarn
RUN npm install -g yarn

RUN npm i -g node

RUN cd api && yarn install
RUN cd client && yarn install

COPY ./webapp/client /usr/src/app/client
COPY ./webapp/api /usr/src/app/api

WORKDIR /usr/src/app/api/

RUN yarn build

EXPOSE 5000
# EXPOSE 3000

CMD ["npm", "start"]