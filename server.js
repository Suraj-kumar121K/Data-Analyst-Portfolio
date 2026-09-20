const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();


// =====================================================
// SERVER CONFIGURATION
// =====================================================

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(bodyParser.json());


// =====================================================
// PROJECT PATHS
// =====================================================

const publicPath = path.join(
    __dirname,
    "public"
);

const portfolioPath = path.join(
    publicPath,
    "portfolio"
);

const cssPath = path.join(
    publicPath,
    "CSS"
);

const assetsPath = path.join(
    publicPath,
    "ASSETS"
);


// =====================================================
// STATIC FILES
// =====================================================

// Portfolio HTML / static files
app.use(
    express.static(portfolioPath)
);


// CSS files
app.use(
    "/CSS",
    express.static(cssPath)
);


// Images / Assets / Other files
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
// SALES DASHBOARD DETAILS PAGE
// =====================================================

app.get("/projects/sales-dashboard", (req, res) => {

    res.sendFile(
        path.join(
            portfolioPath,
            "Projects",
            "ProjectDetails",
            "sales-dashboard.html"
        )
    );

});


// =====================================================
// SALES DASHBOARD LIVE PROJECT
// =====================================================

app.get("/projects/sales-dashboard/live", (req, res) => {

    res.sendFile(
        path.join(
            assetsPath,
            "Projects",
            "SalesDashboard",
            "sales_chart.html"
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

if (require.main === module) {

    app.listen(
        PORT,
        HOST,
        () => {

            console.log(
                `Server running at http://${HOST}:${PORT}`
            );

        }
    );

}


// =====================================================
// VERCEL
// =====================================================

module.exports = app;