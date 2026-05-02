import { useState, useRef } from 'react'
import type { Dispatch } from 'react'
import type { BuzzState, GameAction, Team } from '../state/gameStore'

interface BellPanelProps {
  scores: { team1: number; team2: number }
  teamNames: { team1: string; team2: string }
  buzz: BuzzState
  onBuzz: (team: Team) => void
  selectedCount: number
  onSubmit: () => void
  dispatch: Dispatch<GameAction>
}

function TeamScore({
  name,
  hotkey,
  score,
  active,
  color,
  onClick,
  onNameChange,
}: {
  name: string
  hotkey: string
  score: number
  active: boolean
  color: string
  onClick: () => void
  onNameChange: (name: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(name)
  const inputRef = useRef<HTMLInputElement>(null)

  function startEdit(e: React.MouseEvent) {
    e.stopPropagation()
    setDraft(name)
    setEditing(true)
    setTimeout(() => inputRef.current?.select(), 0)
  }

  function commit() {
    setEditing(false)
    onNameChange(draft)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commit()
    if (e.key === 'Escape') setEditing(false)
    e.stopPropagation()
  }

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
      <div style={{ fontSize: '0.95rem', fontWeight: 800, opacity: 0.92, display: 'flex', alignItems: 'center', gap: '6px' }}>
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={handleKeyDown}
            onClick={e => e.stopPropagation()}
            maxLength={12}
            style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              width: '100%',
              background: 'rgba(255,255,255,0.25)',
              border: 'none',
              borderBottom: `2px solid ${active ? 'rgba(255,255,255,0.7)' : color}`,
              color: active ? '#ffffff' : '#334155',
              outline: 'none',
              padding: '0 2px',
              borderRadius: '2px',
            }}
          />
        ) : (
          <>
            <span>{name}</span>
            <span style={{ opacity: 0.6 }}>· {hotkey}</span>
            <button
              onClick={startEdit}
              title="팀 이름 변경"
              style={{
                marginLeft: 'auto',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0 2px',
                opacity: 0.5,
                fontSize: '0.8rem',
                color: 'inherit',
                lineHeight: 1,
              }}
            >
              ✏️
            </button>
          </>
        )}
      </div>
      <div style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1, marginTop: '10px' }}>
        {score}
      </div>
    </div>
  )
}

export default function BellPanel({ scores, teamNames, buzz, onBuzz, selectedCount, onSubmit, dispatch }: BellPanelProps) {
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
          name={teamNames.team1}
          hotkey="A"
          score={scores.team1}
          active={buzz?.team === 'team1'}
          color="#EF4444"
          onClick={() => onBuzz('team1')}
          onNameChange={name => dispatch({ type: 'set_team_name', team: 'team1', name })}
        />
        <TeamScore
          name={teamNames.team2}
          hotkey="L"
          score={scores.team2}
          active={buzz?.team === 'team2'}
          color="#3B82F6"
          onClick={() => onBuzz('team2')}
          onNameChange={name => dispatch({ type: 'set_team_name', team: 'team2', name })}
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
