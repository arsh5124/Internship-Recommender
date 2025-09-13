
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
import re
import nltk
from collections import Counter
import json

class NLPUtils:
    """Utility class for NLP operations and skill extraction"""

    def __init__(self):
        self.skill_patterns = {
            'programming': r'\b(python|java|javascript|c\+\+|c#|php|ruby|go|rust|swift|kotlin|scala)\b',
            'web': r'\b(html|css|react|angular|vue|node\.?js|express|django|flask|fastapi)\b',
            'database': r'\b(sql|mysql|postgresql|mongodb|redis|cassandra|oracle)\b',
            'ml_ai': r'\b(machine learning|deep learning|tensorflow|pytorch|scikit-learn|keras|opencv)\b',
            'cloud': r'\b(aws|azure|gcp|docker|kubernetes|jenkins|terraform)\b',
            'tools': r'\b(git|github|jira|slack|figma|photoshop|illustrator)\b'
        }

    def extract_skills_from_text(self, text):
        """Extract skills from resume/profile text using pattern matching"""
        if not text:
            return []

        text = text.lower()
        extracted_skills = []

        for category, pattern in self.skill_patterns.items():
            matches = re.findall(pattern, text, re.IGNORECASE)
            extracted_skills.extend(matches)

        # Clean and standardize skill names
        skill_mapping = {
            'node.js': 'Node.js', 'nodejs': 'Node.js',
            'c++': 'C++', 'c#': 'C#',
            'machine learning': 'Machine Learning',
            'deep learning': 'Deep Learning'
        }

        standardized_skills = []
        for skill in extracted_skills:
            skill = skill_mapping.get(skill.lower(), skill.title())
            if skill not in standardized_skills:
                standardized_skills.append(skill)

        return standardized_skills

    def calculate_skill_match_score(self, student_skills, required_skills):
        """Calculate skill match score between student and internship"""
        if not student_skills or not required_skills:
            return 0.0

        student_set = set([skill.lower() for skill in student_skills])
        required_set = set([skill.lower() for skill in required_skills])

        intersection = len(student_set & required_set)
        return intersection / len(required_set) if required_set else 0.0


