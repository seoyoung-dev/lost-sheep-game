import Background from './Background'
import Sheep from './Sheep'
import type { SheepCard } from '../game/types'

interface CardProps {
  card: SheepCard
}

const CARD_RATIO = '53 / 63'
const SHEEP_SIZE = 304
const SHEEP_BOTTOM_TRIM = 22

export default function Card({ card }: CardProps) {
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: CARD_RATIO,
        overflow: 'hidden',
        borderRadius: '0',
        background: '#ffffff',
        boxShadow: '0 10px 24px rgba(15, 23, 42, 0.12)',
      }}
    >
      <Background place={card.place} />

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
