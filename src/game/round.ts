import { ALL_CARDS } from './data'
import { findAllValidTrios } from './logic'
import type { SheepCard } from './types'

function shuffle<T>(items: T[], rng: () => number) {
  const copy = [...items]

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}

export function hasAnyValidTrio(cards: SheepCard[]) {
  return findAllValidTrios(cards).length > 0
}

export function dealRound(size = 9, rng: () => number = Math.random) {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error(`Round size must be a positive integer. Received: ${size}`)
  }

  if (size > ALL_CARDS.length) {
    throw new Error(
      `Round size cannot exceed total cards (${ALL_CARDS.length}). Received: ${size}`,
    )
  }

  return shuffle(ALL_CARDS, rng).slice(0, size)
}
