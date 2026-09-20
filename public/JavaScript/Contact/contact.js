// =====================================================
// CONTACT FORM + CURRENT LOCATION MAP
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("CONTACT JS LOADED");


    // =================================================
    // CONTACT FORM
    // =================================================

    const contactForm =
        document.querySelector(".contact-form");


    if (contactForm) {

        // =================================================
        // FORM SUBMIT
        // =================================================

        contactForm.addEventListener(
            "submit",
            async (event) => {

                // Stop page refresh
                event.preventDefault();
                event.stopPropagation();

                console.log(
                    "FORM SUBMIT INTERCEPTED"
                );


                // =================================================
                // GET FORM INPUTS
                // =================================================

                const nameInput =
                    contactForm.querySelector(
                        'input[name="name"]'
                    );

                const emailInput =
                    contactForm.querySelector(
                        'input[name="email"]'
                    );

                const subjectInput =
                    contactForm.querySelector(
                        'select[name="subject"]'
                    );

                const messageInput =
                    contactForm.querySelector(
                        'textarea[name="message"]'
                    );


                // =================================================
                // CHECK INPUTS
                // =================================================

                if (
                    !nameInput ||
                    !emailInput ||
                    !subjectInput ||
                    !messageInput
                ) {

                    console.error(
                        "Contact form fields are missing."
                    );

                    alert(
                        "Contact form configuration error."
                    );

                    return;
                }


                // =================================================
                // GET VALUES
                // =================================================

                const name =
                    nameInput.value.trim();

                const email =
                    emailInput.value.trim();

                const subject =
                    subjectInput.value.trim();

                const message =
                    messageInput.value.trim();


                // =================================================
                // VALIDATION
                // =================================================

                if (!name) {

                    alert(
                        "Please enter your name."
                    );

                    nameInput.focus();

                    return;
                }


                if (!email) {

                    alert(
                        "Please enter your email."
                    );

                    emailInput.focus();

                    return;
                }


                if (!subject) {

                    alert(
                        "Please select a subject."
                    );

                    subjectInput.focus();

                    return;
                }


                if (!message) {

                    alert(
                        "Please enter your message."
                    );

                    messageInput.focus();

                    return;
                }


                // =================================================
                // EMAIL VALIDATION
                // =================================================

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    alert(
                        "Please enter a valid email address."
                    );

                    emailInput.focus();

                    return;
                }


                // =================================================
                // SEND BUTTON
                // =================================================

                const sendButton =
                    contactForm.querySelector(
                        ".send-button"
                    );


                if (!sendButton) {

                    console.error(
                        "Send button not found."
                    );

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

                    console.log(
                        "Sending data to /api/contact..."
                    );


                    const response =
                        await fetch(
                            "/api/contact",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({
                                        name: name,
                                        email: email,
                                        subject: subject,
                                        message: message
                                    })
                            }
                        );


                    console.log(
                        "Server response:",
                        response.status
                    );


                    // =================================================
                    // GET SERVER RESPONSE
                    // =================================================

                    const result =
                        await response.json();


                    console.log(
                        "Server result:",
                        result
                    );


                    // =================================================
                    // SUCCESS
                    // =================================================

                    if (
                        response.ok &&
                        result.success === true
                    ) {

                        alert(
                            "Message sent successfully!"
                        );


                        // Clear form
                        contactForm.reset();

                    }


                    // =================================================
                    // SERVER ERROR
                    // =================================================

                    else {

                        alert(
                            result.message ||
                            "Failed to send message."
                        );

                    }

                }


                // =================================================
                // NETWORK ERROR
                // =================================================

                catch (error) {

                    console.error(
                        "Contact form error:",
                        error
                    );


                    alert(
                        "Unable to connect to the server."
                    );

                }


                // =================================================
                // RESTORE BUTTON
                // =================================================

                finally {

                    sendButton.disabled =
                        false;

                    sendButton.innerHTML =
                        originalButtonHTML;

                }

            }
        );

    }


    // =====================================================
    // CURRENT LOCATION MAP
    // =====================================================

    const locationButton =
        document.querySelector(
            "#getLocation"
        );


    const mapFrame =
        document.querySelector(
            "#mapFrame"
        );


    const locationMessage =
        document.querySelector(
            "#locationMessage"
        );


    const locationStatus =
        document.querySelector(
            "#locationStatus"
        );


    const locationCountry =
        document.querySelector(
            "#locationCountry"
        );


    // =================================================
    // CHECK MAP ELEMENTS
    // =================================================

    if (
        !locationButton ||
        !mapFrame
    ) {

        console.log(
            "Location map elements not found."
        );

        return;
    }


    console.log(
        "LOCATION MAP READY"
    );


    // =================================================
    // GET CURRENT LOCATION
    // =================================================

    locationButton.addEventListener(
        "click",
        () => {

            // =============================================
            // CHECK GEOLOCATION SUPPORT
            // =============================================

            if (
                !navigator.geolocation
            ) {

                alert(
                    "Geolocation is not supported by your browser."
                );

                return;
            }


            // =============================================
            // BUTTON LOADING
            // =============================================

            locationButton.disabled =
                true;


            locationButton.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                <span>Getting Location...</span>
            `;


            if (locationMessage) {

                locationMessage.textContent =
                    "Getting your current location...";

            }


            // =============================================
            // GET LOCATION
            // =============================================

            navigator.geolocation.getCurrentPosition(

                // =========================================
                // SUCCESS
                // =========================================

                (position) => {

                    const latitude =
                        position.coords.latitude;


                    const longitude =
                        position.coords.longitude;


                    console.log(
                        "Latitude:",
                        latitude
                    );


                    console.log(
                        "Longitude:",
                        longitude
                    );


                    // =====================================
                    // UPDATE GOOGLE MAP
                    // =====================================

                    mapFrame.src =
                        `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;


                    // =====================================
                    // UPDATE LOCATION TEXT
                    // =====================================

                    if (locationStatus) {

                        locationStatus.textContent =
                            "Current location detected";

                    }


                    if (locationCountry) {

                        locationCountry.textContent =
                            `Latitude: ${latitude.toFixed(6)} | Longitude: ${longitude.toFixed(6)}`;

                    }


                    if (locationMessage) {

                        locationMessage.textContent =
                            "Your current location is now displayed on the map.";

                    }


                    // =====================================
                    // BUTTON SUCCESS
                    // =====================================

                    locationButton.disabled =
                        false;


                    locationButton.innerHTML = `
                        <i class="fa-solid fa-location-dot"></i>
                        <span>Location Found</span>
                    `;

                },


                // =========================================
                // ERROR
                // =========================================

                (error) => {

                    console.error(
                        "Location Error:",
                        error
                    );


                    locationButton.disabled =
                        false;


                    locationButton.innerHTML = `
                        <i class="fa-solid fa-location-crosshairs"></i>
                        <span>Get My Location</span>
                    `;


                    if (locationMessage) {

                        locationMessage.textContent =
                            "Unable to get your current location.";

                    }


                    // =====================================
                    // ERROR MESSAGES
                    // =====================================

                    if (
                        error.code ===
                        error.PERMISSION_DENIED
                    ) {

                        alert(
                            "Location permission denied. Please allow location access."
                        );

                    }

                    else if (
                        error.code ===
                        error.POSITION_UNAVAILABLE
                    ) {

                        alert(
                            "Your location could not be determined."
                        );

                    }

                    else if (
                        error.code ===
                        error.TIMEOUT
                    ) {

                        alert(
                            "Location request timed out."
                        );

                    }

                    else {

                        alert(
                            "Unable to get your location."
                        );

                    }

                },


                // =========================================
                // LOCATION OPTIONS
                // =========================================

                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }

            );

        }
    );

});