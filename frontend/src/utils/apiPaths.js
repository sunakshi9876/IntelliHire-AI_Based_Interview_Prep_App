export const BASE_URL = "http://localhost:3000"

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",  // SignUp
        LOGIN: "/api/auth/login", // Authenticate user & return JWT Token 
        GET_PROFILE: "/api/auth/profile",// Get logged-in user details
    },
    IMAGE: {
        UPLOAD_IMAGE: '/api/auth/upload-image' // upload profile picture
    },
    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions", // Generate interview questions and answers using GEMini 
        GENERATE_EXPLANATION: '/api/ai/generate-explanation'
    },
    SESSION: {
        CREATE: '/api/sessions/create',          // Create a new interview session woth questions
        GET_ALL: "/api/sessions/my-sessions",   // GEt all user sessions
        GET_ONE: (id) => `/api/sessions/${id}`,   // GEt sessions details one by one
        DELETE: (id) => `/api/sessions/${id}`,   //delete user session
    },
    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add",     //add more questions to a session
        PIN: (id) => `/api/questions/${id}/pin`,   // Pin or unpin a question //
        UPDATE_NOTE: (id) => `/api/questions/${id}` // update/Add a notes to a question 
    },
}