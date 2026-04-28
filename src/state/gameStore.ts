import { dealRound } from '../game/round'
import { findAllValidTrios, isValidTrio } from '../game/logic'
import type { SheepCard } from '../game/types'

export type Team = 'team1' | 'team2'

export type RevealState =
  | null
  | {
      mode: 'trio' | 'noCombo'
      trios: SheepCard[][]
      selectedCards?: SheepCard[]
      isCorrect?: boolean
    }

export type BuzzState =
  | null
  | {
      team: Team
    }

export interface GameState {
  round: number
  cards: SheepCard[]
  scores: { team1: number; team2: number }
  buzz: BuzzState
  reveal: RevealState
  selectedPositions: number[]
}

export type GameAction =
  | { type: 'next_round' }
  | { type: 'buzz'; team: Team }
  | { type: 'buzz_reset' }
  | { type: 'reveal_trios' }
  | { type: 'reveal_no_combo' }
  | { type: 'select_position'; position: number }
  | { type: 'remove_last_selection' }
  | { type: 'submit_selection' }
  | { type: 'hide_reveal' }
  | { type: 'adjust_score'; team: Team; amount: number }

const ROUND_SIZE = 9

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
    selectedPositions: [],
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
        selectedPositions: [],
      }

    case 'buzz':
      if (state.buzz) {
        return state
      }

      return {
        ...state,
        buzz: {
          team: action.team,
        },
        reveal: null,
        selectedPositions: [],
      }

    case 'buzz_reset':
      return {
        ...state,
        buzz: null,
        selectedPositions: [],
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

    case 'select_position':
      if (!state.buzz) {
        return state
      }

      if (action.position < 1 || action.position > state.cards.length) {
        return state
      }

      if (state.selectedPositions.includes(action.position)) {
        return state
      }

      if (state.selectedPositions.length >= 3) {
        return state
      }

      return {
        ...state,
        selectedPositions: [...state.selectedPositions, action.position],
        reveal: null,
      }

    case 'remove_last_selection':
      if (state.selectedPositions.length === 0) {
        return state
      }

      return {
        ...state,
        selectedPositions: state.selectedPositions.slice(0, -1),
      }

    case 'submit_selection': {
      if (!state.buzz || state.selectedPositions.length !== 3) {
        return state
      }

      if (state.reveal?.selectedCards) {
        return state
      }

      const selectedCards = state.selectedPositions.map(position => state.cards[position - 1])
      const correct = isValidTrio(selectedCards[0], selectedCards[1], selectedCards[2])

      return {
        ...state,
        scores: correct
          ? {
              ...state.scores,
              [state.buzz.team]: state.scores[state.buzz.team] + 1,
            }
          : state.scores,
        reveal: {
          mode: 'trio',
          trios: correct ? [selectedCards] : [],
          selectedCards,
          isCorrect: correct,
        },
      }
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

  if (reveal.selectedCards) {
    return new Set(reveal.selectedCards.map(card => card.id))
  }

  return new Set(reveal.trios.flat().map(card => card.id))
}

export const GAME_CONSTANTS = {
  ROUND_SIZE,
}
