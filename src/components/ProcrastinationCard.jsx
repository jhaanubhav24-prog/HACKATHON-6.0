export default function ProcrastinationCard() {
  return (
    <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-6 rounded-xl border border-border bg-card p-6 text-left sm:flex-row">
      <DeskIllustration />
      <div>
        <h3 className="text-sm font-semibold text-white">"I'll do it today. I'll do it tomorrow."</h3>
        <p className="mt-2 text-sm text-gray-500">
          Most students tell themselves the plan is simple, so there's no rush — today becomes
          tomorrow, and tomorrow finds the same excuse. Meanwhile someone else already opened the
          same lesson and started.
        </p>
      </div>
    </div>
  )
}

function DeskIllustration() {
  return (
    <svg width="140" height="100" viewBox="0 0 200 140" className="shrink-0">
      <path d="M40 30 L40 8 L70 8" stroke="#39ff88" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M28 40 L82 40 L74 8 L36 8 Z" fill="none" stroke="#39ff88" strokeWidth="1.5" opacity="0.6" />
      <path d="M10 40 L190 40 L190 46 L10 46 Z" fill="#141414" stroke="#2a2a2a" strokeWidth="1.5" />
      <rect x="100" y="46" width="50" height="34" rx="3" fill="#111" stroke="#2a2a2a" strokeWidth="1.5" />
      <rect x="104" y="50" width="42" height="22" rx="2" fill="#0a0a0a" stroke="#39ff88" strokeWidth="1" opacity="0.5" />
      <circle cx="45" cy="60" r="16" fill="#141414" stroke="#39ff88" strokeWidth="2" className="animate-blink" />
      <path
        d="M60 78c6-4 10-6 16-4s8 8 6 14"
        stroke="#39ff88"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        className="animate-fadeSeq"
      />
      <path d="M30 100c4-10 12-16 22-16s18 6 22 16" stroke="#2a2a2a" strokeWidth="2" fill="#111" />
      <circle cx="24" cy="112" r="6" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
      <circle cx="36" cy="120" r="5" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
      <line x1="10" y1="46" x2="10" y2="130" stroke="#2a2a2a" strokeWidth="2" />
      <line x1="190" y1="46" x2="190" y2="130" stroke="#2a2a2a" strokeWidth="2" />
    </svg>
  )
}
