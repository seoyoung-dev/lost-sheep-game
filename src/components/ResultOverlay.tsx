import type { RevealState } from '../state/gameStore'

interface ResultOverlayProps {
  reveal: RevealState
  onClose: () => void
}

export default function ResultOverlay({ reveal, onClose }: ResultOverlayProps) {
  if (!reveal) {
    return null
  }

  const hasTrios = reveal.trios.length > 0
  const hasSelectedCards = Boolean(reveal.selectedCards?.length)

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px',
        background: 'rgba(15, 23, 42, 0.56)',
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: 'min(720px, 100%)',
          maxHeight: '80vh',
          overflow: 'auto',
          borderRadius: '28px',
          background: 'rgba(255,255,255,0.96)',
          padding: '24px',
          boxShadow: '0 30px 80px rgba(15, 23, 42, 0.28)',
        }}
      >
        <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#334155', marginBottom: '10px' }}>
          {reveal.mode === 'trio' ? '정답 조합 공개' : '조합 없음 판정'}
        </div>
        <div style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6, marginBottom: '18px' }}>
          {hasSelectedCards
            ? reveal.isCorrect
              ? `선택한 조합이 정답입니다. 선택 카드: ${reveal.selectedCards!.map(card => `#${card.id}`).join(' · ')}`
              : `선택한 조합은 정답이 아닙니다. 선택 카드: ${reveal.selectedCards!.map(card => `#${card.id}`).join(' · ')}`
            : reveal.mode === 'trio'
            ? hasTrios
              ? `현재 카드에서 찾을 수 있는 조합은 총 ${reveal.trios.length}개입니다.`
              : '현재 카드에는 정답 조합이 없습니다.'
            : hasTrios
              ? `현재 카드에는 실제로 ${reveal.trios.length}개의 조합이 있습니다.`
              : '현재 카드에는 실제로 조합이 없습니다.'}
        </div>

        {!hasSelectedCards && hasTrios && (
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
                조합 {index + 1}: {trio.map(card => `#${card.id}`).join(' · ')}
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
          }}
        >
          닫기
        </button>
      </div>
    </div>
  )
}
