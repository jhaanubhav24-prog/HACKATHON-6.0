import ImpactTicker from './ImpactTicker.jsx'

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pb-24 pt-20 text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(57,255,136,0.08),transparent_70%)]" />

      <h2 className="font-display text-2xl text-gray-500 sm:text-3xl">
        Take control of your
      </h2>
      <h1 className="font-display mt-2 text-4xl font-bold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] sm:text-6xl md:text-7xl">
        Future With <span className="text-white">Strike</span>
      </h1>

      <p className="mt-8 max-w-xl text-base text-gray-400 sm:text-lg">
        Master DSA, System Design &amp; AI with interactive coding environments
      </p>

      <button className="mt-10 rounded-full border border-border bg-[#1a1a1a] px-8 py-3 font-display text-sm text-white shadow-glow transition hover:bg-[#222]">
        Join Us
      </button>

      <ImpactTicker />
    </section>
  )
}
