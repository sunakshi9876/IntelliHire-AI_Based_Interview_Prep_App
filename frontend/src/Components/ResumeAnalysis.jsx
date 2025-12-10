import React, { useState } from "react";
import axios from "axios";

const ResumeAnalysis = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setErrorMsg("");
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMsg("Please upload a PDF resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setErrorMsg("");

      const res = await axios.post(
        "http://localhost:5001/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
    } catch (err) {
      setErrorMsg("Error analyzing resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-indigo-700">
        AI-Based Resume Analysis
      </h2>

      {/* File Upload */}
      <div className="border-2 border-dashed border-indigo-400 p-8 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 text-center shadow-inner hover:shadow-lg transition-shadow duration-300">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4 cursor-pointer"
        />
        <p className="text-gray-600 text-sm">
          Upload your resume in PDF format
        </p>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full mt-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transform transition-all duration-300"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {/* Error Message */}
      {errorMsg && (
        <p className="text-red-500 text-center mt-4 font-medium">{errorMsg}</p>
      )}

      {/* Results */}
      {result && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
          <h3 className="text-2xl font-bold text-indigo-800 mb-4 text-center">
            Analysis Report
          </h3>

          <p className="text-lg font-medium mb-4 text-center">
            ATS Score:{" "}
            <span className="text-purple-600 font-extrabold text-xl">
              {result.atsScore} / 100
            </span>
          </p>

          <div className="mt-4">
            <h4 className="font-semibold text-indigo-700 mb-3 text-lg">
              Suggestions:
            </h4>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {result?.suggestions?.map((item, index) => (
                <li key={index} className="hover:text-purple-600 transition-colors duration-200">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysis;
