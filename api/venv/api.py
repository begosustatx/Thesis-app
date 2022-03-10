from flask import request
from flask import Flask
from text_processor import sentence_processor, word_processor
from sound_processor import play_sound
app = Flask(__name__)

# export FLASK_APP=api
# flask run


@app.route('/sentence')
def sentence():
    return sentence_processor('/Users/begona/Documents/GitHub/Thesis/TextProcessor/Code/text.js')


@app.route('/word')
def word():
    return word_processor('/Users/begona/Documents/GitHub/Thesis/TextProcessor/Code/text.js')


@app.route('/play', methods=["POST"])
def play():
    value = request.json['value']
    return play_sound(value)
