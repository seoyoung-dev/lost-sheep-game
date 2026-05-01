import type { Dispatch } from 'react'
import type { CardCount, GameAction } from '../state/gameStore'

interface HostPanelProps {
  dispatch: Dispatch<GameAction>
  cardCount: CardCount
}

function ActionButton({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '14px 16px',
        background: '#E5E7EB',
        color: '#475569',
        borderRadius: '16px',
        fontWeight: 800,
        border: '1px solid #D1D5DB',
      }}
    >
      {label}
    </button>
  )
}

function ScoreControls({
  team,
  title,
  dispatch,
}: {
  team: 'team1' | 'team2'
  title: string
  dispatch: Dispatch<GameAction>
}) {
  return (
    <div
      style={{
        background: 'rgba(248,250,252,0.92)',
        borderRadius: '20px',
        padding: '14px',
      }}
    >
      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#334155', marginBottom: '10px' }}>
        {title}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '8px' }}>
        {[
          { label: '+1', amount: 1 },
          { label: '-1', amount: -1 },
          { label: '+2', amount: 2 },
          { label: '-2', amount: -2 },
        ].map(control => (
          <button
            key={control.label}
            onClick={() => dispatch({ type: 'adjust_score', team, amount: control.amount })}
            style={{
              padding: '12px 0',
              background: '#E5E7EB',
              color: '#475569',
              borderRadius: '14px',
              fontWeight: 800,
              border: '1px solid #D1D5DB',
            }}
          >
            {control.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function HostPanel({ dispatch, cardCount }: HostPanelProps) {
  return (
    <section
      style={{
        background: 'rgba(255,255,255,0.76)',
        borderRadius: '28px',
        padding: '20px',
        border: '2px solid rgba(255,255,255,0.8)',
        boxShadow: '0 18px 36px rgba(148, 163, 184, 0.14)',
      }}
    >
      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#334155', marginBottom: '14px' }}>
        사회자 패널
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px', marginBottom: '16px' }}>
        <ActionButton label="다음 라운드" onClick={() => dispatch({ type: 'next_round' })} />
        <ActionButton label="라운드 리셋" onClick={() => dispatch({ type: 'reset_round' })} />
        <ActionButton label="선택 초기화" onClick={() => dispatch({ type: 'buzz_reset' })} />
        <ActionButton label="정답 공개" onClick={() => dispatch({ type: 'reveal_trios' })} />
        <ActionButton label="조합 없음 처리" onClick={() => dispatch({ type: 'reveal_no_combo' })} />
        <ActionButton label="개수 힌트" onClick={() => dispatch({ type: 'hint' })} />
        <ActionButton label="카드 힌트" onClick={() => dispatch({ type: 'hint_cards' })} />
        <button
          onClick={() => dispatch({ type: 'set_card_count', count: cardCount === 9 ? 12 : 9 })}
          style={{
            padding: '14px 16px',
            background: cardCount === 12 ? '#3B82F6' : '#E5E7EB',
            color: cardCount === 12 ? '#fff' : '#475569',
            borderRadius: '16px',
            fontWeight: 800,
            border: cardCount === 12 ? '1px solid #2563EB' : '1px solid #D1D5DB',
          }}
        >
          {cardCount === 9 ? '4×3 (12장)' : '3×3 (9장)'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        <ScoreControls team="team1" title="팀 1 점수 조정" dispatch={dispatch} />
        <ScoreControls team="team2" title="팀 2 점수 조정" dispatch={dispatch} />
      </div>
    </section>
  )
}
