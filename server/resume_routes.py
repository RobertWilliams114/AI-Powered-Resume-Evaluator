from flask import Blueprint, request, jsonify
from .text_extraction import extract_text
from .nlp_analysis import analyze_resume

resume_blueprint = Blueprint("resume", __name__)

@resume_blueprint.route("/upload", methods=["POST"])
def upload_resume():
    try:
        if "resume" not in request.files:
            return jsonify({"error": "No File Uploaded"}), 400
        
        file = request.files["resume"]
        text = extract_text(file)
        return jsonify({"extract_text": text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@resume_blueprint.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    resume_text = data.get("resume_text")
    job_description = data.get("job_description")
    if not resume_text or not job_description:
        return jsonify({"error": "Invalid input"}), 400
    
    try:
    
        analysis_results = analyze_resume(resume_text, job_description)
        recommendations = analysis_results["recommendations"]

        if isinstance(recommendations, str):
            recommendations = recommendations.split("\n")

        return jsonify({
            "similarity_score": analysis_results["similarity_score"],
            "recommendations": recommendations
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500