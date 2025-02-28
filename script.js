document.addEventListener("DOMContentLoaded", function () {
    let menuToggle = document.querySelector(".menu-toggle");
    let navLinks = document.querySelector(".nav-links");
    let menuIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");

        // Toggle between hamburger and "X" icon
        if (menuIcon.classList.contains("fa-bars")) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-times");
        } else {
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
        }
    });

    // Collapse the hamburger menu when any nav link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            // Reset the icon back to hamburger
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Testimonial Slider
    let testimonials = document.querySelectorAll(".testimonial");
    let index = 0;

    function showTestimonial() {
        testimonials.forEach(t => t.style.display = "none");
        testimonials[index].style.display = "block";
        index = (index + 1) % testimonials.length;
    }

    setInterval(showTestimonial, 5000);
    showTestimonial();

    // Form Submission Handling
    let form = document.querySelector(".contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        let formData = new FormData(form);

        fetch("https://formsubmit.co/brilla.co.ng@gmail.com", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert("Message sent successfully!");
                form.reset();
            } else {
                alert("Something went wrong. Try again.");
            }
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const loadingMessage = document.getElementById("loading-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        submitBtn.disabled = true;
        loadingMessage.style.display = "block";
        loadingMessage.textContent = "Sending...";

        let formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
        })
        .then(response => response.ok ? response.text() : Promise.reject("Form submission failed"))
        .then(() => {
            loadingMessage.textContent = "Message sent successfully!";
            form.reset(); // Clear the form
            submitBtn.disabled = false;
            setTimeout(() => { loadingMessage.style.display = "none"; }, 3000);
        })
        .catch(() => {
            loadingMessage.textContent = "Something went wrong. Please try again.";
            submitBtn.disabled = false;
        });
    });
});
