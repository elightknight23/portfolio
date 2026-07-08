import { useEffect, useState } from 'react'

const CACHE_KEY = 'lc-solved'

function readCache(): number | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    return cached ? Number(cached) : null
  } catch {
    return null
  }
}

/**
 * Total solved count from LeetCode via public mirror APIs (LeetCode's own
 * GraphQL blocks browser CORS). Returns null until a fetch succeeds — callers
 * should render nothing so a dead mirror degrades to "no stat" silently.
 */
export function useLeetCodeSolved(username: string): number | null {
  const [solved, setSolved] = useState<number | null>(readCache)

  useEffect(() => {
    if (solved !== null) return
    const ctrl = new AbortController()

    // alfa-leetcode-api first — verified working; the herokuapp mirror is
    // frequently dead and only kept as a fallback.
    const endpoints: { url: string; pick: (data: Record<string, unknown>) => unknown }[] = [
      {
        url: `https://alfa-leetcode-api.onrender.com/${username}/solved`,
        pick: (d) => d.solvedProblem,
      },
      {
        url: `https://leetcode-stats-api.herokuapp.com/${username}`,
        pick: (d) => d.totalSolved,
      },
    ]

    ;(async () => {
      for (const { url, pick } of endpoints) {
        try {
          const res = await fetch(url, {
            signal: AbortSignal.any([ctrl.signal, AbortSignal.timeout(8000)]),
          })
          if (!res.ok) continue
          const count = pick(await res.json())
          if (typeof count === 'number' && count > 0) {
            try {
              sessionStorage.setItem(CACHE_KEY, String(count))
            } catch {
              /* private mode — skip caching */
            }
            setSolved(count)
            return
          }
        } catch {
          /* mirror down or timed out — try the next one */
        }
      }
    })()

    return () => ctrl.abort()
  }, [username, solved])

  return solved
}
