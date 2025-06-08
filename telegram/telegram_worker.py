import time
import os
import mysql.connector
from dotenv import load_dotenv
from send_telegram import sendTelegramMessage
import sys
sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()

conn = mysql.connector.connect(
    host=os.getenv("REMOTE_DB_HOST"),
    port=int(os.getenv("REMOTE_DB_PORT")),
    user=os.getenv("DB_USERNAME"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)
cursor = conn.cursor(dictionary=True)
print("Telegram worker đang theo dõi DB...")


last_id = 0

while True:
    cursor.execute(f"""
        SELECT v.id, v.speed, v.capture_time, v.image_path, l.license_plate
        FROM vehicle_images v
        LEFT JOIN license_plates l ON v.license_plate_id = l.id
        WHERE v.id > {last_id}
        ORDER BY v.id ASC
        LIMIT 5
    """)
    rows = cursor.fetchall()

    for row in rows:
        license = row["license_plate"] or "Không xác định"
        image_path = row["image_path"]
        full_image_path = os.path.join("public/images/vehicle", image_path)  # tùy path thật của bạn

        message = f"""
        🚨  <b> Xe vi phạm tốc độ vượt vạch!</b>
        - Biển số: <b>{license}</b>
        - Tốc độ: {row['speed']:.1f} km/h
        - Thời gian: {row['capture_time'].strftime('%Y-%m-%d %H:%M:%S')}
        """

        sendTelegramMessage(message, full_image_path)
        last_id = row["id"]

    time.sleep(3)
