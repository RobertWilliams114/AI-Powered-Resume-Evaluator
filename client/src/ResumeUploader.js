import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";

function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      messageApi.open({
        type: "error",
        content: "Please select a resume.",
      });
      return;
    }

    if (!jobDescription) {
      messageApi.open({
        type: "error",
        content: "Please enter a job description.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    messageApi.open({
      type: "loading",
      content: "Uploading and Processing Your Resume...",
      duration: 0,
    });

    try {
      const uploadResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const extractText = uploadResponse.data.extract_text;

      const analysisResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/analyze`,
        {
          resume_text: extractText,
          job_description: jobDescription,
        }
      );

      setAnalysisResults(analysisResponse.data);

      messageApi.destroy();
      messageApi.open({
        type: "success",
        content: "Upload and Analysis Successful",
      });
      // alert("Upload Successful");
    } catch (error) {
      // alert("Error, Upload Failed");
      messageApi.destroy();
      messageApi.open({
        type: "error",
        content: "Error Uploading or Analyzing the File. Please Try Again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary flex w-screen min-h-screen sm:min-w-fit">
      <div className="flex flex-col items-center justify-center gap-5 px-40 py-10 sm:px-5">
        <h1 className=" flex justify-center py-10 text-5xl text-quaternary font-semibold text-center">
          AI-Powered Resume Analyzer
        </h1>

        {contextHolder}

        <p className="px-35 text-white text-center text-xl mb-5">
          Compare a resume with a job description to calculate a similarity
          score and provide recommendations to better align the resume with the
          job description.
        </p>

        <div className="flex flex-col items-center">
          <label className="mb-10 text-3xl text-sixth">
            Upload Your Resume:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="text-fifth text-2xl"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sixth text-xl">Enter Job Description</label>
          <textarea
            className="border-tertiary text-white border bg-secondary rounded-lg resize-none px-5 py-3"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            placeholder="Paste job description here..."
            rows="11"
            cols="40"
            disabled={loading}
          />
        </div>

        {loading ? (
          <div className="spinner-container justify-between">
            <div className="spinner"></div>
            <p className="text-fifth"> Processing your resume</p>
          </div>
        ) : (
          <button
            onClick={handleUpload}
            className="border border-tertiary text-fifth rounded-lg px-10 py-3 bg-secondary">
            Analyze Resume
          </button>
        )}

        {analysisResults && (
          <div>
            <h2 className="text-3xl text-sixth">Analysis Results</h2>
            <p className="text-white">
              <strong className="text-fifth">Similarity Score:</strong>{" "}
              {analysisResults.similarity_score}%
            </p>
            <h3 className="text-fifth">Recommendations:</h3>
            <ul className="flex flex-col border rounded-lg border-tertiary bg-secondary gap-1 text-white px-6 py-3">
              {analysisResults.recommendations.map((recommendations, index) => (
                <li key={index}>{recommendations}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col fixed bottom-0 left-0 px-10 gap-3 items-center sm:static sm:flex-row sm:">
          <a href="https://robertwilliams.onrender.com">
            <i class="ri-article-line text-fifth text-xl"></i>
          </a>
          <a href="https://www.linkedin.com/in/robert-williams-503165236">
            <i class="ri-linkedin-box-fill text-fifth text-xl"></i>
          </a>
          <a href="https://github.com/RobertWilliams114">
            <i class="ri-github-fill text-fifth text-xl"></i>
          </a>
          <div className="w-[1px] h-32 bg-tertiary sm:hidden"></div>
        </div>
        <div className="w-full h-[1px] bg-tertiary"></div>
        <div className="flex flex-col items-center">
          <p className="text-white">Designed and Developed By</p>
          <p className="text-white">Robert Williams</p>
        </div>
      </div>
    </div>
  );
}

export default ResumeUploader;
