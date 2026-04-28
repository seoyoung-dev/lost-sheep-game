import type { Color, Mood, Place, SheepCard } from './types'

export const COLORS: Color[] = ['white', 'black', 'brown']
export const MOODS: Mood[] = ['happy', 'crying', 'asleep']
export const PLACES: Place[] = ['field', 'mountain', 'river']

export const ALL_CARDS: SheepCard[] = COLORS.flatMap((color, colorIndex) =>
  MOODS.flatMap((mood, moodIndex) =>
    PLACES.map((place, placeIndex) => ({
      id: colorIndex * 9 + moodIndex * 3 + placeIndex + 1,
      color,
      mood,
      place,
    })),
  ),
)
