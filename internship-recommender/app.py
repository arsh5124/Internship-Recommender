
from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
import pandas as pd
import json
from datetime import datetime

# Import our recommendation engine (assuming it's in the same directory)
# from recommendation_engine import InternshipRecommendationEngine

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

# Initialize recommendation engine (placeholder for now)
class MockRecommendationEngine:
    """Mock version of the recommendation engine for the Flask app"""
    def __init__(self):
        self.students_df = pd.read_csv('students_data.csv')
        self.internships_df = pd.read_csv('internships_data.csv')

        # Parse string lists back to actual lists
        self.students_df['skills'] = self.students_df['skills'].apply(lambda x: eval(x) if isinstance(x, str) else x)
        self.students_df['interests'] = self.students_df['interests'].apply(lambda x: eval(x) if isinstance(x, str) else x)
        self.internships_df['required_skills'] = self.internships_df['required_skills'].apply(lambda x: eval(x) if isinstance(x, str) else x)
        self.internships_df['preferred_skills'] = self.internships_df['preferred_skills'].apply(lambda x: eval(x) if isinstance(x, str) else x)

    def get_student_profile(self, student_id):
        return self.students_df[self.students_df['student_id'] == student_id].iloc[0].to_dict()

    def get_all_students(self):
        return self.students_df.to_dict('records')

    def get_all_internships(self):
        return self.internships_df.to_dict('records')

    def hybrid_recommendation(self, student_id, top_n=10):
        # Simplified version for demo
        recommendations = []
        student = self.students_df[self.students_df['student_id'] == student_id].iloc[0]

        for _, internship in self.internships_df.iterrows():
            skill_match = len(set([s.lower() for s in student['skills']]) & 
                            set([s.lower() for s in internship['required_skills']]))
            score = skill_match / len(internship['required_skills']) if internship['required_skills'] else 0

            recommendations.append({
                'internship_id': internship['internship_id'],
                'title': internship['title'],
                'company': internship['company'],
                'description': internship['description'],
                'required_skills': internship['required_skills'],
                'location': internship['location'],
                'stipend': internship['stipend'],
                'duration': internship['duration'],
                'score': round(score, 3),
                'match_reason': f"Skill match: {skill_match}/{len(internship['required_skills'])}"
            })

        recommendations.sort(key=lambda x: x['score'], reverse=True)
        return recommendations[:top_n]

    def get_skill_gap_analysis(self, student_id, internship_id):
        student = self.students_df[self.students_df['student_id'] == student_id].iloc[0]
        internship = self.internships_df[self.internships_df['internship_id'] == internship_id].iloc[0]

        student_skills = set([s.lower() for s in student['skills']])
        required_skills = set([s.lower() for s in internship['required_skills']])

        matching = list(student_skills & required_skills)
        missing = list(required_skills - student_skills)

        return {
            'matching_skills': matching,
            'missing_required_skills': missing,
            'skill_match_percentage': len(matching) / len(required_skills) * 100 if required_skills else 0
        }

# Initialize the engine
engine = MockRecommendationEngine()

@app.route('/')
def index():
    """Home page"""
    stats = {
        'total_students': len(engine.students_df),
        'total_internships': len(engine.internships_df),
        'active_recommendations': 1250  # Mock number
    }
    return render_template('index.html', stats=stats)

@app.route('/student-login', methods=['GET', 'POST'])
def student_login():
    """Student login/selection page"""
    if request.method == 'POST':
        student_id = request.form.get('student_id')
        if student_id:
            return redirect(url_for('student_dashboard', student_id=student_id))

    students = engine.get_all_students()
    return render_template('student_login.html', students=students)

@app.route('/dashboard/<student_id>')
def student_dashboard(student_id):
    """Student dashboard showing profile and recommendations"""
    try:
        student = engine.get_student_profile(student_id)
        recommendations = engine.hybrid_recommendation(student_id, 10)

        return render_template('student_dashboard.html', 
                             student=student, 
                             recommendations=recommendations)
    except Exception as e:
        flash(f'Error loading dashboard: {str(e)}', 'error')
        return redirect(url_for('student_login'))

@app.route('/internship/<internship_id>')
def internship_detail(internship_id):
    """Detailed view of an internship"""
    internship = engine.internships_df[engine.internships_df['internship_id'] == internship_id]
    if internship.empty:
        flash('Internship not found', 'error')
        return redirect(url_for('index'))

    internship_data = internship.iloc[0].to_dict()
    return render_template('internship_detail.html', internship=internship_data)

@app.route('/skill-gap/<student_id>/<internship_id>')
def skill_gap_analysis(student_id, internship_id):
    """Skill gap analysis for a student-internship pair"""
    try:
        gap_analysis = engine.get_skill_gap_analysis(student_id, internship_id)
        student = engine.get_student_profile(student_id)
        internship = engine.internships_df[engine.internships_df['internship_id'] == internship_id].iloc[0].to_dict()

        return render_template('skill_gap.html', 
                             student=student,
                             internship=internship,
                             analysis=gap_analysis)
    except Exception as e:
        flash(f'Error in skill gap analysis: {str(e)}', 'error')
        return redirect(url_for('index'))

@app.route('/all-internships')
def all_internships():
    """View all available internships"""
    internships = engine.get_all_internships()
    return render_template('all_internships.html', internships=internships)

@app.route('/api/recommendations/<student_id>')
def api_recommendations(student_id):
    """API endpoint for recommendations"""
    try:
        recommendations = engine.hybrid_recommendation(student_id, 10)
        return jsonify({
            'status': 'success',
            'recommendations': recommendations
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

@app.route('/about')
def about():
    """About page explaining the system"""
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
