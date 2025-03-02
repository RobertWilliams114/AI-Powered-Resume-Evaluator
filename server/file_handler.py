import os

ALLOWED_EXTENSIONS = {"pdf", "docx"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def save_file(file, save_dir):
    if not allowed_file(file.filename):
        raise ValueError("Invalid File Format")
    filepath = os.path.join(save_dir, file.filename)
    file.save(filepath)
    return filepath