from flask import request
from flask import Flask
from sqlalchemy import null
#from text_processor import sentence_processor, word_processor
from html_parser import open_file
from sound_processor import play_sound
from finger_tracking import SpeedCalculator

app = Flask(__name__)

# export FLASK_APP=api
# flask run

'''
@app.route('/sentence', methods=["POST"])
def sentence():
    value = request.json['value']
    return process_file(value, False)


@app.route('/word', methods=["POST"])
def word():
    value = request.json['value']
    return process_file(value, True)

'''


@app.route('/process_text')
def process_text():
    # initialize the speed with the test
    global tracking
    tracking = SpeedCalculator()
    print(tracking.coord_per_sec)
    object = open_file(
        '/Users/begona/Documents/GitHub/Thesis/react-flask-app/threePig.html')
    return {"object": object}


@app.route('/play', methods=["POST"])
def play():
    value = request.json['value']
    num_char = request.json['num_char']
    p_type = request.json['p_type']
    duration = tracking.get_sound_secs(num_char, p_type)
    play_sound(value, duration)
    return {"OK": 200}


@app.route('/start_tracking')
def start_tracking():
    tracking.calculate_speed()
    return {"OK": 200}


@app.route('/stop_tracking')
def stop_tracking():
    tracking.stop()
#tracking = Null
    return {"OK": 200}
