# 잃은 양 찾기 — 교회 수련회용 조합 게임

> **다른 AI 인수인계용 문서** — 현재 진행 상황과 남은 작업을 모두 담고 있음.

---

## 프로젝트 개요

원본 게임(`reference/original-rule.md`, `reference/image.png`)의 룰을 교회 수련회에 맞게 재구성한 웹 앱.

- **룰**: 27장 카드 중 9장을 펼쳐 놓고, 3장을 골라 "모든 속성이 전부 같거나 전부 다른" 조합을 찾으면 득점
- **참여**: 두 팀이 큰 화면을 함께 보며 키보드 한 대로 벨 입력
- **구동**: Vite + React + TypeScript, `npm run build`로 정적 산출

---

## 확정된 결정 사항

| 항목 | 값 |
|------|----|
| 테마 | 잃은 양 찾기 (목자 비유) |
| 속성 1 `color` | `white` 흰 양 / `black` 검은 양 / `brown` 갈색 양 |
| 속성 2 `mood` | `happy` 웃음 / `crying` 울음 / `asleep` 잠듦 |
| 속성 3 `place` | `field` 들판 / `mountain` 산 / `river` 강가 |
| 양 자산 방식 | **사용자가 그린 9개 PNG 이미지 사용** |
| 양 파일 위치 | `src/assets/sheep/` |
| 양 파일명 규칙 | `sheep-{color}-{mood}.png` |
| 배경 표현 | 풍경 일러스트 (들판·산·강가가 배경 전체에 명확히) |
| 팔레트 | 파스텔 — 배경 #FCE7F3·#DBEAFE, 팀1 #EF4444, 팀2 #3B82F6, 강조 #FACC15 |
| 라운드당 카드 | 9장 (3×3) |
| 벨 입력 | 키보드 A(팀1)·L(팀2). 5초 카운트다운은 안내용, **자동 감점 없음** |
| 운영 | 사회자 수동 진행 + ±1/±2 점수 버튼 |
| 스택 | Vite + React + TypeScript, 정적 빌드 (`dist/`) |

### 양 이미지 파일명 규칙

아래 9개 파일명을 그대로 사용한다.

- `sheep-white-happy.png`
- `sheep-white-crying.png`
- `sheep-white-asleep.png`
- `sheep-black-happy.png`
- `sheep-black-crying.png`
- `sheep-black-asleep.png`
- `sheep-brown-happy.png`
- `sheep-brown-crying.png`
- `sheep-brown-asleep.png`

기본 원칙:

- 전부 소문자
- 구분자는 하이픈 `-`
- 확장자는 우선 `.png`
- 숫자 코드, 한글 파일명 사용하지 않음

### 점수 규칙

| 상황 | 점수 |
|------|------|
| 정답 조합 호명 | +1 |
| 오답 호명 | −1 |
| "조합 없음" 선언 정답 | +2 |
| "조합 없음" 선언 오답 | −2 |

사회자가 ±1/±2 버튼으로 직접 조정 (동시 벨, 무효 등 예외 처리).

---

## 현재 진행 상황

### ✅ Phase 0 — 스캐폴딩 완료

```
combination-game/
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── index.html
├── PLAN.md
├── reference/          ← 원본 룰·이미지 (건드리지 말 것)
│   ├── original-rule.md
│   └── image.png
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── styles/global.css
    ├── assets/
    │   └── sheep/      ← 사용자 제공 9개 PNG 저장 완료
    ├── components/
    │   ├── Sheep.tsx        ← 이미지 매핑 컴포넌트
    │   └── Background.tsx   ← 배경 3종 시안 컴포넌트
    ├── pages/
    │   ├── DesignSheep.tsx       ← 9종 미리보기 임시 페이지
    │   └── DesignBackground.tsx  ← 배경 3종 시안 임시 페이지
    └── vite-env.d.ts
```

`npm run dev` → http://localhost:5173 에서 확인 가능.

---

### ✅ Phase 1A — 사용자 제작 양 이미지 9종 정리 및 자산 연결 (완료)

- 기존 SVG 양 시안은 **폐기 예정 또는 참고용**이다.
- 앞으로 최종 양 비주얼은 **사용자가 제공하는 9개 이미지 파일**을 기준으로 한다.
- 9개 자산이 `src/assets/sheep/`에 저장되었고, 파일명 규칙 검수 완료.
- `DesignSheep`에서 3색 × 3표정 미리보기 연결 확인 완료.

`src/components/Sheep.tsx`

- SVG를 직접 그리지 않고 `color`와 `mood` 조합에 맞는 PNG를 매핑해서 렌더링한다.
- 내부적으로 기대 파일명 `sheep-{color}-{mood}.png`를 사용한다.
- 파일이 없을 경우 placeholder를 렌더링하도록 안전 장치 포함.

`src/pages/DesignSheep.tsx`

- 3색 × 3표정 = 9개 조합 미리보기 페이지
- 자산이 모두 들어오면 파일 누락/오배치/오타를 이 페이지에서 먼저 확인

---

### ✅ Phase 1B — 배경 3종 시안 (확정)

`src/components/Background.tsx` 작성 완료.

```tsx
<Background place={'field' | 'mountain' | 'river'} />
```

각 배경은 카드 비율(약 3:4)에 맞게 그리고, **양이 올라설 하단 중앙 영역을 비워 둘 것**.

- 배경은 이미지 파일이 아니라 **코드 기반 일러스트**로 제작
- 원본 `reference/image.png`처럼 카드 뒤의 세로 장면 박스 구조를 참고해 구성
- 해/달/노을 아이콘은 유지하되, 배경색과 유사한 저대비 톤으로 조정
- 양 이미지가 배경 하단 중앙에 자연스럽게 올라오도록 안전 여백 조정

