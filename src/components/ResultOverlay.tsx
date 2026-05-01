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

function HintOverlay({ reveal, onClose }: { reveal: NonNullable<RevealState>; onClose: () => void }) {
  const count = reveal.trios.length
  const noTriosLeft = count === 0

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
          width: 'min(560px, 100%)',
          borderRadius: '28px',
          background: 'rgba(255,255,255,0.97)',
          padding: '32px 28px 24px',
          boxShadow: '0 30px 80px rgba(15, 23, 42, 0.28)',
          textAlign: 'center',
          cursor: 'default',
        }}
      >
        <div style={{ fontSize: '2.8rem', marginBottom: '12px' }}>
          {noTriosLeft ? '🔍' : '💡'}
        </div>

        {noTriosLeft ? (
          <>
            <div
              style={{
                fontSize: 'clamp(2rem, 7vw, 3rem)',
                fontWeight: 900,
                color: '#B91C1C',
                marginBottom: '10px',
                lineHeight: 1.1,
              }}
            >
              남은 조합이 없습니다
            </div>
            <div style={{ fontSize: '1rem', color: '#64748B', marginBottom: '28px' }}>
              다음 라운드로 자동으로 넘어갑니다.
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                fontSize: 'clamp(2.4rem, 8vw, 3.6rem)',
                fontWeight: 900,
                color: '#1D4ED8',
                lineHeight: 1,
                marginBottom: '10px',
              }}
            >
              {count}개
            </div>
            <div
              style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#334155',
                marginBottom: '28px',
              }}
            >
              조합이 남아 있습니다
            </div>
          </>
        )}

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '14px 16px',
            background: noTriosLeft ? '#B91C1C' : '#1D4ED8',
            color: '#fff',
            borderRadius: '16px',
            fontWeight: 800,
            fontSize: '1rem',
          }}
        >
          {noTriosLeft ? '다음 라운드로' : '닫기 (Enter)'}
        </button>
      </div>
    </div>
  )
}

function TimeoutOverlay({ reveal, cards, onClose }: { reveal: NonNullable<RevealState>; cards: SheepCard[]; onClose: () => void }) {
  const hasTrios = reveal.trios.length > 0

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
        background: 'rgba(15, 23, 42, 0.60)',
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
          background: 'rgba(255,255,255,0.97)',
          padding: '28px 24px 24px',
          boxShadow: '0 30px 80px rgba(15, 23, 42, 0.32)',
          textAlign: 'center',
          cursor: 'default',
        }}
      >
        {/* 배너 */}
        <div
          style={{
            marginBottom: '20px',
            padding: '24px 16px 18px',
            borderRadius: '20px',
            background: 'rgba(254, 243, 199, 0.9)',
            boxShadow: '0 8px 28px rgba(217, 119, 6, 0.18)',
          }}
        >
          <div style={{ fontSize: '2.8rem', marginBottom: '8px' }}>⏰</div>
          <div
            style={{
              fontSize: 'clamp(2rem, 7vw, 3rem)',
              fontWeight: 900,
              color: '#B45309',
              lineHeight: 1.1,
            }}
          >
            시간 초과
          </div>
        </div>

        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#334155', marginBottom: '8px' }}>
          {hasTrios ? `남은 조합 ${reveal.trios.length}개` : '남은 조합 없음'}
        </div>
        <div style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '16px' }}>
          {hasTrios ? '이번 라운드에 찾지 못한 조합입니다.' : '이번 라운드에 모든 조합을 찾았거나 원래 조합이 없었습니다.'}
        </div>

        {hasTrios && (
          <div style={{ display: 'grid', gap: '8px', marginBottom: '18px' }}>
            {reveal.trios.map((trio, index) => (
              <div
                key={index}
                style={{
                  borderRadius: '14px',
                  background: 'rgba(248,250,252,0.96)',
                  padding: '11px 14px',
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
            background: '#B45309',
            color: '#fff',
            borderRadius: '16px',
            fontWeight: 800,
            fontSize: '1rem',
          }}
        >
          다음 라운드 (Enter)
        </button>
      </div>
    </div>
  )
}

function HintCardsOverlay({ reveal, onClose }: { reveal: NonNullable<RevealState>; onClose: () => void }) {
  const count = reveal.trios.length
  const noTriosLeft = count === 0

  if (noTriosLeft) {
    return <HintOverlay reveal={reveal} onClose={onClose} />
  }

  const cardCount = new Set(reveal.trios.flat().map(c => c.id)).size

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '24px',
        zIndex: 20,
        cursor: 'pointer',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: 'rgba(15, 23, 42, 0.82)',
          borderRadius: '999px',
          padding: '14px 24px',
          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.35)',
          cursor: 'default',
        }}
      >
        <span style={{ fontSize: '1.4rem' }}>✨</span>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }}>
          조합에 포함된 카드 {cardCount}장이 강조됩니다
        </span>
        <button
          onClick={onClose}
          style={{
            padding: '8px 20px',
            background: '#FACC15',
            color: '#1E293B',
            borderRadius: '999px',
            fontWeight: 800,
            fontSize: '0.9rem',
          }}
        >
          닫기 (Enter)
        </button>
      </div>
    </div>
  )
}

export default function ResultOverlay({ reveal, cards, onClose }: ResultOverlayProps) {
  if (!reveal) return null

  if (reveal.mode === 'hint') {
    return <HintOverlay reveal={reveal} onClose={onClose} />
  }

  if (reveal.mode === 'hintCards') {
    return <HintCardsOverlay reveal={reveal} onClose={onClose} />
  }

  if (reveal.mode === 'timeout') {
    return <TimeoutOverlay reveal={reveal} cards={cards} onClose={onClose} />
  }

  const verdict = getVerdictConfig(reveal)
  const hasTrios = reveal.trios.length > 0
  const hasSelectedCards = Boolean(reveal.selectedCards?.length)
  const isNoCombo = reveal.mode === 'noCombo'

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

        {isNoCombo && reveal.isCorrect && (
          <div style={{ fontSize: '1rem', color: '#15803D', fontWeight: 700, marginBottom: '14px' }}>
            다음 라운드로 넘어갑니다
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '14px 16px',
            background: isNoCombo && reveal.isCorrect ? '#15803D' : '#334155',
            color: '#fff',
            borderRadius: '16px',
            fontWeight: 800,
            fontSize: '1rem',
          }}
        >
          {isNoCombo && reveal.isCorrect ? '다음 라운드 (Enter)' : '닫기 (Enter)'}
        </button>
      </div>
    </div>
  )
}
