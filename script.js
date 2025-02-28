document.addEventListener("DOMContentLoaded", function () {
    let menuToggle = document.querySelector(".menu-toggle");
    let navLinks = document.querySelector(".nav-links");
    let menuIcon = menuToggle.querySelector("i");

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

    let testimonials = document.querySelectorAll(".testimonial");
    let index = 0;

    function showTestimonial() {
        testimonials.forEach(t => t.style.display = "none");
        testimonials[index].style.display = "block";
        index = (index + 1) % testimonials.length;
    }

    setInterval(showTestimonial, 5000);
    showTestimonial();

    let form = document.querySelector(".contact-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let formData = new FormData(form);

            fetch("https://formsubmit.co/845520e20f2df2c9a137a0f66d27f7bb", {
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
    }

    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const loadingMessage = document.getElementById("loading-message");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            submitBtn.disabled = true;
            loadingMessage.style.display = "block";
            loadingMessage.textContent = "Sending...";

            let formData = new FormData(contactForm);

            fetch("https://formsubmit.co/845520e20f2df2c9a137a0f66d27f7bb", {
                method: "POST",
                body: formData,
            })
            .then(response => response.ok ? response.text() : Promise.reject("Form submission failed"))
            .then(() => {
                loadingMessage.textContent = "Message sent successfully!";
                contactForm.reset();
                submitBtn.disabled = false;
                setTimeout(() => { loadingMessage.style.display = "none"; }, 3000);
            })
            .catch(() => {
                loadingMessage.textContent = "Something went wrong. Please try again.";
                submitBtn.disabled = false;
            });
        });
    }
});
