import pyautogui


def get_stats():
    pos = pyautogui.position()
    print("pos on stats:", pos)
    return pos
