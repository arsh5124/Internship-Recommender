
# AI-Based Internship Recommendation Engine

**Smart India Hackathon 2025 - Team TechNoob**  
**Problem Statement ID: SIH25034**

## Overview

This project implements an AI-powered internship recommendation system that matches students with suitable PM Internship Scheme opportunities using advanced machine learning algorithms and natural language processing.

## Features

- **Intelligent Matching**: Uses hybrid recommendation algorithms (content-based + collaborative filtering)
- **NLP-Powered**: Extracts and analyzes skills from student profiles
- **Skill Gap Analysis**: Shows students what skills they need to develop
- **Explainable AI**: Provides clear reasons for each recommendation
- **User-Friendly Interface**: Modern web interface built with Flask and Bootstrap
- **Scalable Architecture**: Designed to handle large numbers of students and internships

## Technology Stack

- **Backend**: Python, Flask
- **ML/AI**: Scikit-learn, NLTK, Pandas, NumPy
- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript
- **Database**: CSV files (easily expandable to SQL databases)

## Quick Start

### 1. Install Requirements
```bash
pip install -r requirements.txt
```

### 2. Run the Application
```bash
python run.py
```

### 3. Open Browser
Navigate to `http://localhost:5000`

## Project Structure

```
internship-recommender/
├── app.py                      # Main Flask application
├── recommendation_engine.py    # Core AI/ML algorithms
├── run.py                     # Application runner
├── requirements.txt           # Python dependencies
├── students_data.csv         # Sample student data
├── internships_data.csv      # Sample internship data
└── templates/                # HTML templates
    ├── base.html
    ├── index.html
    ├── student_login.html
    ├── student_dashboard.html
    ├── internship_detail.html
    ├── skill_gap.html
    ├── all_internships.html
    └── about.html
```

## How It Works

### 1. Data Collection & Processing
- Gathers student profiles (skills, academics, interests)
- Processes internship listings with requirements
- Uses NLP to extract and standardize skills

### 2. Recommendation Algorithms

#### Content-Based Filtering (40% weight)
- Matches student skills with internship requirements
- Considers domain, experience level, CGPA, and location preferences

#### Collaborative Filtering (30% weight)
- Finds similar students based on skills and preferences  
- Recommends internships popular among similar students

#### Hybrid Approach (70% content + 30% collaborative)
- Combines both approaches for better accuracy
- Provides diverse and personalized recommendations

### 3. Skill Gap Analysis
- Identifies skills the student already has
- Highlights missing required skills
- Provides learning recommendations

## API Endpoints

- `GET /` - Home page
- `GET /student-login` - Student login/selection
- `GET /dashboard/<student_id>` - Student dashboard with recommendations
- `GET /internship/<internship_id>` - Internship details
- `GET /skill-gap/<student_id>/<internship_id>` - Skill gap analysis
- `GET /all-internships` - Browse all internships
- `GET /api/recommendations/<student_id>` - JSON API for recommendations

## Sample Usage

1. **Select Student Profile**: Choose from available student profiles
2. **View Dashboard**: See personalized internship recommendations
3. **Analyze Matches**: Click on recommendations to see detailed analysis
4. **Skill Gap**: Understand what skills to develop
5. **Browse Internships**: Explore all available opportunities

## Evaluation Metrics

- **Precision@K**: Accuracy of top-K recommendations
- **Recall@K**: Coverage of relevant internships
- **F1-Score**: Balanced precision and recall
- **User Satisfaction**: Explainability and match quality

## Future Enhancements

- Integration with real PM Internship Scheme portal
- Resume upload and parsing
- Real-time notification system
- Mobile application
- Advanced NLP for better skill extraction
- Machine learning model optimization

## Team TechNoob

Built for Smart India Hackathon 2025 with ❤️ by Team TechNoob.

**Problem Category**: Software  
**Theme**: AI-Based Internship Recommendation Engine for PM Internship Scheme

## License

This project is developed for Smart India Hackathon 2025.
