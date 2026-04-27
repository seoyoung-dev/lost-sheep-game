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
| 카드 스타일 | 증명사진 스타일 — 큰 얼굴, 양털이 사람 헤어처럼 위에 쌓임, 몸통이 아래 살짝, 다리 없음 |
| 캐릭터 톤 | 귀여운 카툰, 큰 검은 눈 + 광택, 볼터치 핑크, Y자 코, 컬 장식 |
| 배경 표현 | 풍경 일러스트 (들판·산·강가가 배경 전체에 명확히) |
| 팔레트 | 파스텔 — 배경 #FCE7F3·#DBEAFE, 팀1 #EF4444, 팀2 #3B82F6, 강조 #FACC15 |
| 라운드당 카드 | 9장 (3×3) |
| 벨 입력 | 키보드 A(팀1)·L(팀2). 5초 카운트다운은 안내용, **자동 감점 없음** |
| 운영 | 사회자 수동 진행 + ±1/±2 점수 버튼 |
| 스택 | Vite + React + TypeScript, 정적 빌드 (`dist/`) |

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
├── reference/          ← 원본 룰·이미지 (건드리지 말 것)
│   ├── original-rule.md
│   └── image.png
└── src/
    ├── main.tsx
    ├── App.tsx          ← 현재 DesignSheep 페이지만 렌더링
    ├── styles/global.css
    ├── components/
    │   └── Sheep.tsx    ← Phase 1A 작업 중 (아래 설명)
    ├── pages/
    │   └── DesignSheep.tsx  ← 양 9장 시안 페이지 (임시)
    └── vite-env.d.ts
```

`npm run dev` → http://localhost:5173 에서 확인 가능.

---

### 🔄 Phase 1A — 양 SVG 디자인 (사용자 승인 대기 중)

`src/components/Sheep.tsx`에 `<Sheep color={...} mood={...} size={...} />` 컴포넌트 작성됨.

**현재 디자인 방향 (3차 수정 버전, 승인 미완료):**
- 증명사진 스타일 — 큰 얼굴 중심, 다리 없음
- 양털이 얼굴 위에 "헤어" 처럼 쌓이는 형태
- SVG 레이어 순서: 몸통 → 귀 → 얼굴 → 표정 → 양털 헤어 (얼굴 윗부분을 덮음)
- 아래에 몸통 원이 살짝 보임
- 눈: happy=반달 웃음 눈(호), crying=큰 검은 원+눈물+처진 눈썹, asleep=닫힌 호+z
- 볼터치, Y자 코, S자 컬 장식 포함
- viewBox: `0 0 160 188`

`src/pages/DesignSheep.tsx` — 3색 × 3표정 = 9장 그리드로 시안 확인하는 임시 페이지.

> ⚠️ **사용자가 아직 Phase 1A 디자인을 최종 승인하지 않았음.**
> 브라우저에서 http://localhost:5173 을 보여주고 OK를 받은 뒤 Phase 1B로 넘어갈 것.

---

### ⬜ Phase 1B — 배경 3종 시안 (미시작)

`src/components/Background.tsx`를 새로 만들어야 함.

```tsx
// 시그니처
<Background place={'field' | 'mountain' | 'river'} />
```

각 배경은 카드 비율(약 3:4)에 맞게 그리고, **양이 올라설 하단 중앙 영역을 비워 둘 것**.

| place | 표현 |
|-------|------|
| `field` | 연두 그라디언트 + 풀잎 점선 + 작은 꽃 |
| `mountain` | 회색 삼각형 두 개 겹침 + 흰 봉우리 + 하늘 그라디언트 |
| `river` | 파란 곡선 두 줄 + 자갈 점 + 모래 톤 |

`src/pages/DesignBackground.tsx`(임시)도 만들어서 3종을 한 화면에 나란히 표시.
→ **사용자 승인 후 Phase 1C로.**

---

### ⬜ Phase 1C — 카드 합성 27장 시안 (미시작)

`src/components/Card.tsx`를 만들어야 함.

```tsx
<Card card={SheepCard} number={n} highlighted={boolean} />
```

- 흰 라운드 사각 프레임 + 파스텔 그림자
- 좌상단에 큰 카드 번호
- Background 위에 Sheep 합성 (Sheep은 배경 하단 중앙에 위치)
- `src/pages/DesignAll.tsx`(임시): 27장 전체 그리드

→ **사용자 최종 디자인 승인.** 이후 디자인 변경은 마이크로 조정만 허용.

---

### ⬜ Phase 2 — 게임 데이터·로직 (미시작)

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
// types.ts
export type Color = 'white' | 'black' | 'brown'
export type Mood  = 'happy' | 'crying' | 'asleep'
export type Place = 'field' | 'mountain' | 'river'
export type SheepCard = { id: number; color: Color; mood: Mood; place: Place }

// logic.ts
// 3속성 모두 "전부 같음" 또는 "전부 다름"이어야 valid
function isValidTrio(a, b, c): boolean {
  return ['color', 'mood', 'place'].every(attr => {
    const vals = [a[attr], b[attr], c[attr]]
    return (vals[0] === vals[1] && vals[1] === vals[2])  // 전부 같음
        || new Set(vals).size === 3                       // 전부 다름
  })
}
```

