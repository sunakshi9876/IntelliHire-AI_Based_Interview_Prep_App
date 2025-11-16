import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles, LuBook, LuTarget, LuActivity } from "react-icons/lu";

import { APP_FEATURES } from "../utils/data";
import { Modal } from "../Components/Modal";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import { UserContext } from "../context/useContext";
import ProfileinfoCard from "../context/Cards/ProfileinfoCard";

const Landingpage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) setOpenAuthModal(true);
    else navigate("/dashboard");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="w-full min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 relative overflow-hidden py-16">
        {/* Header */}
        <header className="container mx-auto flex justify-between items-center px-6 sm:px-12 mb-12">
          <h1 className="text-3xl font-bold text-gray-800">IntelliHire</h1>
          {user ? (
            <ProfileinfoCard />
          ) : (
            <button
              onClick={() => setOpenAuthModal(true)}
              className="bg-amber-600 hover:bg-black text-white px-6 py-2.5 rounded-full font-semibold shadow-lg transition-all"
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Content */}
        <div className="container mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-start gap-12">
          {/* Left Text */}
          <div className="md:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 bg-amber-200 px-3 py-1 rounded-full border border-amber-300 animate-pulse">
              <LuSparkles /> AI-Powered
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Master Interviews with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-yellow-200 animate-text-shine">AI Guidance</span>
            </h1>

            <p className="text-gray-700 text-lg">
              Get personalized questions, detailed explanations, and structured learning paths to ace your interviews. IntelliHire adapts to your skills and guides you step by step.
            </p>

            <button
              onClick={handleCTA}
              className="bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-100 hover:text-black border border-yellow-50 transition-all shadow-lg"
            >
              Get Started
            </button>
          </div>

          {/* Right Content Filled with Text/Highlights */}
          <div className="md:w-1/2 grid gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 text-amber-600 mb-2">
                <LuBook /> Learn
              </div>
              <p className="text-gray-700">
                Structured learning modules with role-specific content to prepare you efficiently.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 text-amber-600 mb-2">
                <LuTarget /> Practice
              </div>
              <p className="text-gray-700">
                Interactive mock questions and real-time feedback to improve your answers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 text-amber-600 mb-2">
                <LuActivity /> Track
              </div>
              <p className="text-gray-700">
                Progress tracking, analytics, and recommendations tailored to your growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="w-full bg-[#FFFCEF] py-20">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Features that Make You Shine ✨
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {APP_FEATURES.map((feature) => (
              <div key={feature.id} className="bg-[#FFFEF8] p-6 rounded-2xl shadow-md hover:shadow-2xl border border-amber-100 transition-all hover:scale-105">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 text-center py-6 mt-10 border-t border-gray-200">
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
