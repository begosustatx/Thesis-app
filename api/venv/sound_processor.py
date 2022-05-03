import contextlib
import wave
from pydub import AudioSegment, playback
import json


class SoundProcessor:

    def __init__(self):
        f = open('sound_map.json')
        sounds_data = f.read()
        self.sounds = json.loads(sounds_data)
        print("SOOOOOUNDS::::", self.sounds)
        self.stop_flag = False
        self.is_touching = True

    def get_sound(self, type):
        return (AudioSegment.from_wav(self.sounds[type]))

    def play_effect(self, num):
        sound = self.get_sound(num)
        play_obj = playback._play_with_simpleaudio(sound)
        while (self.is_touching):
            if(not play_obj.is_playing() and (not self.stop_flag)):
                play_obj = playback._play_with_simpleaudio(sound)
            elif(self.stop_flag):
                play_obj.stop()
        if(not self.is_touching):
            play_obj.stop()
