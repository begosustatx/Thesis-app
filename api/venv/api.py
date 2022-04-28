from flask import request
from flask import Flask
from html_parser import open_file
from sound_processor import SoundProcessor
from finger_tracking import SpeedCalculator
from text_processor import get_intonation
import pyautogui
import json


app = Flask(__name__, static_folder='../build', static_url_path='/')

# export FLASK_APP=api
# flask run
files_json = '{"text1": "/Users/begona/Documents/GitHub/Thesis/react-flask-app/texts/article.html", "text2":"/Users/begona/Documents/GitHub/Thesis/react-flask-app/texts/article2.html" }'
global files 
files = json.loads(files_json)

@app.route('/process_text', methods=["POST"])
def process_text():
    option = request.json['option']
    part_of = request.json['part_of']
    text_opt = request.json['text_opt']
    object = open_file(
        files[text_opt], option, part_of)
    if len(option) != 0 and option[0] == 'intonation':
        intonation_info = get_intonation()
        return {"object": object, "intonation_info": intonation_info}
    return {"object": object}


@app.route('/play', methods=["POST"])
def play():
    value = request.json['value']
    sound_api.is_touching = True
    sound_api.play_effect(value)
    return {"OK": 200}


@app.route('/start_tracking')
def start_tracking():
    global tracking
    tracking = SpeedCalculator()
    global sound_api
    sound_api = SoundProcessor()
    tracking.calculate_speed()
    return {"OK": 200}


@app.route('/get_stats')
def get_stats():
    pos = (pyautogui.position())
    sound_api.stop_flag = tracking.stop_flag
    playing = (not sound_api.stop_flag) and sound_api.is_touching
    return {"x_pos": pos.x, "y_pos": pos.y, "speed": tracking.speed, "stop": tracking.stop_flag, "playing": playing}


@app.route('/stop_touching')
def stop_touching():
    sound_api.is_touching = False
    return {"OK": 200}

@app.route('/haptic_test')
def haptic_test():
    global sound_api
    sound_api = SoundProcessor()
    return {"OK": 200}