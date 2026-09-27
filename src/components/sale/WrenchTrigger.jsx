export default function WrenchTrigger({ expired, onOpen }) {
  return (
    <button
      onClick={onOpen}
      aria-label={expired ? 'Open tools panel' : 'Open tools panel — update available'}
      className="fixed right-5 top-24 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-[#141414] text-white shadow-lg transition hover:bg-[#1c1c1c] sm:right-8"
    >
      {!expired && <span className="pulse-ring" />}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z" />
      </svg>
      {!expired && (
        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-strike-green ring-2 ring-base" />
      )}
    </button>
  )
}
