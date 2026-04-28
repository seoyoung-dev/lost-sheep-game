import Card from '../components/Card'
import { ALL_CARDS } from '../game/data'
import type { Mood, Place, SheepCard } from '../game/types'

const PLACE_ORDER: Record<Place, number> = {
  field: 0,
  mountain: 1,
  river: 2,
}

const MOOD_ORDER: Record<Mood, number> = {
  happy: 0,
  crying: 1,
  asleep: 2,
}

function sortCards(a: SheepCard, b: SheepCard) {
  const placeDiff = PLACE_ORDER[a.place] - PLACE_ORDER[b.place]
  if (placeDiff !== 0) return placeDiff
  const colorDiff = a.color.localeCompare(b.color)
  if (colorDiff !== 0) return colorDiff
  return MOOD_ORDER[a.mood] - MOOD_ORDER[b.mood]
}

export default function DesignAll() {
  const cards = [...ALL_CARDS].sort(sortCards)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fce7f3 0%, #f8fafc 100%)',
        padding: '28px',
      }}
    >
      <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '8px', color: '#9D174D' }}>
          잃은 양 찾기 — 카드 27장 시안
        </h1>
        <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '24px' }}>
          카드 비율과 양/배경 비중을 고정한 상태로 27장을 모두 생성했습니다.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '28px 24px',
          }}
        >
          {cards.map(card => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  )
}
