require("dotenv").config();
const express = require("express");
const cors = require("cors");
const useragent = require("useragent");
const path = require("path");

const app = express();
app.use(cors());

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

    console.log("Visitor Info:", visitorData);
    res.json(visitorData);
});

// הפעלת השרת
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
