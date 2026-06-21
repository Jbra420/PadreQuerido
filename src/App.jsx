import { useState, useEffect, useRef, useCallback } from 'react'
import { photos as photoConfig } from './photos.js'

// ══════════════════════════════════════════════════════════════
//  CONFETTI
// ══════════════════════════════════════════════════════════════
function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2.5 + Math.random() * 2}s`,
    color: ['#f97316','#fb923c','#fbbf24','#f59e0b','#fde68a','#fff7ed','#ff6b35'][
      Math.floor(Math.random() * 7)
    ],
    size: `${6 + Math.random() * 6}px`,
    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
  }))
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div key={p.id} className="confetti-piece" style={{
          left: p.left, top: '-20px', width: p.size, height: p.size,
          backgroundColor: p.color, borderRadius: p.borderRadius,
          animationDuration: p.duration, animationDelay: p.delay,
        }} />
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  FLOATING PARTICLES
// ══════════════════════════════════════════════════════════════
function FloatingParticles() {
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const iv = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-12),
        {
          id: Date.now(),
          x: Math.random() * 90 + 5,
          size: 4 + Math.random() * 8,
          duration: 2.5 + Math.random() * 2,
          emoji: ['✨','🧡','⭐','💛'][Math.floor(Math.random() * 4)],
        },
      ])
    }, 600)
    return () => clearInterval(iv)
  }, [])
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <span key={p.id} className="particle absolute"
          style={{ left:`${p.x}%`, bottom:'10%', fontSize:`${p.size}px`, animationDuration:`${p.duration}s` }}>
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  FLOATING MUSIC PLAYER  🎵
// ══════════════════════════════════════════════════════════════
const SONG_ID = 'gsptwNLwu0Y'

function FloatingMusicPlayer() {
  const [open, setOpen]       = useState(false)
  const [loaded, setLoaded]   = useState(false)
  const [playing, setPlaying] = useState(false)

  // Build the embed src only once the drawer is opened
  const embedSrc = loaded
    ? `https://www.youtube.com/embed/${SONG_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1&enablejsapi=0`
    : ''

  function toggle() {
    if (!open) {
      setLoaded(true)
      setPlaying(true)
    } else {
      setPlaying(false)
    }
    setOpen(o => !o)
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={toggle}
        />
      )}

      {/* Bottom music drawer */}
      <div
        className="fixed left-0 right-0 z-50 transition-transform duration-500"
        style={{
          bottom: 0,
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          maxWidth: '430px',
          margin: '0 auto',
        }}
      >
        <div
          className="rounded-t-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #1c0500 0%, #7c2d12 100%)',
            border: '1px solid rgba(249,115,22,0.3)',
            boxShadow: '0 -8px 40px rgba(249,115,22,0.25)',
          }}
        >
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }} />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pb-3">
            <div>
              <p className="text-white font-semibold text-sm" style={{ fontFamily:"'Inter',sans-serif" }}>
                🎵 Para el Día del Padre
              </p>
              <p className="text-amber-400 text-xs opacity-70" style={{ fontFamily:"'Inter',sans-serif" }}>
                Una canción especial para ti, Papá
              </p>
            </div>
            <button
              onClick={toggle}
              className="text-amber-300 text-xl opacity-60 hover:opacity-100 transition-opacity"
              style={{ lineHeight: 1 }}
            >
              ✕
            </button>
          </div>

          {/* YouTube embed */}
          <div className="px-4 pb-6">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '16/9',
                background: '#000',
                boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
              }}
            >
              {loaded && (
                <iframe
                  key={playing ? 'play' : 'stop'}
                  width="100%"
                  height="100%"
                  src={playing ? embedSrc : ''}
                  title="Canción para Papá"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: 'block' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating trigger button */}
      <div
        className="fixed z-50"
        style={{
          bottom: '24px',
          right: '20px',
          maxWidth: '430px',
          // Keep button inside our centered container
        }}
      >
        <button
          onClick={toggle}
          className="relative flex items-center justify-center rounded-full transition-all duration-300 active:scale-90"
          style={{
            width: '56px',
            height: '56px',
            background: open
              ? 'linear-gradient(135deg,#dc2626,#f97316)'
              : 'linear-gradient(135deg,#f97316,#ea580c)',
            boxShadow: open
              ? '0 4px 20px rgba(220,38,38,0.6)'
              : '0 4px 20px rgba(249,115,22,0.7)',
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          {/* Pulse ring when not open */}
          {!open && (
            <span
              className="absolute inset-0 rounded-full"
              style={{
                animation: 'pulse-ring 2s ease-out infinite',
                border: '2px solid rgba(249,115,22,0.6)',
              }}
            />
          )}
          <span className="text-xl">{open ? '✕' : '🎵'}</span>
        </button>
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════════════════
//  SWIPE HOOK
// ══════════════════════════════════════════════════════════════
function useSwipe(onLeft, onRight) {
  const startX = useRef(null)
  const startY = useRef(null)

  const onTouchStart = useCallback((e) => {
    startX.current = e.touches[0].clientX
    startY.current = e.touches[0].clientY
  }, [])

  const onTouchEnd = useCallback((e) => {
    if (startX.current === null) return
    const dx = startX.current - e.changedTouches[0].clientX
    const dy = Math.abs(startY.current - e.changedTouches[0].clientY)
    if (Math.abs(dx) > 45 && Math.abs(dx) > dy) {
      dx > 0 ? onLeft?.() : onRight?.()
    }
    startX.current = null
  }, [onLeft, onRight])

  return { onTouchStart, onTouchEnd }
}

// ══════════════════════════════════════════════════════════════
//  SCREEN 1 — WELCOME
// ══════════════════════════════════════════════════════════════
function Screen1({ onNext }) {
  return (
    <div
      className="screen-slide-enter relative flex flex-col items-center justify-center min-h-screen px-8 text-center cursor-pointer select-none overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #7c2d12 0%, #c2410c 35%, #ea580c 65%, #f97316 100%)' }}
      onClick={onNext}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(251,191,36,0.18) 0%, transparent 65%)' }} />
      <div className="absolute top-12 left-0 right-0 flex justify-center gap-6 opacity-30">
        {['✦','✦','✦'].map((s,i) => <span key={i} className="text-amber-200 text-xs">{s}</span>)}
      </div>
      <div className="animate-pulse-heart text-6xl mb-10 drop-shadow-lg">🧡</div>
      <h1 className="text-white mb-6 leading-tight drop-shadow-lg"
        style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.75rem,6vw,2.5rem)', fontWeight:700,
          letterSpacing:'-0.02em', textShadow:'0 2px 20px rgba(0,0,0,0.3)' }}>
        Para el hombre que me enseñó todo lo que soy
      </h1>
      <div className="flex items-center gap-3 mb-8 opacity-60">
        <div className="h-px w-12 bg-amber-200" />
        <span className="text-amber-200 text-sm">✦</span>
        <div className="h-px w-12 bg-amber-200" />
      </div>
      <p className="text-amber-200 text-base font-light tracking-widest uppercase"
        style={{ fontFamily:"'Inter',sans-serif", letterSpacing:'0.2em' }}>
        Toca para comenzar
      </p>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="animate-bounce opacity-50" style={{ color:'#fde68a', fontSize:'1.5rem' }}>↓</div>
      </div>
      <FloatingParticles />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  SCREEN 2 — QUESTION
// ══════════════════════════════════════════════════════════════
function Screen2({ onNext }) {
  const [chosen, setChosen] = useState(false)
  function handleChoice() {
    setChosen(true)
    setTimeout(onNext, 2200)
  }
  return (
    <div
      className="screen-slide-enter relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #431407 0%, #9a3412 50%, #c2410c 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(251,146,60,0.12) 0%, transparent 70%)' }} />
      {!chosen ? (
        <div className="animate-fade-in w-full max-w-sm">
          <div className="text-5xl mb-8">🤔</div>
          <h2 className="text-white mb-3 leading-snug"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.6rem,5.5vw,2.2rem)', fontWeight:700 }}>
            ¿Sabes quién soy gracias a ti?
          </h2>
          <p className="text-amber-300 text-sm mb-10 opacity-80">Elige una respuesta</p>
          <div className="flex flex-col gap-4">
            {['Tu hijo favorito 😄','¡Claro que sí! 🙌'].map((label) => (
              <button key={label} onClick={handleChoice}
                className="w-full py-5 px-6 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-95"
                style={{
                  background:'rgba(255,255,255,0.12)', border:'1.5px solid rgba(255,255,255,0.25)',
                  color:'#fff7ed', fontFamily:"'Inter',sans-serif",
                  backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
                }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(249,115,22,0.35)';e.currentTarget.style.borderColor='rgba(251,146,60,0.6)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)';e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'}}>
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in w-full max-w-sm">
          <div className="text-5xl mb-6">✅</div>
          <p className="text-white leading-relaxed"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.2rem,4.5vw,1.6rem)', fontStyle:'italic' }}>
            Exacto. Soy electricista, programador, y la persona que no se rinde — todo gracias a ti.
          </p>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  SCREEN 3 — TYPEWRITER + PHOTO PLACEHOLDER
// ══════════════════════════════════════════════════════════════
function useTypewriter(text, speed = 40, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setStarted(true), startDelay); return () => clearTimeout(t) }, [startDelay])
  useEffect(() => {
    if (!started || displayed.length >= text.length) return
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed)
    return () => clearTimeout(t)
  }, [displayed, started, text, speed])
  return displayed
}

