from flask import Flask, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = '../assets/UploadedCVs'


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
    if request.method =='POST':
        my_tags = request.get_json()['tags']
        return save_tags(my_tags)
    else:
        return "Wrong form method"


###### UPLOAD CV SECTION #########
@app.route('/upload/single', methods = ['POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      f.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename)))
      return 'file uploaded successfully'
   else:
        return "Wrong form method"

@app.route('/upload/multi', methods = ['POST'])
def upload():
    files = request.files.getlist("file")
    for file in files:
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename)))
    return 'uploaded files'


###### PREPROCESSING SECTION ######



@app.route('/')
def hello_world():
   return ("Hello World")

if __name__ == '__main__':
   app.run(debug = "True", port=5002)
