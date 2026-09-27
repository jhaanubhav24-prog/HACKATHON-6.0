// A reusable "marker highlight" for a phrase inside a paragraph — a soft green
// chip behind the text, not just colored text. Colored text alone got lost on
// this page because green is already used everywhere (borders, icons, CTAs),
// so a real highlighted phrase needs its own background to actually pop.
export default function Highlight({ children, className = '' }) {
  return (
    <mark
      className={`rounded bg-strike-green/15 px-1.5 py-0.5 font-medium text-strike-green ${className}`}
    >
      {children}
    </mark>
  )
}
