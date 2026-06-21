import { useState, useEffect, useRef } from 'react'

// ── Confetti Component ────────────────────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2.5 + Math.random() * 2}s`,
    color: ['#f97316', '#fb923c', '#fbbf24', '#f59e0b', '#fde68a', '#fff7ed', '#ff6b35'][
      Math.floor(Math.random() * 7)
    ],
    size: `${6 + Math.random() * 6}px`,
    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            top: '-20px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.borderRadius,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

// ── Floating Particles ────────────────────────────────────────────────────────
function FloatingParticles() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-12),
        {
          id: Date.now(),
          x: Math.random() * 90 + 5,
          size: 4 + Math.random() * 8,
          duration: 2.5 + Math.random() * 2,
          emoji: ['✨', '🧡', '⭐', '💛'][Math.floor(Math.random() * 4)],
        },
      ])
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle absolute"
          style={{
            left: `${p.x}%`,
            bottom: '10%',
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

// ── Screen 1: Welcome ─────────────────────────────────────────────────────────
function Screen1({ onNext }) {
  return (
    <div
      className="screen-slide-enter relative flex flex-col items-center justify-center min-h-screen px-8 text-center cursor-pointer select-none overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #7c2d12 0%, #c2410c 35%, #ea580c 65%, #f97316 100%)',
      }}
      onClick={onNext}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(251,191,36,0.18) 0%, transparent 65%)',
        }}
      />

      {/* Top decoration */}
      <div className="absolute top-12 left-0 right-0 flex justify-center gap-6 opacity-30">
        {['✦', '✦', '✦'].map((s, i) => (
          <span key={i} className="text-amber-200 text-xs">{s}</span>
        ))}
      </div>

      {/* Pulsing heart */}
      <div className="animate-pulse-heart text-6xl mb-10 drop-shadow-lg">🧡</div>

      {/* Main headline */}
      <h1
        className="text-white mb-6 leading-tight drop-shadow-lg"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}
      >
        Para el hombre que me enseñó todo lo que soy
      </h1>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-8 opacity-60">
        <div className="h-px w-12 bg-amber-200" />
        <span className="text-amber-200 text-sm">✦</span>
        <div className="h-px w-12 bg-amber-200" />
      </div>

      {/* Subtitle */}
      <p
        className="text-amber-200 text-base font-light tracking-widest uppercase"
        style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.2em' }}
      >
        Toca para comenzar
      </p>

      {/* Bottom tap indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div
          className="animate-bounce opacity-50"
          style={{ color: '#fde68a', fontSize: '1.5rem' }}
        >
          ↓
        </div>
      </div>

      <FloatingParticles />
    </div>
  )
}

// ── Screen 2: Interactive Choice ──────────────────────────────────────────────
function Screen2({ onNext }) {
  const [chosen, setChosen] = useState(false)

  function handleChoice() {
    setChosen(true)
    setTimeout(onNext, 2200)
  }

  return (
    <div
      className="screen-slide-enter relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #431407 0%, #9a3412 50%, #c2410c 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(251,146,60,0.12) 0%, transparent 70%)',
        }}
      />

      {!chosen ? (
        <div className="animate-fade-in w-full max-w-sm">
          <div className="text-5xl mb-8">🤔</div>
          <h2
            className="text-white mb-3 leading-snug"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 5.5vw, 2.2rem)',
              fontWeight: 700,
            }}
          >
            ¿Sabes quién soy gracias a ti?
          </h2>
          <p className="text-amber-300 text-sm mb-10 opacity-80">Elige una respuesta</p>

          <div className="flex flex-col gap-4">
            {['Tu hijo favorito 😄', '¡Claro que sí! 🙌'].map((label) => (
              <button
                key={label}
                onClick={handleChoice}
                className="w-full py-5 px-6 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  color: '#fff7ed',
                  fontFamily: "'Inter', sans-serif",
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(249,115,22,0.35)'
                  e.target.style.borderColor = 'rgba(251,146,60,0.6)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.12)'
                  e.target.style.borderColor = 'rgba(255,255,255,0.25)'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in w-full max-w-sm">
          <div className="text-5xl mb-6">✅</div>
          <p
            className="text-white leading-relaxed"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.2rem, 4.5vw, 1.6rem)',
              fontStyle: 'italic',
            }}
          >
            Exacto. Soy electricista, programador, y la persona que no se rinde — todo gracias a ti.
          </p>
        </div>
      )}
    </div>
  )
}

// ── Typewriter Hook ───────────────────────────────────────────────────────────
function useTypewriter(text, speed = 40, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(timer)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(timer)
  }, [displayed, started, text, speed])

  return displayed
}

// ── Screen 3: Photo + Typewriter ──────────────────────────────────────────────
function Screen3({ onNext }) {
  const fullText =
    'Porque de ti aprendí a levantarme 200 veces después de caer 100.'
  const typed = useTypewriter(fullText, 38, 1000)
  const done = typed.length === fullText.length

  return (
    <div
      className="screen-slide-enter relative flex flex-col items-center justify-start min-h-screen px-6 pt-16 pb-10 overflow-y-auto"
      style={{
        background: 'linear-gradient(160deg, #3b0f00 0%, #78350f 40%, #b45309 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(251,191,36,0.1) 0%, transparent 60%)',
        }}
      />

      <p
        className="text-amber-300 text-xs tracking-widest uppercase mb-6 opacity-70"
        style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.18em' }}
      >
        Me enseñaste con el ejemplo
      </p>

      {/* Photo placeholder */}
      <div
        className="relative w-64 h-64 rounded-3xl mb-8 flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
          border: '2px dashed rgba(251,191,36,0.5)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        <div className="text-center">
          <div className="text-5xl mb-3">📸</div>
          <p className="text-amber-300 text-sm opacity-70" style={{ fontFamily: "'Inter', sans-serif" }}>
            Foto con papá
          </p>
        </div>
        {/* Corner accents */}
        {[
          'top-3 left-3 border-t-2 border-l-2',
          'top-3 right-3 border-t-2 border-r-2',
          'bottom-3 left-3 border-b-2 border-l-2',
          'bottom-3 right-3 border-b-2 border-r-2',
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-5 h-5 ${cls}`}
            style={{ borderColor: 'rgba(251,191,36,0.6)' }}
          />
        ))}
      </div>

      {/* Typed text */}
      <div
        className="w-full max-w-sm text-center mb-10 px-2"
        style={{ minHeight: '90px' }}
      >
        <p
          className="text-white leading-relaxed"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
            fontStyle: 'italic',
          }}
        >
          {typed}
          {!done && (
            <span
              className="inline-block w-0.5 h-5 bg-amber-300 ml-0.5 align-middle animate-pulse"
            />
          )}
        </p>
      </div>

      {done && (
        <button
          onClick={onNext}
          className="animate-fade-in mt-2 px-10 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            color: '#fff7ed',
            fontFamily: "'Inter', sans-serif",
            boxShadow: '0 4px 20px rgba(249,115,22,0.5)',
          }}
        >
          Continuar →
        </button>
      )}
    </div>
  )
}

// ── Screen 4: Timeline Cards ──────────────────────────────────────────────────
const timelineItems = [
  {
    icon: '⚡',
    title: 'El oficio',
    detail:
      'Me hiciste electricista. Cada cable que conecto lleva algo tuyo.',
  },
  {
    icon: '💻',
    title: 'La perseverancia',
    detail:
      'Gracias a ti estudio programación y no paro aunque sea difícil.',
  },
  {
    icon: '❤️',
    title: 'La identidad',
    detail:
      'Soy quien soy — con mis errores y mis logros — porque tú me formaste.',
  },
]

function Screen4({ onNext }) {
  const [openIndex, setOpenIndex] = useState(null)
  const allOpened = useRef(new Set())

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i)
    allOpened.current.add(i)
  }

  const canContinue = allOpened.current.size >= timelineItems.length

  return (
    <div
      className="screen-slide-enter relative flex flex-col items-center justify-start min-h-screen px-5 pt-14 pb-10 overflow-y-auto"
      style={{
        background: 'linear-gradient(160deg, #1c0a00 0%, #7c2d12 50%, #c2410c 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(251,146,60,0.12) 0%, transparent 60%)',
        }}
      />

      <h2
        className="text-white text-center mb-2"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.5rem, 5vw, 2rem)',
          fontWeight: 700,
        }}
      >
        Lo que me diste sin saberlo
      </h2>
      <p className="text-amber-400 text-xs mb-8 opacity-70 tracking-wider">
        Toca cada carta para descubrir
      </p>

      <div className="w-full max-w-sm flex flex-col gap-4 mb-10">
        {timelineItems.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              onClick={() => toggle(i)}
              className="rounded-2xl p-5 cursor-pointer transition-all duration-300 active:scale-98"
              style={{
                background: isOpen
                  ? 'linear-gradient(135deg, rgba(249,115,22,0.3), rgba(234,88,12,0.2))'
                  : 'rgba(255,255,255,0.06)',
                border: isOpen
                  ? '1.5px solid rgba(251,146,60,0.5)'
                  : '1.5px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: isOpen ? '0 4px 24px rgba(249,115,22,0.25)' : 'none',
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.icon}</span>
                <span
                  className="text-white text-lg font-semibold flex-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.title}
                </span>
                <span
                  className="text-amber-300 text-lg transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  ›
                </span>
              </div>

              <div className={`card-content ${isOpen ? 'expanded' : 'collapsed'}`}>
                <p
                  className="text-amber-100 text-sm leading-relaxed mt-4 pl-1"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  {item.detail}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {canContinue && (
        <button
          onClick={onNext}
          className="animate-fade-in px-10 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            color: '#fff7ed',
            fontFamily: "'Inter', sans-serif",
            boxShadow: '0 4px 20px rgba(249,115,22,0.5)',
          }}
        >
          Continuar →
        </button>
      )}

      {!canContinue && (
        <p className="text-amber-400 text-xs opacity-50 text-center px-4">
          Abre todas las cartas para continuar
        </p>
      )}
    </div>
  )
}

// ── Screen 5: Cinematic Phrases ───────────────────────────────────────────────
const phrases = [
  'Quizás no soy lo que soñaste para mí...',
  '...pero me esfuerzo cada día para que estés orgulloso.',
  'Tú eres mi inspiración diaria.',
  'No me rindo. Nunca. Por ti.',
]

function Screen5({ onNext }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (finished) return
    const show = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        if (index + 1 >= phrases.length) {
          setFinished(true)
        } else {
          setIndex((prev) => prev + 1)
          setVisible(true)
        }
      }, 700)
    }, 3800)
    return () => clearTimeout(show)
  }, [index, visible, finished])

  return (
    <div
      className="screen-slide-enter relative flex flex-col items-center justify-center min-h-screen px-8 text-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0400 0%, #3b0f00 50%, #7c2d12 100%)',
      }}
    >
      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-amber-100"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            top: Math.random() * 60 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.4 + 0.1,
          }}
        />
      ))}

      {!finished ? (
        <div
          className="transition-all duration-700 max-w-xs"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-16px)',
          }}
        >
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-10">
            {phrases.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === index ? '20px' : '6px',
                  height: '6px',
                  background: i <= index ? '#f97316' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          <p
            className="text-white leading-relaxed"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.3rem, 5vw, 1.8rem)',
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            {phrases[index]}
          </p>
        </div>
      ) : (
        <div className="animate-fade-in flex flex-col items-center gap-6">
          <div className="text-4xl animate-pulse-heart">🧡</div>
          <button
            onClick={onNext}
            className="px-10 py-5 rounded-full text-base font-semibold tracking-wide transition-all duration-200 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #f97316, #dc2626)',
              color: '#fff7ed',
              fontFamily: "'Inter', sans-serif",
              boxShadow: '0 4px 32px rgba(249,115,22,0.6)',
              letterSpacing: '0.04em',
            }}
          >
            Ver tu mensaje final
          </button>
        </div>
      )}
    </div>
  )
}

// ── Screen 6: Final Message ───────────────────────────────────────────────────
function Screen6() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const t = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="screen-slide-enter relative flex flex-col items-center justify-center min-h-screen px-8 text-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #431407 0%, #7c2d12 30%, #c2410c 70%, #ea580c 100%)',
      }}
    >
      {showConfetti && <Confetti />}

      {/* Warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.2) 0%, transparent 65%)',
        }}
      />

      {/* Top ornament */}
      <p
        className="text-amber-300 text-xs tracking-widest uppercase mb-8 opacity-60"
        style={{ letterSpacing: '0.22em', fontFamily: "'Inter', sans-serif" }}
      >
        ✦ Feliz Día del Padre ✦
      </p>

      {/* Main message */}
      <div className="max-w-sm mb-10">
        <p
          className="text-white leading-relaxed"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.15rem, 4.5vw, 1.5rem)',
            fontWeight: 400,
          }}
        >
          Feliz Día, Papá.
          <br /><br />
          Gracias por no rendirte en mí,
          <br />
          aunque yo a veces lo hice.
          <br /><br />
          Te amo más de lo que sé expresar.
        </p>
      </div>

      {/* Signature */}
      <div className="mb-10">
        <div className="h-px w-20 mx-auto bg-amber-400 opacity-50 mb-4" />
        <p
          className="text-amber-300"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.1rem',
            fontStyle: 'italic',
          }}
        >
          — Juan Alejandro
        </p>
      </div>

      {/* Glowing heart */}
      <div
        className="text-6xl animate-pulse-heart"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(249,115,22,0.8)) drop-shadow(0 0 40px rgba(249,115,22,0.4))',
        }}
      >
        🧡
      </div>

      <FloatingParticles />
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
const SCREENS = [Screen1, Screen2, Screen3, Screen4, Screen5, Screen6]

export default function App() {
  const [screen, setScreen] = useState(0)
  const [key, setKey] = useState(0)

  function next() {
    if (screen < SCREENS.length - 1) {
      setScreen((s) => s + 1)
      setKey((k) => k + 1)
    }
  }

  const Screen = SCREENS[screen]

  return (
    <div
      className="w-full min-h-screen overflow-hidden"
      style={{ maxWidth: '430px', margin: '0 auto', position: 'relative' }}
    >
      <Screen key={key} onNext={next} />
    </div>
  )
}
