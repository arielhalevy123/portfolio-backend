require("dotenv").config();
const express = require("express");
const cors = require("cors");
const useragent = require("useragent");
const path = require("path");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// מגדיר את Express להגיש קבצים סטטיים מתוך התיקייה 'public'
app.use(express.static(path.join(__dirname, "public")));

// מסלול ברירת מחדל שמגיש את index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔹 מסלול לזיהוי מבקרים עם מידע "מרשים"
app.get("/track", async (req, res) => {
    const agent = useragent.parse(req.headers["user-agent"]);
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // 🔍 זיהוי גיאוגרפי לפי כתובת IP
    let location = "Unknown";
    try {
        const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
        if (geoResponse.data.country_name) {
            location = `${geoResponse.data.city}, ${geoResponse.data.country_name}`;
        }
    } catch (error) {
        console.error("❌ Failed to get location:", error);
    }

    // 📌 יצירת "תובנות על המשתמש" (למראית עין)
    const insights = [
        "📊 משתמש פעיל באתרי טכנולוגיה",
        "📡 מחובר ל-WiFi ציבורי",
        "🔍 מחפש מידע על פיתוח תוכנה",
        "📅 ביקר באתר זה בעבר"
    ];
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];

    const visitorData = {
        ip: ip,
        location: location,
        browser: agent.family,
        os: agent.os.toString(),
        device: agent.device.family,
        timestamp: new Date().toLocaleString(),
        insight: randomInsight // 🔮 תובנה מדומה
    };

    console.log("📊 Visitor Info:", visitorData);
    res.json(visitorData);
});

// 🔹 מסלול לטופס יצירת קשר עם שליחת מייל
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    console.log(`📩 הודעה חדשה מ- ${name} (${email}): ${message}`);

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `📩 הודעה חדשה מטופס יצירת קשר`,
            text: `שם: ${name}\nאימייל: ${email}\n\nהודעה:\n${message}`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!", info.messageId);

        res.json({ message: "Message sent successfully!" });

    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ message: "Error sending message", error: error.toString() });
    }
});

// הפעלת השרת
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
