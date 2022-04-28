import contextlib
import wave
from pydub import AudioSegment, playback
import json


class SoundProcessor:

    def __init__(self):
        sounds = '{ "negative":"Sounds/v-10-21-3-33-2.wav", "bold":"Sounds/v-09-11-3-21-2.wav", "italics":"Sounds/v-09-12-8-21.wav","neutral": "Sounds/v-10-21-3-39-2.wav", "intonation": "Sounds/v-09-12-8-30.wav", "positive":"Sounds/v-09-18-4-16.wav"}'
        self.sounds = json.loads(sounds)
        self.stop_flag = False
        self.is_touching = True

    def get_sound(self, type):
        print("TYPE:-------------------", type)
        return (AudioSegment.from_wav(self.sounds[type]))

    def new_func1(self, num):
        sound = self.get_sound(num)
        play_obj = playback._play_with_simpleaudio(sound)
        while (self.is_touching):
            if(not play_obj.is_playing() and (not self.stop_flag)):
                play_obj = playback._play_with_simpleaudio(sound)
            elif(self.stop_flag):
                play_obj.stop()
        if(not self.is_touching):
            play_obj.stop()
