const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();


// =====================================================
// SERVER CONFIGURATION
// =====================================================

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(bodyParser.json());
app.use(cors());


// =====================================================
// FOLDER PATHS
// =====================================================

const portfolioPath = path.join(__dirname, "..", "portfolio");
const cssPath = path.join(__dirname, "..", "CSS");
const assetsPath = path.join(__dirname, "..", "ASSETS");


// =====================================================
// STATIC FILES
// =====================================================

// Portfolio folder
app.use(
    express.static(portfolioPath)
);


// CSS folder
app.use(
    "/CSS",
    express.static(cssPath)
);


// ASSETS folder
app.use(
    "/ASSETS",
    express.static(assetsPath)
);


// =====================================================
// HOME PAGE
// =====================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            portfolioPath,
            "index.html"
        )
    );

});


// =====================================================
// ABOUT PAGE
// =====================================================

app.get("/home", (req, res) => {

    res.sendFile(
        path.join(
            portfolioPath,
            "About",
            "about.html"
        )
    );

});


// =====================================================
// SKILLS PAGE
// =====================================================

app.get("/skills", (req, res) => {

    res.sendFile(
        path.join(
            portfolioPath,
            "Skills",
            "skills.html"
        )
    );

});


// =====================================================
// PROJECTS PAGE
// =====================================================

app.get("/projects", (req, res) => {

    res.sendFile(
        path.join(
            portfolioPath,
            "Projects",
            "projects.html"
        )
    );

});


// =====================================================
// EXPERIENCE PAGE
// =====================================================

app.get("/experience", (req, res) => {

    res.sendFile(
        path.join(
            portfolioPath,
            "Experience",
            "experience.html"
        )
    );

});


// =====================================================
// EDUCATION PAGE
// =====================================================

app.get("/education", (req, res) => {

    res.sendFile(
        path.join(
            portfolioPath,
            "Education",
            "education.html"
        )
    );

});


// =====================================================
// RESUME PAGE
// =====================================================

app.get("/resume", (req, res) => {

    res.sendFile(
        path.join(
            portfolioPath,
            "Resume",
            "resume.html"
        )
    );

});


// =====================================================
// CONTACT PAGE
// =====================================================

app.get("/contact", (req, res) => {

    res.sendFile(
        path.join(
            portfolioPath,
            "Contact",
            "contact.html"
        )
    );

});


// =====================================================
// 404 ERROR
// =====================================================

app.use((req, res) => {

    res.status(404).send(
        `Cannot GET ${req.path}`
    );

});


// =====================================================
// LOCAL SERVER
// =====================================================

// Local computer par npm start ke liye
if (require.main === module) {

    app.listen(PORT, HOST, () => {

        console.log(
            `Server running at http://${HOST}:${PORT}`
        );

    });

}


// =====================================================
// VERCEL EXPORT
// =====================================================

module.exports = app;