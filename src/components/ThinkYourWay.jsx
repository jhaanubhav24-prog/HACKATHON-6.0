import { IconBrain, IconCompare, IconShield, IconVideo } from './Icons.jsx'

const POINTS = [
  {
    icon: IconBrain,
    title: 'Your task, your logic',
    body: 'No copy-paste solution. You get a real problem and build your own way through it — the most original approaches win rewards.',
  },
  {
    icon: IconCompare,
    title: 'See how differently people think',
    body: "Compare your solution with how others cracked the exact same problem. It's the fastest way to spot the blind spots in your own thinking.",
  },
  {
    icon: IconShield,
    title: 'Confidence, not just knowledge',
    body: 'Knowing a concept and trusting yourself to use it are two different things. This is where the second one gets built.',
  },
  {
    icon: IconVideo,
    title: 'Live classes, live thinking',
    body: 'Real-time sessions where different perspectives collide — and that friction is exactly what sharpens your own thinking.',
  },
]

export default function ThinkYourWay() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 text-center">
      <h2 className="font-display text-3xl text-white sm:text-4xl">Not another walkthrough</h2>
      <p className="mx-auto mt-4 max-w-2xl text-gray-400">
        AI can already explain the answer. We hand you the problem instead, and let you find your
        own way through it.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {POINTS.map((p) => (
          <div key={p.title} className="rounded-xl border border-border bg-card p-6 text-left">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-strike-green/30 bg-strike-green/10 text-strike-green">
              <p.icon />
            </span>
            <h3 className="text-lg text-white">{p.title}</h3>
            <p className="mt-2 text-sm text-gray-500">{p.body}</p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-xl text-sm text-gray-500">
        It might look pricier than a video course. What you're really paying for is not needing
        anyone to solve the next problem for you.
      </p>
    </section>
  )
}
