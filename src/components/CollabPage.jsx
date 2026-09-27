import { PracticeArt, ArenaArt, QuizArt, LayersArt, TrophyArt } from './TabIllustrations.jsx'
import CoursesPage from './CoursesPage.jsx'

const TAB_CONTENT = {
  Practice: {
    Art: PracticeArt,
    heading: 'Every problem here gets solved by real people before it goes live.',
    body: "Practice isn't a question bank I'm generating on the fly — each one is tried on real learners first, so the difficulty and hints actually make sense. Come back once this fills up, or see what's already working on Home.",
  },
  CodeArena: {
    Art: ArenaArt,
    heading: "The arena opens once there's someone to compete with.",
    body: "CodeArena only works if there are other minds in the ring with you — so the community comes before the leaderboard. Home already has a working piece of what this platform is trying to be.",
  },
  Quiz: {
    Art: QuizArt,
    heading: 'Still figuring out the right questions to ask.',
    body: "A good quiz doesn't just test memory, it tests how you think — and that needs real learner data to design well. This tab will hold it once it exists. For now, Home shows what's already live.",
  },
  'System Design': {
    Art: LayersArt,
    heading: 'Being designed the same way we teach it — one layer at a time.',
    body: "System design content takes longer to get right, because bad system-design content is already everywhere. I'd rather ship this slow and correct than fast and shallow. Home is where the rest of the platform already stands.",
  },
  Contests: {
    Art: TrophyArt,
    heading: 'Waiting for enough of you to make the first one worth running.',
    body: "A contest needs contestants, so this tab stays empty until there's a crowd here to fill it. Home is where you can already see what's been built so far — and it's growing.",
  },
}

export default function CollabPage({ tab, onBack, onOpenSale, saleRedeemed, saleExpired }) {
  if (tab === 'Courses') {
    return <CoursesPage onBack={onBack} onOpenSale={onOpenSale} saleRedeemed={saleRedeemed} saleExpired={saleExpired} />
  }

  const content = TAB_CONTENT[tab] || TAB_CONTENT.Practice
  const Art = content.Art

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-border bg-card">
        <Art />
      </div>

      <p className="mt-8 text-sm text-gray-500">{tab} is still being built</p>
      <h2 className="font-display mt-2 text-3xl text-white sm:text-4xl">Learn together. Build together.</h2>
      <p className="mt-3 text-base text-strike-green">{content.heading}</p>
      <p className="mt-4 max-w-xl text-gray-400">{content.body}</p>

      <button
        onClick={onBack}
        className="mt-8 rounded-full border border-border bg-[#1a1a1a] px-6 py-2.5 text-sm text-white transition hover:bg-[#222]"
      >
        Back to Home
      </button>
    </section>
  )
}
