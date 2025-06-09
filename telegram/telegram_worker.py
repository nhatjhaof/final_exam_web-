import base64
import asyncio
import pymysql
from aiogram import Bot
from aiogram.types import BufferedInputFile

# --- Cấu hình Telegram ---
TELEGRAM_TOKEN = '8043672123:AAEg7VcA-bLA1q3z88dG6giIORNkJBi8_yY'
TELEGRAM_CHAT_ID = '5553535226'

# --- Cấu hình DB ---
DB_HOST = '127.0.0.1'
DB_PORT = 58763
DB_USER = 'admin'
DB_PASS = '123456'
DB_NAME = 'car_service'

# --- Gửi thông báo Telegram ---
async def send_vehicle_alert(vehicle):
    async with Bot(token=TELEGRAM_TOKEN) as bot:
        message = (
            f"🚨 Xe chạy quá tốc độ!\n"
            f"🚨 Biển số: {vehicle['license_plate']}\n"
            f"⏱ Thời gian: {vehicle['capture_time']}\n"
            f"⚡ Vận tốc: {vehicle['speed']} km/h"
           
        )
        await bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=message)

        if vehicle.get('image_data'):
            try:
                image_binary = base64.b64decode(vehicle['image_data'])
                input_file = BufferedInputFile(image_binary, filename="vehicle.jpg")
                await bot.send_photo(chat_id=TELEGRAM_CHAT_ID, photo=input_file, caption="Ảnh xe")
            except Exception as e:
                await bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=f"❗ Lỗi khi gửi ảnh: {str(e)}")
        
        if vehicle.get('image_license_data'):
            try:
                image_binary = base64.b64decode(vehicle['image_license_data'])
                input_file = BufferedInputFile(image_binary, filename="plate.jpg")
                await bot.send_photo(chat_id=TELEGRAM_CHAT_ID, photo=input_file, caption="Ảnh biển số")
            except Exception as e:
                await bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=f"❗ Lỗi khi gửi ảnh: {str(e)}")

# --- Gửi dữ liệu nếu có xe vi phạm ---
last_sent_time = None  # biến toàn cục theo dõi dữ liệu đã gửi

async def send_vehicle_data():
    global last_sent_time

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
                SELECT v.capture_time, speed, image_data, lp.license_plate,lp.image_license_data
                FROM vehicle_images v 
                JOIN license_plates lp 
                ON lp.id = v.license_plate_id
                WHERE speed > 30
                ORDER BY v.capture_time DESC
                LIMIT 1
            """)
            result = cursor.fetchone()

            if result:
                current_time = str(result['capture_time'])
                if current_time != last_sent_time:
                    await send_vehicle_alert(result)
                    last_sent_time = current_time
    finally:
        conn.close()

# --- Vòng lặp chính ---
async def main():
    while True:
        await send_vehicle_data()
        await asyncio.sleep(0.1)  

if __name__ == "__main__":
    asyncio.run(main())
