/* General Styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #121212;
    color: #ffffff;
    text-align: center;
}

/* Header */
.header {
    background: #1e1e1e;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header .title {
    font-size: 2rem;
    color: #ff9800;
}

.navbar a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-size: 1.2rem;
    transition: color 0.3s;
}

.navbar a:hover {
    color: #ff9800;
}

/* Home Section */
.home {
    padding: 100px 20px;
    background: linear-gradient(45deg, #333, #000);
}

.home-content h3 {
    font-size: 2rem;
}

.social-media a {
    color: white;
    font-size: 2rem;
    margin: 10px;
    transition: color 0.3s;
}

.social-media a:hover {
    color: #ff9800;
}

/* Projects Section */
.projects {
    padding: 50px 20px;
}

.project-card {
    background: #1e1e1e;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    transition: background 0.3s, transform 0.3s;
}

.project-card:hover {
    background: #ff9800;
    transform: scale(1.05);
}

/* Contact Section */
.contact {
    padding: 50px 20px;
    background: #1e1e1e;
}

.contact form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
}

.contact input, .contact textarea {
    margin: 10px 0;
    padding: 10px;
    border: none;
    border-radius: 5px;
}

.contact .button {
    background: #ff9800;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
}

.contact .button:hover {
    background: #e68900;
}

/* Footer */
.footer {
    background: #000;
    padding: 20px;
}
