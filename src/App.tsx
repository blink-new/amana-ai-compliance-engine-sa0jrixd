import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createClient } from '@blinkdotnew/sdk'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import AuthPage from './pages/AuthPage'
import ShariahScreening from './pages/ShariahScreening'

// Initialize Blink SDK
const blink = createClient({
  projectId: 'amana-ai-compliance-engine-sa0jrixd',
  authRequired: false
})

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/screening" element={<ShariahScreening />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App