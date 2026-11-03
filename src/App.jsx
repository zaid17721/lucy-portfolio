import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Camera,
  Play,
  Mail,
  MessageCircle,
} from 'lucide-react'

import './App.css'


/* =========================================================
   PROJECTS

   image: temporary stock photo (Unsplash License, free to
   use) standing in for a real thumbnail/poster frame.
   Swap the `image` field for your own render/export once
   you have one — see the comment at the bottom of the file.
========================================================= */

const projects = [
  {
    id: 1,
    type: 'Long Form',
    category: 'Gaming',
    subCategory: 'Gaming',
    duration: '12:34',
    title: 'The Comeback',
    image:
      'https://images.unsplash.com/photo-1762219214808-154d74e0d761?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    type: 'Long Form',
    category: 'Information',
    subCategory: 'Storytelling',
    duration: '15:21',
    title: 'The Story Behind It',
    image:
      'https://images.unsplash.com/photo-1767474365536-ef81bfa24c8a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    type: 'Long Form',
    category: 'Stream Highlights',
    subCategory: 'Stream Highlights',
    duration: '08:17',
    title: 'Best Moments',
    image:
      'https://images.unsplash.com/photo-1723661631629-0276920c11be?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    type: 'Short Form',
    category: 'Gaming',
    subCategory: 'Shorts / Reels',
    duration: '00:28',
    title: 'Clean Aim',
    image:
      'https://images.unsplash.com/photo-1505695044222-61d7ff153f23?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    type: 'Long Form',
    category: 'Gaming',
    subCategory: 'Gaming',
    duration: '10:42',
    title: 'Just One More Game',
    image:
      'https://images.unsplash.com/photo-1558008258-be2e19614dda?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    type: 'Long Form',
    category: 'Documentary',
    subCategory: 'Documentary',
    duration: '09:26',
    title: 'A Better Story',
    image:
      'https://images.unsplash.com/photo-1626581795188-8efb9a00eeec?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    type: 'Short Form',
    category: 'Gaming',
    subCategory: 'Social Media',
    duration: '00:32',
    title: 'Keep Going',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 8,
    type: 'Short Form',
    category: 'Gaming',
    subCategory: 'Shorts / Reels',
    duration: '00:26',
    title: 'Satisfying Plays',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 9,
    type: 'Short Form',
    category: 'Stream Highlights',
    subCategory: 'Social Media',
    duration: '00:20',
    title: 'Good Game',
    image:
      'https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 10,
    type: 'Short Form',
    category: 'Information',
    subCategory: 'Shorts / Reels',
    duration: '00:24',
    title: 'Same Game',
    image:
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 11,
    type: 'Short Form',
    category: 'Gaming',
    subCategory: 'Social Media',
    duration: '00:18',
    title: 'Clutch Mode',
    image:
      'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&w=700&q=80',
  },
]


/* =========================================================
   TESTIMONIALS
========================================================= */

const testimonials = [
  {
    quote:
      'Lucy understood exactly what I wanted and turned the footage into something that felt polished, engaging and natural.',
    name: 'CLIENT NAME',
    role: 'Streamer',
    initials: 'CN',
  },
  {
    quote:
      'The pacing and storytelling made a huge difference. The final edit felt much more professional than what I originally imagined.',
    name: 'CLIENT NAME',
    role: 'YouTube Creator',
    initials: 'CN',
  },
  {
    quote:
      'A clean, thoughtful edit with great attention to detail. Everything felt intentional and easy to watch.',
    name: 'CLIENT NAME',
    role: 'Content Creator',
    initials: 'CN',
  },
  {
    quote:
      'The communication was easy and the final result captured the exact tone I was looking for.',
    name: 'CLIENT NAME',
    role: 'Streamer',
    initials: 'CN',
  },
  {
    quote:
      'Great sense of rhythm, strong visual choices and a final video that feels much more engaging.',
    name: 'CLIENT NAME',
    role: 'YouTube Creator',
    initials: 'CN',
  },
]



/* =========================================================
   HERO VIDEO GRIDS
   Two continuous vertical video columns.
   The left column moves upward and the right column
   moves downward. Hovering the whole visual pauses both
   the CSS movement and the videos.
========================================================= */

const heroGridVideos = projects.slice(0, 5).map((project) => ({
  poster: project.image,
  src: '/showreel.mp4',
}))

