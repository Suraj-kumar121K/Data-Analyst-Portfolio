// =====================================================
// CONTACT FORM - SEND MESSAGE
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // GET CONTACT FORM
    // =================================================

    const contactForm = document.querySelector(".contact-form");

    if (!contactForm) {

        console.error("Contact form not found.");

        return;
    }


    // =================================================
    // FORM SUBMIT
    // =================================================

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        // =================================================
        // GET FORM FIELDS
        // =================================================

        const nameInput = contactForm.querySelector(
            'input[name="name"]'
        );

        const emailInput = contactForm.querySelector(
            'input[name="email"]'
        );

        const subjectInput = contactForm.querySelector(
            'select[name="subject"]'
        );

        const messageInput = contactForm.querySelector(
            'textarea[name="message"]'
        );


        // =================================================
        // CHECK FORM FIELDS
        // =================================================

        if (
            !nameInput ||
            !emailInput ||
            !subjectInput ||
            !messageInput
        ) {

            console.error("One or more contact form fields are missing.");

            alert(
                "Contact form configuration error. Please try again later."
            );

            return;
        }


        // =================================================
        // GET VALUES
        // =================================================

        const name = nameInput.value.trim();

        const email = emailInput.value.trim();

        const subject = subjectInput.value.trim();

        const message = messageInput.value.trim();


        // =================================================
        // VALIDATION
        // =================================================

        if (!name) {

            alert("Please enter your name.");

            nameInput.focus();

            return;
        }


        if (!email) {

            alert("Please enter your email address.");

            emailInput.focus();

            return;
        }


        if (!subject) {

            alert("Please select a subject.");

            subjectInput.focus();

            return;
        }


        if (!message) {

            alert("Please enter your message.");

            messageInput.focus();

            return;
        }


        // =================================================
        // EMAIL VALIDATION
        // =================================================

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            emailInput.focus();

            return;
        }


        // =================================================
        // SEND BUTTON
        // =================================================

        const sendButton = contactForm.querySelector(
            ".send-button"
        );


        if (!sendButton) {

            console.error("Send button not found.");

            return;
        }


        // Save original button
        const originalButtonHTML =
            sendButton.innerHTML;


        // Disable button
        sendButton.disabled = true;


        // Show sending status
        sendButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            <span>Sending...</span>
        `;


        // =================================================
        // SEND DATA TO BACKEND
        // =================================================

        try {

            console.log("Sending contact form...");


            const response = await fetch(
                "/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

                        email: email,

                        subject: subject,

                        message: message

                    })
                }
            );


            // =================================================
            // READ SERVER RESPONSE
            // =================================================

            let result = {};

            try {

                result = await response.json();

            } catch (jsonError) {

                console.error(
                    "Invalid server response:",
                    jsonError
                );

            }


            // =================================================
            // SUCCESS
            // =================================================

            if (
                response.ok &&
                result.success === true
            ) {

                console.log(
                    "Contact message sent successfully."
                );


                alert(
                    "Message sent successfully! Thank you for contacting me."
                );


                // Clear form
                contactForm.reset();

            }


            // =================================================
            // SERVER ERROR
            // =================================================

            else {

                console.error(
                    "Server error:",
                    result
                );


                alert(
                    result.message ||
                    "Unable to send message. Please try again."
                );

            }


        } catch (error) {

            // =================================================
            // NETWORK ERROR
            // =================================================

            console.error(
                "Contact form error:",
                error
            );


            alert(
                "Unable to connect to the server. Please try again later."
            );

        }


        // =================================================
        // RESTORE BUTTON
        // =================================================

        sendButton.disabled = false;

        sendButton.innerHTML =
            originalButtonHTML;

    });

});