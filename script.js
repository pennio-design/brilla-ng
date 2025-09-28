document.addEventListener("DOMContentLoaded", function () {
    let menuToggle = document.querySelector(".menu-toggle");
    let navLinks = document.querySelector(".nav-links");
    let menuIcon = menuToggle.querySelector("i");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");

            if (menuIcon.classList.contains("fa-bars")) {
                menuIcon.classList.replace("fa-bars", "fa-times");
            } else {
                menuIcon.classList.replace("fa-times", "fa-bars");
            }
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
                menuIcon.classList.replace("fa-times", "fa-bars");
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            // Only prevent default and scroll if it's an internal anchor link
            if (href.length > 1 && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - (document.querySelector('header')?.offsetHeight || 0), // Adjust for fixed header height
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    let testimonials = document.querySelectorAll(".testimonial");
    let index = 0;

    function showTestimonial() {
        if (testimonials.length === 0) return; // Prevent error if no testimonials
        testimonials.forEach(t => t.style.display = "none");
        testimonials[index].style.display = "block";
        index = (index + 1) % testimonials.length;
    }

    if (testimonials.length > 0) {
        setInterval(showTestimonial, 5000);
        showTestimonial();
    }


    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const loadingMessage = document.getElementById("loading-message");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            submitBtn.disabled = true;
            if (loadingMessage) {
                loadingMessage.style.display = "block";
                loadingMessage.textContent = "Sending...";
            }

            let formData = new FormData(contactForm);

            fetch("https://formsubmit.co/845520e20f2df2c9a137a0f66d27f7bb", {
                method: "POST",
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return Promise.reject("Form submission failed");
                }
            })
            .then(() => {
                if (loadingMessage) {
                    loadingMessage.textContent = "Message sent successfully!";
                }
                contactForm.reset();
                submitBtn.disabled = false;
                setTimeout(() => { if (loadingMessage) loadingMessage.style.display = "none"; }, 3000);
            })
            .catch(() => {
                if (loadingMessage) {
                    loadingMessage.textContent = "Something went wrong. Please try again.";
                }
                submitBtn.disabled = false;
            });
        });
    }
});