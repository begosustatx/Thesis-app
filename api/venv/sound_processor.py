from pydub.playback import play
import contextlib
import wave
from pydub import AudioSegment
from pydub import AudioSegment, playback


class SoundProcessor:
    # intonation v-09-12-8-30
    # v-09-10-3-56

    # TODO: DECIDE THE RIGHT PATTERNS
    def __init__(self):
        self.sounds = ['Sounds/v-10-28-7-35.wav', 'Sounds/v-09-09-8-20.wav', 'Sounds/v-09-12-8-13.wav',
                       'Sounds/v-09-18-4-16.wav', 'Sounds/v-09-12-8-13.wav', 'Sounds/v-10-29-4-22.wav', 'Sounds/v-09-10-3-52.wav']
        self.stop_flag = False
        self.is_touching = True

    def get_sound(self, num):
        return (AudioSegment.from_wav(self.sounds[num]))

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
