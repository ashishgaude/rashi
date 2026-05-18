import { useEffect, useState } from 'react'
import './App.css'

const GaneshIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Traditional Ganesha Icon - Highly Recognizable Silhouette */}
    <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Head and Crown structure */}
      <path d="M42 18 C 42 10, 58 10, 58 18" />
      <path d="M38 24 C 38 18, 62 18, 62 24" />
      
      {/* Large Ears - Key Characteristic for recognition */}
      <path d="M35 35 C 15 35, 12 55, 25 68" />
      <path d="M65 35 C 85 35, 88 55, 75 68" />
      
      {/* Face and Forehead curve */}
      <path d="M35 35 C 35 20, 65 20, 65 35 C 65 48, 55 55, 50 55" />
      
      {/* The Trunk - Gracefully curved */}
      <path d="M50 55 C 50 75, 75 80, 75 65 C 75 52, 60 52, 53 65 C 48 78, 55 88, 65 92" />
      
      {/* Eyes for personality */}
      <circle cx="43" cy="40" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="57" cy="40" r="1.2" fill="currentColor" stroke="none" />
      
      {/* Sacred Tilak / Tripundra */}
      <path d="M48 28 L 52 28" strokeWidth="0.8" />
      <path d="M48 31 L 52 31" strokeWidth="0.8" />
      <circle cx="50" cy="24" r="1.5" fill="currentColor" stroke="none" />
      
      {/* One Tusk (Representing sacrifice) */}
      <path d="M42 52 L 38 58" strokeWidth="1.5" opacity="0.7" />
    </g>
  </svg>
)

const ArtisticMangoLeaf = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M50 10 C 65 30 85 60 75 90 C 65 110 50 115 50 115 C 50 115 35 110 25 90 C 15 60 35 30 50 10Z" 
      fill="#2E7D32" 
    />
    <path 
      d="M50 10 Q 52 60 50 115" 
      stroke="#FFD700" 
      strokeWidth="0.8" 
      opacity="0.4"
    />
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

const Countdown = () => {
  const targetDate = new Date('June 27, 2026 11:04:00').getTime()

  const calculateTimeLeft = () => {
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="countdown-container reveal" style={{ animationDelay: '1.8s' }}>
      <div className="countdown-item">
        <span className="countdown-value">{timeLeft.days}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-divider">:</div>
      <div className="countdown-item">
        <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-divider">:</div>
      <div className="countdown-item">
        <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="countdown-label">Mins</span>
      </div>
      <div className="countdown-divider">:</div>
      <div className="countdown-item">
        <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="countdown-label">Secs</span>
      </div>
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
        <div className="botanical-accents">
          <ArtisticMangoLeaf style={{ width: '40px', transform: 'rotate(-25deg)', opacity: 0.8 }} />
          <ArtisticMangoLeaf style={{ width: '40px', transform: 'rotate(25deg)', opacity: 0.8 }} />
        </div>
        <AkshataShower />
        <Mandala className="hero-mandala" />
        <div className="hero-content">
          <GaneshIcon className="ganesh-icon reveal" style={{ animationDelay: '0.2s' }} />
          <p className="wedding-of reveal" style={{ animationDelay: '0.6s' }}>Blessings & Celebration of</p>
          <h1 className="reveal couple-names" style={{ animationDelay: '0.9s' }}>
            <span>Ashish</span>
            <span className="ampersand">&</span>
            <span>Rupali</span>
          </h1>
          <div className="hero-divider reveal" style={{ animationDelay: '1.1s' }} />
          <p className="date reveal" style={{ animationDelay: '1.2s' }}>SATURDAY, JUNE 27TH, 2026</p>
          <p className="sub-title reveal" style={{ animationDelay: '1.5s' }}>
            AN AUSPICIOUS BEGINNING OF FOREVER
          </p>
          <Countdown />
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
              <div className="time-box">11:04 <span className="ampm">AM</span></div>
              <div className="event-name">Mangal Ashtaka</div>
              <p className="event-desc">The sacred union at the auspicious Muhurt</p>
            </div>

            <div className="divider-ornament">
              <div className="line" />
              <div className="dot" />
              <div className="line" />
            </div>

            <div className="timeline-item">
              <div className="time-box">01:00 <span className="ampm">PM</span> onwards</div>
              <div className="event-name">Grand Reception</div>
              <p className="event-desc">A celebratory feast & joyful gatherings</p>
            </div>

            <div className="venue-info">
              <p className="venue-label">The Venue</p>
              <div className="venue-name">Bella Banquet Hall</div>
              <p className="venue-address">Mangueshi, next to BP petrol pump, Ponda</p>
              
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
                Get Directions
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
