import time
import pyautogui

# Get some starting speed form maybe a test done before
# Recalculate the speed every second (the amount of X coordinates they move per second)


class SpeedCalculator:

    def __init__(self, start_pos=2120, end_pos=3360):
        self.start_pos = start_pos
        self.end_pos = end_pos
        self.running = True
        self.speed = 0
        self.stop_flag = False

    def calculate_speed(self):
        prev_currentMouseX = pyautogui.position().x
        while self.running:
            new_currentMouseX = pyautogui.position().x
            coord = abs(new_currentMouseX-prev_currentMouseX)
            self.stop_flag = False
            # pause tracking when the mouse is not moving
            if coord == 0:
                self.stop_flag = True
            # stop tracking when they move out of the screen
            elif new_currentMouseX >= self.start_pos and new_currentMouseX <= self.end_pos:
                self.speed = round(((self.speed + coord)/2), 2)
            prev_currentMouseX = new_currentMouseX
            time.sleep(0.2)

    def stop(self):
        self.running = False
