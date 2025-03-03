document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // מונע רענון של הדף

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();
        alert(result.message);     // הצגת הודעה למשתמש

        // ניקוי השדות אחרי שליחה מוצלחת
        document.getElementById("contact-form").reset();
    } catch (error) {
        console.error("❌ Error:", error);
        alert("Failed to send message. Please try again.");
    }
});
document.addEventListener("DOMContentLoaded", async function () {
    try {
        console.log("🔄 Fetching user info...");
        const response = await fetch("https://ariel-halevy-di5e.onrender.com/track");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        console.log("✅ User data received:", userData);

        // 🕒 חישוב הזמן לפי אזור הזמן של המשתמש
        let userTime = "Unknown";
        if (userData.timezone) {
            try {
                userTime = new Intl.DateTimeFormat("en-GB", {
                    timeZone: userData.timezone,
                    dateStyle: "full",
                    timeStyle: "long"
                }).format(new Date());
            } catch (error) {
                console.error("❌ Failed to format user time:", error);
            }
        }

        document.getElementById("user-info").innerHTML = `
            <p><strong>🌍 IP Address:</strong> ${userData.ip}</p>
            <p><strong>📍 Location:</strong> ${userData.location}</p>
            <p><strong>🖥️ Browser:</strong> ${userData.browser}</p>
            <p><strong>💻 Operating System:</strong> ${userData.os}</p>
            <p><strong>📱 Device:</strong> ${userData.device}</p>
            <p><strong>⏳ Local Time:</strong> ${userTime}</p>
            <p><strong>🔮 Insight:</strong> ${userData.insight}</p>
        `;
    } catch (error) {
        console.error("❌ Error fetching user data:", error);
        document.getElementById("user-info").innerHTML = `<p>Error loading user info: ${error.message}</p>`;
    }
});
