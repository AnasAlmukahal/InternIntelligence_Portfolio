// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close navigation when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// API URLs
const API_URL = {
    projects: '/api/public/projects',
    skills: '/api/public/skills',
    achievements: '/api/public/achievements',
    contact: '/api/contact'
};

// Fetch and display projects
async function fetchProjects() {
    try {
        const response = await fetch(API_URL.projects);
        const projects = await response.json();
        
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = '';
        
        if (projects.length === 0) {
            projectsContainer.innerHTML = '<p class="no-data">No projects to display.</p>';
            return;
        }
        
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        document.getElementById('projects-container').innerHTML = 
            '<p class="error">Failed to load projects. Please try again later.</p>';
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Default image if none is provided
    const imageUrl = project.images && project.images.length > 0 
        ? project.images[0] 
        : '/api/placeholder/400/300';
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${imageUrl}" alt="${project.title}">
        </div>
        <div class="project-details">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank">Live Demo <i class="fas fa-external-link-alt"></i></a>` : ''}
                ${project.sourceCodeUrl ? `<a href="${project.sourceCodeUrl}" target="_blank">Source Code <i class="fab fa-github"></i></a>` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Fetch and display skills
async function fetchSkills() {
    try {
        const response = await fetch(API_URL.skills);
        const skills = await response.json();
        
        const programmingSkills = document.getElementById('programming-skills');
        const designSkills = document.getElementById('design-skills');
        const otherSkills = document.getElementById('other-skills');
        
        // Clear containers
        programmingSkills.innerHTML = '';
        designSkills.innerHTML = '';
        otherSkills.innerHTML = '';
        
        // Group skills by category
        skills.forEach(skill => {
            const skillElement = createSkillElement(skill);
            
            switch(skill.category) {
                case 'Programming':
                    programmingSkills.appendChild(skillElement);
                    break;
                case 'Design':
                    designSkills.appendChild(skillElement);
                    break;
                default:
                    otherSkills.appendChild(skillElement);
            }
        });
        
        // Display message if no skills in a category
        if (programmingSkills.children.length === 0) {
            programmingSkills.innerHTML = '<p class="no-data">No programming skills to display.</p>';
        }
        if (designSkills.children.length === 0) {
            designSkills.innerHTML = '<p class="no-data">No design skills to display.</p>';
        }
        if (otherSkills.children.length === 0) {
            otherSkills.innerHTML = '<p class="no-data">No other skills to display.</p>';
        }
    } catch (error) {
        console.error('Error fetching skills:', error);
        document.getElementById('programming-skills').innerHTML = 
            '<p class="error">Failed to load skills. Please try again later.</p>';
    }
}

function createSkillElement(skill) {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    
    // Create dots for proficiency level visualization
    let levelDots = '';
    for (let i = 1; i <= 5; i++) {
        levelDots += `<div class="dot ${i <= skill.proficiency ? 'filled' : ''}"></div>`;
    }
    
    skillItem.innerHTML = `
        <div class="skill-icon">
            ${skill.icon ? `<i class="${skill.icon}"></i>` : `<i class="fas fa-code"></i>`}
        </div>
        <div class="skill-name">${skill.name}</div>
        <div class="skill-level">
            ${levelDots}
        </div>
    `;
    
    return skillItem;
}

// Fetch and display achievements
async function fetchAchievements() {
    try {
        const response = await fetch(API_URL.achievements);
        const achievements = await response.json();
        
        const achievementsContainer = document.getElementById('achievements-container');
        achievementsContainer.innerHTML = '';
        
        if (achievements.length === 0) {
            achievementsContainer.innerHTML = '<p class="no-data">No achievements to display.</p>';
            return;
        }
        
        // Sort achievements by date (newest first)
        achievements.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        achievements.forEach(achievement => {
            const achievementElement = createAchievementElement(achievement);
            achievementsContainer.appendChild(achievementElement);
        });
    } catch (error) {
        console.error('Error fetching achievements:', error);
        document.getElementById('achievements-container').innerHTML = 
            '<p class="error">Failed to load achievements. Please try again later.</p>';
    }
}

function createAchievementElement(achievement) {
    const achievementItem = document.createElement('div');
    achievementItem.className = 'achievement-item';
    
    // Format date
    const date = new Date(achievement.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long'
    });
    
    achievementItem.innerHTML = `
        <div class="achievement-content">
            <div class="achievement-date">${formattedDate}</div>
            <h3 class="achievement-title">${achievement.title}</h3>
            <p class="achievement-description">${achievement.description}</p>
            ${achievement.issuer ? `<div class="achievement-issuer"><i class="fas fa-award"></i> ${achievement.issuer}</div>` : ''}
        </div>
    `;
    
    return achievementItem;
}

// Handle contact form submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    try {
        const response = await fetch(API_URL.contact, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            formStatus.textContent = 'Your message has been sent successfully!';
            formStatus.className = 'success';
            contactForm.reset();
        } else {
            const error = await response.json();
            formStatus.textContent = error.message || 'Failed to send message. Please try again.';
            formStatus.className = 'error';
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        formStatus.textContent = 'Network error. Please try again later.';
        formStatus.className = 'error';
    }
    
    // Clear status message after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
        formStatus.className = '';
    }, 5000);
});

// Add animation on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.project-card, .skill-item, .achievement-item');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize
window.addEventListener('load', () => {
    fetchProjects();
    fetchSkills();
    fetchAchievements();
    
    window.addEventListener('scroll', revealOnScroll);
});