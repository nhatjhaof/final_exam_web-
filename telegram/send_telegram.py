import os
import requests
from dotenv import load_dotenv

#  ssh -L 3307:localhost:3306 root@192.168.70.128

load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

def sendTelegramMessage(message, image_path=None):
    if image_path:
        url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendPhoto"
        files = {'photo': open(image_path, 'rb')}
        payload = {
            "chat_id": TELEGRAM_CHAT_ID,
            "caption": message,
            "parse_mode": "HTML"
        }
    else:
        url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
        payload = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "HTML"
        }
        files = None

    response = requests.post(url, data=payload, files=files)
    print("Telegram:", response.status_code, response.text)

    if files:
        files['photo'].close()
