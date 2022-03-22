from pydub.playback import play
import contextlib
import wave
from pydub import AudioSegment
import simpleaudio as sa
from pydub.playback import _play_with_simpleaudio


class SoundProcessor:

    def __init__(self):
        self.sounds = ['Sounds/v-09-09-8-8.wav', 'Sounds/v-09-09-8-11.wav', 'Sounds/v-09-09-8-20.wav',
                       'Sounds/v-09-09-8-24.wav', 'Sounds/v-09-10-3-44.wav', 'Sounds/v-09-10-3-48.wav', 'Sounds/v-09-10-3-52.wav']
        self.stop_flag = False
        self.finished_audio = True

    def get_sound(self, num):
        return (AudioSegment.from_wav(self.sounds[num]))

    def get_correct_duration(self, sound, desired_duration):
        initial_duration = sound.duration_seconds
        rate = round(initial_duration/desired_duration, 2)
        sound_with_altered_frame_rate = sound._spawn(sound.raw_data, overrides={
            "frame_rate": int(sound.frame_rate * rate)
        })
        return sound_with_altered_frame_rate

    def play_sound(self, value, duration):
        sound = self.get_sound(value)

        #new_sound = self.get_correct_duration(sound, 5)
        playback = _play_with_simpleaudio(sound)
        if(self.stop_flag):
            # playback.stop()
            print("in sotp")
        # return "ok"

    def new_func(self):
        print("sound")
        wave_read = wave.open(
            '/Users/begona/Documents/GitHub/Thesis/react-flask-app/api/venv/Sounds/v-09-09-8-8.wav', 'rb')
        #wave_obj = sa.WaveObject.from_wave_read(wave_read)
        wave_obj = sa.WaveObject.from_wave_read(
            AudioSegment.from_wav(self.sound[1]))
        play_obj = wave_obj.play()
        #start = time.time()
        print(play_obj)
        i = 0
        while (play_obj.is_playing() and (not self.stop_flag)):
            i = i+1
        if(self.stop_flag):
            #end = time.time()
            play_obj.stop()
            self.finished_audio = False

        # play_obj.stop()
        play_obj.wait_done()
