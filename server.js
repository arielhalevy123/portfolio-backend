require("dotenv").config();
const express = require("express");
const cors = require("cors");
const useragent = require("useragent");
const path = require("path");
const nodemailer = require("nodemailer"); // 📩 ייבוא Nodemailer

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

// מסלול למעקב אחר מבקרים
app.get("/track", (req, res) => {
    const agent = useragent.parse(req.headers["user-agent"]);
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const visitorData = {
        ip: ip,
        browser: agent.family,
        os: agent.os.toString(),
        device: agent.device.family
    };

    console.log("📊 Visitor Info:", visitorData);
    res.json(visitorData);
});

// 🔹 מסלול לקבלת הודעות מהטופס ושליחת מייל
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    console.log(`📩 הודעה חדשה מ- ${name} (${email}): ${message}`);

    try {
        // 📧 יצירת חיבור ל-Gmail
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // המייל שלך
                pass: process.env.EMAIL_PASS // סיסמת אפליקציה (App Password)
            }
        });

        let mailOptions = {
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO, // לאן לשלוח
            subject: `📩 הודעה חדשה מטופס יצירת קשר`,
            text: `שם: ${name}\nאימייל: ${email}\n\nהודעה:\n${message}`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!");
        console.log("📩 Message ID:", info.messageId);
        console.log("📨 Email Response:", info.response);

        res.json({ message: "Message sent successfully!" });

    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ message: "Error sending message", error: error.toString() });
    }
});

// הפעלת השרת
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
