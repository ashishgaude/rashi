import { useEffect, useState } from 'react'
import './App.css'

const GaneshIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Calligraphic Ganesh - Highly Recognizable 'Om' Style */}
    <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Main Forehead and Trunk Curve (The '3' or 'Om' shape) */}
      <path d="M45 25 C 65 25, 85 40, 85 60 C 85 85, 60 95, 40 95 C 25 95, 15 85, 15 70 C 15 55, 30 45, 45 45" />
      
      {/* Left Ear */}
      <path d="M35 35 C 15 35, 10 55, 25 70" />
      
      {/* Right Ear / Tusk area */}
      <path d="M65 35 C 80 35, 85 50, 75 65" opacity="0.6" strokeWidth="1.5" />
      
      {/* The Eye */}
      <circle cx="52" cy="52" r="2" fill="currentColor" stroke="none" />
      
      {/* Tilak / Crown mark */}
      <path d="M55 15 L 55 22" strokeWidth="2" />
      <path d="M50 10 Q 55 5, 60 10" strokeWidth="1" opacity="0.8" />
    </g>
    
    {/* Subtle Inner Details */}
    <path d="M45 75 Q 55 75, 55 85" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
  </svg>
)

const ArtisticMangoLeaf = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="leafGradient" x1="50" y1="10" x2="50" y2="115" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2E7D32" />
        <stop offset="100%" stopColor="#1B5E20" />
      </linearGradient>
    </defs>
    <path 
      d="M50 10 C 65 30 85 60 75 90 C 65 110 50 115 50 115 C 50 115 35 110 25 90 C 15 60 35 30 50 10Z" 
      fill="url(#leafGradient)"
      filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.1))"
    />
    <path 
      d="M50 10 Q 52 60 50 115" 
      stroke="#FFD700" 
      strokeWidth="0.8" 
      opacity="0.4"
    />
    <g stroke="#A5D6A7" strokeWidth="0.5" opacity="0.4">
      <path d="M50 25 Q 65 35 75 50" />
      <path d="M50 25 Q 35 35 25 50" />
      <path d="M50 45 Q 70 55 82 75" />
      <path d="M50 45 Q 30 55 18 75" />
      <path d="M50 65 Q 65 75 75 95" />
      <path d="M50 65 Q 35 75 25 95" />
    </g>
  </svg>
)

const Mandala = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    {[...Array(12)].map((_, i) => (
      <g key={i} transform={`rotate(${i * 30} 100 100)`}>
        <path d="M100 40 Q 110 20 100 10 Q 90 20 100 40" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="30" r="2" fill="currentColor" opacity="0.6" />
      </g>
    ))}
  </svg>
)

const CornerOrnament = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10 L 90 10 M 10 10 L 10 90" stroke="currentColor" strokeWidth="2" />
    <path d="M20 20 L 70 20 M 20 20 L 20 70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M10 10 Q 40 10 40 40 Q 10 40 10 10" fill="currentColor" opacity="0.1" />
    <circle cx="10" cy="10" r="4" fill="currentColor" />
    <circle cx="90" cy="10" r="2" fill="currentColor" />
    <circle cx="10" cy="90" r="2" fill="currentColor" />
  </svg>
)

const AKSHATA_COLORS = ['#FFD700', '#FF8C00', '#FFFDD0', '#F0E68C'];

// Pre-generate random values outside the component to keep the component pure
const AKSHATA_GRAINS = Array.from({ length: 100 }, (_, i) => ({
  i,
  startX: Math.random() * 100,
  midX: (Math.random() - 0.5) * 400,
  midY: (Math.random() - 0.5) * 300,
  throwX: (Math.random() - 0.5) * 1000,
  duration: 5 + Math.random() * 5,
  delay: Math.random() * 15,
  width: 1.5 + Math.random() * 2.5,
  height: 3 + Math.random() * 4,
  color: AKSHATA_COLORS[i % AKSHATA_COLORS.length]
}));

const AkshataShower = () => {
  return (
    <div className="akshata-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
      {AKSHATA_GRAINS.map((g) => (
        <div 
          key={g.i} 
          className="akshata" 
          style={{ 
            left: `${g.startX}%`, 
            background: g.color,
            animationDelay: `${g.delay}s`,
            animationDuration: `${g.duration}s`,
            width: `${g.width}px`,
            height: `${g.height}px`,
            ['--mid-x' as any]: `${g.midX}px`,
            ['--mid-y' as any]: `${g.midY}px`,
            ['--throw-x' as any]: `${g.throwX}px`
          } as React.CSSProperties} 
        />
      ))}
    </div>
  )
}

function App() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = document.querySelectorAll('section')
    sections.forEach((section) => observer.observe(section))

    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  return (
    <div className="app-container">
      {/* Hero Section */}
      <header className="hero reveal">
        <AkshataShower />
        <Mandala className="hero-mandala" />
        <div className="hero-content">
          <GaneshIcon className="ganesh-icon reveal" style={{ animationDelay: '0.2s' }} />
          <div className="botanical-header reveal" style={{ animationDelay: '0.4s' }}>
            <ArtisticMangoLeaf style={{ width: '60px', transform: 'rotate(-20deg)' }} />
            <ArtisticMangoLeaf style={{ width: '60px', transform: 'rotate(20deg)' }} />
          </div>
          <p className="wedding-of reveal" style={{ animationDelay: '0.6s' }}>Blessings & Celebration of</p>
          <h1 className="reveal" style={{ animationDelay: '0.9s' }}>Ashish & Rupali</h1>
          <div className="hero-divider reveal" style={{ animationDelay: '1.1s' }} />
          <p className="date reveal" style={{ animationDelay: '1.2s' }}>SATURDAY, JUNE 27TH, 2026</p>
          <p className="sub-title reveal" style={{ animationDelay: '1.5s' }}>
            AN AUSPICIOUS BEGINNING OF FOREVER
          </p>
        </div>
      </header>

      {/* Redesigned Event Details Section */}
      <section id="events" className={isVisible.events ? 'is-visible' : ''}>
        <div className="heritage-card">
          <CornerOrnament className="card-corner corner-tl" />
          <CornerOrnament className="card-corner corner-tr" />
          <CornerOrnament className="card-corner corner-bl" />
          <CornerOrnament className="card-corner corner-br" />
          
          <div className="event-timeline">
            <div className="section-header">
              <Mandala className="small-mandala" />
              <h2>The Sacred Rituals</h2>
            </div>
            
            <div className="timeline-item">
              <div className="time-box">11:06 AM</div>
              <div className="event-name">Mangal Ashtaka</div>
              <p className="event-desc">The sacred union at the auspicious Muhurt</p>
            </div>

            <div className="divider-ornament">
              <div className="line" />
              <div className="dot" />
              <div className="line" />
            </div>

            <div className="timeline-item">
              <div className="time-box">01:00 PM onwards</div>
              <div className="event-name">Grand Reception</div>
              <p className="event-desc">A celebratory feast & joyful gatherings</p>
            </div>

            <div className="venue-info">
              <p className="venue-label">The Venue</p>
              <div className="venue-name">Grand Heritage Palace, Rajasthan</div>
              <p className="venue-address">H-23, Heritage Road, Near Lake City</p>
              
              <a 
                href="https://maps.app.goo.gl/nKuhgxayfmnFMsvu7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-button"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Navigate to Palace
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-ornament">
        <Mandala className="footer-mandala" />
      </footer>
    </div>
  )
}

export default App
