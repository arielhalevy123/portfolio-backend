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
        alert(result.message); // הצגת הודעה למשתמש

        // ניקוי השדות אחרי שליחה מוצלחת
        document.getElementById("contact-form").reset();
    } catch (error) {
        console.error("❌ Error:", error);
        alert("Failed to send message. Please try again.");
    }
});