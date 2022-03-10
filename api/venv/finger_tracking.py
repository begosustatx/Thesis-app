import time
import pyautogui


def get_pos():
    starttime = time.time()
    cont = 0
    while cont < 10:
        currentMouseX, currentMouseY = pyautogui.position()
        if (currentMouseX > 2800 and currentMouseY > 500):
            print("inside")
        else:
            print("outside")
        cont = cont + 1
        time.sleep(0.5)
