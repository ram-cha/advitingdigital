// ==========================================================================
// Preloader
// ==========================================================================
const initPreloader = () => {
    const preloader = document.querySelector('.preloader');
    if (!preloader) {
        console.warn('Preloader element not found.');
        return;
    }

    // Wait for assets and minimum display time
    const waitForAssets = () => {
        return new Promise((resolve) => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve, { once: true });
            }
        });
    };

    // Hide preloader with clean exit
    const hidePreloader = () => {
        // Fade out with scale effect
        preloader.style.opacity = '0';
        preloader.style.transform = 'scale(0.95)';
        setTimeout(() => {
            preloader.remove();
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 1000,
                    once: true,
                    mirror: false,
                    easing: 'ease-out'
                });
            }
        }, 600);
    };

    // Minimum 2.5s display for enhanced animation
    Promise.all([
        waitForAssets(),
        new Promise(resolve => setTimeout(resolve, 2500))
    ])
        .then(hidePreloader)
        .catch(error => {
            console.error('Preloader Error:', error);
            hidePreloader();
        });
};

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initPreloader);


// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursorFollower.style.left = `${e.clientX - 10}px`;
    cursorFollower.style.top = `${e.clientY - 10}px`;
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});


// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('active', window.scrollY > 300);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Work Section - Demo Content and Filtering
const workGrid = document.querySelector('.work-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

const workItems = [
    { category: 'web', title: 'E-commerce Platform', desc: 'Web', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNMyANMzJLFlGGeKk5_ej44LQlsM1LAp1Qg&s.jpg' },
    { category: 'app', title: 'Fitness App', desc: 'App', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvjzpA5ib4crnoZta6J32MEHbNHaX4mk2W8w&s.jpg' },
    { category: 'branding', title: 'Brand Identity', desc: 'Branding', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-pxTnH-MKIBoIvDIP1eTIN3OcCmU8Khxw7Q&s' },
    { category: 'app', title: 'E-commerce Platform', desc: 'App', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNMyANMzJLFlGGeKk5_ej44LQlsM1LAp1Qg&s.jpg' },
    { category: 'web', title: 'E-commerce Platform', desc: 'Web', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNMyANMzJLFlGGeKk5_ej44LQlsM1LAp1Qg&s.jpg' },
    { category: 'branding', title: 'Portfolio Site', desc: 'Branding', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCafg2kYPj1RArBOP4szvt6QQHXg-Kot7aw&s' },
];

function renderWorkItems(filter = 'all') {
    workGrid.innerHTML = '';
    workItems.forEach((item, index) => {
        if (filter === 'all' || item.category === filter) {
            const workItem = document.createElement('div');
            workItem.classList.add('work-item');
            workItem.setAttribute('data-aos', 'fade-up');
            workItem.setAttribute('data-aos-delay', index * 100);
            workItem.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="work-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
            workGrid.appendChild(workItem);
        }
    });
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderWorkItems(btn.dataset.filter);
    });
});

// Testimonials Slider - Demo Content
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const controlsContainer = document.querySelector('.carousel-controls');
    let currentSlide = 0;

    // Create control buttons
    slides.forEach((_, index) => {
        const btn = document.createElement('div');
        btn.classList.add('control-btn');
        if (index === 0) btn.classList.add('active');
        btn.addEventListener('click', () => goToSlide(index));
        controlsContainer.appendChild(btn);
    });

    const controlButtons = document.querySelectorAll('.control-btn');

    // Show slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        controlButtons.forEach(btn => btn.classList.remove('active'));
        slides[index].classList.add('active');
        controlButtons[index].classList.add('active');
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    // Auto slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Initial setup
    showSlide(currentSlide);
    setInterval(nextSlide, 5000); // Auto-rotate every 5 seconds

    // Pause on hover
    const carousel = document.querySelector('.testimonial-carousel');
    let interval = setInterval(nextSlide, 5000);

    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', () => interval = setInterval(nextSlide, 5000));
});

// Contact Form Submission (Demo)
// document.getElementById('contactForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     alert('Thank you for your message! We’ll get back to you soon.');
//     e.target.reset();
// });


// Form submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.querySelector('.submit-btn');
const btnText = submitBtn.querySelector('.btn-text');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.style.transform = 'scale(0.9)';
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
        submitBtn.style.transform = 'scale(1)';
        submitBtn.textContent = 'Message Sent!!!';
        submitBtn.style.background = 'linear-gradient(45deg, #34c759, #a3e635)';
        contactForm.reset();
        
        
    setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            submitBtn.style.background = 'linear-gradient(45deg, #00ddeb, #7dd3fc)';
        }, 2000);
    }, 500);
});


