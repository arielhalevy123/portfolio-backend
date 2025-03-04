# AI-Powered Portfolio & Monitoring Dashboard

🚀 **Built a Full-Stack Website Using AI - No Prior Coding Knowledge Required!** 🚀  

This project demonstrates how anyone can **build a fully functional website** using **AI assistance** without prior coding experience.  
It consists of two key sections:  
1. **A Professional Portfolio** showcasing projects.  
2. **A System Monitoring Dashboard** that illustrates what data can be gathered about a visitor **instantly upon entering a website**.

---

## 🔥 Key Features
- **Portfolio Section**: Displays projects with images, technologies used, and descriptions.
- **Monitoring Dashboard**: Instantly fetches user data such as IP address, location, browser, and OS.
- **Contact Form**: Allows visitors to send messages, which are processed by the backend.
- **Fully Responsive Design**: Works on desktop, tablets, and mobile devices.
- **Smooth Animations**: Implemented using AOS for scrolling effects and GSAP for dynamic animations.
- **Email Integration**: Uses Nodemailer for sending emails from the backend.

---

## 🛠 Tech Stack
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js + Express  
- **Hosting**: Render  
- **APIs Used**:
  - `ipwho.is` (for location tracking)
  - `useragent` (for device and browser identification)
- **Email Service**: Nodemailer  
- **AI-Powered Development**: AI was used to generate, refine, and optimize the code.

---

## 📂 Project Structure.

```
├── public
│ ├── index.html
│ ├── styles.css
│ ├── script.js
│ └── photos/
├── server.js
├── package.json
├── README.md
```




### 📝 Explanation:
1. **`public/`** – Contains all frontend assets (HTML, CSS, JS, and images).
2. **`server.js`** – Handles backend operations (Express server, user tracking, email handling).
3. **`package.json`** – Manages project dependencies.
4. **`README.md`** – This documentation file.

---

## 🚀 Installation & Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/arielhalevy123/portfolio-backend.git
Navigate into the project and install dependencies:
bash

cd your-repo-name
npm install
Create a .env file for environment variables (for example, storing email credentials securely).

## 🔧 Running the Project
Start the server locally:
npm start
(or simply run node server.js)

Open your browser and visit:

http://localhost:1000
Explore the portfolio and scroll down to view the Monitoring Dashboard in action.

## 🔍 How It Works
User Visits the Website → The backend (server.js) immediately retrieves their IP address, location, browser, and OS.
Frontend Updates in Real-Time → The information is displayed in the Monitoring Dashboard instantly.
Contact Form Submission → Sends data via a POST request to /contact, which can trigger an email notification using Nodemailer.
AI Assistance → Most of this code was AI-generated and refined using modern best practices.
## 🎯 Key Features Demonstrated
Real-Time User Tracking: Displays location, IP, device details, and browser info upon visit.
Portfolio with Hover Effects: Each project displays detailed info on hover (tech stack, description, and GitHub link).
Dynamic Animations: Implemented with GSAP for smooth user experience.
AI-Powered Coding: Every aspect of the site was assisted by AI, making it accessible to non-coders.
## 🌎 Live Demo
Check out the live project:
🔗 Visit the Website
https://ariel-halevy-di5e.onrender.com


## 🤝 Contributions
Feel free to contribute!
Fork the repository
Create a new branch
Submit a pull request (PR)


## 📩 Contact Me
Name: Ariel Halevy
Email: ariyony@gmail.com
LinkedIn: Ariel Halevy
GitHub: arielhalevy123

## ⭐ If you found this project useful, please give it a star! ⭐
Feel free to use or modify the code for your own projects!
