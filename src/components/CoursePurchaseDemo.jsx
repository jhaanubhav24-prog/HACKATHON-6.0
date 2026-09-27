import { useEffect, useState } from 'react'
import PurchaseThanksModal from './PurchaseThanksModal.jsx'

const STORAGE_KEY = 'strike_demo_purchase_v1'
const COURSE_NAME = 'DSA Foundations — Strike Special Batch'

function readPurchased() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch (e) {
    return false
  }
}

export default function CoursePurchaseDemo({ onExploreCourses }) {
  const [purchased, setPurchased] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  useEffect(() => {
    setPurchased(readPurchased())
  }, [])

  const handlePurchase = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch (e) {
      /* non-fatal: purchased flag just won't persist across reloads */
    }
    setPurchased(true)
    setShowThankYou(true)
  }

  return (
    <div className="mx-auto mt-16 max-w-md text-left">
      <div className="rounded-xl border border-border bg-card p-6">
        <span className="rounded-full border border-strike-green/40 px-2 py-0.5 text-xs text-strike-green">
          Demo course
        </span>
        <h3 className="mt-3 text-lg text-white">{COURSE_NAME}</h3>
        <p className="mt-2 text-sm text-gray-500">
          A hands-on track through data structures and algorithms, mentor-reviewed, built around
          the exact dip-and-recovery pattern above.
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-semibold text-white">₹1,499</span>
          <button
            onClick={handlePurchase}
            disabled={purchased}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              purchased
                ? 'cursor-default bg-strike-greendim/30 text-strike-green'
                : 'bg-strike-green text-black hover:opacity-90'
            }`}
          >
            {purchased ? 'Purchased ✓' : 'Purchase'}
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-600">
          Demo flow only — no real payment is taken. This exists to show the purchase → localStorage → confirmation loop.
        </p>
      </div>

      {/* One course here is just the entry point — the real catalog lives on
          the Courses tab, so the demo card always points somewhere further. */}
      <button
        onClick={onExploreCourses}
        className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-border bg-transparent px-5 py-2.5 text-sm text-gray-300 transition hover:border-strike-green/50 hover:text-white"
      >
        Explore more courses →
      </button>

      <PurchaseThanksModal open={showThankYou} onClose={() => setShowThankYou(false)} courseName={COURSE_NAME} />
    </div>
  )
}
