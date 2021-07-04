# base imports
from flask import Flask, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json

# model imports
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import textract
from itertools import chain
from spacy.matcher import PhraseMatcher
import string
import os
import pandas as pd
from collections import Counter
import en_core_web_sm
nlp = en_core_web_sm.load()
nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__)
CORS(app)

# cv folder
app.config['UPLOAD_FOLDER'] = '../assets/UploadedCVs'


###### JOB DESCRIPTION SECTION ######

@app.route("/save_jd", methods=['POST'])
# saves job description in a text file
def process_save_jd():
    my_jd = request.get_json()['job_desc']
    with open(os.path.join('../assets/', 'jobdesc.txt'), 'w') as f:
        f.write(str(my_jd))
    return 'Job Description Saved'

######################################

###### SAVE TAGS SECTION #############


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
######################################

###### UPLOAD CV SECTION #############


@app.route('/upload', methods=['POST'])
def upload():
    files = request.files.getlist("file")
    for file in files:
        file.save(os.path.join(
            app.config['UPLOAD_FOLDER'], secure_filename(file.filename)))
    return 'upload successful'

######################################

###### NLP MODEL SECTION #############


def Preprocessfile(filename):
    text = textract.process(filename)
    text = text.decode('utf-8').replace("\\n", " ")
    x = []
    tokens = word_tokenize(text)
    tok = [w.lower() for w in tokens]
    table = str.maketrans('', '', string.punctuation)
    strpp = [w.translate(table) for w in tok]
    words = [word for word in strpp if word.isalpha()]
    stop_words = set(stopwords.words('english'))
    words = [w for w in words if not w in stop_words]
    x.append(words)
    res = " ".join(chain.from_iterable(x))
    return res


def find_score(jobdes, filename, setKeywords, customKeywords, df):
    resume = Preprocessfile(filename)
    customKeywords = ' '.join(customKeywords)
    jobdes = jobdes + ' ' + customKeywords
    text = [resume, jobdes]
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(text)
    # print(cosine_similarity(count_matrix))
    matchpercent = cosine_similarity(count_matrix)[0][1]*100
    matchpercent = round(matchpercent, 2)
    # print(matchpercent)
    length = len(setKeywords)  # need to add more keywords and improve model
    Dict = {
        'Data Science': 'datascience',
        'Machine Learning': 'machinelearning',
        'Web Development': 'webdev',
        'Human resources': 'hr',
        'App Development': 'appdev'
    }
    keyword = []
    for i in range(0, length):
        keyword.append([nlp(resume)
                       for resume in df[Dict[setKeywords[i]]].dropna(axis=0)])
    matcher = PhraseMatcher(nlp.vocab)
    for i in range(0, length):
        matcher.add(Dict[setKeywords[i]], None, *keyword[i])
    doc = nlp(resume)
    matches = matcher(doc)
    # print(matches)
    # The following is not required but additional data of the score can be obtained with the dataframe
    KEYS = []
    WORDS = []
    for match_id, start, end in matches:
        keys = nlp.vocab.strings[match_id]
        words = doc[start: end]
        # print(f'{keys}  {words}')
        KEYS.append(keys)
        WORDS.append(words)
    DF = pd.DataFrame(KEYS, columns=['Type'])
    DF['Keyword'] = WORDS
    # print(DF)
    result = {
        'score': matchpercent,
        'totalmatches': len(matches)
    }
    for i in range(0, length):
        result[setKeywords[i]] = len(
            DF.loc[DF['Type'] == Dict[setKeywords[i]]])

    return result

######################################


###### FINAL PROCESS SECTION #########

@app.route('/process', methods=['GET'])
def show_result():
    files = os.listdir(app.config['UPLOAD_FOLDER'])

    jobdes = Preprocessfile(os.path.join('../assets/', 'jobdesc.txt'))

    df = pd.read_csv('setkeywords.csv')
    setKeywords = ['Data Science', 'Machine Learning']

    # customKeywords = ['spanish', 'hindi', 'opencv']
    my_tags = request.get_json()['tags']
    customKeywords = []
    my_tags = my_tags.split(",")
    for tag in my_tags:
        temp = tag.strip()
        customKeywords.append(temp)

    res = dict()
    for file in files:
        res[file] = find_score(jobdes, os.path.join(
            app.config['UPLOAD_FOLDER'], file), setKeywords, customKeywords, df)
    j_res = json.dumps(res)
    return j_res

######################################


@app.route('/')
def hello_world():
    return ("Hello World")


if __name__ == '__main__':
    app.run(port=5002)
