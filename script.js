// Labs Data - Add new labs here by adding a new object to this array
const labsData = [
    {
        id: 1,
        title: "Introduction to Web Engineering",
        description: "Introduction to HTML structure, elements, and basic web page creation.",
        tasks: 3,
        difficulty: "Beginner",
        color: "#4361ee",
        folder: "01"
    },
    {
        id: 2,
        title: "CSS Styling & Forms",
        description: "Working with HTML5 and the element tags.",
        tasks: 3,
        difficulty: "Beginner",
        color: "#4cc9f0",
        folder: "02"
    },
    {
        id: 3,
        title: "CSS Styling & Forms",
        description: "Design the web page using CSS and use DaisyUI components.",
        tasks: 4,
        difficulty: "Beginner",
        color: "#dd4cf0",
        folder: "03"
    },
    {
        id: 4,
        title: "Media Queries and Responsive Design",
        description: "Learn how to make web pages responsive using CSS media queries.",
        tasks: 4,
        difficulty: "Beginner",
        color: "#f72585",
        folder: "04"
    },
    {
        id: 5,
        title: "OpenEnded Lab 1",
        description: "UI/UX in Typography",
        tasks: 3,
        difficulty: "Beginner",
        color: "#f79c25",
        folder: "05"
    },
    {
        id: 6,
        title: "Introduction to React with Vite",
        description: "Getting started with React components, props and jsx",
        tasks: 3,
        difficulty: "Intermediate",
        color: "#25f77d",
        folder: "06"
    },
    {
        id: 7,
        title: "React Props Stats and Callback functions",
        description: "Understanding Props, State, and Callback Functions in React",
        tasks: 5,
        difficulty: "Intermediate",
        color: "#25f7c3",
        folder: "07"
    },
    {
        id: 8,
        title: "Conditional Rendering and Component Lifecycle",
        description: "Demonstrating Conditional Rendering and Component Lifecycle in React",
        tasks: 4,
        difficulty: "Intermediate",
        color: "#95f725",
        folder: "08"
    },
    {
        id: 9,
        title: "React Routing and Form Handling",
        description: "Implementing Routing and Form Handling in React using React Router",
        tasks: 1,
        difficulty: "Intermediate",
        color: "#bc25f7",
        folder: "09"
    }
    
    // Add new labs here in the future:
    // {
    //     id: 3,
    //     title: "JavaScript Basics",
    //     description: "Introduction to JavaScript programming concepts.",
    //     tasks: 4,
    //     difficulty: "Intermediate",
    //     color: "#9c27b0",
    //     folder: "03"
    // },
];

// DOM Elements
const labsContainer = document.getElementById('labs-container');
const labCount = document.getElementById('lab-count');
const taskCount = document.getElementById('task-count');
const currentDate = document.getElementById('current-date');
const exploreBtn = document.getElementById('explore-btn');
const githubBtn = document.getElementById('github-btn');
const addLabLink = document.getElementById('add-lab-link');
const addLabModal = document.getElementById('add-lab-modal');
const closeModal = document.getElementById('close-modal');

// Calculate total tasks
function calculateTotalTasks() {
    return labsData.reduce((total, lab) => total + lab.tasks, 0);
}

// Format date
function formatDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
}

// Create lab card HTML
function createLabCard(lab) {
    return `
        <div class="lab-card" style="--card-color: ${lab.color}">
            <div class="lab-header">
                <span class="lab-number">Lab ${String(lab.id).padStart(2, '0')}</span>
                <span class="lab-difficulty difficulty-${lab.difficulty.toLowerCase()}">${lab.difficulty}</span>
            </div>
            <h3>${lab.title}</h3>
            <p>${lab.description}</p>
            
            <div class="lab-meta">
                <div class="lab-meta-item">
                    <i class="fas fa-tasks"></i>
                    <span>${lab.tasks} ${lab.tasks === 1 ? 'Task' : 'Tasks'}</span>
                </div>
                <div class="lab-meta-item">
                    <i class="fas fa-folder"></i>
                    <span>${lab.folder}/code/</span>
                </div>
            </div>
            
            <div class="lab-actions">
                <a href="${lab.folder}/code/index.html" class="lab-btn lab-btn-primary">
                    <i class="fas fa-external-link-alt"></i> Open Lab
                </a>
                <a href="${lab.folder}/" class="lab-btn lab-btn-secondary">
                    <i class="fas fa-folder-open"></i> View Files
                </a>
            </div>
        </div>
    `;
}

// Render all labs
function renderLabs() {
    labsContainer.innerHTML = '';
    labsData.forEach(lab => {
        labsContainer.innerHTML += createLabCard(lab);
    });
    
    // Update stats
    labCount.textContent = String(labsData.length).padStart(2, '0');
    taskCount.textContent = String(calculateTotalTasks()).padStart(2, '0');
}

// Initialize the page
function init() {
    // Render labs
    renderLabs();
    
    // Set current date
    currentDate.textContent = formatDate();
    
    // Set up button event listeners
    exploreBtn.addEventListener('click', () => {
        document.getElementById('labs-container').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
    
    githubBtn.addEventListener('click', () => {
        // Update with your actual GitHub URL
        window.open('https://github.com/CharlieFour/Web-Engineering-Lab', '_blank');
    });
    
    // Modal functionality
    addLabLink.addEventListener('click', (e) => {
        e.preventDefault();
        addLabModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', () => {
        addLabModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    addLabModal.addEventListener('click', (e) => {
        if (e.target === addLabModal) {
            addLabModal.style.display = 'none';
        }
    });
    
    // Add keyboard support for modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && addLabModal.style.display === 'flex') {
            addLabModal.style.display = 'none';
        }
    });
    
    // Add animation to lab cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply animation to lab cards after they're rendered
    setTimeout(() => {
        const labCards = document.querySelectorAll('.lab-card');
        labCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }, 100);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);