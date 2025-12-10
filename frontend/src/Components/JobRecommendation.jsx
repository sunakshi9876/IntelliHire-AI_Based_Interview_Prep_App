import React, { useState } from "react";
import axios from "axios";

const JobFieldRecommendation = () => {
  const [skillsInput, setSkillsInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
  if (!skillsInput.trim()) {
    setErrorMsg("Please enter your skills!");
    setRecommendations([]);
    return;
  }

  setErrorMsg("");
  setLoading(true);

  try {
    const res = await axios.post("http://localhost:5002/recommend-jobs", {
      skills: skillsInput, // <-- Make sure this is exactly how backend expects it
    });

    console.log(res.data); // <-- Add this to debug
    setRecommendations(res.data);
  } catch (err) {
    console.error(err);
    setErrorMsg("Error fetching job recommendations. Please try again.");
    setRecommendations([]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-2xl mx-auto p-6 flex flex-col h-[85vh]">
      <h2 className="text-3xl font-extrabold text-indigo-900 mb-6 text-center">
        AI-Based Job Recommendations
      </h2>

      {/* Skills Input */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter your skills (comma separated)"
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          className="flex-1 px-5 py-3 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
        />
        <button
          onClick={handleRecommend}
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-500 text-white font-semibold px-5 py-3 rounded-2xl shadow-lg transform transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Recommend"}
        </button>
      </div>

      {/* Error Message */}
      {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

      {/* Recommendations List */}
      <div className="flex-1 overflow-y-auto space-y-5 pr-2">
        {recommendations.length === 0 ? (
          <p className="text-gray-600 text-center mt-12 text-lg">
            Enter your skills and click "Recommend" to see suitable job roles.
          </p>
        ) : (
          recommendations.map((job, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-indigo-900 text-lg">{job.field}</h3>
                <span className="text-gray-700 font-medium">{job.matchPercentage}% match</span>
              </div>

              {job.missingSkills.length > 0 && (
                <p className="text-sm text-gray-700 mb-3">
                  Skills to improve: <span className="font-medium">{job.missingSkills.join(", ")}</span>
                </p>
              )}

              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                <div
                  className="h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: `${job.matchPercentage}%` }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobFieldRecommendation;
