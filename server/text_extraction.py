from pdf2image import convert_from_path
import pytesseract
from docx import Document

def extract_text(file):
    if file.filename.endswith('.pdf'):
        images = convert_from_path(file)
        text = "".join([pytesseract.image_to_string(img) for img in images])
        return text
    elif file.filename.endswith(".docx"):
        doc = Document(file)
        return "\n".join([para.text for para in doc.paragraphs])
    else:
        raise ValueError("Unsupported file format")