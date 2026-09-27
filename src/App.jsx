import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import CodeEditor from './components/CodeEditor.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import ThinkYourWay from './components/ThinkYourWay.jsx'
import AIJobsSection from './components/AIJobsSection.jsx'
import LearningJourney from './components/LearningJourney.jsx'
import MotivationGraph from './components/MotivationGraph.jsx'
import CoursePurchaseDemo from './components/CoursePurchaseDemo.jsx'
import StudentJourney from './components/StudentJourney.jsx'
import Mentors from './components/Mentors.jsx'
import Reviews from './components/Reviews.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'
import CollabPage from './components/CollabPage.jsx'
import WrenchTrigger from './components/sale/WrenchTrigger.jsx'
import SaleModal from './components/sale/SaleModal.jsx'
import { useSaleTimer } from './hooks/useSaleTimer.js'

export default function App() {
  const [page, setPage] = useState('Home')
  const [modalOpen, setModalOpen] = useState(false)
  const timer = useSaleTimer()

  return (
    <div className="min-h-screen bg-base">
      <Navbar active={page} onNavigate={setPage} />

      <main>
        {page === 'Home' ? (
          <>
            <Hero />
            <CodeEditor />
            <WhyChooseUs />
            <ThinkYourWay />
            <AIJobsSection />
            <LearningJourney onOpenSale={() => setModalOpen(true)} />
            <MotivationGraph onOpenSale={() => setModalOpen(true)} />
            <CoursePurchaseDemo
              onExploreCourses={() => {
                // this button sits deep in the page, so jump to top along
                // with the page swap — otherwise the Courses grid renders
                // off-screen at whatever scroll position the demo card was at
                setPage('Courses')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
            <StudentJourney />
            <Mentors />
            <Reviews />
            <FAQ />
          </>
        ) : (
          <CollabPage
            tab={page}
            onBack={() => setPage('Home')}
            onOpenSale={() => setModalOpen(true)}
            saleRedeemed={timer.redeemed}
            saleExpired={timer.expired}
          />
        )}
      </main>

      <Footer />

      <WrenchTrigger expired={timer.expired} onOpen={() => setModalOpen(true)} />
      <SaleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        expired={timer.expired}
        hours={timer.hours}
        minutes={timer.minutes}
        seconds={timer.seconds}
        redeemed={timer.redeemed}
        markRedeemed={timer.markRedeemed}
        isDemo={timer.isDemo}
        resetDemo={timer.resetDemo}
        seatsClaimed={timer.seatsClaimed}
        seatsTotal={timer.seatsTotal}
      />
    </div>
  )
}
