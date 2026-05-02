import Background from '../components/Background'
import Sheep from '../components/Sheep'
import type { SheepCard } from '../game/types'

type Place = 'field' | 'mountain' | 'river'

function makeCard(id: number, color: SheepCard['color'], mood: SheepCard['mood'], place: SheepCard['place']): SheepCard {
  return { id, color, mood, place }
}

const colorCards: SheepCard[] = [
  makeCard(1, 'white', 'happy', 'field'),
  makeCard(2, 'black', 'happy', 'field'),
  makeCard(3, 'brown', 'happy', 'field'),
]

const moodCards: SheepCard[] = [
  makeCard(4, 'white', 'happy', 'field'),
  makeCard(5, 'white', 'crying', 'field'),
  makeCard(6, 'white', 'asleep', 'field'),
]

const places: Place[] = ['field', 'mountain', 'river']

const COLOR_LABELS: Record<string, string> = { white: '흰 양', black: '검은 양', brown: '갈색 양' }
const MOOD_LABELS:  Record<string, string> = { happy: '웃음', crying: '울음', asleep: '잠듦' }
const PLACE_LABELS: Record<Place, string>  = { field: '들판', mountain: '산', river: '강가' }

const LABEL_PILL = {
  fontSize: '1.15rem',
  fontWeight: 800,
  color: '#334155',
  background: 'rgba(241,245,249,0.9)',
  borderRadius: '999px',
  padding: '6px 20px',
} as const

const SECTION_WRAP = {
  background: 'rgba(255,255,255,0.82)',
  borderRadius: '28px',
  padding: '32px 36px',
  border: '2px solid rgba(255,255,255,0.9)',
  boxShadow: '0 20px 48px rgba(148,163,184,0.15)',
} as const

function SectionHeader({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
      <span style={{ fontSize: '2rem' }}>{emoji}</span>
      <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1E293B', letterSpacing: '-0.02em' }}>
        {title}
      </span>
      <span style={{ fontSize: '1rem', fontWeight: 600, color: '#94A3B8', marginLeft: '4px' }}>
        — 3가지
      </span>
    </div>
  )
}

function SheepCard({ card }: { card: SheepCard }) {
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '53 / 63',
        borderRadius: '18px',
        background: 'rgba(248,250,252,0.95)',
        border: '3px solid rgba(255,255,255,0.96)',
        boxShadow: '0 10px 24px rgba(15,23,42,0.10)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '92%', height: '88%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <Sheep color={card.color} mood={card.mood} fill />
      </div>
    </div>
  )
}

function CardSection({
  emoji,
  title,
  cards,
  labels,
}: {
  emoji: string
  title: string
  cards: SheepCard[]
  labels: string[]
}) {
  return (
    <div style={SECTION_WRAP}>
      <SectionHeader emoji={emoji} title={title} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }}>
        {cards.map((card, i) => (
          <div key={card.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '100%' }}>
              <SheepCard card={card} />
            </div>
            <div style={LABEL_PILL}>{labels[i]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlaceSection() {
  return (
    <div style={SECTION_WRAP}>
      <SectionHeader emoji="🌄" title="장소" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }}>
        {places.map(place => (
          <div key={place} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '53 / 63',
                position: 'relative',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '3px solid rgba(255,255,255,0.96)',
                boxShadow: '0 10px 24px rgba(15,23,42,0.12)',
              }}
            >
              <Background place={place} />
            </div>
            <div style={LABEL_PILL}>{PLACE_LABELS[place]}</div>
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

        <div style={{ display: 'grid', gap: '24px' }}>
          <CardSection
            emoji="🐑"
            title="색깔"
            cards={colorCards}
            labels={colorCards.map(c => COLOR_LABELS[c.color])}
          />
          <CardSection
            emoji="😊"
            title="표정"
            cards={moodCards}
            labels={moodCards.map(c => MOOD_LABELS[c.mood])}
          />
          <PlaceSection />
        </div>

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
