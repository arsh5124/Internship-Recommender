// AI-Based Internship Recommendation Engine JavaScript

// Application Data
const appData = {
  "students": [
    {
      "student_id": "STU001",
      "name": "Arjun Sharma", 
      "domain": "Computer Science",
      "university": "IIT Delhi",
      "cgpa": 9.16,
      "experience_level": "Intermediate",
      "skills": ["Python", "Machine Learning", "Django", "React", "SQL", "Git"],
      "preferred_location": "Bangalore"
    },
    {
      "student_id": "STU002", 
      "name": "Priya Patel",
      "domain": "Data Science",
      "university": "IIT Bombay", 
      "cgpa": 8.95,
      "experience_level": "Advanced",
      "skills": ["Python", "TensorFlow", "Data Analysis", "Statistics", "R", "Tableau"],
      "preferred_location": "Mumbai"
    },
    {
      "student_id": "STU003",
      "name": "Rohit Kumar",
      "domain": "Information Technology", 
      "university": "NIT Trichy",
      "cgpa": 8.42,
      "experience_level": "Beginner",
      "skills": ["Java", "Spring Boot", "MySQL", "HTML", "CSS", "JavaScript"],
      "preferred_location": "Chennai"
    },
    {
      "student_id": "STU004",
      "name": "Sneha Reddy",
      "domain": "AI/ML",
      "university": "BITS Pilani",
      "cgpa": 9.01, 
      "experience_level": "Advanced",
      "skills": ["Python", "Deep Learning", "PyTorch", "OpenCV", "NLP", "Docker"],
      "preferred_location": "Hyderabad"
    },
    {
      "student_id": "STU005",
      "name": "Vikram Singh",
      "domain": "Electronics", 
      "university": "VIT Vellore",
      "cgpa": 7.88,
      "experience_level": "Intermediate",
      "skills": ["C++", "Embedded Systems", "Arduino", "Python", "MATLAB", "PCB Design"],
      "preferred_location": "Pune"
    }
  ],
  "internships": [
    {
      "internship_id": "INT001",
      "title": "ML Engineer Intern",
      "company": "TechVista AI",
      "description": "Work on cutting-edge machine learning projects, develop predictive models, and contribute to AI research initiatives.",
      "required_skills": ["Python", "Machine Learning", "TensorFlow", "Statistics"],
      "preferred_skills": ["Deep Learning", "PyTorch", "Data Visualization"],
      "location": "Bangalore", 
      "duration": "6 months",
      "stipend": 25000,
      "min_cgpa": 8.0,
      "domain": "AI/ML"
    },
    {
      "internship_id": "INT002", 
      "title": "Full Stack Developer",
      "company": "WebCraft Solutions",
      "description": "Build responsive web applications using modern frameworks, work with databases, and develop RESTful APIs.",
      "required_skills": ["JavaScript", "React", "Node.js", "MongoDB"],
      "preferred_skills": ["TypeScript", "AWS", "Docker"],
      "location": "Mumbai",
      "duration": "4 months", 
      "stipend": 20000,
      "min_cgpa": 7.5,
      "domain": "Computer Science"
    },
    {
      "internship_id": "INT003",
      "title": "Data Science Intern", 
      "company": "Analytics Pro",
      "description": "Analyze large datasets, create data visualizations, and build predictive models for business insights.",
      "required_skills": ["Python", "Data Analysis", "SQL", "Statistics"],
      "preferred_skills": ["R", "Tableau", "Power BI"],
      "location": "Delhi",
      "duration": "3 months",
      "stipend": 18000, 
      "min_cgpa": 7.0,
      "domain": "Data Science"
    },
    {
      "internship_id": "INT004",
      "title": "Backend Developer", 
      "company": "CloudTech Inc",
      "description": "Develop scalable backend services, work with microservices architecture, and optimize database performance.",
      "required_skills": ["Java", "Spring Boot", "MySQL", "REST APIs"],
      "preferred_skills": ["Microservices", "Redis", "Kubernetes"], 
      "location": "Pune",
      "duration": "5 months",
      "stipend": 22000,
      "min_cgpa": 7.5,
      "domain": "Computer Science"
    },
    {
      "internship_id": "INT005",
      "title": "AI Research Intern",
      "company": "DeepMind Labs", 
      "description": "Conduct research in artificial intelligence, work on neural networks, and publish research papers.",
      "required_skills": ["Python", "Deep Learning", "Research", "Mathematics"],
      "preferred_skills": ["PyTorch", "TensorFlow", "NLP"],
      "location": "Bangalore",
      "duration": "6 months",
      "stipend": 30000,
      "min_cgpa": 8.5,
      "domain": "AI/ML"
    },
    {
      "internship_id": "INT006",
      "title": "DevOps Engineer",
      "company": "CloudOps Pro",
      "description": "Manage CI/CD pipelines, work with containerization, and optimize cloud infrastructure for scalability.",
      "required_skills": ["Docker", "Kubernetes", "AWS", "Linux"],
      "preferred_skills": ["Jenkins", "Terraform", "Monitoring"],
      "location": "Remote",
      "duration": "4 months", 
      "stipend": 24000,
      "min_cgpa": 7.0,
      "domain": "Computer Science"
    }
  ],
  "recommendations": {
    "STU001": [
      {
        "internship_id": "INT001",
        "match_score": 92,
        "match_reason": "Strong skill alignment with Python, ML, and domain expertise",
        "matching_skills": ["Python", "Machine Learning"],
        "missing_skills": ["TensorFlow", "Statistics"]
      },
      {
        "internship_id": "INT002", 
        "match_score": 78,
        "match_reason": "Good match for web development skills with React experience",
        "matching_skills": ["React", "Python"],
        "missing_skills": ["Node.js", "MongoDB"]
      },
      {
        "internship_id": "INT004",
        "match_score": 65,
        "match_reason": "Some backend development alignment",
        "matching_skills": ["SQL", "Git"],
        "missing_skills": ["Java", "Spring Boot"]
      }
    ],
    "STU002": [
      {
        "internship_id": "INT005",
        "match_score": 95, 
        "match_reason": "Perfect match for AI research with deep learning expertise",
        "matching_skills": ["Python", "TensorFlow", "Data Analysis"],
        "missing_skills": ["Research", "Mathematics"]
      },
      {
        "internship_id": "INT003",
        "match_score": 88,
        "match_reason": "Excellent fit for data science with statistical background", 
        "matching_skills": ["Python", "Data Analysis", "Statistics"],
        "missing_skills": ["SQL"]
      },
      {
        "internship_id": "INT001",
        "match_score": 85,
        "match_reason": "Strong ML background aligns well",
        "matching_skills": ["Python", "TensorFlow", "Statistics"],
        "missing_skills": ["Machine Learning"]
      }
    ],
    "STU003": [
      {
        "internship_id": "INT004",
        "match_score": 88,
        "match_reason": "Perfect match for backend development skills",
        "matching_skills": ["Java", "Spring Boot", "MySQL"],
        "missing_skills": ["REST APIs"]
      },
      {
        "internship_id": "INT002", 
        "match_score": 72,
        "match_reason": "Good web development foundation with JavaScript",
        "matching_skills": ["JavaScript", "HTML", "CSS"],
        "missing_skills": ["React", "Node.js", "MongoDB"]
      }
    ],
    "STU004": [
      {
        "internship_id": "INT005",
        "match_score": 96, 
        "match_reason": "Exceptional match for AI research with advanced ML skills",
        "matching_skills": ["Python", "Deep Learning", "PyTorch", "NLP"],
        "missing_skills": ["Research", "Mathematics"]
      },
      {
        "internship_id": "INT001",
        "match_score": 89,
        "match_reason": "Strong ML engineering alignment with deep learning background",
        "matching_skills": ["Python", "Deep Learning"],
        "missing_skills": ["Machine Learning", "TensorFlow", "Statistics"]
      }
    ],
    "STU005": [
      {
        "internship_id": "INT006",
        "match_score": 67,
        "match_reason": "Some technical overlap with system-level programming",
        "matching_skills": ["Python", "C++"],
        "missing_skills": ["Docker", "Kubernetes", "AWS", "Linux"]
      }
    ]
  }
};

