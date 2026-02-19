from openai import OpenAI
import os
import re
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def analyze_resume(resume_text, job_description):
    score = similarity_score(resume_text, job_description)
    return {
        "similarity_score": round(score * 100, 2),
        "recommendations": suggest_improvements(resume_text, job_description)
    }

def suggest_improvements(resume_text, job_description):
    prompt = f"""
    Please give a list of recommendations for improving the resume in order to match the job description in a very clear and concise manner. Do not recommend changes that cannot be made, such as changing the graduation date on the resume but point it out.

    Job Description:
    {job_description}

    Resume:
    {resume_text}

    Recommendation:
    """
    try:
        response = client.chat.completions.create(
            model = "gpt-4o-mini",
            messages = [{"role": "user", "content": prompt}]
        )
        recommendations = response.choices[0].message.content.strip()
        return recommendations
    except Exception as e:
        return f"Error generating recommendations: {str(e)}"

def similarity_score(resume_text, job_description):
    prompt = f"""
    You are an AI assistant. Please analyze the following job description and resume, and return a similarity score as a single number between 0 and 1.

    Job Description:
    {job_description}

    Resume:
    {resume_text}

    Your response should contain only the score as a number. Do not provide any additional text.
    """

    try:
        response = client.chat.completions.create(
            model = "gpt-4o-mini",
            messages = [{"role": "user", "content": prompt}]
        )
        content = response.choices[0].message.content.strip()

        match = re.search(r"(\d+(\.\d+)?)", content)
        if match:
            score = float(match.group(1))
            return score
        else:
            print("No numeric score found in response.")
            return 0.0
    except Exception as e:
        print(f"Error in similarity_score: {e}")
        return 0.0
