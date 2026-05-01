import { useReducer, useEffect, useState, useRef } from 'react'
import Board from '../components/Board'
import BellPanel from '../components/BellPanel'
import HostPanel from '../components/HostPanel'
import FoundTriosPanel from '../components/FoundTriosPanel'
import ResultOverlay from '../components/ResultOverlay'
import useBuzzerKeys from '../hooks/useBuzzerKeys'
import {
  createInitialGameState,
  gameReducer,
  getHighlightedCardIds,
} from '../state/gameStore'
import { playBuzz, playCorrect, playWrong, playHint } from '../utils/sounds'

const TIMEOUT_SECONDS = 5 * 60

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function GameScreen() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialGameState)
  const [timeLeft, setTimeLeft] = useState(TIMEOUT_SECONDS)
  const [timedOut, setTimedOut] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 라운드 변경 또는 팀 액션(벨·선택·제출) 발생 시 타이머 리셋
  const timerResetKey = `${state.round}-${state.teamActionCount}`
  useEffect(() => {
    setTimeLeft(TIMEOUT_SECONDS)
    setTimedOut(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          setTimedOut(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerResetKey])

  // 시간 초과 시 오버레이 표시 (현재 reveal 없을 때 발동)
  useEffect(() => {
    if (timedOut && !state.reveal) {
      dispatch({ type: 'timeout_reveal' })
      setTimedOut(false)
    }
  }, [timedOut, state.reveal])

  useEffect(() => {
    if (state.buzz) playBuzz()
  }, [state.buzz])

  useEffect(() => {
    if (!state.reveal) return
    const { mode, isCorrect, isDuplicate } = state.reveal
    if (mode === 'hint' || mode === 'hintCards') {
      playHint()
      return
    }
    if (isCorrect && !isDuplicate) {
      playCorrect()
    } else if (!isCorrect || isDuplicate) {
      playWrong()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.reveal])

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
        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ color: '#9D174D', fontWeight: 900, fontSize: '1.75rem', lineHeight: 1.1, marginBottom: '3px' }}>
              춘천침례교회 청년부 레크레이션
            </div>
            <div style={{ color: '#94A3B8', fontSize: '0.78rem', fontStyle: 'italic', marginBottom: '3px' }}>
              잃은 것을 찾아낸즉 기뻐 어깨에 메고 — 누가복음 15:5
            </div>
            <div style={{ color: '#64748B', fontSize: '0.88rem' }}>
              Round {state.round} · A / L 벨 · N 조합없음 · 숫자 1~9 선택 · Enter 제출 · Esc 리셋
            </div>
          </div>
          <div
            style={{
              minWidth: '80px',
              textAlign: 'center',
              fontSize: '1.6rem',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: timeLeft <= 30 ? '#DC2626' : timeLeft <= 60 ? '#D97706' : '#94A3B8',
              transition: 'color 0.5s',
            }}
          >
            {formatTime(timeLeft)}
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
              dimNonHighlighted={state.reveal?.mode === 'hintCards' && state.reveal.trios.length > 0}
              onSelectPosition={position => dispatch({ type: 'select_position', position })}
              clickable={Boolean(state.buzz)}
            />
            <ResultOverlay
              reveal={state.reveal}
              cards={state.cards}
              onClose={() => dispatch({ type: 'hide_reveal' })}
            />
          </div>

          <div style={{ display: 'grid', gap: '14px', alignContent: 'start', overflowY: 'auto', maxHeight: 'calc(100vh - 92px)' }}>
            <BellPanel
              scores={state.scores}
              buzz={state.buzz}
              onBuzz={team => {
                if (state.buzz?.team === team) {
                  dispatch({ type: 'buzz_reset' })
                } else {
                  dispatch({ type: 'buzz', team })
                }
              }}
              selectedCount={state.selectedPositions.length}
              onSubmit={() => dispatch({ type: 'submit_selection' })}
            />
            <FoundTriosPanel foundTrios={state.foundTrios} cards={state.cards} />
            <HostPanel dispatch={dispatch} />
          </div>
        </div>
      </div>
    </div>
  )
}
