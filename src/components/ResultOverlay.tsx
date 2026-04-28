import type { RevealState } from '../state/gameStore'
import type { SheepCard } from '../game/types'

interface ResultOverlayProps {
  reveal: RevealState
  cards: SheepCard[]
  onClose: () => void
}

function getPositionLabel(cards: SheepCard[], card: SheepCard) {
  const position = cards.findIndex(item => item.id === card.id) + 1
  return position > 0 ? `${position}번` : `#${card.id}`
}

function formatCardPositions(cards: SheepCard[], trio: SheepCard[]) {
  return trio.map(card => getPositionLabel(cards, card)).join(' · ')
}

interface VerdictConfig {
  label: string
  sub: string
  color: string
  background: string
  glow: string
}

function getVerdictConfig(reveal: NonNullable<RevealState>): VerdictConfig | null {
  const { mode, isCorrect, isDuplicate, selectedCards } = reveal

  if (mode === 'noCombo') {
    if (isCorrect === undefined) return null
    return isCorrect
      ? {
          label: '성공!',
          sub: '+2점',
          color: '#15803D',
          background: 'rgba(220, 252, 231, 0.96)',
          glow: '0 12px 40px rgba(21, 128, 61, 0.25)',
        }
      : {
          label: '실패!',
          sub: '−2점',
          color: '#B91C1C',
          background: 'rgba(254, 226, 226, 0.96)',
          glow: '0 12px 40px rgba(185, 28, 28, 0.22)',
        }
  }

  if (!selectedCards) return null

  if (isDuplicate) {
    return {
      label: '이미 나온 정답',
      sub: '점수 없음',
      color: '#7C3AED',
      background: 'rgba(245, 243, 255, 0.96)',
      glow: '0 12px 36px rgba(124, 58, 237, 0.2)',
    }
  }
  if (isCorrect) {
    return {
      label: '정답',
      sub: '+1점',
      color: '#BE123C',
      background: 'rgba(255, 228, 230, 0.96)',
      glow: '0 12px 36px rgba(244, 63, 94, 0.22)',
    }
  }
  return {
    label: '실패',
    sub: '−1점',
    color: '#1E293B',
    background: 'rgba(226, 232, 240, 0.96)',
    glow: '0 12px 36px rgba(30, 41, 59, 0.2)',
  }
}

export default function ResultOverlay({ reveal, cards, onClose }: ResultOverlayProps) {
  if (!reveal) return null

  const verdict = getVerdictConfig(reveal)
  const hasTrios = reveal.trios.length > 0
  const hasSelectedCards = Boolean(reveal.selectedCards?.length)
  const isNoCombo = reveal.mode === 'noCombo'

  let bodyText: string
  if (hasSelectedCards) {
    const posStr = formatCardPositions(cards, reveal.selectedCards!)
    if (reveal.isDuplicate) bodyText = `이 조합은 이미 다른 팀이 먼저 맞혔습니다. 선택: ${posStr}`
    else if (reveal.isCorrect) bodyText = `선택한 조합이 정답입니다. 선택: ${posStr}`
    else bodyText = `선택한 조합은 정답이 아닙니다. 선택: ${posStr}`
  } else if (isNoCombo) {
    bodyText = hasTrios
      ? `현재 카드에는 실제로 ${reveal.trios.length}개의 조합이 남아 있었습니다.`
      : '현재 카드에는 실제로 조합이 없습니다. 올바른 판단입니다!'
  } else {
    bodyText = hasTrios
      ? `현재 카드에서 찾을 수 있는 조합은 총 ${reveal.trios.length}개입니다.`
      : '현재 카드에는 정답 조합이 없습니다.'
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px',
        background: 'rgba(15, 23, 42, 0.56)',
        zIndex: 20,
        cursor: 'pointer',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(720px, 100%)',
          maxHeight: '80vh',
          overflow: 'auto',
          borderRadius: '28px',
          background: 'rgba(255,255,255,0.96)',
          padding: '24px',
          boxShadow: '0 30px 80px rgba(15, 23, 42, 0.28)',
          textAlign: 'center',
          cursor: 'default',
        }}
      >
        {/* 성공/실패/정답 판정 배너 */}
        {verdict && (
          <div
            style={{
              marginBottom: '18px',
              padding: '28px 16px 22px',
              borderRadius: '24px',
              background: verdict.background,
              boxShadow: verdict.glow,
            }}
          >
            <div
              style={{
                fontSize: 'clamp(3.6rem, 10vw, 6.4rem)',
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: '-0.06em',
                color: verdict.color,
              }}
            >
              {verdict.label}
            </div>
            <div
              style={{
                marginTop: '10px',
                fontSize: '1.6rem',
                fontWeight: 800,
                color: verdict.color,
                opacity: 0.75,
              }}
            >
              {verdict.sub}
            </div>
          </div>
        )}

        <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#334155', marginBottom: '10px' }}>
          {isNoCombo ? '조합 없음 판정' : '정답 조합 공개'}
        </div>

        <div style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6, marginBottom: '18px' }}>
          {bodyText}
        </div>

        {/* 정답 조합 목록 (정답 공개 시) */}
        {!hasSelectedCards && !isNoCombo && hasTrios && (
          <div style={{ display: 'grid', gap: '10px', marginBottom: '18px' }}>
            {reveal.trios.map((trio, index) => (
              <div
                key={index}
                style={{
                  borderRadius: '16px',
                  background: 'rgba(248,250,252,0.96)',
                  padding: '12px 14px',
                  color: '#334155',
                  fontWeight: 700,
                }}
              >
                조합 {index + 1}: {formatCardPositions(cards, trio)}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '14px 16px',
            background: '#334155',
            color: '#fff',
            borderRadius: '16px',
            fontWeight: 800,
            fontSize: '1rem',
          }}
        >
          닫기 (Enter)
        </button>
      </div>
    </div>
  )
}