function HeroVideoGrids() {
  const videoRefs = useRef([])

  const setVideoRef = (element, index) => {
    if (element) {
      videoRefs.current[index] = element
    }
  }

  const pauseVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) video.pause()
    })
  }

  const playVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch(() => {})
      }
    })
  }

  const renderTrack = (track) => (
    <>
      {heroGridVideos.map((video, index) => (
        <div
          className="hero-grid-item"
          key={`${track}-original-${index}`}
        >
          <video
            ref={(element) =>
              setVideoRef(
                element,
                track === 'left'
                  ? index
                  : index + heroGridVideos.length * 2
              )
            }
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={`Hero video ${index + 1}`}
          />
        </div>
      ))}

      {heroGridVideos.map((video, index) => (
        <div
          className="hero-grid-item"
          key={`${track}-duplicate-${index}`}
          aria-hidden="true"
        >
          <video
            ref={(element) =>
              setVideoRef(
                element,
                track === 'left'
                  ? index + heroGridVideos.length
                  : index + heroGridVideos.length * 3
              )
            }
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            tabIndex={-1}
          />
        </div>
      ))}
    </>
  )

  return (
    <div
      className="hero-video-grids"
      aria-label="Moving video portfolio previews"
      onMouseEnter={pauseVideos}
      onMouseLeave={playVideos}
      onFocus={pauseVideos}
      onBlur={playVideos}
    >
      <div className="hero-video-grid hero-grid-left">
        <div className="hero-grid-track">
          {renderTrack('left')}
        </div>
      </div>

      <div className="hero-video-grid hero-grid-right">
        <div className="hero-grid-track">
          {renderTrack('right')}
        </div>
      </div>
    </div>
  )
}


/* =========================================================
   APP
========================================================= */

