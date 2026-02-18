// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    const isExpanded = !mobileMenu.classList.contains('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            mobileMenu.classList.add('hidden');
        }
    });
});


// Auto-scroll Testimonials
let testimonialIndex = 0;
let testimonialInterval = null;

function initTestimonials() {
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    const testimonialSlides = document.querySelectorAll('#testimonialsContainer > div');
    const testimonialIndicators = document.querySelectorAll('.testimonial-indicator');

    if (!testimonialsContainer || testimonialSlides.length === 0) {
        return;
    }

    function updateTestimonials() {
        const translateX = -testimonialIndex * 100;
        testimonialsContainer.style.transform = `translateX(${translateX}%)`;
        
        //  indicators
        testimonialIndicators.forEach((indicator, index) => {
            if (index === testimonialIndex) {
                indicator.classList.remove('bg-gray-300', 'hover:bg-gray-400');
                indicator.classList.add('bg-cyan-600');
            } else {
                indicator.classList.remove('bg-cyan-600');
                indicator.classList.add('bg-gray-300', 'hover:bg-gray-400');
            }
        });
    }

    
    testimonialIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            testimonialIndex = index;
            updateTestimonials();
            
            // Reset auto-scroll timer
            if (testimonialInterval) {
                clearInterval(testimonialInterval);
            }
            testimonialInterval = setInterval(() => {
                testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
                updateTestimonials();
            }, 6000);
        });
    });

    // Auto-scroll every 6 seconds
    if (testimonialSlides.length > 0) {
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
        }
        testimonialInterval = setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
            updateTestimonials();
        }, 6000);
    }
}

// Initialize testimonials when DOM is ready
document.addEventListener('DOMContentLoaded', initTestimonials);

// Auto-scroll Featured Properties (carousel similar to testimonials)
let propertyIndex = 0;
let propertyInterval = null;

function initProperties() {
    const propertiesContainer = document.getElementById('propertiesContainer');
    const propertySlides = document.querySelectorAll('#propertiesContainer > div');
    const propertyIndicators = document.querySelectorAll('.property-indicator');

    if (!propertiesContainer || propertySlides.length === 0) {
        return;
    }

    function updateProperties() {
        const translateX = -propertyIndex * 100;
        propertiesContainer.style.transform = `translateX(${translateX}%)`;

        // Update indicators
        propertyIndicators.forEach((indicator, index) => {
            if (index === propertyIndex) {
                indicator.classList.remove('bg-gray-300', 'hover:bg-gray-400');
                indicator.classList.add('bg-cyan-600');
            } else {
                indicator.classList.remove('bg-cyan-600');
                indicator.classList.add('bg-gray-300', 'hover:bg-gray-400');
            }
        });
    }

    // Add click handlers to indicators
    propertyIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            propertyIndex = index;
            updateProperties();

            // Reset auto-scroll timer
            if (propertyInterval) {
                clearInterval(propertyInterval);
            }
            propertyInterval = setInterval(() => {
                propertyIndex = (propertyIndex + 1) % propertySlides.length;
                updateProperties();
            }, 6000);
        });
    });

    // Auto-scroll every 6 seconds
    if (propertySlides.length > 0) {
        if (propertyInterval) {
            clearInterval(propertyInterval);
        }
        propertyInterval = setInterval(() => {
            propertyIndex = (propertyIndex + 1) % propertySlides.length;
            updateProperties();
        }, 6000);
    }
}

// Initialize properties carousel when DOM is ready
document.addEventListener('DOMContentLoaded', initProperties);

