document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.querySelector('.main-nav');

    mobileMenu.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Form submission alerts (for demonstration)
    const foodDonationForm = document.getElementById('food-donation-form');
    if (foodDonationForm) {
        foodDonationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your donation! We will contact you shortly for pickup.');
            foodDonationForm.reset();
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Your message has been sent. We will get back to you soon!');
            contactForm.reset();
        });
    }

    // Interactive button alerts (for NGOs/Volunteers section)
    document.querySelectorAll('.mark-picked-up').forEach(button => {
        button.addEventListener('click', () => {
            alert('Donation marked as "Picked Up"!');
        });
    });

    document.querySelectorAll('.mark-delivered').forEach(button => {
        button.addEventListener('click', () => {
            alert('Donation marked as "Delivered"!');
        });
    });

    // Set a random initial progress for the donation bar (for a dynamic feel)
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const initialProgress = Math.floor(Math.random() * 20) + 10; // A random number between 10 and 30
        progressBar.style.width = initialProgress + '%';
        const currentAmount = initialProgress * 1000;
        document.querySelector('.progress-bar-label span:first-child').textContent = `₹${currentAmount.toLocaleString()} Raised`;
    }
});
