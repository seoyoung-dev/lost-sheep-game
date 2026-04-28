export type Color = 'white' | 'black' | 'brown'
export type Mood = 'happy' | 'crying' | 'asleep'
export type Place = 'field' | 'mountain' | 'river'

export interface SheepCard {
  id: number
  color: Color
  mood: Mood
  place: Place
}
