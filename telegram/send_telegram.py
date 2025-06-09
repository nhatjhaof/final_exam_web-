import os
import requests
from dotenv import load_dotenv

load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

def sendTelegramMessage(message, image_path=None):
    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        raise ValueError("❌ TELEGRAM_TOKEN hoặc TELEGRAM_CHAT_ID không tồn tại.")

    if image_path and os.path.exists(image_path):
        print(f"📷 Gửi ảnh kèm tin nhắn: {image_path}")
        url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendPhoto"
        with open(image_path, "rb") as image:
            response = requests.post(url, data={
                "chat_id": TELEGRAM_CHAT_ID,
                "caption": message,
                "parse_mode": "HTML"
            }, files={"photo": image})
    else:
        print("✉️ Gửi tin nhắn không kèm ảnh")
        url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
        response = requests.post(url, data={
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "HTML"
        })

    if response.status_code != 200:
        raise Exception(f"Lỗi Telegram API: {response.status_code} - {response.text}")

    print("✅ Telegram đã nhận tin.")
