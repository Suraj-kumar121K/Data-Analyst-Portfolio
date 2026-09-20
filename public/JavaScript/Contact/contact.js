// =====================================================
// CONTACT FORM - SEND MESSAGE
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

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


        // Get form values
        const name = contactForm.querySelector(
            'input[name="name"]'
        ).value.trim();

        const email = contactForm.querySelector(
            'input[name="email"]'
        ).value.trim();

        const subject = contactForm.querySelector(
            'select[name="subject"]'
        ).value;

        const message = contactForm.querySelector(
            'textarea[name="message"]'
        ).value.trim();


        // =================================================
        // VALIDATION
        // =================================================

        if (!name || !email || !subject || !message) {

            alert("Please fill all required fields.");

            return;
        }


        // =================================================
        // SEND BUTTON
        // =================================================

        const sendButton = contactForm.querySelector(
            ".send-button"
        );

        const originalButtonHTML = sendButton.innerHTML;

        sendButton.disabled = true;

        sendButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            <span>Sending...</span>
        `;


        try {

            // =================================================
            // SEND DATA TO SERVER
            // =================================================

            const response = await fetch("/api/contact", {

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

            });


            const result = await response.json();


            // =================================================
            // SUCCESS
            // =================================================

            if (response.ok && result.success) {

                alert(
                    "Message sent successfully! Thank you for contacting me."
                );

                contactForm.reset();

            }


            // =================================================
            // ERROR
            // =================================================

            else {

                alert(
                    result.message ||
                    "Unable to send message. Please try again."
                );

            }


        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );

            alert(
                "Server error. Please try again later."
            );

        }


        // =================================================
        // RESTORE BUTTON
        // =================================================

        sendButton.disabled = false;

        sendButton.innerHTML = originalButtonHTML;

    });

});