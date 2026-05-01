import { useEffect } from 'react'
import type { Dispatch } from 'react'
import type { GameAction } from '../state/gameStore'

interface UseBuzzerKeysOptions {
  dispatch: Dispatch<GameAction>
  hasRevealOpen: boolean
}

export default function useBuzzerKeys({ dispatch, hasRevealOpen }: UseBuzzerKeysOptions) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat) {
        return
      }

      const key = event.key.toLowerCase()

      if (key === 'a') {
        event.preventDefault()
        dispatch({ type: 'buzz', team: 'team1' })
      }

      if (key === 'l') {
        event.preventDefault()
        dispatch({ type: 'buzz', team: 'team2' })
      }

      if (key === 'n') {
        event.preventDefault()
        dispatch({ type: 'reveal_no_combo' })
      }

      if (key === 'escape') {
        event.preventDefault()
        dispatch({ type: 'buzz_reset' })
      }

      if (key === ' ') {
        event.preventDefault()
        dispatch({ type: 'next_round' })
      }

      if (/^[1-9]$/.test(key)) {
        event.preventDefault()
        dispatch({ type: 'select_position', position: Number(key) })
      }

      if (key === 'backspace') {
        event.preventDefault()
        dispatch({ type: 'remove_last_selection' })
      }

      if (key === 'enter') {
        event.preventDefault()
        if (hasRevealOpen) {
          dispatch({ type: 'hide_reveal' })
          return
        }

        dispatch({ type: 'submit_selection' })
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [dispatch, hasRevealOpen])
}
