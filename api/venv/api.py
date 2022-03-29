from flask import request
from flask import Flask
from sqlalchemy import null
# from text_processor import sentence_processor, word_processor
from html_parser import open_file
from sound_processor import SoundProcessor
from finger_tracking import SpeedCalculator
from stats import get_stats
import pyautogui


app = Flask(__name__)

# export FLASK_APP=api
# $env:FLASK_APP = "api.py"
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
    object = open_file(
        #'/Users/begona/Documents/GitHub/Thesis/react-flask-app/
        'C:/Users/begona/Documents/GitHub/thesis-app/threePig.html')
    return {"object": object}

@app.route('/play', methods=["POST"])
def play():
    value = request.json['value']
   # num_char = request.json['num_char']
    #    p_type = request.json['p_type']
  #  duration = tracking.get_sound_secs(num_char, p_type)
   # sound_api.play_sound(value, duration)
    sound_api.is_touching = True
    sound_api.new_func1(value)
    return {"OK": 200}


@app.route('/start_tracking')
def start_tracking():
    global sound_api
    sound_api = SoundProcessor()
    tracking.calculate_speed()
    return {"OK": 200}


@app.route('/stop_tracking')
def stop_tracking():
    tracking.stop()
# tracking = Null
    return {"OK": 200}


@app.route('/get_stats')
def get_stats():
    pos = (pyautogui.position())
    # multiply by 20 becuase we calculate every 0.05 seconds
    #per_sec = round((tracking.coord_per_sec*20), 2)
    # add playing
    sound_api.stop_flag = tracking.stop_flag
    playing = (not sound_api.stop_flag) and sound_api.is_touching
    return {"x_pos": pos.x, "y_pos": pos.y, "coord_5ms": tracking.coord_per_sec, "stop": tracking.stop_flag, "effect": 1, "playing": playing}


@app.route('/stop_touching')
def stop_touching():
    sound_api.is_touching = False
    return {"OK": 200}