| place | 표현 |
|-------|------|
| `field` | 연두 그라디언트 + 풀잎 점선 + 작은 꽃 |
| `mountain` | 회색 삼각형 두 개 겹침 + 흰 봉우리 + 하늘 그라디언트 |
| `river` | 파란 곡선 두 줄 + 자갈 점 + 모래 톤 |

`src/pages/DesignBackground.tsx`에서 3종 시안 확인 및 사용자 승인 완료.

현재 `src/App.tsx`는 `DesignBackground`를 렌더링하도록 되어 있음.

---

### ✅ Phase 1C — 카드 합성 27장 시안 (완료)

다음으로 `src/components/Card.tsx`를 만들어야 함.

```tsx
<Card card={SheepCard} number={n} highlighted={boolean} />
```

- Card는 `배경 + 양 이미지 + 카드 번호 + 프레임` 합성
- 27장 전체 조합은 데이터 기반으로 생성
- 이미지 비율 차이를 고려해 카드 내부 정렬 규칙을 고정

기본 규칙:

- 양 이미지는 카드 하단 중앙 정렬
- 카드 내부 최대 높이 비율을 정해 일관된 크기로 표시
- 배경이 가리지 않도록 z-index 순서 고정
- 흰 라운드 사각 프레임 + 파스텔 그림자
- 좌상단에 큰 카드 번호

`src/pages/DesignAll.tsx`(임시): 27장 전체 그리드 예정

→ **사용자 최종 디자인 승인.** 이후 디자인 변경은 마이크로 조정만 허용.

---

### ✅ Phase 2 — 게임 데이터·로직 (완료)

만들어야 할 파일:

```
src/game/
├── types.ts    ← Color, Mood, Place, SheepCard 타입
├── data.ts     ← ALL_CARDS 배열 (27장, id 1~27 고정)
├── logic.ts    ← isValidTrio, findAllValidTrios
└── round.ts    ← dealRound(size=9), hasAnyValidTrio
```

핵심 로직:

```ts
export type Color = 'white' | 'black' | 'brown'
export type Mood  = 'happy' | 'crying' | 'asleep'
export type Place = 'field' | 'mountain' | 'river'
export type SheepCard = { id: number; color: Color; mood: Mood; place: Place }

function isValidTrio(a, b, c): boolean {
  return ['color', 'mood', 'place'].every(attr => {
    const vals = [a[attr], b[attr], c[attr]]
    return (vals[0] === vals[1] && vals[1] === vals[2])
        || new Set(vals).size === 3
  })
}
```

---

### ✅ Phase 3 — 게임 화면·입력·사회자 패널 (완료)

만들어야 할 파일:

```
src/
├── state/
│   └── gameStore.ts
├── components/
│   ├── Board.tsx
│   ├── BellPanel.tsx
│   ├── HostPanel.tsx
│   └── ResultOverlay.tsx
└── hooks/
    └── useBuzzerKeys.ts
```

**상태 모델:**

```ts
type GameState = {
  round: number
  cards: SheepCard[]
  scores: { team1: number; team2: number }
  buzz: null | {
    team: 'team1' | 'team2'
    deadline: number
    expired: boolean
  }
  reveal: null | {
    mode: 'trio' | 'noCombo'
    trios: SheepCard[][]
  }
}
```

**키 매핑:** A → 팀1 벨, L → 팀2 벨, Esc → 벨 리셋, Space → 다음 라운드
**5초 타이머**: 시각·청각 안내만, 만료돼도 점수 자동 차감 **없음**
**사회자 버튼**: [다음 라운드] [정답 공개] [조합 없음 처리] + 팀별 [+1] [-1] [+2] [-2]

---

### 🔄 Phase 4 — 통합·시연·빌드 (진행 중)

- 임시 디자인 페이지(`DesignSheep`, `DesignBackground`, `DesignAll`) 정리 또는 dev 전용 토글
- 1080p/4K 풀스크린 가독성 확인 (카드·폰트 크기 조정)
- `npm run build` → `dist/` 정적 산출 검증

---

## 작업 재개 방법

```bash
cd /Users/joseoyeong/projects/combination-game
npm run dev
# http://localhost:5173 에서 현재 배경 3종 시안 확인
```

**다음 할 일 (순서대로):**
1. `npm run build` 통과 여부 확인
2. 풀스크린(1080p/4K)에서 카드·점수 가독성 점검 및 크기 조정
3. 임시 디자인 페이지(`DesignSheep`, `DesignBackground`, `DesignAll`) 정리
4. 실제 게임 5라운드 시연으로 A/L 벨·카드 선택·정답 판정·점수 흐름 최종 확인

---

## 테스트 체크리스트

- 9개 파일이 모두 존재하는지 확인
- 각 파일명이 slug 규칙과 정확히 일치하는지 확인
- `DesignSheep`에서 3색 × 3표정이 모두 올바른 이미지로 표시되는지 확인
- `happy / crying / asleep` 매핑이 뒤바뀌지 않았는지 확인
- `black`과 `brown` 파일이 잘못 바뀌지 않았는지 확인
- `DesignBackground`에서 배경 3종이 의도한 색감/아이콘/배치로 표시되는지 확인
- 카드 합성 후 양 이미지가 카드 하단 중앙에 안정적으로 정렬되는지 확인
- `npm run build`가 통과하는지 확인

---

## 이번 범위 밖

- 라운드당 카드 수 토글 (6/9/12)
- 효과음 on/off
- 모바일 버저 (WebSocket 필요)
- 조합 존재율 균형 셔플
