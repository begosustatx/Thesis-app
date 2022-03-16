from flask import request
from flask import Flask
from text_processor import sentence_processor, word_processor
from html_parser import process_file, open_file
from sound_processor import play_sound
app = Flask(__name__)

# export FLASK_APP=api
# flask run


@app.route('/sentence', methods=["POST"])
def sentence():
    value = request.json['value']
    return process_file(value, False)


@app.route('/word', methods=["POST"])
def word():
    value = request.json['value']
    return process_file(value, True)


@app.route('/process_text')
def process_text():
    object = open_file(
        '/Users/begona/Documents/GitHub/Thesis/react-flask-app/threePig.html')
    return {"object": object}


@app.route('/play', methods=["POST"])
def play():
    value = request.json['value']
    return play_sound(value)
