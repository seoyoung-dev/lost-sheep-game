import { useReducer } from 'react'
import Board from '../components/Board'
import BellPanel from '../components/BellPanel'
import HostPanel from '../components/HostPanel'
import ResultOverlay from '../components/ResultOverlay'
import useBuzzerKeys from '../hooks/useBuzzerKeys'
import {
  createInitialGameState,
  gameReducer,
  getHighlightedCardIds,
} from '../state/gameStore'

export default function GameScreen() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialGameState)

  useBuzzerKeys({ dispatch, hasRevealOpen: Boolean(state.reveal) })

  const highlightedIds = getHighlightedCardIds(state.reveal)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fdf2f8 0%, #eff6ff 100%)',
        padding: '16px',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1520px', margin: '0 auto' }}>
        <div style={{ marginBottom: '12px', textAlign: 'center' }}>
          <div style={{ color: '#9D174D', fontWeight: 900, fontSize: '1.75rem', marginBottom: '4px' }}>
            잃은 양 찾기
          </div>
          <div style={{ color: '#64748B', fontSize: '0.95rem' }}>
            Round {state.round} · A / L 벨 · 숫자 1~9 선택 · Enter 제출 · Esc 리셋 · Space 다음 라운드
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.45fr) minmax(320px, 0.8fr)',
            gap: '16px',
            alignItems: 'start',
            maxHeight: 'calc(100vh - 92px)',
          }}
        >
          <div
            style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: '30px',
              padding: '16px',
              border: '2px solid rgba(255,255,255,0.8)',
              boxShadow: '0 20px 46px rgba(148, 163, 184, 0.16)',
              overflow: 'hidden',
            }}
          >
            <Board
              cards={state.cards}
              highlightedIds={highlightedIds}
              selectedPositions={state.selectedPositions}
            />
            <ResultOverlay
              reveal={state.reveal}
              cards={state.cards}
              onClose={() => dispatch({ type: 'hide_reveal' })}
            />
          </div>

          <div style={{ display: 'grid', gap: '14px' }}>
            <BellPanel scores={state.scores} buzz={state.buzz} />
            <HostPanel dispatch={dispatch} />
          </div>
        </div>
      </div>
    </div>
  )
}
