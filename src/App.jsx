import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustFeatures from './components/TrustFeatures'
import HowItWorks from './components/HowItWorks'
import Candidates from './components/Candidates'
import Security from './components/Security'
import Results from './components/Results'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Hero />
      <TrustFeatures />
      <HowItWorks />
      <Candidates />
      <Security />
      <Results />
      <Footer />
    </div>
  )
}

export default App
