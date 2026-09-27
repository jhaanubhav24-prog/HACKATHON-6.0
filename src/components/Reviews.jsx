const NAMES = ['Adheli Priyanka', 'Alok', 'Aryan Verma', 'Shree', 'Navlesh Kumar', 'Namita Singh']

export default function Reviews() {
  const doubled = [...NAMES, ...NAMES]
  return (
    <section className="pb-24 text-center">
      <p className="text-xs tracking-widest text-strike-green">★ REVIEWS</p>
      <h2 className="font-display mt-2 text-3xl text-white sm:text-4xl">Trusted by Visionaries</h2>
      <p className="mx-auto mt-3 max-w-xl text-gray-500">
        Hear from real users who achieved success with our automation
      </p>

      <div className="relative mt-10 overflow-hidden">
        <div className="marquee-track gap-4 px-4">
          {doubled.map((name, i) => (
            <div
              key={i}
              className="w-56 shrink-0 rounded-xl border border-border bg-card px-5 py-4 text-left"
            >
              <p className="text-sm font-medium text-white">{name}</p>
              <p className="mt-1 text-xs text-gray-500">"Strike helped me crack my interview."</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
