// Turns straight line-segment data into a path with rounded corners instead
// of sharp V-turns. Unlike a Catmull-Rom spline, this never overshoots past
// a point's own value, so it can't produce the odd little bumps a spline
// creates when the data reverses direction sharply.
function dist(a, b) {
  return Math.hypot(b[0] - a[0], b[1] - a[1])
}

function pointToward(from, to, amount) {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const len = Math.hypot(dx, dy)
  if (len === 0) return from
  return [from[0] + (dx / len) * amount, from[1] + (dy / len) * amount]
}

export function smoothPath(points, radius = 22) {
  if (points.length < 2) return ''
  if (points.length === 2) return `M${points[0][0]},${points[0][1]} L${points[1][0]},${points[1][1]}`

  let d = `M${points[0][0]},${points[0][1]}`

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const next = points[i + 1]

    const r1 = Math.min(radius, dist(prev, curr) / 2)
    const r2 = Math.min(radius, dist(curr, next) / 2)

    const before = pointToward(curr, prev, r1)
    const after = pointToward(curr, next, r2)

    d += ` L${before[0]},${before[1]} Q${curr[0]},${curr[1]} ${after[0]},${after[1]}`
  }

  const last = points[points.length - 1]
  d += ` L${last[0]},${last[1]}`

  return d
}
