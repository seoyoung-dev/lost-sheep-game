type Color = 'white' | 'black' | 'brown'
type Mood  = 'happy' | 'crying' | 'asleep'

interface SheepProps {
  color: Color
  mood: Mood
  size?: number
}

type Pal = {
  wool: string; woolDark: string; woolHi: string
  face: string; faceStroke: string
  ear: string; earIn: string
  accent: string
}

const PALETTE: Record<Color, Pal> = {
  white: {
    wool: '#EDEAE5', woolDark: '#C5C0B8', woolHi: '#F8F6F3',
    face: '#FAE8D0', faceStroke: '#D8C0A0',
    ear: '#EFD9C0', earIn: '#DEC8B0',
    accent: '#CBC7C1',
  },
  black: {
    wool: '#4A4A4A', woolDark: '#2A2A2A', woolHi: '#636363',
    face: '#8A7060', faceStroke: '#6A5040',
    ear: '#6A5A48', earIn: '#55453A',
    accent: '#333333',
  },
  brown: {
    wool: '#9B7055', woolDark: '#7A5535', woolHi: '#B28568',
    face: '#C4926A', faceStroke: '#A07050',
    ear: '#D4A070', earIn: '#C08055',
    accent: '#7A5535',
  },
}

const BODY_BUMPS: [number, number, number][] = [
  [80, 138, 40],
  [55, 142, 24],
  [105, 142, 24],
  [60, 163, 20],
  [100, 163, 20],
  [80, 166, 22],
]

const HEAD_WOOL: [number, number, number][] = [
  [44, 72, 19],
  [61, 56, 19],
  [80, 51, 22],
  [99, 56, 19],
  [116, 72, 19],
  [57, 81, 17],
  [80, 76, 20],
  [103, 81, 17],
]

interface EyesProps { mood: Mood; lx: number; rx: number; ey: number; pal: Pal }

function Eyes({ mood, lx, rx, ey, pal }: EyesProps) {
  if (mood === 'happy') {
    return (
      <>
        <circle cx={lx} cy={ey} r={8.8} fill="#171717" />
        <circle cx={rx} cy={ey} r={8.8} fill="#171717" />
        <circle cx={lx - 2.5} cy={ey - 3} r={2.8} fill="white" />
        <circle cx={rx - 2.5} cy={ey - 3} r={2.8} fill="white" />
      </>
    )
  }

  if (mood === 'crying') {
    return (
      <>
        <path
          d={`M ${lx - 8},${ey - 15} Q ${lx},${ey - 19} ${lx + 8},${ey - 15}`}
          stroke={pal.accent}
          strokeWidth={2.2}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M ${rx - 8},${ey - 15} Q ${rx},${ey - 19} ${rx + 8},${ey - 15}`}
          stroke={pal.accent}
          strokeWidth={2.2}
          fill="none"
          strokeLinecap="round"
        />
        <circle cx={lx} cy={ey} r={9.8} fill="#171717" />
        <circle cx={rx} cy={ey} r={9.8} fill="#171717" />
        <circle cx={lx - 2.5} cy={ey - 3.5} r={2.8} fill="white" />
        <circle cx={rx - 2.5} cy={ey - 3.5} r={2.8} fill="white" />
        <path
          d={`M ${lx - 1},${ey + 9} Q ${lx - 7},${ey + 20} ${lx - 2},${ey + 29} Q ${lx + 6},${ey + 20} ${lx + 2},${ey + 10}`}
          fill="#A5D8FF"
          opacity={0.9}
        />
        <path
          d={`M ${rx + 1},${ey + 9} Q ${rx - 5},${ey + 20} ${rx},${ey + 29} Q ${rx + 8},${ey + 20} ${rx + 4},${ey + 10}`}
          fill="#A5D8FF"
          opacity={0.9}
        />
      </>
    )
  }

  /* asleep */
  return (
    <>
      <path
        d={`M ${lx - 8},${ey - 2} Q ${lx},${ey + 5} ${lx + 8},${ey - 2}`}
        stroke="#171717"
        strokeWidth={3.2}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M ${rx - 8},${ey - 2} Q ${rx},${ey + 5} ${rx + 8},${ey - 2}`}
        stroke="#171717"
        strokeWidth={3.2}
        fill="none"
        strokeLinecap="round"
      />
    </>
  )
}

