from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import re

app = Flask(__name__)
CORS(app)


# -----------------------------------------------------------
# Extract text from PDF
# -----------------------------------------------------------
def extract_text_from_pdf(pdf_file):
    reader = PyPDF2.PdfReader(pdf_file)
    text = ""

    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"

    return text


# -----------------------------------------------------------
# Improved ATS Score Calculation
# -----------------------------------------------------------
def calculate_ats_score(text):
    text_lower = text.lower()

    # Technical skills
    tech_keywords = [
        "java", "python", "react", "node", "sql",
        "javascript", "html", "css", "mongodb",
        "mysql", "api", "rest", "git"
    ]

    # Soft skills
    soft_keywords = [
        "communication", "leadership", "teamwork",
        "problem solving", "analytical", "fast learner"
    ]

    tech_score = sum(1 for kw in tech_keywords if kw in text_lower)
    soft_score = sum(1 for kw in soft_keywords if kw in text_lower)

    # Section detection
    sections = 0
    for sec in ["experience", "projects", "skills", "education", "certification"]:
        if sec in text_lower:
            sections += 1

    # Readability scoring
    word_count = len(text.split())
    readability_score = min(word_count / 10, 20)  # max 20 points

    final_score = (
        tech_score * 5 +
        soft_score * 2 +
        sections * 4 +
        readability_score
    )

    return min(int(final_score), 100)


# -----------------------------------------------------------
# Improved Suggestion Generator
# -----------------------------------------------------------
def generate_suggestions(text):
    text_lower = text.lower()
    suggestions = []

    section_prompts = {
        "experience": "Add an Experience section with measurable achievements.",
        "projects": "Include a Projects section to highlight your work.",
        "skills": "Add a clear Skills section listing your technologies.",
        "education": "Include an Education section.",
        "certification": "Add certifications to strengthen credibility."
    }

    # Missing section suggestions
    for section, message in section_prompts.items():
        if section not in text_lower:
            suggestions.append(message)

    # Metric-based suggestions
    if not re.search(r"\d+", text):
        suggestions.append("Use measurable achievements (e.g., 'Reduced load time by 30%').")

    # Action verb suggestions
    action_verbs = ["developed", "built", "designed", "managed", "created", "implemented"]
    if not any(v in text_lower for v in action_verbs):
        suggestions.append("Use strong action verbs in your experience descriptions.")

    # Resume too short
    if len(text) < 300:
        suggestions.append("Resume seems short — expand details or achievements.")

    # If everything is good
    if not suggestions:
        suggestions.append("Your resume looks strong and ATS-friendly!")

    return suggestions


# -----------------------------------------------------------
# API Endpoint: /analyze
# -----------------------------------------------------------
@app.route("/analyze", methods=["POST"])
def analyze_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    pdf = request.files["resume"]

    try:
        text = extract_text_from_pdf(pdf)
        ats_score = calculate_ats_score(text)
        suggestions = generate_suggestions(text)

        return jsonify({
            "atsScore": ats_score,
            "suggestions": suggestions
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------------------------------------
# Run Server
# -----------------------------------------------------------
if __name__ == "__main__":
    app.run(port=5001, debug=True)