---

### ⬜ Phase 3 — 게임 화면·입력·사회자 패널 (미시작)

만들어야 할 파일:

```
src/
├── state/
│   └── gameStore.ts      ← useReducer 기반 단일 store
├── components/
│   ├── Board.tsx          ← 3×3 카드 그리드, 정답 강조
│   ├── BellPanel.tsx      ← 양팀 점수·벨 상태·5초 카운트다운
│   ├── HostPanel.tsx      ← 사회자 컨트롤
│   └── ResultOverlay.tsx  ← 정답 공개 오버레이
└── hooks/
    └── useBuzzerKeys.ts   ← A/L/Esc/Space 키 리스너
```

**상태 모델:**

```ts
type GameState = {
  round: number
  cards: SheepCard[]           // 현재 9장
  scores: { team1: number; team2: number }
  buzz: null | {
    team: 'team1' | 'team2'
    deadline: number           // ms epoch, 카운트다운용
    expired: boolean           // true여도 자동 감점 없음 — 사회자 판정
  }
  reveal: null | {
    mode: 'trio' | 'noCombo'
    trios: SheepCard[][]       // 정답 강조할 조합들
  }
}
```

**키 매핑:** A → 팀1 벨, L → 팀2 벨, Esc → 벨 리셋, Space → 다음 라운드
**5초 타이머**: 시각·청각 안내만, 만료돼도 점수 자동 차감 **없음**
**사회자 버튼**: [다음 라운드] [정답 공개] [조합 없음 처리] + 팀별 [+1] [-1] [+2] [-2]

---

### ⬜ Phase 4 — 통합·시연·빌드 (미시작)

- 임시 디자인 페이지(`DesignSheep`, `DesignBackground`, `DesignAll`) 정리 또는 dev 전용 토글
- 1080p/4K 풀스크린 가독성 확인 (카드·폰트 크기 조정)
- `npm run build` → `dist/` 정적 산출 검증

---

## 작업 재개 방법

```bash
cd /Users/joseoyeong/projects/combination-game
npm run dev
# http://localhost:5173 에서 현재 양 시안 확인
```

**다음 할 일 (순서대로):**
1. 사용자에게 http://localhost:5173 의 양 시안 9종을 보여주고 Phase 1A 승인 받기
2. 승인되면 `src/components/Background.tsx` + `src/pages/DesignBackground.tsx` 작성
3. 배경 승인 → `src/components/Card.tsx` + `src/pages/DesignAll.tsx` 작성 (27장 합성)
4. 디자인 최종 승인 후 Phase 2~4 구현

---

## 이번 범위 밖

- 라운드당 카드 수 토글 (6/9/12)
- 효과음 on/off
- 모바일 버저 (WebSocket 필요)
- 조합 존재율 균형 셔플
