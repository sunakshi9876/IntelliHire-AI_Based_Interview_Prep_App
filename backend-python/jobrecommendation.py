from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Job fields with required skills
job_fields = [
    {"field": "Frontend Developer", "requiredSkills": ["React", "JavaScript", "CSS", "HTML"]},
    {"field": "Backend Developer", "requiredSkills": ["Node.js", "Express", "MongoDB", "REST APIs"]},
    {"field": "Full Stack Engineer", "requiredSkills": ["React", "Node.js", "SQL", "API Design"]},
    {"field": "Data Analyst", "requiredSkills": ["Python", "Pandas", "SQL", "Visualization"]},
    {"field": "AI/ML Engineer", "requiredSkills": ["Python", "TensorFlow", "PyTorch", "ML Algorithms"]},
]

# Skill synonyms to support flexible input
skill_synonyms = {
    "js": "JavaScript",
    "reactjs": "React",
    "react.js": "React",
    "node": "Node.js",
    "tf": "TensorFlow",
    "ml": "ML Algorithms",
    "ai": "ML Algorithms",
    "python3": "Python",
}

def normalize_skill(skill):
    skill = skill.strip().lower()
    return skill_synonyms.get(skill, skill)  # return mapped skill if exists, else original

@app.route("/recommend-jobs", methods=["POST"])
def recommend_jobs():
    data = request.json

    if not data or "skills" not in data or not data["skills"].strip():
        return jsonify({"error": "No skills provided"}), 400

    # Normalize user skills
    user_skills = [normalize_skill(s) for s in data["skills"].split(",") if s.strip()]
    if not user_skills:
        return jsonify({"error": "No valid skills provided"}), 400

    recommendations = []
    for job in job_fields:
        required_skills = [s.lower() for s in job["requiredSkills"]]
        match_count = sum(1 for s in required_skills if s in [us.lower() for us in user_skills])
        match_percentage = round((match_count / len(required_skills)) * 100)
        missing_skills = [job["requiredSkills"][i] for i, s in enumerate(required_skills) if s not in [us.lower() for us in user_skills]]

        recommendations.append({
            "field": job["field"],
            "matchPercentage": match_percentage,
            "missingSkills": missing_skills
        })

    recommendations.sort(key=lambda x: x["matchPercentage"], reverse=True)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(port=5002, debug=True)
