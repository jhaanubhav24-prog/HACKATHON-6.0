import { useEffect, useRef, useState } from 'react'
import Emoji from './Emoji.jsx'

// Media query is read once; if the visitor has reduced-motion on, the rider
// just sits at its first mood instead of animating — same intent as the
// prefers-reduced-motion block in index.css, but this loop runs on rAF
// rather than CSS animation, so it needs its own check.
function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const DEFAULT_Y_PAD = { scale: 90, offset: 5 }

/**
 * A small "mood" marker that rides along an existing, invisible <path> node
 * (passed in via pathRef — see MotionGuide below) instead of tracking a
 * straight-line timeline. Because it reads real arc length with
 * getPointAtLength, it naturally moves slower across flat stretches of the
 * curve and faster down steep ones — the pacing follows the graph's own
 * shape rather than the clock.
 *
 * `moods` is a list of { at, codePoint, label } where `at` is progress
 * (0 = start of the line, 1 = end). Whichever zone the rider is currently
 * in decides its expression, so excitement/confusion/drift genuinely track
 * where the curve is, not just how much time has passed.
 *
 * Position writes bypass React state (direct ref.style mutation) so the
 * ~60fps loop never triggers a re-render; only a mood *change* calls
 * setState, which is at most a few times per lap.
 */
export default function GraphRider({ pathRef, viewBox, moods, duration = 7000, yPad = DEFAULT_Y_PAD }) {
  const nodeRef = useRef(null)
  const [mood, setMood] = useState(moods[0])
  const moodRef = useRef(moods[0])

  // Depend on primitives pulled out of viewBox/yPad rather than the objects
  // themselves. A call site writing `viewBox={{ width: 600, height: 200 }}`
  // inline gets a brand-new object on every parent re-render — and this
  // page re-renders every second because of the sale countdown — so
  // depending on the object directly tore the animation loop down and
  // restarted it once a second, which looked like the rider snapping back
  // to the start before finishing a lap. Primitives compare by value, so
  // the effect only actually restarts when the numbers themselves change.
  const { width, height } = viewBox
  const { scale, offset } = yPad

  useEffect(() => {
    const path = pathRef.current
    const node = nodeRef.current
    if (!path || !node) return

    if (prefersReducedMotion()) {
      const { x, y } = path.getPointAtLength(0)
      node.style.left = `${(x / width) * 100}%`
      node.style.top = `${(y / height) * scale + offset}%`
      return
    }

    const total = path.getTotalLength()
    let frameId
    let startTs

    function tick(ts) {
      if (startTs === undefined) startTs = ts
      const t = ((ts - startTs) % duration) / duration
      const { x, y } = path.getPointAtLength(t * total)
      node.style.left = `${(x / width) * 100}%`
      node.style.top = `${(y / height) * scale + offset}%`

      const active = [...moods].reverse().find((m) => t >= m.at) || moods[0]
      if (active.label !== moodRef.current.label) {
        moodRef.current = active
        setMood(active)
      }
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [pathRef, width, height, moods, duration, scale, offset])

  return (
    <div
      ref={nodeRef}
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: '0%', top: '0%' }}
    >
      {/* short caption tracking the rider's current mood — fades in place
          above the icon rather than sliding, so it never reads as a second
          moving object fighting the rider for attention */}
      {mood.caption && (
        <span
          key={mood.caption}
          className="animate-captionFade absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-strike-green/40 bg-base px-2 py-0.5 text-[10px] font-medium text-strike-green"
        >
          {mood.caption}
        </span>
      )}
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-strike-green bg-base shadow-[0_0_12px_rgba(57,255,136,0.35)] transition-colors duration-300">
        <Emoji codePoint={mood.codePoint} label={mood.label} size={16} />
      </div>
    </div>
  )
}

// Invisible geometry-only path: same `d` as the visible curve, rendered with
// no stroke so it costs nothing to paint. Its only job is to give
// getTotalLength/getPointAtLength something to measure against, decoupled
// from however the visible line is actually drawn (solid, dashed, split
// into segments, mid-draw-in animation, etc).
export function MotionGuide({ pathRef, d }) {
  return <path ref={pathRef} d={d} fill="none" stroke="none" />
}
