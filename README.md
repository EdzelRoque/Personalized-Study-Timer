# ⏱️ Personalized Study Timer Chrome Extension

A lightweight Chrome extension that helps students and professionals stay productive by managing focused study sessions and structured breaks — inspired by the Pomodoro technique.

---

## ✨ Features

- 🕒 Set custom study and rest durations
- 📌 Floating timer overlay on any website
- ✅ Timer continues running even when popup is closed
- ⏸️ Pause and resume anytime
- ♻️ Automatic looping between study/rest cycles
- 🔄 Works across tabs and websites
- 💾 User settings persist until reset

---

## 📸 Preview

![popup screenshot](./assets/popup-screenshot.png)  
*(Add your own screenshot if you have one — or take a clean screenshot of your popup and timer overlay)*
![image](https://github.com/user-attachments/assets/7ef8782a-59f7-49c3-bf60-d1af9588e0c7)

---

## 🚀 How to Install (Developer Mode)

1. Clone or download this repository
2. Go to `chrome://extensions` in your Chrome browser
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked**
5. Select the folder where this project is located
6. Use the extension from the Chrome toolbar popup

---

## 🔧 How It Works

- The popup (`popup.html`) acts as the user control panel
- Timer logic is managed by `background.js`, ensuring persistence even when popup is closed
- `content.js` handles the floating timer that displays across webpages
- Messages are passed between popup ↔ background ↔ content scripts via Chrome messaging API

---

## 🙋 About the Developer

Hi, my name is Edzel! I'm a 2/4 Computer Science student building software and tools that improve productivity and focus.  
I'm always open to feedback, feature requests, or collaboration opportunities. 

---

## 📄 License

MIT License – free to use and modify.
