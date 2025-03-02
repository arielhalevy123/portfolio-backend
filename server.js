require("dotenv").config();
const express = require("express");
const cors = require("cors");
const useragent = require("useragent");

const app = express();
app.use(cors());

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
