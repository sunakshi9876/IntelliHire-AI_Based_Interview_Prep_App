import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/input/Input';
import SpinnerLoader from '../../Components/layout/loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus, description } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError('Please fill all required fields.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions: 10,
      });

      const generateQuestions = Array.isArray(aiResponse.data)
        ? aiResponse.data
        : aiResponse.data?.text
        ? [{ question: aiResponse.data.text, answer: '' }]
        : [];

      if (!generateQuestions.length) {
        setError('AI did not return valid questions.');
        setIsLoading(false);
        return;
      }

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        description: description || 'No description provided',
        questions: generateQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      } else {
        setError('Failed to create session.');
      }
    } catch (err) {
      console.error('Create Session Error:', err);
      setError(err.response?.data?.message || err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => navigate(-1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4 py-10">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl transform transition-transform duration-500 hover:scale-[1.02]">
        <h3 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Start a New Interview Journey
        </h3>
        <p className="text-base text-gray-500 mb-8 leading-relaxed text-center">
          Fill out a few quick details and unlock your personalized set of interview questions.
        </p>

        <form onSubmit={handleCreateSession} className="space-y-6">
          <Input
            value={formData.role}
            onChange={({ target }) => handleChange('role', target.value)}
            label="Target Role"
            placeholder="e.g., Frontend Developer"
            className="focus:ring-orange-400"
          />
          <Input
            value={formData.experience}
            onChange={({ target }) => handleChange('experience', target.value)}
            label="Years of Experience"
            placeholder="e.g., 1 Year, 3+ Years"
            className="focus:ring-orange-400"
          />
          <Input
            value={formData.topicsToFocus}
            onChange={({ target }) => handleChange('topicsToFocus', target.value)}
            label="Topics to Focus On"
            placeholder="e.g., React, Node.js, MongoDB"
            className="focus:ring-orange-400"
          />
          <Input
            value={formData.description}
            onChange={({ target }) => handleChange('description', target.value)}
            label="Session Description (Optional)"
            placeholder="Any specific goals or notes"
            className="focus:ring-orange-400"
          />

          {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleGoBack}
              className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium transition-all"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <SpinnerLoader /> : 'Create Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSessionForm;
