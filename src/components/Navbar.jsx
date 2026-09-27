const LINKS = ['Home', 'Courses', 'Practice', 'CodeArena', 'Quiz', 'System Design', 'Contests']

export default function Navbar({ active, onNavigate }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-base/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button onClick={() => onNavigate('Home')} className="font-display text-xl tracking-widest text-white">
          STRIKE
        </button>

        <ul className="hidden items-center gap-1 rounded-full border border-border bg-panel p-1 md:flex">
          {LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => onNavigate(link)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active === link
                    ? 'bg-[#2a2a2a] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm text-gray-300 sm:flex">
            🔥 0
          </span>
          <button className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm text-white">
            A <span className="text-xs text-gray-500">▾</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
