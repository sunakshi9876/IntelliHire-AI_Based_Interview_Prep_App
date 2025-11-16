import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Landingpage from './pages/Landingpage'
import Dashboard from './pages/Home/Dashboard'
import InterviewPrep from './pages/interviewPrep/InterviewPrep'
import UserProvider from './context/useContext'

function App() {
  return (
    <UserProvider>
      <div className=''>
        <Router>
          <Routes>
            {/* Default Route */}
            <Route path='/' element={<Landingpage />} />

            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />
          </Routes>
        </Router>
        <Toaster
          toastOptions={{
            style: {
              fontSize: "13px",
            },
          }}
        />
      </div>
    </UserProvider>

  )
}

export default App