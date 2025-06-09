import base64
import io
import asyncio
import pymysql
from aiogram import Bot
from aiogram.types import InputFile
from aiogram.types import BufferedInputFile

# --- Telegram config ---
TELEGRAM_TOKEN = '8043672123:AAEg7VcA-bLA1q3z88dG6giIORNkJBi8_yY'
TELEGRAM_CHAT_ID = '5553535226'

# --- Database config (qua SSH port forwarding đã mở sẵn) ---
DB_HOST = '127.0.0.1'
DB_PORT = 58763  # Đây là cổng bạn mở bằng: ssh -L 58763:127.0.0.1:3306 ...
DB_USER = 'admin'
DB_PASS = '123456'
DB_NAME = 'car_service'


async def send_vehicle_alert(vehicle):
    async with Bot(token=TELEGRAM_TOKEN) as bot:  # ✅ Tạo bot trong ngữ cảnh async

        message = (
            f"🚨 Xe chạy quá tốc độ!\n"
            f"⏱ Thời gian: {vehicle['capture_time']}\n"
            f"⚡ Vận tốc: {vehicle['speed']} km/h"
        )

        await bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=message)

        if vehicle.get('image_data'):
            try:
                image_binary = base64.b64decode(vehicle['image_data'])

                # Bọc thành BufferedInputFile (đây là cách đúng với aiogram v3)
                input_file = BufferedInputFile(image_binary, filename="vehicle.jpg")

                await bot.send_photo(chat_id=TELEGRAM_CHAT_ID, caption="Ảnh xe",photo=input_file)
            except Exception as e:
                await bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=f"❗ Lỗi khi gửi ảnh: {str(e)}")
                    
async def main():
    # Kết nối database
    conn = pymysql.connect(
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASS,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )

    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT capture_time, speed, image_data
                FROM vehicle_images
                WHERE speed > 30
                ORDER BY capture_time DESC
                LIMIT 1
            """)
            result = cursor.fetchone()

            if result:
                await send_vehicle_alert(result)
            else:
                print("✅ Không có xe nào vi phạm tốc độ.")
    finally:
        conn.close()

if __name__ == "__main__":
    asyncio.run(main())
