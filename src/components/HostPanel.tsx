import type { Dispatch } from 'react'
import type { GameAction } from '../state/gameStore'

interface HostPanelProps {
  dispatch: Dispatch<GameAction>
}

function ActionButton({
  label,
  onClick,
  background,
}: {
  label: string
  onClick: () => void
  background: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '14px 16px',
        background,
        color: '#fff',
        borderRadius: '16px',
        fontWeight: 800,
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
          { label: '+1', amount: 1, bg: '#22C55E' },
          { label: '-1', amount: -1, bg: '#EF4444' },
          { label: '+2', amount: 2, bg: '#0EA5E9' },
          { label: '-2', amount: -2, bg: '#F97316' },
        ].map(control => (
          <button
            key={control.label}
            onClick={() => dispatch({ type: 'adjust_score', team, amount: control.amount })}
            style={{
              padding: '12px 0',
              background: control.bg,
              color: '#fff',
              borderRadius: '14px',
              fontWeight: 800,
            }}
          >
            {control.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function HostPanel({ dispatch }: HostPanelProps) {
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
        <ActionButton
          label="다음 라운드"
          onClick={() => dispatch({ type: 'next_round' })}
          background="#7C3AED"
        />
        <ActionButton
          label="벨 리셋"
          onClick={() => dispatch({ type: 'buzz_reset' })}
          background="#475569"
        />
        <ActionButton
          label="정답 공개"
          onClick={() => dispatch({ type: 'reveal_trios' })}
          background="#D97706"
        />
        <ActionButton
          label="조합 없음 처리"
          onClick={() => dispatch({ type: 'reveal_no_combo' })}
          background="#0F766E"
        />
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        <ScoreControls team="team1" title="팀 1 점수 조정" dispatch={dispatch} />
        <ScoreControls team="team2" title="팀 2 점수 조정" dispatch={dispatch} />
      </div>
    </section>
  )
}
