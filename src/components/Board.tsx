import Card from './Card'
import type { SheepCard } from '../game/types'

interface BoardProps {
  cards: SheepCard[]
  highlightedIds?: Set<number>
}

export default function Board({ cards, highlightedIds = new Set<number>() }: BoardProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '18px',
      }}
    >
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          number={card.id}
          highlighted={highlightedIds.has(card.id)}
        />
      ))}
    </div>
  )
}
