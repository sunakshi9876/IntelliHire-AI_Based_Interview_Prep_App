import React, { useState } from "react";

const ResumeAnalysis = () => {
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnalysisResult(null);
  };

  const handleAnalyze = () => {
    if (!file) return alert("Please upload a resume first.");

    // Dummy analysis data
    setAnalysisResult({
      atsScore: 85,
      skillsMatched: ["JavaScript", "React", "Node.js", "CSS", "TailwindCSS"],
      formattingSuggestions:
        "Use clear headings, bullet points, and quantifiable metrics for experience.",
      summary:
        "Your resume is well-structured. Emphasize measurable achievements to improve impact."
    });
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-y-auto max-h-[70vh]">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900 text-center">
        AI Resume Analysis
      </h2>

      {/* File Upload */}
      <div className="mb-4">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:bg-gradient-to-r file:from-indigo-100 file:to-purple-100
            file:text-indigo-700 file:font-semibold
            hover:file:from-indigo-200 hover:file:to-purple-200
            cursor-pointer
          "
        />
        {file && (
          <p className="mt-2 text-gray-700 text-sm text-center truncate">
            Selected: <span className="font-semibold">{file.name}</span>
          </p>
        )}
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleAnalyze}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transform transition duration-300 text-sm"
        >
          Analyze Resume
        </button>
      </div>

      {/* Analysis Result */}
      {analysisResult && (
        <div className="bg-indigo-50 p-4 rounded-xl shadow-inner border border-indigo-100 text-sm">
          <h3 className="font-semibold text-indigo-900 mb-3 text-center">
            Analysis Result
          </h3>

          {/* ATS Score */}
          <div className="mb-3">
            <p className="font-medium text-gray-700 mb-1">ATS Score</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all"
                style={{ width: `${analysisResult.atsScore}%` }}
              ></div>
            </div>
            <p className="text-gray-600 mt-1">{analysisResult.atsScore}%</p>
          </div>

          {/* Skills Matched */}
          <div className="mb-3">
            <p className="font-medium text-gray-700 mb-1">Skills Matched</p>
            <div className="flex flex-wrap gap-1">
              {analysisResult.skillsMatched.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Formatting Suggestions */}
          <div className="mb-3">
            <p className="font-medium text-gray-700 mb-1">Formatting Suggestions</p>
            <p className="text-gray-600">{analysisResult.formattingSuggestions}</p>
          </div>

          {/* Summary */}
          <div>
            <p className="font-medium text-gray-700 mb-1">Summary</p>
            <p className="text-gray-600">{analysisResult.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysis;
