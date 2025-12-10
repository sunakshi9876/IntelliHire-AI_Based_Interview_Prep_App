import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles, LuBook, LuTarget, LuActivity } from "react-icons/lu";

import { APP_FEATURES } from "../utils/data";
import { Modal } from "../Components/Modal";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import { UserContext } from "../context/useContext";
import ProfileinfoCard from "../context/Cards/ProfileinfoCard";
import ResumeAnalysis from "../Components/ResumeAnalysis";
import JobRecommendation from "../Components/JobRecommendation";

const Landingpage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [openResumeModal, setOpenResumeModal] = useState(false);
  const [openJobRecoModal, setOpenJobRecoModal] = useState(false);

  const handleCTA = () => {
    if (!user) setOpenAuthModal(true);
    else navigate("/dashboard");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 relative overflow-hidden py-24">
        {/* Header */}
        <header className="container mx-auto flex justify-between items-center px-6 sm:px-12 mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-text-shine tracking-tight">
            IntelliHire
          </h1>

          {user ? (
            <ProfileinfoCard />
          ) : (
            <button
              onClick={() => setOpenAuthModal(true)}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-xl transition-all transform hover:scale-105"
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Content */}
        <div className="container mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-start gap-12">
          {/* Left Text */}
          <div className="md:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-800 bg-indigo-200 px-4 py-1.5 rounded-full border border-indigo-300 animate-pulse shadow-sm">
              <LuSparkles /> AI-Powered
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-indigo-900 leading-tight">
              Master Interviews with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 animate-text-shine">
                AI Guidance
              </span>
            </h1>

            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
              Get personalized questions, detailed explanations, and structured
              learning paths to ace your interviews. IntelliHire adapts to your
              skills and guides you step by step.
            </p>

            <button
              onClick={handleCTA}
              className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-indigo-700 text-white px-10 py-3 rounded-full font-semibold text-lg shadow-xl transition-all transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Right Modules */}
          <div className="md:w-1/2 grid gap-6">
            {[
              {
                title: "Interview Prep",
                desc: "Practice mock interviews with AI-generated questions, evaluations, and instant feedback.",
                action: handleCTA,
                icon: <LuBook className="text-purple-500" />,
              },
              {
                title: "AI-Based Resume Analysis",
                desc: "Get ATS scoring, skill gap insights, formatting suggestions, and tailored resume improvements.",
                icon: <LuTarget className="text-pink-500" />,
                action: () => setOpenResumeModal(true),
              },
              {
                title: "AI-Based Job Recommendation",
                desc: "Discover job roles matched to your skills and experience using intelligent AI-based matching.",
                icon: <LuActivity className="text-red-500" />,
                action: () => setOpenJobRecoModal(true),
              },
            ].map((module, index) => (
              <div
                key={index}
                onClick={module.action}
                className="cursor-pointer bg-white p-6 rounded-3xl shadow-xl border border-gray-200 transition-all hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50"
              >
                <div className="flex items-center gap-3 text-lg font-semibold mb-2">
                  {module.icon} {module.title}
                </div>
                <p className="text-gray-700">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Analysis Modal */}
      <Modal
        isOpen={openResumeModal}
        onClose={() => setOpenResumeModal(false)}
      >
        <ResumeAnalysis />
      </Modal>

      {/* Job Recommendation Modal */}
      <Modal
        isOpen={openJobRecoModal}
        onClose={() => setOpenJobRecoModal(false)}
      >
        <JobRecommendation />
      </Modal>

      {/* Features Section */}
      <section className="w-full bg-gradient-to-t from-purple-50 to-white py-24">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-16">
            Features that Make You Shine ✨
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {APP_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200 transition-all hover:shadow-2xl hover:scale-105 hover:bg-purple-50"
              >
                <h3 className="text-lg font-semibold mb-3 text-indigo-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-indigo-50 py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-6">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            Have questions or need assistance? Reach out to us!
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 text-white px-10 py-3 rounded-full font-semibold text-lg shadow-xl transition-all transform hover:scale-105"
          >
            Get in Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-8 border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} IntelliHire – Your AI Interview Companion
        </p>
      </footer>

      {/* Authentication Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
      >
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
      </Modal>
    </>
  );
};

export default Landingpage;
