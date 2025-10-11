import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MetricsRow from './components/MetricsRow'
import WhyTrust from './components/WhyTrust'
import HowItWorks from './components/HowItWorks'
import Candidates from './components/Candidates'
import Security from './components/Security'
import RuralEmpowerment from './components/RuralEmpowerment'
import Results from './components/Results'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Hero />
      <MetricsRow />
      <WhyTrust />
      <HowItWorks />
      <Candidates />
      <Security />
      <RuralEmpowerment />
      <Results />
      <Footer />
    </div>
  )
}

export default App