// Global state
let currentStudent = null;
let currentInternship = null;
let currentRecommendation = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    populateStudentDropdown();
    populateStudentCards();
    populateAllInternships();
    showSection('home');
}

// Section Navigation
function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navbar active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Student Management
function populateStudentDropdown() {
    const select = document.getElementById('studentSelect');
    if (!select) return;
    
    appData.students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.student_id;
        option.textContent = `${student.name} (${student.student_id}) - ${student.domain}`;
        select.appendChild(option);
    });
}

function populateStudentCards() {
    const container = document.getElementById('studentCards');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.students.forEach(student => {
        const card = createStudentCard(student);
        container.appendChild(card);
    });
}

function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'col-lg-6 col-xl-4';
    card.innerHTML = `
        <div class="student-card card h-100" onclick="selectStudentById('${student.student_id}')" tabindex="0" onkeypress="handleCardKeyPress(event, '${student.student_id}')">
            <div class="card-body">
                <div class="student-info mb-3">
                    <h5 class="card-title mb-1">${student.name}</h5>
                    <p class="text-muted mb-0">${student.student_id} • ${student.domain}</p>
                    <p class="text-muted mb-2">
                        <small><i class="fas fa-university me-1"></i>${student.university} • CGPA: ${student.cgpa}</small>
                    </p>
                    <span class="badge bg-primary">${student.experience_level}</span>
                </div>
                <div class="skill-badges">
                    ${student.skills.slice(0, 4).map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                    ${student.skills.length > 4 ? `<span class="skill-badge">+${student.skills.length - 4} more</span>` : ''}
                </div>
            </div>
        </div>
    `;
    return card;
}

