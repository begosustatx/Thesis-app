from pydub.playback import play
import contextlib
import wave
from pydub import AudioSegment


def get_sound(num):
    sounds = ['Sounds/v-09-09-8-8.wav', 'Sounds/v-09-09-8-11.wav', 'Sounds/v-09-09-8-20.wav',
              'Sounds/v-09-09-8-24.wav', 'Sounds/v-09-10-3-44.wav', 'Sounds/v-09-10-3-48.wav', 'Sounds/v-09-10-3-52.wav']
    return (AudioSegment.from_wav(sounds[num]))


def get_correct_duration(sound, desired_duration):
    initial_duration = sound.duration_seconds
    rate = round(initial_duration/desired_duration, 2)
    print(rate)
    sound_with_altered_frame_rate = sound._spawn(sound.raw_data, overrides={
        "frame_rate": int(sound.frame_rate * rate)
    })
    return sound_with_altered_frame_rate


def play_sound(value):
    sound = get_sound(value)
    # lets assume the duration of a sentences is going to be (num of charachters)/2
    # duration = (len(sentence)/2)
    duration = 2
    new_sound = get_correct_duration(sound, duration)
    play(new_sound)
    return "ok"
