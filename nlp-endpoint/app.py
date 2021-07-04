from spacy.matcher import PhraseMatcher
from flask import Flask, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

from gensim.models import Word2Vec
import string
import re
import PyPDF2
import json
import collections
from os import listdir
from os.path import isfile, join
from io import StringIO
import pandas as pd
from collections import Counter
import en_core_web_sm
nlp = en_core_web_sm.load()

app = Flask(__name__)
cors = CORS(app,supports_credentials = True, resources={r"/*": {"origins": ["http://localhost:5000", "http://localhost:3000"]}})

app.config['UPLOAD_FOLDER'] = '../assets/UploadedCVs'


###### PREPROCESSING SECTION ######
def pdfextract(file):
    fileReader = PyPDF2.PdfFileReader(open(file, 'rb'))
    countpage = fileReader.getNumPages()
    count = 0
    text = []
    while count < countpage:
        pageObj = fileReader.getPage(count)
        count += 1
        t = pageObj.extractText()
        # print (t)
        text.append(t)
    return text

# all custom keywords should be in lower case


def find_score(file, setKeywords, customKeywords):
    model = Word2Vec.load("./backend algorithm/final.model")
    resume = str(pdfextract(file))
    resume = resume.replace("\\n", "")
    resume = resume.lower()
    length = len(setKeywords)  # need to add more keywords and improve model
    Dict = {
        'Data Science': 'data_science',
        'Deep Learning': 'deep_learning',
        'Web Development': 'Web',
        'Human resources': 'hr'
    }
    keyword = list()
    for i in range(0, length):
        keyword.append([nlp(resume[0])
                       for resume in model.wv.most_similar(Dict[setKeywords[i]])])
    Customkeys = [nlp(resume) for resume in customKeywords]
    matcher = PhraseMatcher(nlp.vocab)

    for i in range(0, length):
        matcher.add(Dict[setKeywords[i]], None, *keyword[i])
    matcher.add('CustomKeywords', None, *Customkeys)
    doc = nlp(resume)
    matches = matcher(doc)
   #  print(matches)

    # The following is not required but additional data of the score can be obtained with the dataframe
    KEYS = []
    WORDS = []
    for match_id, start, end in matches:
        keys = nlp.vocab.strings[match_id]
        words = doc[start: end]
      #   print(f'{keys}  {words}')
        KEYS.append(keys)
        WORDS.append(words)
    df = pd.DataFrame(KEYS, columns=['Type'])
    df['Keyword'] = WORDS
    sum = len(matches)
    return df.to_string()

###### SAVE TAGS SECTION ##########


def save_tags(tags):
    res = []
    tags = tags.split(",")
    for tag in tags:
        temp = tag.strip()
        res.append(temp)
    return str(res)


@app.route("/save_tags", methods=['POST'])
def process_save_tags():
    if request.method == 'POST':
        my_tags = request.get_json()['tags']
        return save_tags(my_tags)
    else:
        return "Wrong form method"


###### UPLOAD CV SECTION #########
@app.route('/upload', methods=['POST'])
def upload():
    files = request.files.getlist("file")
    for file in files:
        file.save(os.path.join(
            app.config['UPLOAD_FOLDER'], secure_filename(file.filename)))
    return 'upload successful'


@app.route('/process', methods=['GET'])
def show_result():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    setKeywords = ['Data Science', 'Deep Learning', 'Human resources']
    customKeywords = ['spanish', 'hindi', 'opencv']
    res = dict()
    for file in files:
        res[file] = find_score(os.path.join(
            app.config['UPLOAD_FOLDER'], file), setKeywords, customKeywords)
    j_res = json.dumps(res)
    return j_res


@app.route('/')
def hello_world():
    return ("Hello World")


if __name__ == '__main__':
    app.run(debug="True", port=5002)
