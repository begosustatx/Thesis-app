from pydub.playback import play
import contextlib
import wave
from pydub import AudioSegment, playback
import simpleaudio as sa


class SoundProcessor:

    # TODO: DECIDE THE RIGHT PATTERNS
    def __init__(self):
        self.sounds = ['Sounds/v-09-09-8-8.wav', 'Sounds/v-09-09-8-11.wav', 'Sounds/v-09-09-8-20.wav',
                       'Sounds/v-09-09-8-24.wav', 'Sounds/v-09-10-3-44.wav', 'Sounds/v-09-10-3-48.wav', 'Sounds/v-09-10-3-52.wav']
        self.stop_flag = False
        self.is_touching = True

    def get_sound(self, num):
        return (AudioSegment.from_wav(self.sounds[num]))

    def new_func1(self, num):
        sound = self.get_sound(num)
        play_obj = playback.play(sound)
        while (self.is_touching):
            if(not play_obj.is_playing() and (not self.stop_flag)):
                play_obj = playback._play_with_simpleaudio(sound)
            elif(self.stop_flag):
                play_obj.stop()
        if(not self.is_touching):
            play_obj.stop()
