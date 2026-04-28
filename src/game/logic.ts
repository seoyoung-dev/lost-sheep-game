import type { SheepCard } from './types'

const ATTRS: Array<keyof Pick<SheepCard, 'color' | 'mood' | 'place'>> = [
  'color',
  'mood',
  'place',
]

function isAllSameOrAllDifferent(values: string[]) {
  return (
    (values[0] === values[1] && values[1] === values[2]) ||
    new Set(values).size === 3
  )
}

export function isValidTrio(a: SheepCard, b: SheepCard, c: SheepCard) {
  return ATTRS.every(attr =>
    isAllSameOrAllDifferent([a[attr], b[attr], c[attr]]),
  )
}

export function findAllValidTrios(cards: SheepCard[]) {
  const trios: SheepCard[][] = []

  for (let i = 0; i < cards.length - 2; i += 1) {
    for (let j = i + 1; j < cards.length - 1; j += 1) {
      for (let k = j + 1; k < cards.length; k += 1) {
        const trio = [cards[i], cards[j], cards[k]]

        if (isValidTrio(trio[0], trio[1], trio[2])) {
          trios.push(trio)
        }
      }
    }
  }

  return trios
}
