import { dealRound } from '../game/round'
import { findAllValidTrios, isValidTrio } from '../game/logic'
import type { SheepCard } from '../game/types'

export type Team = 'team1' | 'team2'

export type RevealState =
  | null
  | {
      mode: 'trio' | 'noCombo' | 'hint' | 'hintCards' | 'timeout'
      trios: SheepCard[][]
      selectedCards?: SheepCard[]
      isCorrect?: boolean
      isDuplicate?: boolean
    }

export type BuzzState =
  | null
  | {
      team: Team
    }

export type CardCount = 9 | 12

export interface GameState {
  round: number
  cards: SheepCard[]
  scores: { team1: number; team2: number }
  buzz: BuzzState
  reveal: RevealState
  selectedPositions: number[]
  foundTrioKeys: string[]
  foundTrios: SheepCard[][]
  teamActionCount: number
  cardCount: CardCount
}

export type GameAction =
  | { type: 'next_round' }
  | { type: 'reset_round' }
  | { type: 'set_card_count'; count: CardCount }
  | { type: 'buzz'; team: Team }
  | { type: 'buzz_reset' }
  | { type: 'reveal_trios' }
  | { type: 'reveal_no_combo' }
  | { type: 'hint' }
  | { type: 'hint_cards' }
  | { type: 'timeout_reveal' }
  | { type: 'select_position'; position: number }
  | { type: 'remove_last_selection' }
  | { type: 'submit_selection' }
  | { type: 'hide_reveal' }
  | { type: 'adjust_score'; team: Team; amount: number }

function getNewRound(count: CardCount) {
  return dealRound(count)
}

function getTrioKey(cards: SheepCard[]) {
  return cards
    .map(card => card.id)
    .sort((a, b) => a - b)
    .join('-')
}

export function createInitialGameState(): GameState {
  return {
    round: 1,
    cards: getNewRound(9),
    scores: { team1: 0, team2: 0 },
    buzz: null,
    reveal: null,
    selectedPositions: [],
    foundTrioKeys: [],
    foundTrios: [],
    teamActionCount: 0,
    cardCount: 9,
  }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'next_round':
      return {
        ...state,
        round: state.round + 1,
        cards: getNewRound(state.cardCount),
        buzz: null,
        reveal: null,
        selectedPositions: [],
        foundTrioKeys: [],
        foundTrios: [],
      }

    case 'reset_round':
      return {
        ...state,
        cards: getNewRound(state.cardCount),
        buzz: null,
        reveal: null,
        selectedPositions: [],
        foundTrioKeys: [],
        foundTrios: [],
      }

    case 'set_card_count':
      return {
        ...state,
        cardCount: action.count,
        cards: getNewRound(action.count),
        buzz: null,
        reveal: null,
        selectedPositions: [],
        foundTrioKeys: [],
        foundTrios: [],
      }

    case 'buzz':
      if (state.buzz) {
        return state
      }

      return {
        ...state,
        buzz: { team: action.team },
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

    case 'reveal_no_combo': {
      const allTrios = findAllValidTrios(state.cards)
      const remainingTrios = allTrios.filter(
        trio => !state.foundTrioKeys.includes(getTrioKey(trio))
      )
      const isCorrect = remainingTrios.length === 0
      const buzzTeam = state.buzz?.team
      return {
        ...state,
        scores: buzzTeam
          ? { ...state.scores, [buzzTeam]: state.scores[buzzTeam] + (isCorrect ? 2 : -2) }
          : state.scores,
        reveal: {
          mode: 'noCombo',
          trios: remainingTrios,
          isCorrect,
        },
      }
    }

    case 'hint': {
      const allTrios = findAllValidTrios(state.cards)
      const remainingTrios = allTrios.filter(
        trio => !state.foundTrioKeys.includes(getTrioKey(trio))
      )
      return {
        ...state,
        reveal: { mode: 'hint', trios: remainingTrios },
      }
    }

    case 'hint_cards': {
      const allTrios = findAllValidTrios(state.cards)
      const remainingTrios = allTrios.filter(
        trio => !state.foundTrioKeys.includes(getTrioKey(trio))
      )
      return {
        ...state,
        reveal: { mode: 'hintCards', trios: remainingTrios },
      }
    }

    case 'timeout_reveal': {
      if (state.reveal) return state
      const allTrios = findAllValidTrios(state.cards)
      const remainingTrios = allTrios.filter(
        trio => !state.foundTrioKeys.includes(getTrioKey(trio))
      )
      return {
        ...state,
        reveal: { mode: 'timeout', trios: remainingTrios },
      }
    }

    case 'select_position':
      if (!state.buzz) {
        return state
      }

      if (action.position < 1 || action.position > state.cards.length) {
        return state
      }

      if (state.selectedPositions.includes(action.position)) {
        return {
          ...state,
          selectedPositions: state.selectedPositions.filter(p => p !== action.position),
        }
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
      const trioKey = getTrioKey(selectedCards)
      const isDuplicate = correct && state.foundTrioKeys.includes(trioKey)

      return {
        ...state,
        scores: correct && !isDuplicate
          ? {
              ...state.scores,
              [state.buzz.team]: state.scores[state.buzz.team] + 1,
            }
          : state.scores,
        foundTrioKeys: correct && !isDuplicate ? [...state.foundTrioKeys, trioKey] : state.foundTrioKeys,
        foundTrios: correct && !isDuplicate ? [...state.foundTrios, selectedCards] : state.foundTrios,
        reveal: {
          mode: 'trio',
          trios: correct ? [selectedCards] : [],
          selectedCards,
          isCorrect: correct && !isDuplicate,
          isDuplicate,
        },
        teamActionCount: state.teamActionCount + 1,
      }
    }

    case 'hide_reveal':
      if (state.reveal?.selectedCards) {
        const shouldPenalize = Boolean(state.buzz && !state.reveal.isCorrect && !state.reveal.isDuplicate)

        return {
          ...state,
          scores: shouldPenalize
            ? {
                ...state.scores,
                [state.buzz!.team]: state.scores[state.buzz!.team] - 1,
              }
            : state.scores,
          buzz: null,
          reveal: null,
          selectedPositions: [],
        }
      }

      if (state.reveal?.mode === 'noCombo') {
        if (state.reveal.isCorrect) {
          return {
            ...state,
            round: state.round + 1,
            cards: getNewRound(state.cardCount),
            buzz: null,
            reveal: null,
            selectedPositions: [],
            foundTrioKeys: [],
            foundTrios: [],
          }
        }
        return { ...state, buzz: null, reveal: null, selectedPositions: [] }
      }

      if (state.reveal?.mode === 'timeout') {
        return {
          ...state,
          round: state.round + 1,
          cards: getNewRound(state.cardCount),
          buzz: null,
          reveal: null,
          selectedPositions: [],
          foundTrioKeys: [],
          foundTrios: [],
        }
      }

      if (
        (state.reveal?.mode === 'hint' || state.reveal?.mode === 'hintCards') &&
        state.reveal.trios.length === 0
      ) {
        return {
          ...state,
          round: state.round + 1,
          cards: getNewRound(state.cardCount),
          buzz: null,
          reveal: null,
          selectedPositions: [],
          foundTrioKeys: [],
          foundTrios: [],
        }
      }

      return { ...state, reveal: null }

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
  if (reveal?.mode === 'hintCards') {
    return new Set(reveal.trios.flat().map(card => card.id))
  }
  return new Set<number>()
}

export const GAME_CONSTANTS = {
  ROUND_SIZE,
}
