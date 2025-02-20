document.addEventListener("DOMContentLoaded", function () {
    let menuToggle = document.querySelector(".menu-toggle");
    let navLinks = document.querySelector(".nav-links");

    // Toggle mobile menu
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
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
});
document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector(".contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        let formData = new FormData(form);

        fetch("https://formsubmit.co/YOUR_EMAIL", {
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
