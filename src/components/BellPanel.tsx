import type { BuzzState } from '../state/gameStore'

interface BellPanelProps {
  scores: { team1: number; team2: number }
  buzz: BuzzState
}

function TeamScore({
  name,
  hotkey,
  score,
  active,
  color,
}: {
  name: string
  hotkey: string
  score: number
  active: boolean
  color: string
}) {
  return (
    <div
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

export default function BellPanel({ scores, buzz }: BellPanelProps) {
  const buzzLabel = buzz?.team === 'team1' ? '팀 1' : '팀 2'
  const status = !buzz
    ? '대기 중'
    : `${buzzLabel} 벨 입력`

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
        />
        <TeamScore
          name="팀 2"
          hotkey="L"
          score={scores.team2}
          active={buzz?.team === 'team2'}
          color="#3B82F6"
        />
      </div>

      <div
        style={{
          borderRadius: '22px',
          padding: '18px',
          background: 'linear-gradient(180deg, rgba(248,250,252,0.9), rgba(241,245,249,0.96))',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '0.92rem', color: '#64748B', fontWeight: 700, marginBottom: '6px' }}>
          벨 상태
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#334155', marginBottom: '12px' }}>
          {status}
        </div>
        <div
          style={{
            fontSize: '1rem',
            lineHeight: 1,
            fontWeight: 800,
            color: buzz ? '#F59E0B' : '#94A3B8',
          }}
        >
          {buzz ? '숫자 1~9 선택 · Enter 제출 · Backspace 취소' : '-'}
        </div>
        <div style={{ marginTop: '10px', color: '#64748B', fontSize: '0.85rem' }}>
          벨 입력 후 카드 3장을 선택해 제출합니다.
        </div>
      </div>
    </section>
  )
}
