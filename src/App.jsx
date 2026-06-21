import { useState, useEffect, useRef, useCallback } from 'react'
import { photos as photoConfig } from './photos.js'
import localAudio from './assets/cancion.mp3'

// ══════════════════════════════════════════════════════════════
//  CONFETTI
// ══════════════════════════════════════════════════════════════
function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2.5 + Math.random() * 2}s`,
    color: ['#3b82f6','#60a5fa','#93c5fd','#38bdf8','#bfdbfe','#e0f2fe','#0ea5e9'][
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
          emoji: ['✨','💙','⭐','💫'][Math.floor(Math.random() * 4)],
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
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (playing) {
      audioRef.current?.play().catch(e => console.error("Error reproduciendo audio:", e))
    } else {
      audioRef.current?.pause()
    }
  }, [playing])

  function toggle() {
    setPlaying(!playing)
  }

  return (
    <>
      <audio ref={audioRef} src={localAudio} loop />
      {/* Floating button */}
      <div className="fixed z-50" style={{ bottom:'24px', right:'20px' }}>
        <button onClick={toggle}
          className="relative flex items-center justify-center rounded-full transition-all duration-300 active:scale-90"
          style={{
            width:'56px', height:'56px',
            background: playing
              ? 'linear-gradient(135deg,#1e40af,#3b82f6)'
              : 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
            boxShadow: playing
              ? '0 4px 20px rgba(30,64,175,0.6)'
              : '0 4px 20px rgba(59,130,246,0.7)',
            border: '2px solid rgba(255,255,255,0.2)',
          }}>
          {!playing && (
            <span className="absolute inset-0 rounded-full"
              style={{ animation:'pulse-ring 2s ease-out infinite', border:'2px solid rgba(59,130,246,0.6)' }} />
          )}
          <span className="text-xl" style={{ filter: playing ? 'none' : 'grayscale(100%) brightness(200%)' }}>
            {playing ? '⏸️' : '🎵'}
          </span>
        </button>
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════════════════
//  SCREEN 1 — WELCOME
// ══════════════════════════════════════════════════════════════
function Screen1({ onNext }) {
  return (
    <div
      className="screen-slide-enter relative flex flex-col items-center justify-center min-h-screen px-8 text-center cursor-pointer select-none overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #020c1b 0%, #0f2d5e 35%, #1d4ed8 65%, #3b82f6 100%)' }}
      onClick={onNext}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(147,197,253,0.18) 0%, transparent 65%)' }} />
      <div className="absolute top-12 left-0 right-0 flex justify-center gap-6 opacity-30">
        {['✦','✦','✦'].map((s,i) => <span key={i} className="text-blue-200 text-xs">{s}</span>)}
      </div>
      <div className="animate-pulse-heart text-6xl mb-10 drop-shadow-lg">💙</div>
      <h1 className="text-white mb-6 leading-tight drop-shadow-lg"
        style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.75rem,6vw,2.5rem)', fontWeight:700,
          letterSpacing:'-0.02em', textShadow:'0 2px 20px rgba(0,0,0,0.4)' }}>
        Para el hombre que me enseñó todo lo que soy
      </h1>
      <div className="flex items-center gap-3 mb-8 opacity-60">
        <div className="h-px w-12 bg-blue-200" />
        <span className="text-blue-200 text-sm">✦</span>
        <div className="h-px w-12 bg-blue-200" />
      </div>
      <p className="text-blue-200 text-base font-light tracking-widest uppercase"
        style={{ fontFamily:"'Inter',sans-serif", letterSpacing:'0.2em' }}>
        Toca para comenzar
      </p>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="animate-bounce opacity-50" style={{ color:'#bfdbfe', fontSize:'1.5rem' }}>↓</div>
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
  function handleChoice() { setChosen(true); setTimeout(onNext, 2200) }
  return (
    <div className="screen-slide-enter relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #020c1b 0%, #0f2d5e 50%, #1e3a8a 100%)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(96,165,250,0.12) 0%, transparent 70%)' }} />
      {!chosen ? (
        <div className="animate-fade-in w-full max-w-sm">
          <div className="text-5xl mb-8">🤔</div>
          <h2 className="text-white mb-3 leading-snug"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.6rem,5.5vw,2.2rem)', fontWeight:700 }}>
            ¿Sabes quién soy gracias a ti?
          </h2>
          <p className="text-blue-300 text-sm mb-10 opacity-80">Elige una respuesta</p>
          <div className="flex flex-col gap-4">
            {['Tu hijo favorito 😄','¡Claro que sí! 🙌'].map((label) => (
              <button key={label} onClick={handleChoice}
                className="w-full py-5 px-6 rounded-2xl text-base font-semibold transition-all duration-200 active:scale-95"
                style={{
                  background:'rgba(255,255,255,0.08)', border:'1.5px solid rgba(255,255,255,0.2)',
                  color:'#eff6ff', fontFamily:"'Inter',sans-serif",
                  backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
                }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(59,130,246,0.3)';e.currentTarget.style.borderColor='rgba(96,165,250,0.6)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'}}>
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
//  TYPEWRITER HOOK
// ══════════════════════════════════════════════════════════════
function useTypewriter(text, speed = 40, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted]     = useState(false)
  useEffect(() => { const t = setTimeout(() => setStarted(true), startDelay); return () => clearTimeout(t) }, [startDelay])
  useEffect(() => {
    if (!started || displayed.length >= text.length) return
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed)
    return () => clearTimeout(t)
  }, [displayed, started, text, speed])
  return displayed
}

// ══════════════════════════════════════════════════════════════
//  SCREEN 3 — TYPEWRITER + FOTO 1
// ══════════════════════════════════════════════════════════════
function Screen3({ onNext }) {
  const fullText = 'Porque de ti aprendí a levantarme 200 veces después de caer 100.'
  const typed    = useTypewriter(fullText, 38, 1000)
  const done     = typed.length === fullText.length
  
  const photo = photoConfig[0]

  return (
    <div className="screen-slide-enter relative flex flex-col items-center justify-start min-h-screen px-6 pt-16 pb-10 overflow-y-auto"
      style={{ background: 'linear-gradient(160deg, #020c1b 0%, #0a1930 40%, #1e3a8a 100%)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(147,197,253,0.1) 0%, transparent 60%)' }} />
      <p className="text-blue-300 text-xs tracking-widest uppercase mb-6 opacity-70"
        style={{ fontFamily:"'Inter',sans-serif", letterSpacing:'0.18em' }}>
        Me enseñaste con el ejemplo
      </p>
      
      {/* PHOTO 1 INSTEAD OF PLACEHOLDER */}
      <div className="relative w-64 h-64 rounded-2xl mb-8 flex flex-col items-center justify-center overflow-hidden animate-fade-in"
        style={{
          background:'rgba(240,248,255,0.96)',
          boxShadow:'0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
          padding: '8px 8px 36px 8px',
          transform: 'rotate(-2deg)'
        }}>
        <div className="w-full h-full rounded-lg overflow-hidden" style={{ background: '#0a1930' }}>
           {photo?.src ? (
             <img src={photo.src} alt="Foto 1" className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full flex items-center justify-center opacity-50">📷</div>
           )}
        </div>
        <p className="absolute bottom-2 text-center w-full left-0"
          style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.85rem', color:'#0f2d5e', fontStyle:'italic' }}>
          {photo?.caption || "Siempre juntos"}
        </p>
      </div>

      <div className="w-full max-w-sm text-center mb-10 px-2" style={{ minHeight:'90px' }}>
        <p className="text-white leading-relaxed"
          style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.1rem,4vw,1.4rem)', fontStyle:'italic' }}>
          {typed}
          {!done && <span className="inline-block w-0.5 h-5 bg-blue-300 ml-0.5 align-middle animate-pulse" />}
        </p>
      </div>
      {done && (
        <button onClick={onNext}
          className="animate-fade-in mt-2 px-10 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 active:scale-95"
          style={{ background:'linear-gradient(135deg,#3b82f6,#1d4ed8)', color:'#eff6ff',
            fontFamily:"'Inter',sans-serif", boxShadow:'0 4px 20px rgba(59,130,246,0.5)' }}>
          Continuar →
        </button>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  SCREEN 4 — TIMELINE CARDS + FOTOS 2, 3, 4
// ══════════════════════════════════════════════════════════════
const timelineItems = [
  { icon:'⚡', title:'El oficio',        detail:'Me hiciste electricista. Cada cable que conecto lleva algo tuyo.', photoIndex: 1 },
  { icon:'💻', title:'La perseverancia', detail:'Gracias a ti estudio programación y no paro aunque sea difícil.', photoIndex: 2 },
  { icon:'💙', title:'La identidad',     detail:'Soy quien soy — con mis errores y mis logros — porque tú me formaste.', photoIndex: 3 },
]

function Screen4({ onNext }) {
  const [openIndex, setOpenIndex] = useState(null)
  const allOpened = useRef(new Set())
  function toggle(i) { setOpenIndex(openIndex === i ? null : i); allOpened.current.add(i) }
  const canContinue = allOpened.current.size >= timelineItems.length
  return (
    <div className="screen-slide-enter relative flex flex-col items-center justify-start min-h-screen px-5 pt-14 pb-10 overflow-y-auto"
      style={{ background:'linear-gradient(160deg, #020c1b 0%, #0f2d5e 50%, #1e3a8a 100%)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse at 50% 20%, rgba(96,165,250,0.12) 0%, transparent 60%)' }} />
      <h2 className="text-white text-center mb-2"
        style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.5rem,5vw,2rem)', fontWeight:700 }}>
        Lo que me diste sin saberlo
      </h2>
      <p className="text-blue-400 text-xs mb-6 opacity-70 tracking-wider">Toca cada carta para descubrir</p>
      
      <div className="w-full max-w-sm flex flex-col gap-4 mb-10">
        {timelineItems.map((item,i) => {
          const isOpen = openIndex === i
          const photo = photoConfig[item.photoIndex]

          return (
            <div key={i} onClick={() => toggle(i)}
              className="rounded-2xl p-5 cursor-pointer transition-all duration-500 active:scale-98 overflow-hidden"
              style={{
                background: isOpen ? 'linear-gradient(135deg,rgba(59,130,246,0.3),rgba(29,78,216,0.25))' : 'rgba(255,255,255,0.05)',
                border: isOpen ? '1.5px solid rgba(96,165,250,0.6)' : '1.5px solid rgba(255,255,255,0.1)',
                backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
                boxShadow: isOpen ? '0 8px 32px rgba(59,130,246,0.3)' : 'none',
              }}>
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-white text-lg font-semibold flex-1" style={{ fontFamily:"'Inter',sans-serif" }}>{item.title}</span>
                <span className="text-blue-300 text-lg transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
              </div>
              <div className={`transition-all duration-500 ease-in-out`}
                   style={{ maxHeight: isOpen ? '400px' : '0px', opacity: isOpen ? 1 : 0, overflow: 'hidden' }}>
                <p className="text-blue-100 text-sm leading-relaxed mt-4 mb-4 pl-1"
                  style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic' }}>{item.detail}</p>
                {/* PHOTO IN CARD */}
                <div className="w-full rounded-xl overflow-hidden mt-2"
                  style={{ aspectRatio:'16/10', background:'#000', border:'1px solid rgba(255,255,255,0.15)' }}>
                  {photo?.src && <img src={photo.src} className="w-full h-full object-cover" alt="recuerdo" />}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {canContinue && (
        <button onClick={onNext}
          className="animate-fade-in px-10 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 active:scale-95"
          style={{ background:'linear-gradient(135deg,#3b82f6,#1d4ed8)', color:'#eff6ff',
            fontFamily:"'Inter',sans-serif", boxShadow:'0 4px 20px rgba(59,130,246,0.5)' }}>
          Continuar →
        </button>
      )}
      {!canContinue && (
        <p className="text-blue-400 text-xs opacity-50 text-center px-4">Abre todas las cartas para continuar</p>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  SCREEN 5 — CINEMATIC PHRASES + FOTOS 5 AL 9
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

// Indexes of photos 4 to 8 inside photoConfig to show behind the text
const cinematicPhotos = [
  photoConfig[4]?.src, 
  photoConfig[5]?.src, 
  photoConfig[6]?.src, 
  photoConfig[7]?.src, 
  photoConfig[8]?.src
]

function Screen5({ onNext }) {
  const [index, setIndex]       = useState(0)
  const [visible, setVisible]   = useState(true)
  const [finished, setFinished] = useState(false)
  
  useEffect(() => {
    if (finished) return
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        if (index + 1 >= phrases.length) { setFinished(true) }
        else { setIndex(p => p + 1); setVisible(true) }
      }, 900) // Slower fade out
    }, 4500) // Slower reading time
    return () => clearTimeout(t)
  }, [index, visible, finished])

  // Change background photo every 2 phrases
  const currentPhotoIndex = Math.min(Math.floor(index / 2), cinematicPhotos.length - 1)
  const currentPhotoSrc = cinematicPhotos[currentPhotoIndex]

  return (
    <div className="screen-slide-enter relative flex flex-col items-center justify-center min-h-screen px-8 text-center overflow-hidden"
      style={{ background:'#000' }}>
      
      {/* DYNAMIC PHOTO BACKGROUND */}
      {currentPhotoSrc && (
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
             style={{ opacity: visible && !finished ? 0.35 : 0.1 }}>
          <img key={currentPhotoSrc} src={currentPhotoSrc} className="w-full h-full object-cover animate-fade-in" alt="bg" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020c1b] via-transparent to-[#020c1b] opacity-80" />
        </div>
      )}

      {/* PARTICLES */}
      {Array.from({ length: 15 }).map((_,i) => (
        <div key={i} className="absolute rounded-full"
          style={{ background:'rgba(147,197,253,0.6)',
            width:Math.random()*2+1+'px', height:Math.random()*2+1+'px',
            top:Math.random()*70+'%', left:Math.random()*100+'%', opacity:Math.random()*0.5+0.1 }} />
      ))}
      
      {!finished ? (
        <div className="relative z-10 transition-all duration-1000 max-w-sm w-full"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-16px)' }}>
          <div className="flex justify-center gap-2 mb-10">
            {phrases.map((_,i) => (
              <div key={i} className="rounded-full transition-all duration-500"
                style={{ width:i===index?'20px':'6px', height:'6px',
                  background:i<=index?'#3b82f6':'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
          <p className="text-white leading-relaxed"
            style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(1.4rem,5.5vw,2rem)',
              fontStyle:'italic', fontWeight:400, textShadow:'0 2px 10px rgba(0,0,0,0.8)' }}>
            {phrases[index]}
          </p>
        </div>
      ) : (
        <div className="relative z-10 animate-fade-in flex flex-col items-center gap-6 mt-10">
          <div className="text-4xl animate-pulse-heart">💙</div>
          <button onClick={onNext}
            className="px-10 py-5 rounded-full text-base font-semibold tracking-wide transition-all duration-200 active:scale-95"
            style={{ background:'linear-gradient(135deg,#3b82f6,#1e40af)', color:'#eff6ff',
              fontFamily:"'Inter',sans-serif", boxShadow:'0 4px 32px rgba(59,130,246,0.6)', letterSpacing:'0.04em' }}>
            Ver tu mensaje final
          </button>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  SCREEN 6 — FINAL MESSAGE + FOTO 10
// ══════════════════════════════════════════════════════════════
function Screen6() {
  const [showConfetti, setShowConfetti] = useState(false)
  
  const finalPhoto = photoConfig[9]

  useEffect(() => {
    setShowConfetti(true)
    const t = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="screen-slide-enter relative flex flex-col items-center justify-start min-h-screen px-8 pt-10 pb-12 overflow-y-auto text-center"
      style={{ background:'linear-gradient(160deg, #020c1b 0%, #0f2d5e 30%, #1e3a8a 70%, #1d4ed8 100%)' }}>
      {showConfetti && <Confetti />}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse at 50% 50%, rgba(147,197,253,0.2) 0%, transparent 65%)' }} />

      {/* FINAL PHOTO 10 POLAROID */}
      <div className="relative z-10 w-full max-w-[220px] mb-8 mt-2 rotate-2 hover:rotate-0 transition-transform duration-500">
         <div className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ background:'rgba(240,248,255,0.96)', padding:'8px 8px 32px 8px',
                       boxShadow:'0 10px 40px rgba(0,0,0,0.5)' }}>
           <div className="w-full rounded-xl overflow-hidden aspect-square" style={{ background: '#0a1930' }}>
              {finalPhoto?.src && <img src={finalPhoto.src} className="w-full h-full object-cover" alt="Final" />}
           </div>
           <p className="absolute bottom-2 text-center w-full left-0"
              style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.85rem', color:'#0f2d5e', fontStyle:'italic' }}>
              {finalPhoto?.caption || "Feliz Día"}
           </p>
         </div>
      </div>

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
        <div className="h-px w-20 mx-auto bg-blue-400 opacity-50 mb-4" />
        <p className="text-blue-300"
          style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', fontStyle:'italic' }}>
          — Juan Alejandro
        </p>
      </div>

      {/* Glowing heart */}
      <div className="text-6xl animate-pulse-heart mb-8 relative z-10"
        style={{ filter:'drop-shadow(0 0 20px rgba(59,130,246,0.8)) drop-shadow(0 0 40px rgba(59,130,246,0.4))' }}>
        💙
      </div>

      {/* Static YouTube Video Box */}
      <div className="relative z-10 w-full max-w-sm mb-10">
        <div className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ background:'rgba(0,0,0,0.6)', border:'1px solid rgba(96,165,250,0.3)' }}>
          <div className="px-4 pt-4 pb-2 text-left">
            <p className="text-blue-300 text-xs opacity-70" style={{ fontFamily:"'Inter',sans-serif" }}>
              🎵 Para ti, Papá
            </p>
          </div>
          <div style={{ aspectRatio:'16/9' }}>
            <iframe width="100%" height="100%"
              src={`https://www.youtube.com/embed/${SONG_ID}?rel=0&modestbranding=1&playsinline=1`}
              title="Canción para Papá" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen style={{ display:'block' }} />
          </div>
        </div>
      </div>

      <FloatingParticles />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
//  APP ROOT
// ══════════════════════════════════════════════════════════════
// NOTE: ScreenPhotos is removed. Flow is smoother and more emotional.
const SCREENS = [Screen1, Screen2, Screen3, Screen4, Screen5, Screen6]

export default function App() {
  const [screen, setScreen] = useState(0)
  const [key,    setKey]    = useState(0)
  function next() {
    if (screen < SCREENS.length - 1) { setScreen(s => s + 1); setKey(k => k + 1) }
  }
  const Screen = SCREENS[screen]
  return (
    <div className="w-full min-h-screen overflow-hidden"
      style={{ maxWidth:'430px', margin:'0 auto', position:'relative' }}>
      <Screen key={key} onNext={next} />
      <FloatingMusicPlayer />
    </div>
  )
}
