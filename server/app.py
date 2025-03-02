from flask_cors import CORS
from flask import Flask
from .resume_routes import resume_blueprint

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "This is the Resume Evaluator API"

app.register_blueprint(resume_blueprint)

if __name__ == "__main__":
    app.run(debug=True, port=5200)