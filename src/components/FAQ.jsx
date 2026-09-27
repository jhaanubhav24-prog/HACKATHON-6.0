import { useState } from 'react'

const QUESTIONS = [
  {
    q: 'What programming languages can I learn on the platform?',
    a: 'Strike supports JavaScript, Python, C++, and Java across all coding tracks.',
  },
  {
    q: 'What will I learn in the DSA + Gen AI course?',
    a: 'Core data structures, algorithms, and how to apply Gen AI tooling to solve them faster.',
  },
  {
    q: 'Do I need prior coding experience to join DSA + Gen AI course?',
    a: 'No — the course starts from fundamentals before moving to advanced patterns.',
  },
  {
    q: 'How is Gen AI integrated with DSA in this course?',
    a: 'Every module pairs a concept with an AI-assisted practice environment.',
  },
  {
    q: 'Will this course help me crack product-based company interviews?',
    a: 'Yes, the curriculum is mapped to real interview patterns from top product companies.',
  },
  {
    q: 'How long does it take to complete the DSA + Gen AI course?',
    a: 'Most learners complete it in 8-10 weeks at a steady pace.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
      <h2 className="font-display text-3xl text-white sm:text-4xl">
        Your Questions, <span className="text-strike-green">Answered</span>
      </h2>
      <p className="mt-3 text-gray-500">Get instant answers to most common questions about Strike.</p>

      <div className="mt-8 space-y-3 text-left">
        {QUESTIONS.map((item, i) => (
          <div key={i} className="rounded-xl border border-border bg-card">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-sm text-white"
            >
              {item.q}
              <span className="text-gray-500">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <p className="border-t border-border px-5 py-4 text-sm text-gray-500">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
