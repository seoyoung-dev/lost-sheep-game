import Card from '../components/Card'
import type { SheepCard } from '../game/types'

function makeCard(id: number, color: SheepCard['color'], mood: SheepCard['mood'], place: SheepCard['place']): SheepCard {
  return { id, color, mood, place }
}

const colorCards: SheepCard[] = [
  makeCard(1, 'white', 'happy', 'field'),
  makeCard(2, 'black', 'happy', 'field'),
  makeCard(3, 'brown', 'happy', 'field'),
]

const moodCards: SheepCard[] = [
  makeCard(4, 'white', 'happy', 'mountain'),
  makeCard(5, 'white', 'crying', 'mountain'),
  makeCard(6, 'white', 'asleep', 'mountain'),
]

const placeCards: SheepCard[] = [
  makeCard(7, 'brown', 'asleep', 'field'),
  makeCard(8, 'brown', 'asleep', 'mountain'),
  makeCard(9, 'brown', 'asleep', 'river'),
]

const COLOR_LABELS: Record<string, string> = {
  white: '흰 양',
  black: '검은 양',
  brown: '갈색 양',
}
const MOOD_LABELS: Record<string, string> = {
  happy: '웃음',
  crying: '울음',
  asleep: '잠듦',
}
const PLACE_LABELS: Record<string, string> = {
  field: '들판',
  mountain: '산',
  river: '강가',
}

function AttrSection({
  title,
  emoji,
  cards,
  labels,
}: {
  title: string
  emoji: string
  cards: SheepCard[]
  labels: string[]
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.82)',
        borderRadius: '28px',
        padding: '32px 36px',
        border: '2px solid rgba(255,255,255,0.9)',
        boxShadow: '0 20px 48px rgba(148,163,184,0.15)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <span style={{ fontSize: '2rem' }}>{emoji}</span>
        <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1E293B', letterSpacing: '-0.02em' }}>
          {title}
        </span>
        <span style={{ fontSize: '1rem', fontWeight: 600, color: '#94A3B8', marginLeft: '4px' }}>
          — 3가지
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }}>
        {cards.map((card, i) => (
          <div key={card.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '100%' }}>
              <Card card={card} number={undefined} />
            </div>
            <div
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#334155',
                background: 'rgba(241,245,249,0.9)',
                borderRadius: '999px',
                padding: '6px 20px',
              }}
            >
              {labels[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SlideAssets() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fdf2f8 0%, #eff6ff 100%)',
        padding: '40px 48px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#9D174D', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Slide 3 — 카드 소개
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#1E293B', letterSpacing: '-0.03em', marginBottom: '10px' }}>
            각 카드는 3가지 속성을 갖습니다
          </div>
          <div style={{ fontSize: '1.1rem', color: '#64748B', fontWeight: 500 }}>
            색깔 · 표정 · 장소 — 속성마다 3종류씩, 총 27가지 카드
          </div>
        </div>

        {/* 3가지 속성 섹션 */}
        <div style={{ display: 'grid', gap: '24px' }}>
          <AttrSection
            title="색깔"
            emoji="🐑"
            cards={colorCards}
            labels={colorCards.map(c => COLOR_LABELS[c.color])}
          />
          <AttrSection
            title="표정"
            emoji="😊"
            cards={moodCards}
            labels={moodCards.map(c => MOOD_LABELS[c.mood])}
          />
          <AttrSection
            title="장소"
            emoji="🌄"
            cards={placeCards}
            labels={placeCards.map(c => PLACE_LABELS[c.place])}
          />
        </div>

        {/* 하단 요약 */}
        <div
          style={{
            marginTop: '32px',
            padding: '20px 28px',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '20px',
            textAlign: 'center',
            fontSize: '1.05rem',
            fontWeight: 700,
            color: '#475569',
            border: '2px solid rgba(255,255,255,0.8)',
          }}
        >
          3 × 3 × 3 = <span style={{ color: '#9D174D', fontSize: '1.3rem', fontWeight: 900 }}>27가지</span> 카드 &nbsp;·&nbsp; 매 라운드 9장 무작위 공개
        </div>
      </div>
    </div>
  )
}
