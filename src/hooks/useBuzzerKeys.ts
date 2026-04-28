import { useEffect } from 'react'
import type { Dispatch } from 'react'
import type { GameAction } from '../state/gameStore'

interface UseBuzzerKeysOptions {
  dispatch: Dispatch<GameAction>
}

export default function useBuzzerKeys({ dispatch }: UseBuzzerKeysOptions) {
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

      if (key === 'escape') {
        event.preventDefault()
        dispatch({ type: 'buzz_reset' })
      }

      if (key === ' ') {
        event.preventDefault()
        dispatch({ type: 'next_round' })
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [dispatch])
}
