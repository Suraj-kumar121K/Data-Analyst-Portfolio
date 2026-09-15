const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from portfolio folder
app.use(express.static(path.join(__dirname, "..", "portfolio")));

// Serve CSS folder separately
app.use("/CSS", express.static(path.join(__dirname, "..", "CSS")));

// Main Index
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "index.html"));
});

// Home Page
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Home_page", "about.html"));
});

// Skills
app.get("/skills", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Skills", "skills.html"));
});

// Projects
app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Projects", "projects.html"));
});

// Experience
app.get("/experience", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Experience", "experience.html"));
});

// Education
app.get("/education", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Education", "education.html"));
});

// Resume
app.get("/resume", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Resume", "resume.html"));
});

// Contact
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Contact", "contact.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
