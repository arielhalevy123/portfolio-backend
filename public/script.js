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
        alert(result.message); /    // הצגת הודעה למשתמש

        // ניקוי השדות אחרי שליחה מוצלחת
        document.getElementById("contact-form").reset();
    } catch (error) {
        console.error("❌ Error:", error);
        alert("Failed to send message. Please try again.");
    }
});
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("https://ariel-halevy-di5e.onrender.com/track");
        const userData = await response.json();

        document.getElementById("user-info").innerHTML = `
            <p><strong>IP Address:</strong> ${userData.ip}</p>
            <p><strong>Browser:</strong> ${userData.browser}</p>
            <p><strong>Operating System:</strong> ${userData.os}</p>
            <p><strong>Device:</strong> ${userData.device}</p>
        `;
    } catch (error) {
        console.error("❌ Error fetching user data:", error);
        document.getElementById("user-info").innerHTML = "<p>Error loading user info.</p>";
    }
});