// Header Scroll Effect
(function() {
    const header = document.querySelector('header');
    if (!header) return;

   
    header.style.willChange = 'transform';
    header.style.transition = 'transform 300ms ease';

    let lastScroll = window.pageYOffset || document.documentElement.scrollTop;
    let ticking = false;

    window.addEventListener('scroll', () => {
        const current = window.pageYOffset || document.documentElement.scrollTop;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // shadow toggle (same visual cue as before)
                if (current > 50) {
                    header.classList.add('shadow-md');
                } else {
                    header.classList.remove('shadow-md');
                }

                // hide on scroll down, show on scroll up
                // keep header visible near top
                if (current > lastScroll && current > 100) {
                    // scrolling down
                    header.style.transform = 'translateY(-110%)';
                } else {
                    // scrolling up or near top
                    header.style.transform = 'translateY(0)';
                }

                lastScroll = current <= 0 ? 0 : current;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (!scrollToTopBtn && typeof document !== 'undefined') {
    const btn = document.createElement('button');
    btn.id = 'scrollToTopBtn';
    btn.className = 'scroll-to-top';
    btn.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.setAttribute('title', 'Back to top');
    document.body.appendChild(btn);
}

window.addEventListener('scroll', () => {
    const btn = document.getElementById('scrollToTopBtn');
    if (btn) {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    }
});

const scrollBtn = document.getElementById('scrollToTopBtn');
if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ======= EMAILJS CONTACT FORM INTEGRATION =======

// Initialize EmailJS when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your Public Key
    // Get your Public Key from: https://dashboard.emailjs.com/admin/integration
    // Replace "YOUR_PUBLIC_KEY" with your actual EmailJS Public Key
    emailjs.init("80Zy2LkLQ835VX806");
    
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const messageDiv = document.getElementById('contactMessage');
    
    if (contactForm && messageDiv) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const form = this;
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            submitButton.classList.add('opacity-75', 'cursor-not-allowed');
            
            // Hide previous messages
            messageDiv.classList.add('hidden');
            
            // Get form data
            const formData = {
                from_name: document.getElementById('fullName').value.trim(),
                from_email: document.getElementById('email').value.trim(),
                mobile_number: document.getElementById('mobileNumber').value.trim(),
                message: document.getElementById('message').value.trim(),
                to_email: document.getElementById('email').value.trim(), // User's email (for reply-to)
                reply_to: document.getElementById('email').value.trim() // Reply-to address
            };
            
            // Validate form data (require mobile number as well)
            if (!formData.from_name || !formData.from_email || !formData.mobile_number || !formData.message) {
                messageDiv.className = 'mb-4 p-4 rounded-xl text-sm sm:text-base font-medium bg-red-100 text-red-800 border-2 border-red-300';
                messageDiv.textContent = 'Please fill in all required fields.';
                messageDiv.classList.remove('hidden');
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
                return;
            }
            
            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs from EmailJS dashboard
            emailjs.send('service_g1yokdc', 'template_87gmk9x', formData)
                .then(function(response) {
                    // Success
                    messageDiv.className = 'mb-4 p-4 rounded-xl text-sm sm:text-base font-medium bg-green-100 text-green-800 border-2 border-green-300';
                    messageDiv.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                    messageDiv.classList.remove('hidden');
                    
                    // Reset form
                    form.reset();
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
                    
                    // Scroll to message
                    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        messageDiv.classList.add('hidden');
                    }, 5000);
                }, function(error) {
                    // Error
                    messageDiv.className = 'mb-4 p-4 rounded-xl text-sm sm:text-base font-medium bg-red-100 text-red-800 border-2 border-red-300';
                    messageDiv.textContent = 'Failed to send message. Please try again later or contact us directly.';
                    messageDiv.classList.remove('hidden');
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
                    
                    // Scroll to message
                    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    console.error('EmailJS Error:', error);
                });
        });
    }
});


// ================= PROPERTIES SECTION LOAD (ADD ONLY THIS) =================
fetch('components/properties.html')
    .then(res => res.text())
    .then(html => {
        const ventures = document.getElementById('ventures');
        if (!ventures) return;

        ventures.innerHTML = html;
        initPropertiesAutoScroll(); // IMPORTANT
    });

function initPropertiesAutoScroll() {
    const container = document.getElementById('propertiesContainer');
    if (!container) return;

    const slides = container.children;
    const indicators = document.querySelectorAll('.property-indicator');

    let index = 0;
    let intervalId;

    function updateSlide() {
        container.style.transform = `translateX(-${index * 100}%)`;

        indicators.forEach((dot, i) => {
            dot.classList.toggle('bg-cyan-600', i === index);
            dot.classList.toggle('bg-gray-300', i !== index);
        });
    }

    indicators.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            index = i;
            updateSlide();
            resetInterval();
        });
    });

    function resetInterval() {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, 4000);
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        updateSlide();
    }

    updateSlide();
    resetInterval();
}