const aboutSlideshowImages = [
  [
    { src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85', alt: 'A warmly lit creative workspace' },
    { src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1400&q=85', alt: 'Cinematic city architecture at night' },
    { src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=85', alt: 'A concert crowd under dramatic stage lighting' },
  ],
  [
    { src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85', alt: 'Cinematic city architecture at night' },
    { src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1000&q=85', alt: 'City skyline at dusk' },
    { src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=85', alt: 'Urban skyline after dark' },
  ],
  [
    { src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85', alt: 'A concert crowd under dramatic stage lighting' },
    { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1000&q=85', alt: 'Live music stage lighting' },
    { src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1000&q=85', alt: 'Concert stage and audience' },
  ],
]

function App() {

  /* =======================================================
     WORK FILTER
  ======================================================= */

  const [workType, setWorkType] = useState('Long Form')
  const [longFilter, setLongFilter] = useState('All')
  const [shortFilter, setShortFilter] = useState('All')


  /* =======================================================
     TESTIMONIAL CAROUSEL
  ======================================================= */

  const [visibleCards, setVisibleCards] = useState(3)

  const [currentIndex, setCurrentIndex] = useState(
    testimonials.length
  )

  const [isAnimating, setIsAnimating] = useState(true)

  const [step, setStep] = useState(0)

  const carouselViewportRef = useRef(null)
  const cardRef = useRef(null)


  /* =======================================================
     ON-SCREEN DETECTION FOR DECORATIVE ANIMATIONS
     Pauses the hero and about-section animated visuals
     whenever they're scrolled out of view, so the browser
     isn't running a dozen infinite CSS animations at once
     on sections the visitor can't even see.
  ======================================================= */
/* =======================================================
     RESPONSIVE CARD COUNT
  ======================================================= */

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth <= 700) {
        setVisibleCards(1)
        return
      }

      if (window.innerWidth <= 1050) {
        setVisibleCards(2)
        return
      }

      setVisibleCards(3)
    }

    updateVisibleCards()

    window.addEventListener(
      'resize',
      updateVisibleCards
    )

    return () => {
      window.removeEventListener(
        'resize',
        updateVisibleCards
      )
    }
  }, [])


  /* =======================================================
     TESTIMONIAL CLONES
  ======================================================= */

  const clonedTestimonials = useMemo(() => {
    const clones = visibleCards

    return [
      ...testimonials.slice(-clones),
      ...testimonials,
      ...testimonials.slice(0, clones),
    ]
  }, [visibleCards])


  /* =======================================================
     RESET CAROUSEL ON RESIZE
  ======================================================= */

  useEffect(() => {
    setIsAnimating(false)
    setCurrentIndex(testimonials.length)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    })
  }, [visibleCards])


  /* =======================================================
     MEASURE TESTIMONIAL STEP
  ======================================================= */

  useEffect(() => {
    const calculateStep = () => {
      if (!cardRef.current) return

      const cardWidth =
        cardRef.current.getBoundingClientRect().width

      const styles =
        window.getComputedStyle(cardRef.current)

      const marginRight =
        parseFloat(styles.marginRight) || 0

      setStep(cardWidth + marginRight)
    }

    calculateStep()

    const resizeObserver =
      new ResizeObserver(calculateStep)

    if (carouselViewportRef.current) {
      resizeObserver.observe(
        carouselViewportRef.current
      )
    }

    if (cardRef.current) {
      resizeObserver.observe(
        cardRef.current
      )
    }

    window.addEventListener(
      'resize',
      calculateStep
    )

    return () => {
      resizeObserver.disconnect()

      window.removeEventListener(
        'resize',
        calculateStep
      )
    }
  }, [visibleCards])


  /* =======================================================
     REAL TESTIMONIAL INDEX
  ======================================================= */

  const realIndex =
    (
      currentIndex -
      testimonials.length
    ) % testimonials.length

  const normalizedRealIndex =
    realIndex < 0
      ? realIndex + testimonials.length
      : realIndex


  /* =======================================================
     NEXT TESTIMONIAL
  ======================================================= */

  const nextTestimonial = () => {
    if (!isAnimating) return

    setCurrentIndex(
      previous => previous + 1
    )
  }


  /* =======================================================
     PREVIOUS TESTIMONIAL
  ======================================================= */

  const previousTestimonial = () => {
    if (!isAnimating) return

    setCurrentIndex(
      previous => previous - 1
    )
  }


  /* =======================================================
     GO TO TESTIMONIAL
  ======================================================= */

  const goToTestimonial = (index) => {
    if (!isAnimating) return

    setCurrentIndex(
      testimonials.length + index
    )
  }


  /* =======================================================
     LOOP RESET
  ======================================================= */

  const handleCarouselTransitionEnd = () => {
    const firstRealIndex =
      testimonials.length

    const lastRealIndex =
      testimonials.length +
      testimonials.length -
      visibleCards

    if (
      currentIndex >=
      testimonials.length +
      testimonials.length
    ) {
      setIsAnimating(false)

      setCurrentIndex(
        testimonials.length
      )

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })

      return
    }

    if (currentIndex < firstRealIndex) {
      const correctedIndex =
        testimonials.length +
        (
          currentIndex -
          testimonials.length
        )

      setIsAnimating(false)

      setCurrentIndex(correctedIndex)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })

      return
    }

    if (currentIndex > lastRealIndex) {
      const correctedIndex =
        currentIndex -
        testimonials.length

      setIsAnimating(false)

      setCurrentIndex(correctedIndex)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    }
  }


  /* =======================================================
     WORK FILTERS
  ======================================================= */

  const longProjects = projects.filter(project => project.type === 'Long Form')
  const shortProjects = projects.filter(project => project.type === 'Short Form')

  const activeWorkFilter = workType === 'Long Form' ? longFilter : shortFilter
  const setActiveWorkFilter = workType === 'Long Form' ? setLongFilter : setShortFilter

  const filteredProjects = workType === 'Long Form'
    ? (longFilter === 'All'
        ? longProjects
        : longProjects.filter(project => project.category === longFilter || project.subCategory === longFilter))
    : (shortFilter === 'All'
        ? shortProjects
        : shortProjects.filter(project => project.category === shortFilter || project.subCategory === shortFilter))

  const workCategories = workType === 'Long Form'
    ? ['All', 'Gaming', 'Information', 'Stream Highlights', 'Documentary', 'Storytelling']
    : ['All', 'Gaming', 'Information', 'Stream Highlights', 'Shorts / Reels', 'Social Media']

  const aboutSlideshowRef = useRef(null)
  const [aboutImageIndices, setAboutImageIndices] = useState([0, 0, 0])
  const [aboutPreviousIndices, setAboutPreviousIndices] = useState([null, null, null])
  const [isAboutSlideshowVisible, setIsAboutSlideshowVisible] = useState(false)

  useEffect(() => {
    const element = aboutSlideshowRef.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      setIsAboutSlideshowVisible(entry.isIntersecting && entry.intersectionRatio >= 0.2)
    }, { threshold: [0, 0.2, 0.5] })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isAboutSlideshowVisible || document.hidden) return
    const interval = window.setInterval(() => {
      setAboutPreviousIndices([...aboutImageIndices])
      setAboutImageIndices(current =>
        current.map((index, screen) => (index + 1) % aboutSlideshowImages[screen].length)
      )
    }, 3000)
    return () => window.clearInterval(interval)
  }, [isAboutSlideshowVisible, aboutImageIndices])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) setIsAboutSlideshowVisible(false)
      else {
        const element = aboutSlideshowRef.current
        if (element) {
          const rect = element.getBoundingClientRect()
          setIsAboutSlideshowVisible(rect.top < window.innerHeight && rect.bottom > 0)
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  const workViewportRef = useRef(null)

  const scrollWork = (direction) => {
    if (!workViewportRef.current) return
    const amount = Math.max(workViewportRef.current.clientWidth * 0.82, 260)
    workViewportRef.current.scrollBy({
      left: direction * amount,
      behavior: 'smooth',
    })
  }

  const handleWorkTypeChange = (type) => {
    setWorkType(type)
    requestAnimationFrame(() => {
      if (workViewportRef.current) {
        workViewportRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      }
    })
  }


  /* =======================================================
     CONTACT FORM
     Opens the visitor's default email client with the
     submitted details. No backend is required.
  ======================================================= */

  const handleContactSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const subject = String(data.get('subject') || '').trim()
    const message = String(data.get('message') || '').trim()

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message,
    ].join('\\n')

    const mailto = `mailto:hello@example.com?subject=${encodeURIComponent(
      subject || 'Project Inquiry'
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
  }


  /* =======================================================
     RENDER
  ======================================================= */


  const [headerPinned, setHeaderPinned] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHeaderPinned(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="site">

      {/* ===================================================
          NAVIGATION
      =================================================== */}

      <header className={`site-header ${headerPinned ? "is-pinned" : ""}`}>
        <nav className="navbar">

          <a
            href="#home"
            className="logo"
          >
            <span className="logo-full">
              LUCY.
            </span>
          </a>


          <div className="nav-links">

            <a href="#home">
              Home
            </a>

            <a href="#work">
              Work
            </a>

            <a href="#testimonials">
              Testimonials
            </a>

            <a href="#about">
              About
            </a>

            <a href="#about-contact">
              Contact
            </a>

          </div>


          <span className="portfolio-label">
            PORTFOLIO
          </span>

        </nav>
      </header>


      <main>

        {/* =================================================
            HERO
        ================================================= */}

        <section
          id="home"
          className="hero-section"
        >

          <div className="hero-content">

            <p className="eyebrow">
              VIDEO EDITOR
            </p>


            <h1>
              You shoot it
              <br />
              <span className="hero-accent">I make it</span>
              <br />
              <span className="hero-accent">worth</span>
              <br />
              <span className="hero-accent">watching</span>
            </h1>


            <p className="hero-description">
              I turn raw footage into thoughtful,
              engaging edits built around story,
              pacing
              <br />
              and visual identity.
            </p>


            <a
              href="#work"
              className="primary-link"
            >
              Explore work
              <ArrowDown size={18} />
            </a>

          </div>

          <HeroVideoGrids />

        </section>


        {/* =================================================
            WORK
        ================================================= */}

        <section
          id="work"
          className="work-section work-redesign"
        >
          <div className="section-heading work-heading">
            <p className="eyebrow">SELECTED WORK</p>
            <h2>Work<span className="work-heading-dot">.</span></h2>
            <p className="work-intro">A collection of edits across gaming, information, stream highlights and more.</p>
          </div>

          <div className="work-showcase">
            <div className="work-showcase-top">
              <div className="work-type-switch" role="tablist" aria-label="Video format">
                {['Long Form', 'Short Form'].map(type => (
                  <button
                    key={type}
                    type="button"
                    role="tab"
                    aria-selected={workType === type}
                    className={`work-type-pill ${workType === type ? 'active' : ''}`}
                    onClick={() => handleWorkTypeChange(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="work-showcase-label">
                <span>{workType === 'Long Form' ? '01' : '02'}</span>
                <i></i>
                <strong>{workType.toUpperCase()}</strong>
              </div>
            </div>

            <div className="work-filter-row">
              <div className="work-subfilters" role="tablist" aria-label={`${workType} categories`}>
                {workCategories.map(filter => (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={activeWorkFilter === filter}
                    className={`work-subfilter ${activeWorkFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveWorkFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="work-arrows">
                <button
                  type="button"
                  className="work-arrow"
                  aria-label={`Previous ${workType.toLowerCase()} projects`}
                  onClick={() => scrollWork(-1)}
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  className="work-arrow"
                  aria-label={`Next ${workType.toLowerCase()} projects`}
                  onClick={() => scrollWork(1)}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div
              className={`work-projects-viewport ${workType === 'Short Form' ? 'is-short' : 'is-long'}`}
              ref={workViewportRef}
            >
              <div
                key={`${workType}-${activeWorkFilter}`}
                className={`work-projects-track ${workType === 'Short Form' ? 'work-projects-track-short' : 'work-projects-track-long'}`}
              >
                {filteredProjects.length > 0 ? (
                  filteredProjects.map(project => (
                    <article
                      className={`work-project-card ${workType === 'Short Form' ? 'work-project-card-short' : 'work-project-card-long'}`}
                      key={project.id}
                    >
                      <div className="work-project-media">
                        <img src={project.image} alt="" loading="lazy" />
                        <span className="work-duration">{project.duration}</span>
                        {workType === 'Long Form' && (
                          <span className="work-project-number">PROJECT {String(project.id).padStart(2, '0')}</span>
                        )}
                      </div>

                      <div className="work-project-info">
                        <div>
                          <p>{project.category.toUpperCase()} {workType === 'Long Form' ? 'EDIT' : 'SHORT'}</p>
                          <h3>{project.title}</h3>
                        </div>
                        <ArrowUpRight size={workType === 'Short Form' ? 18 : 20} strokeWidth={1.5} />
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="work-empty-state">No projects in this category yet.</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            TESTIMONIALS
        ================================================= */}

        <section
          id="testimonials"
          className="testimonials-section"
        >

          <div className="section-heading">

            <p className="eyebrow">
              CLIENTS
            </p>

            <h2>
              What clients say
            </h2>

          </div>


          {/* CAROUSEL */}

          <div
            className="testimonial-carousel"
            ref={carouselViewportRef}
          >

            <div
              className={`testimonial-track ${
                isAnimating
                  ? 'testimonial-track-animated'
                  : ''
              }`}
              style={{
                transform:
                  `translate3d(-${
                    currentIndex * step
                  }px, 0, 0)`,
              }}
              onTransitionEnd={
                handleCarouselTransitionEnd
              }
            >

              {clonedTestimonials.map(
                (testimonial, index) => (

                  <article
                    key={`${testimonial.name}-${index}`}
                    ref={
                      index === 0
                        ? cardRef
                        : null
                    }
                    className={`testimonial-card ${
                      index === currentIndex + 1 ||
                      (visibleCards === 1 && index === currentIndex)
                        ? 'is-featured'
                        : ''
                    }`}
                  >

                    <div className="testimonial-card-top">

                      <div className="testimonial-identity">
                        <div className="testimonial-avatar">
                          {testimonial.initials}
                        </div>

                        <div className="testimonial-client-info">
                          <p className="testimonial-name">
                            {testimonial.name}
                          </p>

                          <p className="testimonial-role">
                            {testimonial.role.toUpperCase()}
                          </p>
                        </div>
                      </div>

                      <div className="testimonial-rating" aria-label="5 out of 5 stars">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>

                    </div>

                    <div className="testimonial-quote-mark" aria-hidden="true">
                      “
                    </div>

                    <p className="testimonial-quote">
                      “{testimonial.quote}”
                    </p>

                    <div className="testimonial-bottom">
                      <div className="testimonial-line" />

                      <span className="testimonial-number">
                        {String((index % testimonials.length) + 1).padStart(2, '0')}
                      </span>
                    </div>

                  </article>

                )
              )}

            </div>

          </div>


          {/* TESTIMONIAL CONTROLS */}

          <div className="testimonial-navigation">

            <button
              type="button"
              className="testimonial-arrow"
              aria-label="Previous testimonial"
              onClick={
                previousTestimonial
              }
            >
              <ArrowLeft size={18} />
            </button>


            <div className="testimonial-dots">

              {testimonials.map(
                (_, index) => (

                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to testimonial ${
                      index + 1
                    }`}
                    className={`testimonial-dot ${
                      normalizedRealIndex === index
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      goToTestimonial(index)
                    }
                  />

                )
              )}

            </div>


            <button
              type="button"
              className="testimonial-arrow"
              aria-label="Next testimonial"
              onClick={
                nextTestimonial
              }
            >
              <ArrowRight size={18} />
            </button>

          </div>

        </section>


        {/* =================================================
            ABOUT
        ================================================= */}

        <section
          id="about"
          className="about-section"
        >
          <div className="about-frame">
            <div className="about-copy">
              <p className="about-eyebrow">ABOUT / LUCY</p>

              <h2 className="about-title">
                Behind
                <br />
                <span className="about-title-highlight">the edits</span>
              </h2>

              <p className="about-description">
                I’m a video editor focused on turning raw footage into edits
                that feel intentional, engaging and easy to watch. My approach
                is built around story, rhythm and visual identity — making
                every cut serve the bigger idea behind the video.
              </p>

              <div className="about-principles">
                <span className="principle-line" />
                <span>STORY / RHYTHM / VISUAL IDENTITY</span>
              </div>

              <div className="about-stats">
                <div className="about-stat">
                  <strong>3+</strong>
                  <span>YEARS EDITING</span>
                </div>

                <div className="about-stat">
                  <strong>50+</strong>
                  <span>PROJECTS</span>
                </div>

                <div className="about-stat">
                  <strong>100%</strong>
                  <span>COMMITMENT</span>
                </div>
              </div>
            </div>

            <div className="about-cinema" aria-label="Cinematic editing stills">
              {['about-frame-main', 'about-frame-story', 'about-frame-identity'].map((frameClass, screen) => (
                <figure
                  key={frameClass}
                  className={`about-cinema-frame ${frameClass} about-slideshow`}
                  ref={screen === 0 ? aboutSlideshowRef : undefined}
                  aria-label={`Cinematic image montage ${screen + 1}`}
                >
                  {aboutPreviousIndices[screen] !== null && (
                    <img
                      key={`previous-${screen}-${aboutPreviousIndices[screen]}`}
                      className="about-slideshow-image is-fading-out"
                      src={aboutSlideshowImages[screen][aboutPreviousIndices[screen]].src}
                      alt=""
                      aria-hidden="true"
                    />
                  )}
                  <img
                    key={`current-${screen}-${aboutImageIndices[screen]}`}
                    className="about-slideshow-image is-visible"
                    src={aboutSlideshowImages[screen][aboutImageIndices[screen]].src}
                    alt={aboutSlideshowImages[screen][aboutImageIndices[screen]].alt}
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>


        {/* =================================================
            CONTACT
        ================================================= */}

        <section
          id="about-contact"
          className="contact-section"
        >
          <div className="contact-frame">

            {/* LEFT — INTRODUCTION */}
            <div className="contact-intro">

              <div className="contact-intro-top">
                <p className="contact-eyebrow">
                  LET’S TALK
                </p>

                <div className="contact-availability">
                  <span className="contact-status-dot" />
                  <span>OPEN TO NEW PROJECTS</span>
                </div>
              </div>

              <h2 className="contact-title">
                Good ideas
                <br />
                <span>start here</span>
              </h2>

              <p className="contact-description">
                Have a project in mind, a question or just want to say hi?
                <br className="contact-description-break" />
                I’d love to hear from you.
              </p>

              <div className="contact-intro-options">

                <div className="contact-intro-option">
                  <span className="contact-option-icon" aria-hidden="true">
                    <ArrowUpRight size={19} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3>New Projects</h3>
                    <p>Let’s create<br />something amazing.</p>
                  </div>
                </div>

                <div className="contact-intro-option">
                  <span className="contact-option-icon" aria-hidden="true">
                    <Camera size={19} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3>Collaborations</h3>
                    <p>Open to exciting<br />opportunities.</p>
                  </div>
                </div>

                <div className="contact-intro-option">
                  <span className="contact-option-icon" aria-hidden="true">
                    <MessageCircle size={19} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3>Just Say Hi</h3>
                    <p>Feel free to reach out<br />anytime.</p>
                  </div>
                </div>

              </div>
            </div>


            {/* RIGHT — CONTACT FORM */}
            <div className="contact-form-area">

              <form
                className="contact-form"
                onSubmit={handleContactSubmit}
              >
                <div className="contact-form-row">

                  <label className="contact-field">
                    <span className="contact-field-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="3.2" />
                        <path d="M5.5 19.2c.6-3.2 2.7-5 6.5-5s5.9 1.8 6.5 5" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="contact-field">
                    <span className="contact-field-icon" aria-hidden="true">
                      <Mail size={20} strokeWidth={1.7} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      autoComplete="email"
                      required
                    />
                  </label>

                </div>

                <label className="contact-field">
                  <span className="contact-field-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M6 3.8h8.2L18 7.6v12.6H6z" />
                      <path d="M14 3.8v4h4" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </label>

                <label className="contact-field contact-message-field">
                  <span className="contact-field-icon contact-message-icon" aria-hidden="true">
                    <MessageCircle size={20} strokeWidth={1.7} />
                  </span>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="contact-submit"
                >
                  <span>Send Message</span>
                  <ArrowUpRight size={21} strokeWidth={1.7} />
                </button>
              </form>


              <div className="contact-direct">

                <div className="contact-direct-heading">
                  <span />
                  <p>OR REACH ME DIRECTLY</p>
                  <span />
                </div>

                <div className="contact-direct-links">

                  <a
                    href="mailto:hello@example.com"
                    className="contact-direct-item"
                  >
                    <span className="contact-direct-icon">
                      <Mail size={20} strokeWidth={1.7} />
                    </span>
                    <span>hello@example.com</span>
                  </a>

                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-direct-item"
                  >
                    <span className="contact-direct-icon contact-instagram-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.4" cy="6.7" r="1" className="contact-icon-fill" />
                      </svg>
                    </span>
                    <span>@lucy.edits</span>
                  </a>

                  <a
                    href="https://youtube.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-direct-item"
                  >
                    <span className="contact-direct-icon contact-youtube-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M21 8.1a2.7 2.7 0 0 0-1.9-1.9C17.4 5.8 12 5.8 12 5.8s-5.4 0-7.1.4A2.7 2.7 0 0 0 3 8.1 28 28 0 0 0 2.6 12 28 28 0 0 0 3 15.9a2.7 2.7 0 0 0 1.9 1.9c1.7.4 7.1.4 7.1.4s5.4 0 7.1-.4a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .4-3.9 28 28 0 0 0-.4-3.9Z" />
                        <path d="m10 9 5 3-5 3V9Z" className="contact-icon-fill" />
                      </svg>
                    </span>
                    <span>Lucy Edits</span>
                  </a>

                  <a
                    href="https://x.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-direct-item"
                  >
                    <span className="contact-direct-icon contact-x-icon">
                      X
                    </span>
                    <span>@lucyedits</span>
                  </a>

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>


      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="site-footer">

        <div className="footer-top">

          <div>

            <span className="logo-full">
              LUCY.
            </span>

            <p>
              VIDEO EDITOR
            </p>

            <p>
              Editing with story,
              rhythm and intent.
            </p>

          </div>


          <a
            href="#home"
            className="back-to-top"
          >
            Back to top
            <ArrowUpRight size={17} />
          </a>

        </div>


        <div className="footer-bottom">

          <a href="#about-contact">
            Instagram ↗
          </a>

          <a href="#about-contact">
            YouTube ↗
          </a>

          <a href="#about-contact">
            Discord ↗
          </a>

          <a href="mailto:hello@example.com">
            Email ↗
          </a>

          <span>
            © {new Date().getFullYear()} LUCY.
          </span>

        </div>

      </footer>

    </div>
  )
}


export default App

/* =========================================================
   NOTE ON THUMBNAILS
   The `image` field on each project above points to a free
   Unsplash stock photo, used only as a stand-in so the grid
   isn't empty. For a real portfolio, swap each URL for an
   exported still (or a short muted <video> / GIF) from the
   actual edit — that's what will actually sell the work.
========================================================= */