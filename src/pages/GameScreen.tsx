import { useEffect, useReducer } from 'react'
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

  useBuzzerKeys({ dispatch })

  useEffect(() => {
    if (!state.buzz || state.buzz.expired) {
      return
    }

    const delay = Math.max(0, state.buzz.deadline - Date.now())
    const timer = window.setTimeout(() => {
      dispatch({ type: 'buzz_expire' })
    }, delay)

    return () => window.clearTimeout(timer)
  }, [state.buzz])

  const highlightedIds = getHighlightedCardIds(state.reveal)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fdf2f8 0%, #eff6ff 100%)',
        padding: '26px',
      }}
    >
      <div style={{ maxWidth: '1520px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ color: '#9D174D', fontWeight: 900, fontSize: '2rem', marginBottom: '6px' }}>
            잃은 양 찾기
          </div>
          <div style={{ color: '#64748B', fontSize: '1rem' }}>
            Round {state.round} · A / L 벨 입력 · Esc 리셋 · Space 다음 라운드
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.5fr) minmax(360px, 0.9fr)',
            gap: '22px',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: '30px',
              padding: '22px',
              border: '2px solid rgba(255,255,255,0.8)',
              boxShadow: '0 20px 46px rgba(148, 163, 184, 0.16)',
            }}
          >
            <Board cards={state.cards} highlightedIds={highlightedIds} />
            <ResultOverlay
              reveal={state.reveal}
              onClose={() => dispatch({ type: 'hide_reveal' })}
            />
          </div>

          <div style={{ display: 'grid', gap: '18px' }}>
            <BellPanel scores={state.scores} buzz={state.buzz} />
            <HostPanel dispatch={dispatch} />
          </div>
        </div>
      </div>
    </div>
  )
}
