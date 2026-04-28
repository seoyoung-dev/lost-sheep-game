import Background from './Background'
import Sheep from './Sheep'
import type { SheepCard } from '../game/types'

interface CardProps {
  card: SheepCard
  number?: number
  highlighted?: boolean
}

const CARD_RATIO = '53 / 63'
const SHEEP_SIZE = 304
const SHEEP_BOTTOM_TRIM = 22

export default function Card({
  card,
  number = card.id,
  highlighted = false,
}: CardProps) {
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: CARD_RATIO,
        overflow: 'hidden',
        borderRadius: '18px',
        background: '#ffffff',
        border: highlighted ? '4px solid #FACC15' : '3px solid rgba(255,255,255,0.96)',
        boxShadow: highlighted
          ? '0 18px 34px rgba(250, 204, 21, 0.28)'
          : '0 10px 24px rgba(15, 23, 42, 0.12)',
      }}
    >
      <Background place={card.place} />

      <div
        style={{
          position: 'absolute',
          top: '8px',
          left: '10px',
          zIndex: 3,
          fontSize: '2rem',
          fontWeight: 900,
          lineHeight: 1,
          color: 'rgba(255,255,255,0.96)',
          textShadow: '0 3px 10px rgba(15, 23, 42, 0.3)',
        }}
      >
        {number}
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          width: '96%',
          height: `${Math.round(SHEEP_SIZE * 1.18) - SHEEP_BOTTOM_TRIM}px`,
          overflow: 'hidden',
          lineHeight: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          filter: 'drop-shadow(0 10px 14px rgba(15, 23, 42, 0.14))',
        }}
      >
        <div style={{ transform: `translateY(calc(${SHEEP_BOTTOM_TRIM}px + 2.5%))`, lineHeight: 0 }}>
          <Sheep color={card.color} mood={card.mood} size={SHEEP_SIZE} />
        </div>
      </div>
    </div>
  )
}
