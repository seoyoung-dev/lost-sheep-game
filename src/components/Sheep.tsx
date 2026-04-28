type Color = 'white' | 'black' | 'brown'
type Mood = 'happy' | 'crying' | 'asleep'

interface SheepProps {
  color: Color
  mood: Mood
  size?: number
}

const COLOR_LABEL: Record<Color, string> = {
  white: '흰 양',
  black: '검은 양',
  brown: '갈색 양',
}

const MOOD_LABEL: Record<Mood, string> = {
  happy: '웃음',
  crying: '울음',
  asleep: '잠듦',
}

const sheepImages = import.meta.glob('../assets/sheep/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function getFilename(color: Color, mood: Mood) {
  return `sheep-${color}-${mood}.png`
}

function getImageSrc(color: Color, mood: Mood) {
  return sheepImages[`../assets/sheep/${getFilename(color, mood)}`]
}

export default function Sheep({ color, mood, size = 140 }: SheepProps) {
  const src = getImageSrc(color, mood)
  const alt = `${COLOR_LABEL[color]} ${MOOD_LABEL[mood]}`
  const width = size
  const height = Math.round(size * 1.18)

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          display: 'block',
          width,
          height,
          objectFit: 'contain',
        }}
      />
    )
  }

  return (
    <div
      aria-label={`${alt} 이미지 없음`}
      style={{
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        borderRadius: '20px',
        border: '2px dashed rgba(148, 163, 184, 0.8)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(241,245,249,0.9))',
        color: '#64748B',
        textAlign: 'center',
        padding: '12px',
      }}
    >
      <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{alt}</div>
      <div style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>
        {getFilename(color, mood)}
      </div>
      <div style={{ fontSize: '0.72rem', lineHeight: 1.4 }}>
        src/assets/sheep/ 에 파일 추가 예정
      </div>
    </div>
  )
}
