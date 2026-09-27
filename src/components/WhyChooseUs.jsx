import { IconPeople, IconChat, IconFolder, IconChart } from './Icons.jsx'

function Badge({ Icon }) {
  return (
    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-strike-green/30 bg-strike-green/10 text-strike-green">
      <Icon />
    </span>
  )
}

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 text-center">
      <h2 className="font-display text-3xl text-white sm:text-4xl">Why Choose Us</h2>
      <p className="mx-auto mt-4 max-w-2xl text-gray-500">
        Learn smarter with modern tools, guided mentors, and a platform built to help you grow
        your skills faster, setting a new benchmark for modern coding excellence.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 text-left">
          <Badge Icon={IconPeople} />
          <h3 className="text-lg text-white">
            Inter<span className="font-semibold">view</span> Preparation
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Learn faster with hands-on tracks and mentor feedback.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 text-left">
          <Badge Icon={IconChat} />
          <h3 className="text-lg text-white">AI Support</h3>
          <p className="mt-2 text-sm text-gray-500">
            Get contextual help from an assistant that understands your code.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 text-left">
          <Badge Icon={IconFolder} />
          <h3 className="text-lg text-white">
            <span className="font-semibold">Projects</span> Based Learning
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Build real things, not just solve isolated problems.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 text-left">
          <div className="flex items-start justify-between">
            <Badge Icon={IconChart} />
            <span className="rounded-full border border-strike-green/40 px-2 py-0.5 text-xs text-strike-green">
              Live Progress Tracking
            </span>
          </div>
          <h3 className="text-lg text-white">Track Your Progress</h3>
          <p className="mt-1 text-sm text-strike-green">Grow With Strike</p>
        </div>
      </div>
    </section>
  )
}
