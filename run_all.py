import subprocess
import multiprocessing
import os

def run_web_server():
    print("🚀 Đang khởi động Web server (Node.js)...")
    subprocess.run(["npm", "run", "dev:web"], shell=True)

def run_telegram_worker():
    print("📩 Đang khởi động Telegram Bot...")
    subprocess.run(["python", "telegram/telegram_worker.py"], shell=True)

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    p1 = multiprocessing.Process(target=run_web_server)
    p2 = multiprocessing.Process(target=run_telegram_worker)

    p1.start()
    p2.start()

    p1.join()
    p2.join()
