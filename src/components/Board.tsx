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
      {cards.map((card, index) => {
        const position = index + 1
        const selectionOrder = selectedPositions.indexOf(position)
        return (
          <Card
            key={card.id}
            card={card}
            number={position}
            highlighted={highlightedIds.has(card.id)}
            selectedIndex={selectionOrder >= 0 ? selectionOrder + 1 : undefined}
          />
        )
      })}
    </div>
  )
}
