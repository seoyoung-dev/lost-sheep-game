import Background from './Background'
import Sheep from './Sheep'
import type { SheepCard } from '../game/types'

interface CardProps {
  card: SheepCard
  number?: number
  highlighted?: boolean
  selectedIndex?: number  // 1·2·3 선택 순서, undefined = 미선택
}

const CARD_RATIO = '53 / 63'
const SHEEP_SIZE = 304
const SHEEP_BOTTOM_TRIM = 22

export default function Card({
  card,
  number = card.id,
  highlighted = false,
  selectedIndex,
}: CardProps) {
  const isSelected = selectedIndex !== undefined

  let border: string
  let boxShadow: string
  let transform: string

  if (isSelected) {
    border = '5px solid #ffffff'
    boxShadow = '0 0 0 4px #3B82F6, 0 20px 48px rgba(59, 130, 246, 0.55)'
    transform = 'scale(1.04)'
  } else if (highlighted) {
    border = '5px solid #FACC15'
    boxShadow = '0 0 0 3px #F59E0B, 0 20px 40px rgba(250, 204, 21, 0.45)'
    transform = 'scale(1.02)'
  } else {
    border = '3px solid rgba(255,255,255,0.96)'
    boxShadow = '0 10px 24px rgba(15, 23, 42, 0.12)'
    transform = 'scale(1)'
  }

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: CARD_RATIO,
        overflow: 'hidden',
        borderRadius: '18px',
        background: '#ffffff',
        border,
        boxShadow,
        transform,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
        zIndex: isSelected ? 2 : highlighted ? 1 : 0,
      }}
    >
      <Background place={card.place} />

      {/* 카드 번호 */}
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

      {/* 선택 순서 뱃지 */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            zIndex: 4,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: '#3B82F6',
            border: '3px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '1.1rem',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.6)',
          }}
        >
          {selectedIndex}
        </div>
      )}

      {/* 선택 시 파란 오버레이 */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(59, 130, 246, 0.10)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 정답 하이라이트 시 금색 오버레이 */}
      {highlighted && !isSelected && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(250, 204, 21, 0.12)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 양 이미지 */}
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
          zIndex: 2,
        }}
      >
        <div style={{ transform: `translateY(calc(${SHEEP_BOTTOM_TRIM}px + 2.5%))`, lineHeight: 0 }}>
          <Sheep color={card.color} mood={card.mood} size={SHEEP_SIZE} />
        </div>
      </div>
    </div>
  )
}