function Screen3({ onNext }) {
  const fullText = 'Porque de ti aprendí a levantarme 200 veces después de caer 100.'
  const typed    = useTypewriter(fullText, 38, 1000)
  const done     = typed.length === fullText.length
  return (
    <div className="screen-slide-enter relative flex flex-col items-center justify-start min-h-screen px-6 pt-16 pb-10 overflow-y-auto"
      style={{ background: 'linear-gradient(160deg, #3b0f00 0%, #78350f 40%, #b45309 100%)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(251,191,36,0.1) 0%, transparent 60%)' }} />
      <p className="text-amber-300 text-xs tracking-widest uppercase mb-6 opacity-70"
        style={{ fontFamily:"'Inter',sans-serif", letterSpacing:'0.18em' }}>
        Me enseñaste con el ejemplo
      </p>
      <div className="relative w-64 h-64 rounded-3xl mb-8 flex items-center justify-center overflow-hidden"
        style={{ background:'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
          border:'2px dashed rgba(251,191,36,0.5)',
          boxShadow:'0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
        <div className="text-center">
          <div className="text-5xl mb-3">📸</div>
          <p className="text-amber-300 text-sm opacity-70" style={{ fontFamily:"'Inter',sans-serif" }}>Foto con papá</p>
        </div>
        {['top-3 left-3 border-t-2 border-l-2','top-3 right-3 border-t-2 border-r-2',
          'bottom-3 left-3 border-b-2 border-l-2','bottom-3 right-3 border-b-2 border-r-2'].map((cls,i) => (
          <div key={i} className={`absolute w-5 h-5 ${cls}`} style={{ borderColor:'rgba(251,191,36,0.6)' }} />
        ))}
      </div>
      <div className="w-full max-w-sm text-center mb-10 px-2" style={{ minHeight:'90px' }}>
        <p className="text-white leading-relaxed"
          style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.1rem,4vw,1.4rem)', fontStyle:'italic' }}>
          {typed}
          {!done && <span className="inline-block w-0.5 h-5 bg-amber-300 ml-0.5 align-middle animate-pulse" />}
        </p>
      </div>
      {done && (
        <button onClick={onNext}
          className="animate-fade-in mt-2 px-10 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 active:scale-95"
          style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', color:'#fff7ed',
            fontFamily:"'Inter',sans-serif", boxShadow:'0 4px 20px rgba(249,115,22,0.5)' }}>
          Continuar →
        </button>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  SCREEN 3.5 — PHOTO GALLERY  📸
// ══════════════════════════════════════════════════════════════
function PhotoPlaceholder({ index }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="text-5xl opacity-40">📷</div>
      <p className="text-amber-300 text-sm text-center px-4 opacity-60"
        style={{ fontFamily:"'Inter',sans-serif" }}>
        Foto {index + 1}
      </p>
      <p className="text-amber-200 text-xs text-center px-6 opacity-40"
        style={{ fontFamily:"'Inter',sans-serif" }}>
        Edita src/photos.js para agregar tus fotos
      </p>
    </div>
  )
}

function ScreenPhotos({ onNext }) {
  const [current, setCurrent] = useState(0)
  const [dir, setDir]         = useState(0) // -1 left, 1 right
  const [animating, setAnim]  = useState(false)
  const total = photoConfig.length

  function go(next) {
    if (animating || next === current) return
    setDir(next > current ? 1 : -1)
    setAnim(true)
    setTimeout(() => {
      setCurrent(next)
      setDir(0)
      setAnim(false)
    }, 320)
  }

  const swipe = useSwipe(
    () => current < total - 1 && go(current + 1),
    () => current > 0 && go(current - 1),
  )

  const photo = photoConfig[current]

  return (
    <div
      className="screen-slide-enter relative flex flex-col items-center justify-start min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1c0700 0%, #7c2d12 50%, #b45309 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(251,146,60,0.15) 0%, transparent 65%)' }} />

      {/* Header */}
      <div className="relative z-10 w-full px-6 pt-14 pb-4 text-center">
        <p className="text-amber-300 text-xs tracking-widest uppercase opacity-70"
          style={{ fontFamily:"'Inter',sans-serif", letterSpacing:'0.18em' }}>
          Momentos que guardo en el corazón
        </p>
        <h2 className="text-white mt-2"
          style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.4rem,5vw,1.8rem)', fontWeight:700 }}>
          Nuestra historia
        </h2>
      </div>

      {/* Polaroid card */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-6 py-2"
        {...swipe}>

        <div
          className="relative w-full transition-all duration-300"
          style={{
            maxWidth: '280px',
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${dir * -60}px) rotate(${dir * -3}deg)`
              : 'translateX(0) rotate(0deg)',
          }}
        >
          {/* Polaroid frame */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,252,245,0.96)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
              padding: '12px 12px 52px 12px',
              transform: `rotate(${(current % 3 - 1) * 1.5}deg)`,
            }}
          >
            {/* Photo area */}
            <div
              className="w-full rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                aspectRatio: '1',
                background: 'linear-gradient(135deg, #2d1a0a 0%, #7c3f0f 100%)',
                position: 'relative',
              }}
            >
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  style={{ display: 'block' }}
                />
              ) : (
                <PhotoPlaceholder index={current} />
              )}
            </div>

            {/* Caption */}
            <p
              className="text-center mt-3"
              style={{
                fontFamily:"'Playfair Display',serif",
                fontSize: '0.9rem',
                color: '#3b1a08',
                fontStyle: 'italic',
              }}
            >
              {photo.caption}
            </p>
          </div>

          {/* Stack shadow card behind */}
          <div
            className="absolute inset-0 rounded-2xl -z-10"
            style={{
              background: 'rgba(255,252,245,0.5)',
              transform: 'rotate(3deg) translateY(4px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              padding: '12px 12px 52px 12px',
            }}
          />
        </div>

        {/* Swipe hint */}
        <p className="mt-6 text-amber-400 text-xs opacity-50 text-center"
          style={{ fontFamily:"'Inter',sans-serif" }}>
          ← Desliza para ver más →
        </p>
      </div>

      {/* Dot indicators */}
      <div className="relative z-10 flex justify-center gap-2 py-4">
        {photoConfig.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="rounded-full transition-all duration-400"
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              background: i === current ? '#f97316' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="relative z-10 flex justify-between w-full px-6 pb-4">
        <button
          onClick={() => current > 0 && go(current - 1)}
          className="rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
          style={{
            width:'44px', height:'44px',
            background: current > 0 ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.05)',
            border: current > 0 ? '1px solid rgba(249,115,22,0.4)' : '1px solid rgba(255,255,255,0.1)',
            opacity: current > 0 ? 1 : 0.3,
            color: '#f97316', fontSize:'1.2rem',
          }}
        >
          ‹
        </button>

        {current === total - 1 ? (
          <button
            onClick={onNext}
            className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95"
            style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', color:'#fff7ed',
              fontFamily:"'Inter',sans-serif", boxShadow:'0 4px 16px rgba(249,115,22,0.5)' }}>
            Continuar →
          </button>
        ) : (
          <div style={{ width:'44px' }} />
        )}

        <button
          onClick={() => current < total - 1 && go(current + 1)}
          className="rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
          style={{
            width:'44px', height:'44px',
            background: current < total - 1 ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.05)',
            border: current < total - 1 ? '1px solid rgba(249,115,22,0.4)' : '1px solid rgba(255,255,255,0.1)',
            opacity: current < total - 1 ? 1 : 0.3,
            color: '#f97316', fontSize:'1.2rem',
          }}
        >
          ›
        </button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  SCREEN 4 — TIMELINE CARDS
// ══════════════════════════════════════════════════════════════
const timelineItems = [
  { icon:'⚡', title:'El oficio',       detail:'Me hiciste electricista. Cada cable que conecto lleva algo tuyo.' },
  { icon:'💻', title:'La perseverancia',detail:'Gracias a ti estudio programación y no paro aunque sea difícil.' },
  { icon:'❤️', title:'La identidad',    detail:'Soy quien soy — con mis errores y mis logros — porque tú me formaste.' },
]

function Screen4({ onNext }) {
  const [openIndex, setOpenIndex] = useState(null)
  const allOpened = useRef(new Set())
  function toggle(i) { setOpenIndex(openIndex === i ? null : i); allOpened.current.add(i) }
  const canContinue = allOpened.current.size >= timelineItems.length
  return (
    <div className="screen-slide-enter relative flex flex-col items-center justify-start min-h-screen px-5 pt-14 pb-10 overflow-y-auto"
      style={{ background:'linear-gradient(160deg, #1c0a00 0%, #7c2d12 50%, #c2410c 100%)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse at 50% 20%, rgba(251,146,60,0.12) 0%, transparent 60%)' }} />
      <h2 className="text-white text-center mb-2"
        style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.5rem,5vw,2rem)', fontWeight:700 }}>
        Lo que me diste sin saberlo
      </h2>
      <p className="text-amber-400 text-xs mb-8 opacity-70 tracking-wider">Toca cada carta para descubrir</p>
      <div className="w-full max-w-sm flex flex-col gap-4 mb-10">
        {timelineItems.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i} onClick={() => toggle(i)}
              className="rounded-2xl p-5 cursor-pointer transition-all duration-300 active:scale-98"
              style={{
                background: isOpen ? 'linear-gradient(135deg,rgba(249,115,22,0.3),rgba(234,88,12,0.2))' : 'rgba(255,255,255,0.06)',
                border: isOpen ? '1.5px solid rgba(251,146,60,0.5)' : '1.5px solid rgba(255,255,255,0.1)',
                backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
                boxShadow: isOpen ? '0 4px 24px rgba(249,115,22,0.25)' : 'none',
              }}>
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-white text-lg font-semibold flex-1" style={{ fontFamily:"'Inter',sans-serif" }}>{item.title}</span>
                <span className="text-amber-300 text-lg transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
              </div>
              <div className={`card-content ${isOpen ? 'expanded' : 'collapsed'}`}>
                <p className="text-amber-100 text-sm leading-relaxed mt-4 pl-1"
                  style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic' }}>{item.detail}</p>
              </div>
            </div>
          )
        })}
      </div>
      {canContinue && (
        <button onClick={onNext}
          className="animate-fade-in px-10 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 active:scale-95"
          style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', color:'#fff7ed',
            fontFamily:"'Inter',sans-serif", boxShadow:'0 4px 20px rgba(249,115,22,0.5)' }}>
          Continuar →
        </button>
      )}
      {!canContinue && (
        <p className="text-amber-400 text-xs opacity-50 text-center px-4">Abre todas las cartas para continuar</p>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  SCREEN 5 — CINEMATIC PHRASES
// ══════════════════════════════════════════════════════════════
const phrases = [
  'Quizás no soy lo que soñaste para mí...',
  '...pero me esfuerzo cada día para que estés orgulloso.',
  'Sé que la vida nos ha puesto las pruebas más difíciles...',
  '...a ti, a mamá, y a mí también.',
  'Pero tú siempre fuiste fuerte.',
  'Y eso lo aprendí de ti.',
  'Siempre voy a ser fuerte — como tú me lo enseñaste.',
  'Todo lo que soy y lo que tengo...',
  '...es gracias al apoyo de ti y de mamá.',
  'Tú eres mi inspiración diaria.',
  'No me rindo. Nunca. Por ti.',
]

function Screen5({ onNext }) {
  const [index, setIndex]     = useState(0)
  const [visible, setVisible] = useState(true)
  const [finished, setFinished] = useState(false)
  useEffect(() => {
    if (finished) return
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        if (index + 1 >= phrases.length) { setFinished(true) }
        else { setIndex(p => p + 1); setVisible(true) }
      }, 700)
    }, 3800)
    return () => clearTimeout(t)
  }, [index, visible, finished])

  return (
    <div className="screen-slide-enter relative flex flex-col items-center justify-center min-h-screen px-8 text-center overflow-hidden"
      style={{ background:'linear-gradient(180deg, #0a0400 0%, #3b0f00 50%, #7c2d12 100%)' }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-amber-100"
          style={{ width:Math.random()*2+1+'px', height:Math.random()*2+1+'px',
            top:Math.random()*60+'%', left:Math.random()*100+'%', opacity:Math.random()*0.4+0.1 }} />
      ))}
      {!finished ? (
        <div className="transition-all duration-700 max-w-xs"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-16px)' }}>
          <div className="flex justify-center gap-2 mb-10">
            {phrases.map((_, i) => (
              <div key={i} className="rounded-full transition-all duration-500"
                style={{ width: i===index?'20px':'6px', height:'6px',
                  background: i<=index?'#f97316':'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
          <p className="text-white leading-relaxed"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.3rem,5vw,1.8rem)',
              fontStyle:'italic', fontWeight:400 }}>
            {phrases[index]}
          </p>
        </div>
      ) : (
        <div className="animate-fade-in flex flex-col items-center gap-6">
          <div className="text-4xl animate-pulse-heart">🧡</div>
          <button onClick={onNext}
            className="px-10 py-5 rounded-full text-base font-semibold tracking-wide transition-all duration-200 active:scale-95"
            style={{ background:'linear-gradient(135deg,#f97316,#dc2626)', color:'#fff7ed',
              fontFamily:"'Inter',sans-serif", boxShadow:'0 4px 32px rgba(249,115,22,0.6)', letterSpacing:'0.04em' }}>
            Ver tu mensaje final
          </button>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  SCREEN 6 — FINAL MESSAGE
// ══════════════════════════════════════════════════════════════
function Screen6() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSong, setShowSong]         = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const t = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="screen-slide-enter relative flex flex-col items-center justify-start min-h-screen px-8 pt-12 pb-10 overflow-y-auto text-center"
      style={{ background:'linear-gradient(160deg, #431407 0%, #7c2d12 30%, #c2410c 70%, #ea580c 100%)' }}>
      {showConfetti && <Confetti />}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.2) 0%, transparent 65%)' }} />

      <p className="text-amber-300 text-xs tracking-widest uppercase mb-8 opacity-60"
        style={{ letterSpacing:'0.22em', fontFamily:"'Inter',sans-serif" }}>
        ✦ Feliz Día del Padre ✦
      </p>

      <div className="max-w-sm mb-8 relative z-10">
        <p className="text-white leading-relaxed"
          style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.15rem,4.5vw,1.5rem)', fontWeight:400 }}>
          Feliz Día, Papá.
          <br /><br />
          Gracias por no rendirte en mí,<br />
          aunque yo a veces lo hice.
          <br /><br />
          Gracias por ser fuerte cuando la vida<br />
          nos puso las pruebas más difíciles.
          <br /><br />
          Lo que soy — con todo y mis errores —<br />
          es gracias a ti y a mamá.
          <br /><br />
          Te amo más de lo que sé expresar.
        </p>
      </div>

      <div className="mb-8 relative z-10">
        <div className="h-px w-20 mx-auto bg-amber-400 opacity-50 mb-4" />
        <p className="text-amber-300"
          style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', fontStyle:'italic' }}>
          — Juan Alejandro
        </p>
      </div>

      {/* Glowing heart */}
      <div className="text-6xl animate-pulse-heart mb-8 relative z-10"
        style={{ filter:'drop-shadow(0 0 20px rgba(249,115,22,0.8)) drop-shadow(0 0 40px rgba(249,115,22,0.4))' }}>
        🧡
      </div>

      {/* Song CTA card */}
      <div className="relative z-10 w-full max-w-sm">
        {!showSong ? (
          <button
            onClick={() => setShowSong(true)}
            className="w-full py-5 px-6 rounded-2xl flex items-center gap-4 transition-all duration-200 active:scale-95"
            style={{
              background:'rgba(255,255,255,0.08)',
              border:'1.5px solid rgba(249,115,22,0.4)',
              backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
              boxShadow:'0 4px 24px rgba(249,115,22,0.2)',
            }}
          >
            <div className="text-3xl animate-pulse-heart">🎵</div>
            <div className="text-left flex-1">
              <p className="text-white text-sm font-semibold" style={{ fontFamily:"'Inter',sans-serif" }}>
                Una canción para ti
              </p>
              <p className="text-amber-300 text-xs opacity-70" style={{ fontFamily:"'Inter',sans-serif" }}>
                Toca para escuchar mientras lees
              </p>
            </div>
            <span className="text-amber-400 text-lg">▶</span>
          </button>
        ) : (
          <div className="rounded-2xl overflow-hidden"
            style={{ background:'rgba(0,0,0,0.6)', border:'1px solid rgba(249,115,22,0.3)',
              boxShadow:'0 4px 24px rgba(0,0,0,0.5)' }}>
            <div className="px-4 pt-4 pb-2 text-left">
              <p className="text-amber-300 text-xs opacity-70" style={{ fontFamily:"'Inter',sans-serif" }}>
                🎵 Para ti, Papá
              </p>
            </div>
            <div style={{ aspectRatio:'16/9' }}>
              <iframe
                width="100%" height="100%"
                src={`https://www.youtube.com/embed/${SONG_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title="Canción para Papá"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ display:'block' }}
              />
            </div>
          </div>
        )}
      </div>

      <FloatingParticles />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  APP ROOT
// ══════════════════════════════════════════════════════════════
const SCREENS = [Screen1, Screen2, Screen3, ScreenPhotos, Screen4, Screen5, Screen6]

export default function App() {
  const [screen, setScreen] = useState(0)
  const [key,    setKey]    = useState(0)

  function next() {
    if (screen < SCREENS.length - 1) {
      setScreen(s => s + 1)
      setKey(k => k + 1)
    }
  }

  const Screen = SCREENS[screen]

  return (
    <div className="w-full min-h-screen overflow-hidden"
      style={{ maxWidth:'430px', margin:'0 auto', position:'relative' }}>
      <Screen key={key} onNext={next} />
      {/* Music player floats over every screen */}
      <FloatingMusicPlayer />
    </div>
  )
}
