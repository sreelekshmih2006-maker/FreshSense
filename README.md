🧊 FreshSense
AI-Powered Smart Fridge Monitoring & Food Expiry Prediction System

FreshSense is an IoT + AI–driven smart fridge system that monitors environmental conditions (temperature, humidity, gas levels) and intelligently predicts food freshness and expiry.
Instead of relying on static expiry dates, FreshSense uses sensor data, probabilistic AI models, and storage behavior to reduce food waste and improve food safety.

📌 Project Description

Traditional refrigerators do not actively monitor food quality. Users often rely on printed expiry dates, leading to unnecessary food waste or unsafe consumption.

FreshSense solves this problem by:

Continuously monitoring fridge conditions using sensors

Detecting early spoilage using gas/VOC sensing

Predicting food expiry with AI-based probability models

Providing a clean, tile-based dashboard for users

Supporting manual entry and receipt scanning

Being hardware-agnostic (Arduino / NodeMCU / ESP32)

🧠 Key Idea

Expiry is not a fixed date — it is a function of environment, time, and behavior.

FreshSense treats food freshness as a dynamic prediction problem, not a static rule.

🛠️ Tech Stack
Hardware

NodeMCU (ESP8266) / ESP32 / Arduino UNO

DHT11 / DHT22 (Temperature & Humidity)

MQ-135 / MQ-2 (Gas / VOC Sensor)

Breadboard, resistors, jumper wires

Software

Python 3.9+

Streamlit (Frontend dashboard)

Pytesseract (Receipt OCR)

OpenCV (optional – image handling)

Arduino IDE (firmware)

AI / Logic

Probabilistic spoilage model (logistic regression)

Time-series sensor history

Thermal inertia modeling

Rule + AI hybrid prediction

✨ Features (Core + Advanced)

📡 Real-time temperature & humidity monitoring

🧪 Gas-based spoilage detection (VOC sensing)

🧠 AI-based expiry & spoilage risk prediction

🧾 Receipt scanning (OCR) to auto-add items

➕ Manual food entry with storage location

🧊 Fridge vs Freezer differentiation

🧩 Tile-based “My Fridge” dashboard

🎨 Customizable UI & background

⚙️ Functional settings panel

🔌 Hardware-ready architecture

📦 Installation
1️⃣ Clone the repository
git clone https://github.com/yourusername/freshsense.git
cd freshsense

2️⃣ Install Python dependencies
pip install streamlit pillow pytesseract

3️⃣ (Required for OCR) Install Tesseract

Windows: https://github.com/UB-Mannheim/tesseract/wiki

Linux:

sudo apt install tesseract-ocr

4️⃣ Arduino Libraries

Install via Arduino IDE:

DHT sensor library

ESP8266WiFi / WiFi

HTTPClient

▶️ Run Commands
Run the FreshSense dashboard
python -m streamlit run app.py

Verify Streamlit installation
streamlit hello

Upload firmware to NodeMCU / ESP32
Arduino IDE → Select Board → Upload

🖥️ Screenshots
Dashboard Overview

https://drive.google.com/drive/folders/1fYUKgnE44s5EYAER3_ZjT06cSKjvkjTr?usp=sharing

🎥 Demo Video

📺 Demo Link: https://drive.google.com/file/d/1OYw0Dxa7YEM4ShHhopy2ARDbnJqkdduG/view?usp=drivesdk


(Replace with your actual demo recording)

🧱 System Architecture
Flow:
Sensors → Microcontroller → Wi-Fi → Dashboard → AI Model → Expiry Prediction

🌐 API Documentation (If Backend Exists)
POST /sensor

Used by NodeMCU / ESP32 to send data

Request

{
  "temperature": 5.4,
  "humidity": 72,
  "gas": 620,
  "freshness": 78
}


Response

{
  "status": "ok"
}


Backend can be implemented using Flask / FastAPI for production.

👥 Team Members
Sreelekshmi H

(Update names as needed)

📄 License

MIT License

You are free to:

Use

Modify

Distribute

With attribution.

🏁 Conclusion

FreshSense demonstrates how AI + IoT can transform everyday appliances into intelligent systems.
By focusing on real environmental data instead of assumptions, FreshSense helps reduce food waste and encourages smarter consumption.

