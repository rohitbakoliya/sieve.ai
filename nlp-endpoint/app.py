from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import textract
from itertools import chain
from resume_parser import resumeparse
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
nltk.download('punkt')
nltk.download('stopwords')

nlp = en_core_web_sm.load()
nltk.download('punkt')
nltk.download('stopwords')


app = Flask(__name__)
cors = CORS(app, supports_credentials=True, resources={
            r"/*": {"origins": ["http://localhost:5000", "http://localhost:3000"]}})

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
    text = textract.process(filename)
    text = text.decode('utf-8').replace("\\n", " ")
    # print(text)
    x = []
    tokens = word_tokenize(text)
    tok = [w.lower() for w in tokens]
    table = str.maketrans('', '', string.punctuation)
    strpp = [w.translate(table) for w in tok]
    words = [word for word in strpp if word.isalpha()]
    stop_words = set(stopwords.words('english'))
    words = [w for w in words if not w in stop_words]
    x.append(words)
    # print(x)
    res = " ".join(chain.from_iterable(x))
    return res


def predictResume(filename):
    text = textract.process(filename)
    text = text.decode('utf-8').replace("\\n", " ")
    text = cleanResume(text)
    text = [text]
    text = np.array(text)
    vectorizer = pickle.load(open("backend algorithm/vectorizer.pickle", "rb"))
    resume = vectorizer.transform(text)
    model = load('backend algorithm/model.joblib')
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


def find_score(jobdes, filename, customKeywords):
    resume = Preprocessfile(filename)
    customKeywords = ' '.join(customKeywords)
    jobdes = jobdes + ' ' + customKeywords
    text = [resume, jobdes]
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(text)
    print(cosine_similarity(count_matrix))
    matchpercent = cosine_similarity(count_matrix)[0][1]*100
    matchpercent = round(matchpercent, 2)
    print(matchpercent)
    return matchpercent

######################################


###### FINAL PROCESS SECTION #########

@app.route('/process', methods=['GET'])
def show_result():
    my_profile = request.get_json()['profile']
    filtered_files = []
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    for file in files:
        if predictResume(os.path.join(app.config['UPLOAD_FOLDER'], file)) in my_profile:
            filtered_files.append(file)

    jobdes = Preprocessfile(os.path.join('../assets/', 'jobdesc.txt'))

    # customKeywords = ['spanish', 'hindi', 'opencv']
    my_tags = request.get_json()['tags']
    customKeywords = []
    my_tags = my_tags.split(",")
    for tag in my_tags:
        temp = tag.strip()
        customKeywords.append(temp)

    res = list()
    for file in filtered_files:
        score = find_score(jobdes, os.path.join(
            app.config['UPLOAD_FOLDER'], file), customKeywords)
        user_info = resumeparse.read_file(file)
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
