const CODE_LINES = [
  { n: 1, text: '// Strike Platform - Welcome Code', cls: 'text-gray-500 italic' },
  { n: 2, text: 'const welcome = async () => {', cls: 'text-purple-400' },
  { n: 3, text: '  const user = await getUser();', cls: 'text-gray-200' },
  { n: 4, text: '  console.log(`Welcome ${user.name}!`);', cls: 'text-gray-200' },
  { n: 5, text: '  console.log(`Level: ${user.level}`);', cls: 'text-gray-200' },
  { n: 6, text: '  return { status: "success" };', cls: 'text-gray-200' },
  { n: 7, text: '};', cls: 'text-gray-200' },
  { n: 9, text: 'const getUser = async () => ({', cls: 'text-purple-400' },
  { n: 10, text: '  name: "Anubhav Jha",', cls: 'text-gray-200' },
  { n: 11, text: '  level: "Beginner"', cls: 'text-gray-200' },
  { n: 12, text: '});', cls: 'text-gray-200' },
  { n: 14, text: 'welcome();', cls: 'text-gray-200' },
]

const SUGGESTIONS = [
  { title: 'Refactor welcome()', desc: 'Extract user fetch and logging into separate utils for better testability.' },
  { title: 'Add input validation', desc: 'Validate user.level against enum: Beginner | Advanced | Expert.' },
  { title: 'Improve typing', desc: 'Define User type and return type for getUser and welcome functions.' },
  { title: 'Implement error handling', desc: 'Add try-catch blocks and custom error messages for async operations.' },
]

export default function CodeEditor() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="overflow-hidden rounded-2xl border border-border bg-panel">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#2a2a2a]" />
            <span className="h-3 w-3 rounded-full bg-[#2a2a2a]" />
            <span className="h-3 w-3 rounded-full bg-[#2a2a2a]" />
            <span className="ml-3 flex items-center gap-2 rounded-md border border-strike-green/40 bg-black/40 px-3 py-1 text-sm text-white">
              {'</>'} strike.js <span className="h-2 w-2 rounded-full bg-strike-green" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-strike-green/40 px-2 py-1 text-xs text-strike-green">READY</span>
            <button className="flex items-center gap-1 rounded-md bg-[#2a2a2a] px-4 py-1.5 text-sm text-white">
              ▶ Run Code
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          <pre className="overflow-x-auto p-6 font-mono text-sm leading-7">
            {CODE_LINES.map((line) => (
              <div key={line.n} className="flex gap-4">
                <span className="w-5 select-none text-right text-gray-600">{line.n}</span>
                <span className={line.cls}>{line.text}</span>
              </div>
            ))}
          </pre>

          <div className="border-t border-border p-6 md:border-l md:border-t-0">
            <div className="mb-4 flex gap-6 text-sm">
              <span className="border-b-2 border-strike-green pb-1 text-white">AI Assistant</span>
              <span className="pb-1 text-gray-500">Bug Shots</span>
              <span className="ml-auto text-xs text-gray-600">Static</span>
            </div>
            <p className="mb-3 text-xs tracking-wide text-gray-500">QUICK SUGGESTIONS</p>
            <div className="space-y-3">
              {SUGGESTIONS.map((s) => (
                <div key={s.title} className="rounded-lg border border-border bg-card p-4">
                  <p className="text-sm font-medium text-white">{s.title}</p>
                  <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
