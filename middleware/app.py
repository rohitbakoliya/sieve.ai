from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import textract
from itertools import chain
from pyresparser import ResumeParser
from flask import Flask, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import json
import string
import re
import os
from joblib import load
import pickle
import en_core_web_sm
nlp = en_core_web_sm.load()


app = Flask(__name__)
cors = CORS(app, supports_credentials=True, resources={
            r"/*": {"origins": ["http://localhost:5000"]}})

# cv folder
app.config['UPLOAD_FOLDER'] = os.path.join('..', 'uploads')

######################################

###### NLP MODEL SECTION #############


def cleanResume(resumeText):
    resumeText = re.sub('http\S+\s*', ' ', resumeText)
    resumeText = re.sub('RT|cc', ' ', resumeText)
    resumeText = re.sub('#\S+', '', resumeText)
    resumeText = re.sub('@\S+', '  ', resumeText)
    resumeText = re.sub('[%s]' % re.escape(
        """!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', resumeText)
    resumeText = re.sub(r'[^\x00-\x7f]', r' ', resumeText)
    resumeText = re.sub('\s+', ' ', resumeText)
    return resumeText


def Preprocessfile(filename):
    text = filename
    if ".pdf" in filename:
        try:
            text = textract.process(filename)
        except UnicodeDecodeError:
            print('File', filename, 'cannot be extracted! - skipped')
        text = text.decode('utf-8').replace("\\n", " ")
    else:
        text = text.replace("\\n", " ")
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


def predictResume(filename):
    try:
        text = textract.process(filename)
        text = text.decode('utf-8').replace("\\n", " ")
        text = cleanResume(text)
        text = [text]
        text = np.array(text)
        vectorizer = pickle.load(open("vectorizer.pickle", "rb"))
        resume = vectorizer.transform(text)
        model = load('model.joblib')
        result = model.predict(resume)
        labeldict = {
            0: 'Arts',
            1: 'Automation Testing',
            2: 'Operations Manager',
            3: 'DotNet Developer',
            4: 'Civil Engineer',
            5: 'Data Science',
            6: 'Database',
            7: 'DevOps Engineer',
            8: 'Business Analyst',
            9: 'Health and fitness',
            10: 'HR',
            11: 'Electrical Engineering',
            12: 'Java Developer',
            13: 'Mechanical Engineer',
            14: 'Network Security Engineer',
            15: 'Blockchain ',
            16: 'Python Developer',
            17: 'Sales',
            18: 'Testing',
            19: 'Web Designing'
        }
        return labeldict[result[0]]
    except UnicodeDecodeError:
        print('File', filename, 'cannot be extracted for prediction! - skipped')


def find_score(jobdes, filename, customKeywords):
    resume = Preprocessfile(filename)
    customKeywords = ' '.join(customKeywords)
    jobdes = jobdes + ' ' + customKeywords
    text = [resume, jobdes]
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(text)
    matchpercent = cosine_similarity(count_matrix)[0][1]*100
    matchpercent = round(matchpercent, 2)
    return matchpercent

######################################


###### FINAL PROCESS SECTION #########

@app.route('/process', methods=['POST'])
def show_result():
    my_profile = request.get_json()['profile']
    user_id = request.get_json()['userId']
    resumes = request.get_json()['resumes']
    my_tags = request.get_json()['tags']
    my_jd = request.get_json()['jd']

    filtered_files = []
    for resume in resumes:
        if predictResume(os.path.join(app.config['UPLOAD_FOLDER'], user_id, resume)) in my_profile:
            filtered_files.append(resume)


    jobdes = Preprocessfile(my_jd)

    customKeywords = []
    for tag in my_tags:
        temp = tag.strip()
        customKeywords.append(temp)

    res = list()
    for file in filtered_files:
        score = find_score(jobdes, os.path.join(
            app.config['UPLOAD_FOLDER'], user_id, file), customKeywords)
        user_info = ResumeParser(os.path.join(
            app.config['UPLOAD_FOLDER'], user_id, file)).get_extracted_data()

        user_info['predicted']=predictResume(os.path.join(app.config['UPLOAD_FOLDER'], user_id, file))

        res.append({
            'resumeId': file,
            'score': score,
            'userInfo': user_info
        })

    j_res = json.dumps(res)
    return j_res

######################################


@app.route('/')
def hello_world():
    return ("Hello World")



if __name__ == '__main__':
    app.run(port=5002)
