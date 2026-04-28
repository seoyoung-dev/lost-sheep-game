import Card from './Card'
import type { SheepCard } from '../game/types'

interface BoardProps {
  cards: SheepCard[]
  highlightedIds?: Set<number>
  selectedPositions?: number[]
}

export default function Board({
  cards,
  highlightedIds = new Set<number>(),
  selectedPositions = [],
}: BoardProps) {
  return (
    <div
      style={{
        width: 'min(100%, calc((100vh - 180px) * 0.9))',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '14px',
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          number={index + 1}
          highlighted={highlightedIds.has(card.id) || selectedPositions.includes(index + 1)}
        />
      ))}
    </div>
  )
}
