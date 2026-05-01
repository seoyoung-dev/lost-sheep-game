import type { BuzzState, Team } from '../state/gameStore'

interface BellPanelProps {
  scores: { team1: number; team2: number }
  buzz: BuzzState
  onBuzz: (team: Team) => void
  selectedCount: number
  onSubmit: () => void
}

function TeamScore({
  name,
  hotkey,
  score,
  active,
  color,
  onClick,
}: {
  name: string
  hotkey: string
  score: number
  active: boolean
  color: string
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        borderRadius: '24px',
        padding: '18px',
        background: active ? color : 'rgba(255,255,255,0.84)',
        color: active ? '#ffffff' : '#334155',
        boxShadow: active
          ? `0 18px 32px ${color}55`
          : '0 14px 28px rgba(148, 163, 184, 0.14)',
        border: active ? '2px solid rgba(255,255,255,0.36)' : '2px solid rgba(255,255,255,0.7)',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div style={{ fontSize: '0.95rem', fontWeight: 800, opacity: 0.92 }}>
        {name} · {hotkey}
      </div>
      <div style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1, marginTop: '10px' }}>
        {score}
      </div>
    </div>
  )
}

export default function BellPanel({ scores, buzz, onBuzz, selectedCount, onSubmit }: BellPanelProps) {
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
      <div style={{ display: 'flex', gap: '14px', marginBottom: '18px' }}>
        <TeamScore
          name="팀 1"
          hotkey="A"
          score={scores.team1}
          active={buzz?.team === 'team1'}
          color="#EF4444"
          onClick={() => onBuzz('team1')}
        />
        <TeamScore
          name="팀 2"
          hotkey="L"
          score={scores.team2}
          active={buzz?.team === 'team2'}
          color="#3B82F6"
          onClick={() => onBuzz('team2')}
        />
      </div>

      {selectedCount === 3 && (
        <button
          onClick={onSubmit}
          style={{
            width: '100%',
            padding: '14px',
            background: '#3B82F6',
            color: '#fff',
            borderRadius: '16px',
            fontWeight: 900,
            fontSize: '1.05rem',
            boxShadow: '0 8px 24px rgba(59,130,246,0.4)',
          }}
        >
          조합 제출 (Enter)
        </button>
      )}
    </section>
  )
}
