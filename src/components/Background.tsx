type Place = 'field' | 'mountain' | 'river'

interface BackgroundProps {
  place: Place
}

const BACKGROUND_THEME: Record<Place, { sky: string; ground: string; accent: string }> = {
  field: {
    sky: 'linear-gradient(180deg, #8fd4ff 0%, #d8b4fe 38%, #fbcfe8 72%, #fde7d6 100%)',
    ground: 'linear-gradient(180deg, #f7a8c9 0%, #f68fb1 100%)',
    accent: '#ffde3b',
  },
  mountain: {
    sky: 'linear-gradient(180deg, #ff5a3a 0%, #ff7b3a 40%, #ff9847 70%, #ffb267 100%)',
    ground: 'linear-gradient(180deg, #e53935 0%, #ef4444 100%)',
    accent: '#ffd166',
  },
  river: {
    sky: 'linear-gradient(180deg, #2848a7 0%, #2e56bc 42%, #315fcb 72%, #3a69d8 100%)',
    ground: 'linear-gradient(180deg, #2a4ba8 0%, #27439a 100%)',
    accent: '#f8fafc',
  },
}

function FloatingCloud({ left, top, scale = 1, opacity = 0.9 }: { left: string; top: string; scale?: number; opacity?: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: `${42 * scale}px`,
        height: `${14 * scale}px`,
        opacity,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '0',
          right: '0',
          bottom: '0',
          height: `${9 * scale}px`,
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.85)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `${7 * scale}px`,
          bottom: `${4 * scale}px`,
          width: `${14 * scale}px`,
          height: `${10 * scale}px`,
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.9)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `${18 * scale}px`,
          bottom: `${3 * scale}px`,
          width: `${16 * scale}px`,
          height: `${11 * scale}px`,
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.9)',
        }}
      />
    </div>
  )
}

function Sparkle({ left, top, size = 14, color = '#fff3a3' }: { left: string; top: string; size?: number; color?: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '2px',
          height: '100%',
          transform: 'translateX(-50%)',
          background: color,
          borderRadius: '999px',
          opacity: 0.95,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: '2px',
          transform: 'translateY(-50%)',
          background: color,
          borderRadius: '999px',
          opacity: 0.95,
        }}
      />
    </div>
  )
}

function Sun({ color }: { color: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        right: '10%',
        top: '10%',
        width: '52px',
        height: '52px',
        opacity: 0.42,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '10px',
          borderRadius: '999px',
          background: color,
        }}
      />
      {[0, 45, 90, 135].map(angle => (
        <div
          key={angle}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '4px',
            height: '52px',
            background: color,
            borderRadius: '999px',
            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
          }}
        />
      ))}
    </div>
  )
}

function SunsetGlyph({ skyColor, ridgeColor }: { skyColor: string; ridgeColor: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        right: '9%',
        top: '12%',
        width: '62px',
        height: '28px',
        opacity: 0.38,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '3px',
          top: '3px',
          width: '32px',
          height: '16px',
          borderRadius: '32px 32px 0 0',
          background: skyColor,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '0',
          right: '0',
          bottom: '1px',
          height: '10px',
          borderRadius: '999px 999px 0 0',
          background: ridgeColor,
          transform: 'scaleX(1.04)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '8px',
          right: '8px',
          bottom: '0',
          height: '6px',
          borderRadius: '999px 999px 0 0',
          background: ridgeColor,
          opacity: 0.9,
        }}
      />
    </div>
  )
}

function Moon({ color, cutColor }: { color: string; cutColor: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        right: '11%',
        top: '12%',
        width: '36px',
        height: '36px',
        borderRadius: '999px',
        background: color,
        opacity: 0.45,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '-2px',
          top: '4px',
          width: '24px',
          height: '24px',
          borderRadius: '999px',
          background: cutColor,
        }}
      />
    </div>
  )
}

function PhotoScene({ place }: { place: Place }) {
  const theme = BACKGROUND_THEME[place]

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 0,
        transform: 'translateX(-50%)',
        width: '62%',
        height: '62%',
        overflow: 'hidden',
        borderRadius: '0',
        background: theme.sky,
        boxShadow: '0 10px 24px rgba(15, 23, 42, 0.14)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '74%',
          background: theme.sky,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '26%',
          background: theme.ground,
          borderTop: '2px solid rgba(255,255,255,0.72)',
        }}
      />

      {place === 'field' && (
        <>
          <FloatingCloud left="8%" top="8%" scale={0.9} />
          <Sparkle left="76%" top="10%" size={10} color="#ffffff" />
          <Sun color="rgba(251, 207, 232, 0.95)" />
        </>
      )}

      {place === 'mountain' && (
        <>
          <Sparkle left="10%" top="16%" size={10} color="#ff8f53" />
          <Sparkle left="74%" top="9%" size={16} color="#ff8f53" />
          <Sparkle left="16%" top="25%" size={10} color="#ffd166" />
          <Sparkle left="80%" top="30%" size={12} color="#ffd166" />
          <SunsetGlyph
            skyColor="rgba(255, 140, 90, 0.92)"
            ridgeColor="rgba(223, 92, 70, 0.88)"
          />
        </>
      )}

      {place === 'river' && (
        <>
          <Sparkle left="16%" top="15%" size={8} color="#f8fafc" />
          <Sparkle left="24%" top="13%" size={6} color="#f8fafc" />
          <Sparkle left="78%" top="15%" size={8} color="#f8fafc" />
          <div
            style={{
              position: 'absolute',
              left: '20%',
              top: '18%',
              width: '42%',
              height: '2px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.12)',
              transform: 'rotate(-12deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '26%',
              top: '22%',
              width: '34%',
              height: '2px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.1)',
              transform: 'rotate(-12deg)',
            }}
          />
          <Moon color="rgba(214, 229, 255, 0.9)" cutColor="rgba(49, 95, 203, 0.92)" />
        </>
      )}
    </div>
  )
}

export default function Background({ place }: BackgroundProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
      }}
    >
      <PhotoScene place={place} />
    </div>
  )
}
