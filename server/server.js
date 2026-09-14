const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from root portfolio folder
app.use(express.static(path.join(__dirname, "..", "portfolio")));

// Main
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "index.html"));
});

// Home Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Home_page", "about.html"));
});

// Skills
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Skills", "skills.html"));
});

// "Projects"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Projects", "projects.html"));
});

// Experience
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Experience", "experience.html"));
});

// Education
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Education", "education.html"));
});

// Resume
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Resume", "resume.html"));
});

// Contact
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "portfolio", "Contact", "contact.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