function selectStudent(studentId) {
    if (studentId) {
        selectStudentById(studentId);
    }
}

function selectStudentById(studentId) {
    console.log('Selecting student:', studentId);
    currentStudent = appData.students.find(s => s.student_id === studentId);
    if (currentStudent) {
        displayStudentDashboard();
        showSection('student-dashboard');
    }
}

function handleCardKeyPress(event, studentId) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectStudentById(studentId);
    }
}

// Dashboard Management
function displayStudentDashboard() {
    if (!currentStudent) return;
    
    // Update student profile
    const nameEl = document.getElementById('studentName');
    const universityEl = document.getElementById('studentUniversity');
    const domainEl = document.getElementById('studentDomain');
    const cgpaEl = document.getElementById('studentCgpa');
    const levelEl = document.getElementById('studentLevel');
    const skillsEl = document.getElementById('studentSkills');
    
    if (nameEl) nameEl.textContent = currentStudent.name;
    if (universityEl) universityEl.textContent = currentStudent.university;
    if (domainEl) domainEl.textContent = currentStudent.domain;
    if (cgpaEl) cgpaEl.textContent = currentStudent.cgpa;
    if (levelEl) levelEl.textContent = currentStudent.experience_level;
    
    if (skillsEl) {
        skillsEl.innerHTML = currentStudent.skills.map(skill => 
            `<span class="skill-badge">${skill}</span>`
        ).join('');
    }
    
    // Display recommendations
    displayRecommendations();
}

