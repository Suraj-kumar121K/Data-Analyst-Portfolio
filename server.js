// =====================================================
// IMPORT MODULES
// =====================================================

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");


// =====================================================
// CREATE EXPRESS APP
// =====================================================

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

app.use(bodyParser.urlencoded({
    extended: true
}));


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


// Assets / Images / Files
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
// CONTACT FORM - SEND EMAIL
// =====================================================

app.post("/api/contact", async (req, res) => {

    try {

        // =================================================
        // GET FORM DATA
        // =================================================

        const {
            name,
            email,
            subject,
            message
        } = req.body;


        // =================================================
        // VALIDATION
        // =================================================

        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            return res.status(400).json({

                success: false,

                message: "All fields are required."

            });

        }


        // =================================================
        // CHECK EMAIL CONFIGURATION
        // =================================================

        if (
            !process.env.EMAIL_USER ||
            !process.env.EMAIL_APP_PASSWORD ||
            !process.env.EMAIL_TO
        ) {

            console.error(
                "Email environment variables are missing."
            );

            return res.status(500).json({

                success: false,

                message:
                    "Email configuration is missing on the server."

            });

        }


        // =================================================
        // GMAIL TRANSPORTER
        // =================================================

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: process.env.EMAIL_USER,

                pass: process.env.EMAIL_APP_PASSWORD

            }

        });


        // =================================================
        // VERIFY GMAIL CONNECTION
        // =================================================

        await transporter.verify();

        console.log(
            "Gmail connection successful."
        );


        // =================================================
        // SEND EMAIL
        // =================================================

        await transporter.sendMail({

            from:
                `"Portfolio Website" <${process.env.EMAIL_USER}>`,

            to:
                process.env.EMAIL_TO,

            replyTo:
                email,

            subject:
                `Portfolio Contact: ${subject}`,

            text: `
New Portfolio Message
=====================

Name: ${name}

Email: ${email}

Subject: ${subject}

Message:
${message}

=====================

This message was sent from your portfolio website.
            `

        });


        // =================================================
        // SUCCESS
        // =================================================

        console.log(
            "Email sent successfully."
        );


        return res.status(200).json({

            success: true,

            message:
                "Message sent successfully."

        });

    }


    // =====================================================
    // ERROR
    // =====================================================

    catch (error) {

        console.error(
            "EMAIL ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to send message.",

            error:
                error.message

        });

    }

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
// VERCEL EXPORT
// =====================================================

module.exports = app;