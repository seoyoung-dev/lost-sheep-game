import Sheep from '../components/Sheep'

type Color = 'white' | 'black' | 'brown'
type Mood  = 'happy' | 'crying' | 'asleep'

const COLORS: Color[] = ['white', 'black', 'brown']
const MOODS: Mood[]   = ['happy', 'crying', 'asleep']

const COLOR_LABEL: Record<Color, string> = { white: '흰 양', black: '검은 양', brown: '갈색 양' }
const MOOD_LABEL:  Record<Mood,  string> = { happy: '웃음', crying: '울음', asleep: '잠듦' }

const BG: Record<Color, string> = {
  white: '#F0F4FF',
  black: '#E5E7EB',
  brown: '#FEF3C7',
}

export default function DesignSheep() {
  return (
    <div style={{ minHeight: '100vh', background: '#FCE7F3', padding: '32px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '8px', color: '#9D174D' }}>
        잃은 양 찾기 — 시안 1A: 양 캐릭터 9종
      </h1>
      <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '32px' }}>
        3색 × 3표정 조합. 확정되면 알려주세요!
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '720px', margin: '0 auto' }}>
        {COLORS.map(color =>
          MOODS.map(mood => (
            <div
              key={`${color}-${mood}`}
              style={{
                background: BG[color],
                borderRadius: '16px',
                padding: '20px 16px 14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                border: '2px solid rgba(255,255,255,0.8)',
              }}
            >
              <Sheep color={color} mood={mood} size={110} />
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#374151' }}>
                  {COLOR_LABEL[color]}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                  {MOOD_LABEL[mood]}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
