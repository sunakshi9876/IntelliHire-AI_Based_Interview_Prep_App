import React, { useState } from "react";

const jobFields = [
  {
    field: "Frontend Developer",
    requiredSkills: ["React", "JavaScript", "CSS", "HTML"],
  },
  {
    field: "Backend Developer",
    requiredSkills: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    field: "Full Stack Engineer",
    requiredSkills: ["React", "Node.js", "SQL", "API Design"],
  },
  {
    field: "Data Analyst",
    requiredSkills: ["Python", "Pandas", "SQL", "Visualization"],
  },
  {
    field: "AI/ML Engineer",
    requiredSkills: ["Python", "TensorFlow", "PyTorch", "ML Algorithms"],
  },
];

const JobFieldRecommendation = () => {
  const [skillsInput, setSkillsInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleRecommend = () => {
    if (!skillsInput.trim()) {
      alert("Please enter your skills!");
      return;
    }

    const userSkills = skillsInput
      .split(",")
      .map((s) => s.trim().toLowerCase());

    const matchedFields = jobFields.map((job) => {
      const matchCount = job.requiredSkills.filter(skill =>
        userSkills.includes(skill.toLowerCase())
      ).length;

      const matchPercentage = Math.round((matchCount / job.requiredSkills.length) * 100);

      const missingSkills = job.requiredSkills.filter(
        skill => !userSkills.includes(skill.toLowerCase())
      );

      return { ...job, matchPercentage, missingSkills };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);

    setRecommendations(matchedFields);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col h-[80vh]">
      <h2 className="text-2xl font-bold text-indigo-900 mb-4 text-center">
        Recommended Job Fields
      </h2>

      {/* Skills Input */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Enter your skills (comma separated)"
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
        />
        <button
          onClick={handleRecommend}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-500 text-white font-semibold px-4 py-2 rounded-xl shadow transition-all hover:scale-105"
        >
          Recommend
        </button>
      </div>

      {/* Recommendations List */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {recommendations.length === 0 ? (
          <p className="text-gray-600 text-center mt-8">
            Enter your skills and click "Recommend" to see suitable job fields.
          </p>
        ) : (
          recommendations.map((job, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-indigo-50 border border-gray-200 shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-indigo-900 text-lg">{job.field}</h3>
                <span className="text-gray-700 font-medium">{job.matchPercentage}% match</span>
              </div>
              {job.missingSkills.length > 0 && (
                <p className="text-sm text-gray-700 mb-2">
                  Skills to improve: {job.missingSkills.join(", ")}
                </p>
              )}
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700"
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