class InternshipRecommendationEngine:
    """Main recommendation engine class implementing hybrid filtering"""

    def __init__(self):
        self.students_df = None
        self.internships_df = None
        self.nlp_utils = NLPUtils()
        self.tfidf_vectorizer = TfidfVectorizer(stop_words='english', max_features=100)
        self.scaler = StandardScaler()

    def load_data(self, students_file, internships_file):
        """Load student and internship data from CSV files"""
        self.students_df = pd.read_csv(students_file)
        self.internships_df = pd.read_csv(internships_file)

        # Parse string representations of lists back to actual lists
        self.students_df['skills'] = self.students_df['skills'].apply(
            lambda x: eval(x) if isinstance(x, str) else x
        )
        self.students_df['interests'] = self.students_df['interests'].apply(
            lambda x: eval(x) if isinstance(x, str) else x
        )
        self.internships_df['required_skills'] = self.internships_df['required_skills'].apply(
            lambda x: eval(x) if isinstance(x, str) else x
        )
        self.internships_df['preferred_skills'] = self.internships_df['preferred_skills'].apply(
            lambda x: eval(x) if isinstance(x, str) else x
        )

        print(f"Loaded {len(self.students_df)} students and {len(self.internships_df)} internships")
        return True

    def content_based_filtering(self, student_id, top_n=10):
        """
        Content-based filtering recommendation
        Matches students with internships based on profile similarity
        """
        if self.students_df is None or self.internships_df is None:
            return []

        # Get student profile
        student = self.students_df[self.students_df['student_id'] == student_id].iloc[0]

        recommendations = []

        for _, internship in self.internships_df.iterrows():
            score = 0

            # Skill matching (40% weight)
            skill_score = self.nlp_utils.calculate_skill_match_score(
                student['skills'], internship['required_skills']
            )
            score += skill_score * 0.4

            # Domain matching (20% weight)
            if student['domain'] == internship['domain'] or internship['domain'] == 'Any':
                score += 0.2

            # Experience level matching (20% weight)
            experience_levels = ['Beginner', 'Intermediate', 'Advanced']
            try:
                student_exp_idx = experience_levels.index(student['experience_level'])
                internship_exp_idx = experience_levels.index(internship['experience_required'])

                if student_exp_idx == internship_exp_idx:
                    score += 0.2
                elif abs(student_exp_idx - internship_exp_idx) == 1:
                    score += 0.1
            except ValueError:
                pass  # Handle cases where experience level is not in the list

            # CGPA requirement (10% weight)
            if student['cgpa'] >= internship['min_cgpa']:
                score += 0.1

            # Location preference (10% weight)
            if student['preferred_location'] == internship['location'] or internship['location'] == 'Remote':
                score += 0.1

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
                'match_reason': self._get_match_reason(student, internship, skill_score)
            })

        # Sort by score and return top N
        recommendations.sort(key=lambda x: x['score'], reverse=True)
        return recommendations[:top_n]

    def collaborative_filtering(self, student_id, top_n=10):
        """
        Collaborative filtering based on similar students
        Recommends internships liked by similar students
        """
        if self.students_df is None or self.internships_df is None:
            return []

        student = self.students_df[self.students_df['student_id'] == student_id].iloc[0]

        # Find similar students based on skills and domain
        similar_students = []

        for _, other_student in self.students_df.iterrows():
            if other_student['student_id'] == student_id:
                continue

            # Calculate similarity
            student_skills_set = set(student['skills'])
            other_skills_set = set(other_student['skills'])

            if len(student_skills_set | other_skills_set) == 0:
                skill_similarity = 0
            else:
                skill_similarity = len(student_skills_set & other_skills_set) / len(student_skills_set | other_skills_set)

            domain_match = 1 if student['domain'] == other_student['domain'] else 0

            similarity_score = (skill_similarity * 0.7) + (domain_match * 0.3)

            if similarity_score > 0.3:  # Threshold for similarity
                similar_students.append({
                    'student_id': other_student['student_id'],
                    'similarity': similarity_score,
                    'skills': other_student['skills']
                })

        # Sort by similarity
        similar_students.sort(key=lambda x: x['similarity'], reverse=True)

        # Get internships that similar students might prefer
        recommended_skills = []
        for sim_student in similar_students[:5]:  # Top 5 similar students
            recommended_skills.extend(sim_student['skills'])

        skill_frequency = Counter(recommended_skills)
        popular_skills = [skill for skill, _ in skill_frequency.most_common(10)]

        # Find internships requiring these popular skills
        recommendations = []
        for _, internship in self.internships_df.iterrows():
            if not internship['required_skills']:
                continue

            match_count = len(set(popular_skills) & set(internship['required_skills']))
            match_score = match_count / len(internship['required_skills'])

            if match_score > 0:
                matching_skills = list(set(popular_skills) & set(internship['required_skills']))
                recommendations.append({
                    'internship_id': internship['internship_id'],
                    'title': internship['title'],
                    'company': internship['company'],
                    'description': internship['description'],
                    'required_skills': internship['required_skills'],
                    'location': internship['location'],
                    'stipend': internship['stipend'],
                    'duration': internship['duration'],
                    'score': round(match_score, 3),
                    'match_reason': f"Popular among similar students with skills: {', '.join(matching_skills[:3])}"
                })

        recommendations.sort(key=lambda x: x['score'], reverse=True)
        return recommendations[:top_n]

    def hybrid_recommendation(self, student_id, top_n=10, content_weight=0.7, collab_weight=0.3):
        """
        Hybrid recommendation combining content-based and collaborative filtering
        """
        content_recs = self.content_based_filtering(student_id, top_n * 2)
        collab_recs = self.collaborative_filtering(student_id, top_n * 2)

        # Combine recommendations
        hybrid_scores = {}

        # Add content-based scores
        for rec in content_recs:
            internship_id = rec['internship_id']
            hybrid_scores[internship_id] = {
                'title': rec['title'],
                'company': rec['company'],
                'description': rec['description'],
                'required_skills': rec['required_skills'],
                'location': rec['location'],
                'stipend': rec['stipend'],
                'duration': rec['duration'],
                'content_score': rec['score'],
                'collab_score': 0,
                'hybrid_score': rec['score'] * content_weight,
                'match_reason': rec['match_reason']
            }

        # Add collaborative filtering scores
        for rec in collab_recs:
            internship_id = rec['internship_id']
            if internship_id in hybrid_scores:
                hybrid_scores[internship_id]['collab_score'] = rec['score']
                hybrid_scores[internship_id]['hybrid_score'] += rec['score'] * collab_weight
            else:
                hybrid_scores[internship_id] = {
                    'title': rec['title'],
                    'company': rec['company'],
                    'description': rec['description'],
                    'required_skills': rec['required_skills'],
                    'location': rec['location'],
                    'stipend': rec['stipend'],
                    'duration': rec['duration'],
                    'content_score': 0,
                    'collab_score': rec['score'],
                    'hybrid_score': rec['score'] * collab_weight,
                    'match_reason': rec['match_reason']
                }

        # Sort by hybrid score
        final_recommendations = []
        for internship_id, data in hybrid_scores.items():
            final_recommendations.append({
                'internship_id': internship_id,
                'title': data['title'],
                'company': data['company'],
                'description': data['description'],
                'required_skills': data['required_skills'],
                'location': data['location'],
                'stipend': data['stipend'],
                'duration': data['duration'],
                'score': round(data['hybrid_score'], 3),
                'content_score': round(data['content_score'], 3),
                'collab_score': round(data['collab_score'], 3),
                'match_reason': data['match_reason']
            })

        final_recommendations.sort(key=lambda x: x['score'], reverse=True)
        return final_recommendations[:top_n]

    def get_skill_gap_analysis(self, student_id, internship_id):
        """Analyze skill gaps for learning recommendations"""
        student = self.students_df[self.students_df['student_id'] == student_id].iloc[0]
        internship = self.internships_df[self.internships_df['internship_id'] == internship_id].iloc[0]

        student_skills = set([s.lower() for s in student['skills']])
        required_skills = set([s.lower() for s in internship['required_skills']])
        preferred_skills = set([s.lower() for s in internship['preferred_skills']])

        has_skills = student_skills & required_skills
        missing_required = required_skills - student_skills
        missing_preferred = preferred_skills - student_skills

        return {
            'matching_skills': list(has_skills),
            'missing_required_skills': list(missing_required),
            'missing_preferred_skills': list(missing_preferred),
            'skill_match_percentage': len(has_skills) / len(required_skills) * 100 if required_skills else 0
        }

    def _get_match_reason(self, student, internship, skill_score):
        """Generate explanation for why internship was recommended"""
        reasons = []

        if skill_score > 0.5:
            matching_skills = set([s.lower() for s in student['skills']]) & set([s.lower() for s in internship['required_skills']])
            if matching_skills:
                reasons.append(f"Strong skill match: {', '.join(list(matching_skills)[:3])}")

        if student['domain'] == internship['domain']:
            reasons.append(f"Domain match: {student['domain']}")

        if student['experience_level'] == internship['experience_required']:
            reasons.append(f"Experience level match: {student['experience_level']}")

        return "; ".join(reasons) if reasons else "General compatibility"

    def get_student_profile(self, student_id):
        """Get complete student profile"""
        return self.students_df[self.students_df['student_id'] == student_id].iloc[0].to_dict()

    def get_all_students(self):
        """Get all students data"""
        return self.students_df.to_dict('records')

    def get_all_internships(self):
        """Get all internships data"""
        return self.internships_df.to_dict('records')
