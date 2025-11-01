// Enhanced background animations
function createFloatingElements() {
    const background = document.querySelector('.background-animation');
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.width = Math.random() * 100 + 50 + 'px';
        element.style.height = Math.random() * 100 + 50 + 'px';
        element.style.background = `radial-gradient(circle, rgba(99, 102, 241, ${Math.random() * 0.1}) 0%, transparent 70%)`;
        element.style.borderRadius = '50%';
        element.style.top = Math.random() * 100 + '%';
        element.style.left = Math.random() * 100 + '%';
        element.style.animation = `float ${Math.random() * 20 + 10}s ease-in-out infinite`;
        element.style.animationDelay = Math.random() * 5 + 's';
        background.appendChild(element);
    }
}

// Particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(99, 102, 241, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animation = `particleFloat ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 3 + 's';
        hero.appendChild(particle);
    }
}

// Add to your existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    createParticles();
    
    // Add current year to footer
    const yearElement = document.querySelector('.footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Muhammad Sarmad. All rights reserved.`;
    }
});

// Project Links Functions
function openProject(projectName) {
    const projectLinks = {
        'bz-mart': 'https://github.com/yourusername/bz-mart',
        'smart-parking': 'https://github.com/yourusername/smart-parking',
        'solar-website': 'https://github.com/yourusername/solar-website',
        'calculator': 'https://github.com/yourusername/calculator'
    };
    
    const link = projectLinks[projectName];
    if (link) {
        window.open(link, '_blank');
    } else {
        alert('Project link coming soon!');
    }
}

// Ya specific project functions
function openBZMart() {
    window.open('https://github.com/yourusername/bz-mart', '_blank');
}

function openSmartParking() {
    window.open('https://github.com/yourusername/smart-parking', '_blank');
}

// Add this CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0;
        }
        50% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
// Contact Form to Google Sheets
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.name.value,
        email: this.email.value,
        subject: this.subject.value,
        message: this.message.value
    };
    
    fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert('Message sent successfully!');
        this.reset();
    })
    .catch(error => {
        alert('Error sending message. Please try again.');
    });
});
// Google Apps Script URL - YAHAN APNA URL PASTE KAREN
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwB1sdFlXeIWCO_TqTt2zxFfkRnSpW-adYVGQrZp7CRfibxVmINxz7VjIcga4vJHBK4sg/exec';

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitText = document.getElementById('submitText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Loading state show karen
            submitText.style.display = 'none';
            loadingSpinner.style.display = 'inline-block';
            formMessage.textContent = '';
            formMessage.className = 'form-message';
            
            // Form data collect karen
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            try {
                // Google Apps Script ko data send karen
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.status === 'success') {
                    // Success message
                    formMessage.textContent = '✅ Message sent successfully! I will get back to you soon.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                } else {
                    throw new Error(result.message);
                }
                
            } catch (error) {
                // Error message
                formMessage.textContent = '❌ Error sending message. Please try again or contact me directly.';
                formMessage.className = 'form-message error';
                console.error('Form submission error:', error);
            } finally {
                // Loading state hide karen
                submitText.style.display = 'inline-block';
                loadingSpinner.style.display = 'none';
            }
        });
    }
});