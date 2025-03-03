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
    let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.connection.remoteAddress;

    if (ip.startsWith("10.") || ip.startsWith("127.") || ip.startsWith("::1")) {
        console.log("⚠️ Internal IP detected. Fetching external IP...");
        try {
            const ipResponse = await axios.get("https://api64.ipify.org?format=json");
            ip = ipResponse.data.ip;
        } catch (error) {
            console.error("❌ Failed to get external IP:", error);
        }
    }

    let location = "Unknown";
    let timezone = "UTC"; // ברירת מחדל אם לא נמצא
    try {
        const geoResponse = await axios.get(`https://ipwho.is/${ip}`);
        if (geoResponse.data.success) {
            location = `${geoResponse.data.city}, ${geoResponse.data.country}`;
            timezone = geoResponse.data.timezone.id || "UTC"; // שימוש באזור הזמן מה-API
        } else {
            console.error("⚠️ IPWHO failed, trying backup API...");
            const backupGeo = await axios.get(`http://ip-api.com/json/${ip}?fields=status,country,city,timezone`);
            if (backupGeo.data.status === "success") {
                location = `${backupGeo.data.city}, ${backupGeo.data.country}`;
                timezone = backupGeo.data.timezone || "UTC";
            }
        }
    } catch (error) {
        console.error("❌ Failed to get location and timezone:", error);
    }

    // ✅ רשימת תובנות (למראה מתקדם)
    const insights = [
        "📊 משתמש פעיל באתרי טכנולוגיה",
        "📡 מחובר ל-WiFi ציבורי",
        "🔍 מחפש מידע על פיתוח תוכנה",
        "📅 ביקר באתר זה בעבר",
        "🛡️ משתמש באמצעי אבטחה מתקדמים",
        "🎧 מאזין למוזיקה תוך כדי גלישה"
    ];
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];

    // ✅ מחזירים את אזור הזמן כדי להמיר אותו ב-Frontend
    const visitorData = {
        ip: ip,
        location: location,
        browser: agent.family,
        os: agent.os.toString(),
        device: agent.device.family,
        timezone: timezone, // שליחת אזור הזמן למשתמש
        insight: randomInsight
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