function displayRecommendations() {
    const container = document.getElementById('recommendationsContainer');
    if (!container) return;
    
    const recommendations = appData.recommendations[currentStudent.student_id] || [];
    
    container.innerHTML = '';
    
    if (recommendations.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    No recommendations available for this student yet.
                </div>
            </div>
        `;
        return;
    }
    
    recommendations.forEach(rec => {
        const internship = appData.internships.find(i => i.internship_id === rec.internship_id);
        if (internship) {
            const card = createRecommendationCard(internship, rec);
            container.appendChild(card);
        }
    });
}

function createRecommendationCard(internship, recommendation) {
    const card = document.createElement('div');
    card.className = 'col-lg-6 col-xl-4';
    
    const matchingSkillsJson = JSON.stringify(recommendation.matching_skills).replace(/"/g, '&quot;');
    const missingSkillsJson = JSON.stringify(recommendation.missing_skills).replace(/"/g, '&quot;');
    
    card.innerHTML = `
        <div class="internship-card card h-100">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h5 class="internship-title">${internship.title}</h5>
                        <p class="company-name mb-2">${internship.company}</p>
                    </div>
                    <span class="match-score">${recommendation.match_score}% Match</span>
                </div>
                
                <div class="internship-meta mb-3">
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        ${internship.location}
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        ${internship.duration}
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-rupee-sign"></i>
                        ₹${internship.stipend.toLocaleString()}/mo
                    </div>
                </div>
                
                <div class="match-reason mb-3">
                    <i class="fas fa-lightbulb me-2"></i>
                    ${recommendation.match_reason}
                </div>
                
                <div class="skill-badges mb-3">
                    ${internship.required_skills.slice(0, 3).map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                </div>
                
                <div class="card-actions">
                    <button class="btn btn-primary btn-sm" onclick="viewInternshipDetails('${internship.internship_id}', '${recommendation.match_score}', '${recommendation.match_reason.replace(/'/g, "\\'")}', '${matchingSkillsJson}', '${missingSkillsJson}')">
                        <i class="fas fa-eye me-1"></i>View Details
                    </button>
                    <button class="btn btn-outline-primary btn-sm" onclick="showSkillGapForInternship('${internship.internship_id}', '${matchingSkillsJson}', '${missingSkillsJson}')">
                        <i class="fas fa-chart-bar me-1"></i>Skill Gap
                    </button>
                </div>
            </div>
        </div>
    `;
    return card;
}

// Internship Details
function viewInternshipDetails(internshipId, matchScore, matchReason, matchingSkillsStr, missingSkillsStr) {
    console.log('Viewing internship details:', internshipId);
    
    currentInternship = appData.internships.find(i => i.internship_id === internshipId);
    
    if (!currentInternship) return;
    
    const matchingSkills = JSON.parse(matchingSkillsStr.replace(/&quot;/g, '"'));
    const missingSkills = JSON.parse(missingSkillsStr.replace(/&quot;/g, '"'));
    
    currentRecommendation = {
        match_score: matchScore,
        match_reason: matchReason,
        matching_skills: matchingSkills,
        missing_skills: missingSkills
    };
    
    displayInternshipDetails();
    showSection('internship-details');
}

function displayInternshipDetails() {
    if (!currentInternship) return;
    
    const elements = {
        title: document.getElementById('internshipTitle'),
        company: document.getElementById('internshipCompany'),
        location: document.getElementById('internshipLocation'),
        duration: document.getElementById('internshipDuration'),
        stipend: document.getElementById('internshipStipend'),
        minCgpa: document.getElementById('internshipMinCgpa'),
        description: document.getElementById('internshipDescription')
    };
    
    if (elements.title) elements.title.textContent = currentInternship.title;
    if (elements.company) elements.company.textContent = currentInternship.company;
    if (elements.location) elements.location.textContent = currentInternship.location;
    if (elements.duration) elements.duration.textContent = currentInternship.duration;
    if (elements.stipend) elements.stipend.textContent = currentInternship.stipend.toLocaleString();
    if (elements.minCgpa) elements.minCgpa.textContent = currentInternship.min_cgpa;
    if (elements.description) elements.description.textContent = currentInternship.description;
    
    if (currentRecommendation) {
        const matchEl = document.getElementById('internshipMatch');
        const reasonEl = document.getElementById('matchReason');
        
        if (matchEl) matchEl.textContent = `${currentRecommendation.match_score}% Match`;
        if (reasonEl) reasonEl.textContent = currentRecommendation.match_reason;
        
        // Display matching skills
        const matchingContainer = document.getElementById('matchingSkills');
        if (matchingContainer) {
            matchingContainer.innerHTML = currentRecommendation.matching_skills.map(skill => 
                `<span class="skill-badge matching">${skill}</span>`
            ).join('');
        }
        
        // Display missing skills
        const missingContainer = document.getElementById('missingSkills');
        if (missingContainer) {
            missingContainer.innerHTML = currentRecommendation.missing_skills.map(skill => 
                `<span class="skill-badge missing">${skill}</span>`
            ).join('');
        }
    }
    
    // Display required skills
    const requiredContainer = document.getElementById('requiredSkills');
    if (requiredContainer) {
        requiredContainer.innerHTML = currentInternship.required_skills.map(skill => 
            `<span class="skill-badge">${skill}</span>`
        ).join('');
    }
    
    // Display preferred skills
    const preferredContainer = document.getElementById('preferredSkills');
    if (preferredContainer) {
        preferredContainer.innerHTML = currentInternship.preferred_skills.map(skill => 
            `<span class="skill-badge">${skill}</span>`
        ).join('');
    }
}

function goBackToDashboard() {
    showSection('student-dashboard');
}

// Skill Gap Analysis
function showSkillGap() {
    if (!currentRecommendation) return;
    
    displaySkillGapAnalysis();
    showSection('skill-gap');
}

function showSkillGapForInternship(internshipId, matchingSkillsStr, missingSkillsStr) {
    console.log('Showing skill gap for internship:', internshipId);
    
    const internship = appData.internships.find(i => i.internship_id === internshipId);
    const matchingSkills = JSON.parse(matchingSkillsStr.replace(/&quot;/g, '"'));
    const missingSkills = JSON.parse(missingSkillsStr.replace(/&quot;/g, '"'));
    
    currentInternship = internship;
    currentRecommendation = {
        matching_skills: matchingSkills,
        missing_skills: missingSkills
    };
    
    displaySkillGapAnalysis();
    showSection('skill-gap');
}

function displaySkillGapAnalysis() {
    if (!currentRecommendation || !currentStudent) return;
    
    // Display skills you have
    const skillsYouHaveContainer = document.getElementById('skillsYouHave');
    if (skillsYouHaveContainer) {
        skillsYouHaveContainer.innerHTML = currentRecommendation.matching_skills.map(skill => 
            `<span class="skill-badge matching">${skill}</span>`
        ).join('');
    }
    
    // Display skills to learn
    const skillsToLearnContainer = document.getElementById('skillsToLearn');
    if (skillsToLearnContainer) {
        skillsToLearnContainer.innerHTML = currentRecommendation.missing_skills.map(skill => 
            `<span class="skill-badge missing">${skill}</span>`
        ).join('');
    }
    
    // Calculate and display progress
    const totalSkills = currentRecommendation.matching_skills.length + currentRecommendation.missing_skills.length;
    const matchPercentage = totalSkills > 0 ? Math.round((currentRecommendation.matching_skills.length / totalSkills) * 100) : 0;
    
    const progressBar = document.getElementById('skillMatchProgress');
    if (progressBar) {
        const progressSpan = progressBar.querySelector('span');
        
        progressBar.style.width = `${matchPercentage}%`;
        if (progressSpan) {
            progressSpan.textContent = `${matchPercentage}% Skills Match`;
        }
    }
}

function goBackToDetails() {
    showSection('internship-details');
}

// All Internships
function populateAllInternships() {
    const container = document.getElementById('allInternshipsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.internships.forEach(internship => {
        const card = createInternshipCard(internship);
        container.appendChild(card);
    });
}

function createInternshipCard(internship) {
    const card = document.createElement('div');
    card.className = 'col-lg-6 col-xl-4';
    card.innerHTML = `
        <div class="internship-card card h-100">
            <div class="card-body">
                <div class="internship-header mb-3">
                    <div>
                        <h5 class="internship-title">${internship.title}</h5>
                        <p class="company-name">${internship.company}</p>
                    </div>
                </div>
                
                <div class="internship-meta mb-3">
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        ${internship.location}
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        ${internship.duration}
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-rupee-sign"></i>
                        ₹${internship.stipend.toLocaleString()}/month
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-graduation-cap"></i>
                        Min CGPA: ${internship.min_cgpa}
                    </div>
                </div>
                
                <p class="text-muted mb-3" style="font-size: 0.9rem;">${internship.description.substring(0, 120)}...</p>
                
                <div class="skill-badges mb-3">
                    ${internship.required_skills.slice(0, 4).map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                    ${internship.required_skills.length > 4 ? `<span class="skill-badge">+${internship.required_skills.length - 4}</span>` : ''}
                </div>
                
                <div class="card-actions">
                    <button class="btn btn-primary btn-sm" onclick="viewInternshipDetailsStandalone('${internship.internship_id}')">
                        <i class="fas fa-eye me-1"></i>View Details
                    </button>
                    <button class="btn btn-outline-primary btn-sm">
                        <i class="fas fa-heart me-1"></i>Save
                    </button>
                </div>
            </div>
        </div>
    `;
    return card;
}

function viewInternshipDetailsStandalone(internshipId) {
    console.log('Viewing standalone internship:', internshipId);
    
    currentInternship = appData.internships.find(i => i.internship_id === internshipId);
    currentRecommendation = null;
    
    if (!currentInternship) return;
    
    displayStandaloneInternshipDetails();
    showSection('internship-details');
}

function displayStandaloneInternshipDetails() {
    if (!currentInternship) return;
    
    const elements = {
        title: document.getElementById('internshipTitle'),
        company: document.getElementById('internshipCompany'),
        location: document.getElementById('internshipLocation'),
        duration: document.getElementById('internshipDuration'),
        stipend: document.getElementById('internshipStipend'),
        minCgpa: document.getElementById('internshipMinCgpa'),
        description: document.getElementById('internshipDescription')
    };
    
    if (elements.title) elements.title.textContent = currentInternship.title;
    if (elements.company) elements.company.textContent = currentInternship.company;
    if (elements.location) elements.location.textContent = currentInternship.location;
    if (elements.duration) elements.duration.textContent = currentInternship.duration;
    if (elements.stipend) elements.stipend.textContent = currentInternship.stipend.toLocaleString();
    if (elements.minCgpa) elements.minCgpa.textContent = currentInternship.min_cgpa;
    if (elements.description) elements.description.textContent = currentInternship.description;
    
    // Hide match analysis if no recommendation
    const matchContainer = document.querySelector('#internship-details .col-lg-4');
    const mainContainer = document.querySelector('#internship-details .col-lg-8');
    
    if (!currentRecommendation) {
        if (matchContainer) matchContainer.style.display = 'none';
        if (mainContainer) mainContainer.className = 'col-12';
    } else {
        if (matchContainer) matchContainer.style.display = 'block';
        if (mainContainer) mainContainer.className = 'col-lg-8';
    }
    
    // Display required skills
    const requiredContainer = document.getElementById('requiredSkills');
    if (requiredContainer) {
        requiredContainer.innerHTML = currentInternship.required_skills.map(skill => 
            `<span class="skill-badge">${skill}</span>`
        ).join('');
    }
    
    // Display preferred skills
    const preferredContainer = document.getElementById('preferredSkills');
    if (preferredContainer) {
        preferredContainer.innerHTML = currentInternship.preferred_skills.map(skill => 
            `<span class="skill-badge">${skill}</span>`
        ).join('');
    }
}

// Make functions globally available
window.showSection = showSection;
window.selectStudent = selectStudent;
window.selectStudentById = selectStudentById;
window.handleCardKeyPress = handleCardKeyPress;
window.viewInternshipDetails = viewInternshipDetails;
window.viewInternshipDetailsStandalone = viewInternshipDetailsStandalone;
window.showSkillGap = showSkillGap;
window.showSkillGapForInternship = showSkillGapForInternship;
window.goBackToDashboard = goBackToDashboard;
window.goBackToDetails = goBackToDetails;