// AOS Initialization
AOS.init({ duration: 1000, once: true });

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderWorkItems();
});


// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax-bg');
    let scrollPosition = window.scrollY;
    parallax.style.transform = `translateY(${scrollPosition * 0.4}px)`;
});



// Particle effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 4 + 4}s`;
        
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

// Accordion functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(i => {
            if (i !== item) {
                i.classList.remove('active');
            }
        });

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

// Glow effect on hover with mouse tracking
faqItems.forEach(item => {
    const glow = item.querySelector('.faq-glow');
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
});


// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navBackdrop = document.querySelector('.nav-backdrop');
const dropdowns = document.querySelectorAll('.dropdown');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
});

navBackdrop.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
});

// Handle dropdowns on mobile
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        }
    });
});

// about section script 
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.dm-button');
    const contentArea = document.getElementById('dm-content');
    const imageArea = document.getElementById('dm-image');

    // Set CSS custom property for entrance animation delay
    buttons.forEach((button, index) => {
        button.style.setProperty('--button-index', index);
    });

    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Trigger content transition
            contentArea.style.opacity = '0';
            contentArea.style.transform = 'translateY(20px)';
            imageArea.style.opacity = '0';
            imageArea.style.transform = 'translateY(20px)';

            setTimeout(() => {
                // Update content based on button clicked
                updateContent(button.id);
                
                // Animate content entrance
                contentArea.style.transition = 'all 0.5s ease-out';
                imageArea.style.transition = 'all 0.5s ease-out';
                contentArea.style.opacity = '1';
                contentArea.style.transform = 'translateY(0)';
                imageArea.style.opacity = '1';
                imageArea.style.transform = 'translateY(0)';
            }, 300);
        });

        // Add hover effect for accessibility
        button.addEventListener('mouseenter', () => {
            if (!button.classList.contains('active')) {
                button.style.background = 'rgba(0, 196, 255, 0.15)';
            }
        });

        button.addEventListener('mouseleave', () => {
            if (!button.classList.contains('active')) {
                button.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });

    // Content update function
    function updateContent(buttonId) {
        if (buttonId === 'story-btn') {
            contentArea.innerHTML = `
                <h1>Our Story</h1>
                <p class="dm-subheading">The Journey of [Your Agency Name]</p>
                <p class="dm-text">
                    [Your Agency Name] was founded in 2015 with a passion for transforming businesses through innovative digital marketing. Starting as a small team of enthusiasts, we’ve grown into a leading agency, helping brands connect with their audiences through creative strategies, data-driven insights, and cutting-edge technology. Our journey is one of growth, learning, and delivering measurable success for our clients.
                </p>
                <a href="#" class="dm-cta">Learn More ></a>
            `;
            imageArea.innerHTML = `
                <img src="storyimagenew.png" alt="Our Story Image" class="dm-main-image">
            `;
        } else if (buttonId === 'vision-btn') {
            contentArea.innerHTML = `
                <h1>Our Vision</h1>
                <p class="dm-subheading">Shaping the Future of Digital Marketing</p>
                <p class="dm-text">
                    At [Your Agency Name], our vision is to lead the digital marketing industry by creating innovative, impactful, and sustainable strategies that empower businesses to thrive in a competitive digital world. We aim to be the trusted partner for brands seeking growth, engagement, and transformation through technology and creativity.
                </p>
                <a href="#" class="dm-cta">Learn More ></a>
            `;
            imageArea.innerHTML = `
                <img src="visionimage.png" alt="Our Vision Image" class="dm-main-image">
            `;
        } else if (buttonId === 'mission-btn') {
            contentArea.innerHTML = `
                <h1>Our Mission</h1>
                <p class="dm-subheading">Delivering Excellence in Digital Marketing</p>
                <p class="dm-text">
                    Our mission at [Your Agency Name] is to provide world-class digital marketing solutions that drive results for our clients. We are committed to innovation, transparency, and client success, using data, technology, and creativity to build strategies that resonate with audiences and achieve business goals.
                </p>
                <a href="#" class="dm-cta">Learn More ></a>
            `;
            imageArea.innerHTML = `
                <img src="missionimage.png" alt="Our Mission Image" class="dm-main-image">
            `;
        } else if (buttonId === 'values-btn') {
            contentArea.innerHTML = `
                <h1>Our Values</h1>
                <p class="dm-subheading">The Pillars of [Your Agency Name]</p>
                <p class="dm-text">
                    At [Your Agency Name], our values define who we are: Integrity, Innovation, Collaboration, and Excellence. We believe in building trust with our clients, pushing the boundaries of creativity, working together as a team, and delivering outstanding results that exceed expectations in the digital marketing space.
                </p>
                <a href="#" class="dm-cta">Learn More ></a>
            `;
            imageArea.innerHTML = `
                <img src="valueimage.png" alt="Our Values Image" class="dm-main-image">
            `;
        }
    }

    // Initial load (set "Story" as active)
    document.getElementById('story-btn').click();
});


