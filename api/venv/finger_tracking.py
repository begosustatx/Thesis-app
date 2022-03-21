import time
from numpy import char
import pyautogui

# Get some starting speed form maybe a test done before
# Recalculate the speed every second (the amount of X coordinates they move per second)


class SpeedCalculator:

    # TODO: ADD FOR H1
    def __init__(self, start_pos=2120, end_pos=3360, char_per_line_p=82):
        self.start_pos = start_pos
        self.end_pos = end_pos
        self.running = True
        self.coord_per_char_p = round(
            ((end_pos-start_pos)/char_per_line_p), 0)
        self.coord_per_sec = 0

    # TODO: CREATE THE REAL FUNCTION
    def test_speed(self):
        cont = 0
        prev_currentMouseX = pyautogui.position().x
        while cont < 10:
            new_currentMouseX = pyautogui.position().x
            coord = new_currentMouseX-prev_currentMouseX
            sum = sum + coord
            cont = cont + 1
            time.sleep(1.0)
        self.coord_per_sec = sum / cont

    def calculate_speed(self):
        prev_currentMouseX = pyautogui.position().x
        while self.running:
            new_currentMouseX = pyautogui.position().x
            if new_currentMouseX >= self.start_pos and new_currentMouseX <= self.end_pos:
                coord = abs(new_currentMouseX-prev_currentMouseX)
                self.coord_per_sec = (self.coord_per_sec + coord)/2
            prev_currentMouseX = new_currentMouseX
            time.sleep(1.0)

    def get_sound_secs(self, char_number, p_type=True):
        if p_type:
            coord_num = char_number * self.coord_per_char_p
        else:
            # TODO: ADD H1
            coord_num = char_number * self.coord_per_char_p
        return (coord_num/self.coord_per_sec)

    def stop(self):
        self.running = False
