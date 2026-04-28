import type { SheepCard } from '../game/types'

interface FoundTriosPanelProps {
  foundTrios: SheepCard[][]
  cards: SheepCard[]
}

const COLOR_LABEL: Record<string, string> = { white: '흰', black: '검', brown: '갈' }
const MOOD_LABEL: Record<string, string> = { happy: '😊', crying: '😢', asleep: '😴' }
const PLACE_LABEL: Record<string, string> = { field: '들', mountain: '산', river: '강' }
const COLOR_DOT: Record<string, string> = {
  white: '#E5E7EB',
  black: '#374151',
  brown: '#92400E',
}

function cardPosition(cards: SheepCard[], card: SheepCard) {
  const idx = cards.findIndex(c => c.id === card.id)
  return idx >= 0 ? idx + 1 : '?'
}

function AttrBadge({ label, same }: { label: string; same: boolean }) {
  return (
    <span
      style={{
        fontSize: '0.7rem',
        fontWeight: 700,
        padding: '2px 6px',
        borderRadius: '6px',
        background: same ? 'rgba(99,102,241,0.12)' : 'rgba(234,88,12,0.10)',
        color: same ? '#4338CA' : '#C2410C',
      }}
    >
      {label}
    </span>
  )
}

function trioAttrSummary(trio: SheepCard[]) {
  const attrs = ['color', 'mood', 'place'] as const
  return attrs.map(attr => {
    const vals = trio.map(c => c[attr])
    const allSame = vals[0] === vals[1] && vals[1] === vals[2]
    if (attr === 'color') {
      const label = allSame ? COLOR_LABEL[vals[0]] + ' 같음' : '색 다름'
      return <AttrBadge key={attr} label={label} same={allSame} />
    }
    if (attr === 'mood') {
      const label = allSame ? MOOD_LABEL[vals[0]] + ' 같음' : '기분 다름'
      return <AttrBadge key={attr} label={label} same={allSame} />
    }
    const label = allSame ? PLACE_LABEL[vals[0]] + ' 같음' : '장소 다름'
    return <AttrBadge key={attr} label={label} same={allSame} />
  })
}

export default function FoundTriosPanel({ foundTrios, cards }: FoundTriosPanelProps) {
  return (
    <section
      style={{
        background: 'rgba(255,255,255,0.76)',
        borderRadius: '28px',
        padding: '20px',
        border: '2px solid rgba(255,255,255,0.8)',
        boxShadow: '0 18px 36px rgba(148, 163, 184, 0.14)',
      }}
    >
      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#334155', marginBottom: '14px' }}>
        인정된 조합 {foundTrios.length > 0 ? `(${foundTrios.length}개)` : ''}
      </div>

      {foundTrios.length === 0 ? (
        <div style={{ fontSize: '0.9rem', color: '#94A3B8', textAlign: 'center', padding: '12px 0' }}>
          아직 찾은 조합이 없습니다
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '8px' }}>
          {foundTrios.map((trio, index) => (
            <div
              key={index}
              style={{
                borderRadius: '14px',
                background: 'rgba(248,250,252,0.96)',
                padding: '10px 12px',
                border: '1px solid rgba(226,232,240,0.8)',
              }}
            >
              {/* 조합 번호 + 카드 위치 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#334155',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </span>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1E293B' }}>
                  {trio.map(c => `${cardPosition(cards, c)}번`).join(' · ')}
                </span>
                <div style={{ display: 'flex', gap: '3px', marginLeft: 'auto' }}>
                  {trio.map(c => (
                    <div
                      key={c.id}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: COLOR_DOT[c.color],
                        border: '1.5px solid rgba(0,0,0,0.15)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* 속성 요약 */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {trioAttrSummary(trio)}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
