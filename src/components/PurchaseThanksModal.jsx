import Emoji from './Emoji.jsx'

// Shared "thanks" confirmation used by every purchase flow on the site —
// the homepage demo course card and every card on the Courses page — so a
// buyer sees the exact same moment no matter which course they bought.
export default function PurchaseThanksModal({ open, onClose, courseName }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="animate-flipIn max-w-sm rounded-xl border border-strike-green/30 bg-card p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="inline-block animate-wiggle">
          <Emoji codePoint="1f60a" label="😊" size={40} />
        </span>
        <p className="mt-4 text-white">Thanks for your trust.</p>
        {courseName && (
          <p className="mt-1 font-mono text-xs tracking-wide text-strike-green">{courseName}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          We try to keep it simple, interact with you, learn with you, and give you the
          ability to solve problems on your own — not just follow along.
        </p>
        <button
          onClick={onClose}
          className="mt-5 rounded-full border border-strike-green px-5 py-2 text-xs font-semibold text-strike-green transition hover:bg-strike-green hover:text-black"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
