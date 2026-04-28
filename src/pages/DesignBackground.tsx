import Background from '../components/Background'
import Sheep from '../components/Sheep'

type Place = 'field' | 'mountain' | 'river'

const PLACES: Place[] = ['field', 'mountain', 'river']

const PLACE_LABEL: Record<Place, string> = {
  field: '들판',
  mountain: '산',
  river: '강가',
}

const PLACE_DESC: Record<Place, string> = {
  field: '원본 카드처럼 밝은 낮 톤의 배경',
  mountain: '원본 카드처럼 강한 노을 톤의 배경',
  river: '원본 카드처럼 진한 밤 톤의 배경',
}

const SHEEP_BOTTOM_TRIM = 18

export default function DesignBackground() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fce7f3 0%, #fae8ff 100%)',
        padding: '32px',
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '8px', color: '#9D174D' }}>
        잃은 양 찾기 — 시안 1B: 배경 3종
      </h1>
      <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '32px' }}>
        양 이미지를 올린 상태로 하단 중앙 여백과 분위기를 확인해주세요.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '22px',
          maxWidth: '1120px',
          margin: '0 auto',
        }}
      >
        {PLACES.map(place => (
          <div
            key={place}
            style={{
              background: 'rgba(255,255,255,0.72)',
              borderRadius: '26px',
              padding: '16px 16px 20px',
              boxShadow: '0 18px 40px rgba(148, 163, 184, 0.18)',
              border: '2px solid rgba(255,255,255,0.72)',
            }}
          >
            <div
              style={{
                position: 'relative',
                aspectRatio: '5 / 6',
                overflow: 'hidden',
                borderRadius: '24px',
                background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
              }}
            >
              <Background place={place} />

              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 0,
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  width: '78%',
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 14px 18px rgba(15, 23, 42, 0.12))',
                  height: `${Math.round(178 * 1.18) - SHEEP_BOTTOM_TRIM}px`,
                  overflow: 'hidden',
                }}
              >
                <div style={{ transform: `translateY(${SHEEP_BOTTOM_TRIM}px)` }}>
                  <Sheep color="white" mood="happy" size={178} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#334155', marginBottom: '4px' }}>
                {PLACE_LABEL[place]}
              </div>
              <div style={{ fontSize: '0.88rem', lineHeight: 1.5, color: '#64748B' }}>
                {PLACE_DESC[place]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