// Social media icons array
const socialIcons = [
    { class: 'fab fa-facebook-f', color: '#1877f2' },
    { class: 'fab fa-twitter', color: '#1da1f2' },
    { class: 'fab fa-instagram', color: '#e1306c' },
    { class: 'fab fa-linkedin-in', color: '#0077b5' },
    { class: 'fab fa-youtube', color: '#ff0000' }
];

const container = document.getElementById('socialIcons');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createSocialIcon() {
    const icon = document.createElement('div');
    icon.classList.add('social-icon');
    
    // Random social icon from array
    const randomIcon = socialIcons[Math.floor(Math.random() * socialIcons.length)];
    icon.innerHTML = `<i class="${randomIcon.class}"></i>`;
    icon.style.background = `radial-gradient(circle, ${randomIcon.color}30, transparent)`;

    // Random starting position around the center
    const startX = getRandomInt(-250, 250);
    const startY = getRandomInt(-250, 250);
    const endX = getRandomInt(-250, 250);
    const endY = getRandomInt(-250, 250);

    icon.style.left = `calc(50% + ${startX}px)`;
    icon.style.top = `calc(50% + ${startY}px)`;
    icon.style.setProperty('--x-end', `${endX}px`);
    icon.style.setProperty('--y-end', `${endY}px`);
    icon.style.animationDelay = `${Math.random() * 3}s`;

    container.appendChild(icon);

    // Remove icon after animation completes
    setTimeout(() => {
        icon.remove();
    }, 10000); // Matches the randomFlow animation duration
}

// Create new icon every 600ms
setInterval(createSocialIcon, 600);

// Add Font Awesome CDN
const fontAwesome = document.createElement('script');
fontAwesome.src = 'https://kit.fontawesome.com/a076d05399.js';
document.head.appendChild(fontAwesome);







// About section 

 // Data
 const teamMembers = [
    { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1573496359142-b8d877c828cf", bio: "Visionary leader with 15+ years in digital marketing" },
    { name: "Mike Chen", role: "Creative Director", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7", bio: "Award-winning designer and brand strategist" },
    { name: "Emma Rodriguez", role: "Digital Strategist", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956", bio: "Data-driven marketing expert" }
];

const timelineEvents = [
    { year: "2015", event: "DigitalPulse Marketing founded in New York" },
    { year: "2018", event: "Expanded operations to Europe and Asia" },
    { year: "2022", event: "Won 'Best Digital Agency' award" },
    { year: "2025", event: "Celebrating a decade of excellence" }
];

const testimonials = [
    { name: "John Doe", text: "DigitalPulse tripled our online revenue in just 6 months!", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
    { name: "Jane Smith", text: "Their creative approach transformed our brand identity.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
    { name: "Alex Carter", text: "Unmatched expertise in SEO and content marketing.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a" }
];

// Team Cards
function createTeamCards() {
    const teamGrid = document.getElementById('team-grid');
    teamMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <div class="team-info">
                <h3>${member.name}</h3>
                <p style="color: var(--primary)">${member.role}</p>
                <p>${member.bio}</p>
            </div>
        `;
        teamGrid.appendChild(card);
    });
}

// Timeline
function createTimeline() {
    const timeline = document.getElementById('timeline');
    timelineEvents.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content" style="animation-delay: ${index * 0.2}s">
                <h3>${item.year}</h3>
                <p>${item.event}</p>
            </div>
            <div class="timeline-dot"></div>
        `;
        timeline.appendChild(timelineItem);
    });
}

  // Scroll Animations
  function handleScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section > *').forEach(el => observer.observe(el));
}





// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createTeamCards();
    createTimeline();
    createTestimonials();
    handleScrollAnimations();
    handleForm();
    handleParallax();
});



