import { dealRound } from '../game/round'
import { findAllValidTrios } from '../game/logic'
import type { SheepCard } from '../game/types'

export type Team = 'team1' | 'team2'

export type RevealState =
  | null
  | {
      mode: 'trio' | 'noCombo'
      trios: SheepCard[][]
    }

export type BuzzState =
  | null
  | {
      team: Team
      deadline: number
      expired: boolean
    }

export interface GameState {
  round: number
  cards: SheepCard[]
  scores: { team1: number; team2: number }
  buzz: BuzzState
  reveal: RevealState
}

export type GameAction =
  | { type: 'next_round' }
  | { type: 'buzz'; team: Team; now?: number }
  | { type: 'buzz_reset' }
  | { type: 'buzz_expire' }
  | { type: 'reveal_trios' }
  | { type: 'reveal_no_combo' }
  | { type: 'hide_reveal' }
  | { type: 'adjust_score'; team: Team; amount: number }

const ROUND_SIZE = 9
const BUZZ_DURATION_MS = 5_000

function getNewRound() {
  return dealRound(ROUND_SIZE)
}

export function createInitialGameState(): GameState {
  return {
    round: 1,
    cards: getNewRound(),
    scores: { team1: 0, team2: 0 },
    buzz: null,
    reveal: null,
  }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'next_round':
      return {
        ...state,
        round: state.round + 1,
        cards: getNewRound(),
        buzz: null,
        reveal: null,
      }

    case 'buzz':
      if (state.buzz) {
        return state
      }

      return {
        ...state,
        buzz: {
          team: action.team,
          deadline: (action.now ?? Date.now()) + BUZZ_DURATION_MS,
          expired: false,
        },
        reveal: null,
      }

    case 'buzz_reset':
      return {
        ...state,
        buzz: null,
      }

    case 'buzz_expire':
      if (!state.buzz || state.buzz.expired) {
        return state
      }

      return {
        ...state,
        buzz: {
          ...state.buzz,
          expired: true,
        },
      }

    case 'reveal_trios':
      return {
        ...state,
        reveal: {
          mode: 'trio',
          trios: findAllValidTrios(state.cards),
        },
      }

    case 'reveal_no_combo':
      return {
        ...state,
        reveal: {
          mode: 'noCombo',
          trios: findAllValidTrios(state.cards),
        },
      }

    case 'hide_reveal':
      return {
        ...state,
        reveal: null,
      }

    case 'adjust_score':
      return {
        ...state,
        scores: {
          ...state.scores,
          [action.team]: state.scores[action.team] + action.amount,
        },
      }

    default:
      return state
  }
}

export function getHighlightedCardIds(reveal: RevealState) {
  if (!reveal) {
    return new Set<number>()
  }

  return new Set(reveal.trios.flat().map(card => card.id))
}

export const GAME_CONSTANTS = {
  ROUND_SIZE,
  BUZZ_DURATION_MS,
}