export default function Sheep({ color, mood, size = 140 }: SheepProps) {
  const p = PALETTE[color]

  return (
    <svg
      width={size}
      height={Math.round(size * 1.18)}
      viewBox="0 0 160 188"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 둥근 구름형 몸통 */}
      {BODY_BUMPS.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={p.wool} stroke={p.woolDark} strokeWidth={1.6} />
      ))}
      <ellipse cx={80} cy={153} rx={43} ry={27} fill={p.wool} />

      {/* 귀는 넓고 낮게, 레퍼런스처럼 힘을 뺀 느낌 */}
      <ellipse
        cx={31}
        cy={99}
        rx={18}
        ry={12}
        fill={p.ear}
        stroke={p.faceStroke}
        strokeWidth={1.5}
        transform="rotate(-16,31,99)"
      />
      <ellipse cx={32} cy={99} rx={9} ry={5} fill={p.earIn} transform="rotate(-16,32,99)" />
      <ellipse
        cx={129}
        cy={99}
        rx={18}
        ry={12}
        fill={p.ear}
        stroke={p.faceStroke}
        strokeWidth={1.5}
        transform="rotate(16,129,99)"
      />
      <ellipse cx={128} cy={99} rx={9} ry={5} fill={p.earIn} transform="rotate(16,128,99)" />

      {/* 말랑한 얼굴 */}
      <rect
        x={35}
        y={66}
        width={90}
        height={64}
        rx={28}
        fill={p.face}
        stroke={p.faceStroke}
        strokeWidth={1.6}
      />

      {/* 얼굴을 덮는 앞머리형 양털 */}
      {HEAD_WOOL.map(([cx, cy, r], i) => (
        <circle key={`head-${i}`} cx={cx} cy={cy} r={r} fill={p.wool} stroke={p.woolDark} strokeWidth={1.6} />
      ))}
      {HEAD_WOOL.map(([cx, cy, r], i) => (
        <circle
          key={`head-hi-${i}`}
          cx={cx - r * 0.22}
          cy={cy - r * 0.26}
          r={r * 0.34}
          fill={p.woolHi}
          opacity={0.62}
        />
      ))}

      {/* 얼굴 요소 */}
      <ellipse cx={54} cy={111} rx={9} ry={7} fill="#F7B6C2" opacity={0.62} />
      <ellipse cx={106} cy={111} rx={9} ry={7} fill="#F7B6C2" opacity={0.62} />
      <Eyes mood={mood} lx={60} rx={100} ey={100} pal={p} />

      <path d="M 80,106 C 78,108 78,111 80,112 C 82,111 82,108 80,106" fill="#3A2A22" />
      {mood === 'happy' && (
        <>
          <path d="M 73,116 Q 77,121 80,118" stroke="#3A2A22" strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M 87,116 Q 83,121 80,118" stroke="#3A2A22" strokeWidth={2} fill="none" strokeLinecap="round" />
        </>
      )}
      {mood === 'crying' && (
        <>
          <path d="M 72,120 Q 77,114 80,116" stroke="#3A2A22" strokeWidth={2} fill="none" strokeLinecap="round" />
          <path d="M 88,120 Q 83,114 80,116" stroke="#3A2A22" strokeWidth={2} fill="none" strokeLinecap="round" />
        </>
      )}
      {mood === 'asleep' && (
        <path d="M 73,117 Q 80,120 87,117" stroke="#3A2A22" strokeWidth={1.9} fill="none" strokeLinecap="round" />
      )}

      {mood === 'asleep' && (
        <>
          <text x={116} y={60} fontSize={16} fill="#94A3B8" fontWeight="bold" opacity={0.92}>z</text>
          <text x={128} y={47} fontSize={11} fill="#94A3B8" fontWeight="bold" opacity={0.76}>z</text>
        </>
      )}

      {/* 아래쪽 양털에 작은 곱슬 포인트 */}
      <path
        d="M 50,142 q 5,-7 10,0 q 5,7 10,0 q 5,-7 10,0 q 5,7 10,0 q 5,-7 10,0"
        stroke={p.accent}
        strokeWidth={1.7}
        fill="none"
        strokeLinecap="round"
        opacity={0.45}
      />
    </svg>
  )
}
