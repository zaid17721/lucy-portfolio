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
========================================================= */

const projects = [
  {
    id: 1,
    category: 'Gaming',
    title: 'Gaming Edit',
  },
  {
    id: 2,
    category: 'Information',
    title: 'Information Edit',
  },
  {
    id: 3,
    category: 'Stream Highlights',
    title: 'Stream Highlight',
  },
  {
    id: 4,
    category: 'Shorts',
    title: 'Short-form Edit',
  },
  {
    id: 5,
    category: 'Gaming',
    title: 'Gameplay Edit',
  },
  {
    id: 6,
    category: 'Information',
    title: 'Documentary Edit',
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
   APP
========================================================= */


/* =========================================================
   HERO VISUAL
   Decorative animation for the empty right side of Home.
   No text is used inside the animation.
========================================================= */

function HeroVisual() {
  const frames = [
    { className: 'hero-frame hero-frame-1', variant: 'one' },
    { className: 'hero-frame hero-frame-2', variant: 'two' },
    { className: 'hero-frame hero-frame-3', variant: 'three' },
    { className: 'hero-frame hero-frame-4', variant: 'four' },
    { className: 'hero-frame hero-frame-5', variant: 'five' },
  ]

  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-visual-glow" />

      <div className="hero-orbit hero-orbit-horizontal" />
      <div className="hero-orbit hero-orbit-diagonal" />
      <div className="hero-orbit hero-orbit-vertical" />

      <div className="hero-axis hero-axis-x" />
      <div className="hero-axis hero-axis-y" />

      <div className="hero-center">
        <span className="hero-center-glow" />
        <span className="hero-center-core" />
      </div>

      <div className="hero-frame-stage">
        {frames.map(frame => (
          <div
            key={frame.className}
            className={frame.className}
          >
            <div className={`hero-frame-art hero-frame-art-${frame.variant}`}>
              <span className="hero-frame-light" />
              <span className="hero-frame-shape hero-frame-shape-a" />
              <span className="hero-frame-shape hero-frame-shape-b" />
              <span className="hero-frame-shape hero-frame-shape-c" />
            </div>
          </div>
        ))}
      </div>

      <div className="hero-particles">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function App() {

  /* =======================================================
     WORK FILTER
  ======================================================= */

  const [activeFilter, setActiveFilter] = useState('All')


  /* =======================================================
     THEME
  ======================================================= */

  const [lightTheme, setLightTheme] = useState(false)

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
     FILTERED PROJECTS
  ======================================================= */

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(
          project =>
            project.category === activeFilter
        )


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className={`site ${
        lightTheme
          ? 'light-theme'
          : ''
      }`}
    >

      {/* ===================================================
          NAVIGATION
      =================================================== */}

      <header className="site-header">
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


          <button
            className="theme-toggle"
            type="button"
            aria-label="Toggle theme"
            onClick={() =>
              setLightTheme(
                previous => !previous
              )
            }
          >
            ◐
          </button>

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
              Editing with
              <br />
              story, rhythm
              <br />
              and intent.
            </h1>


            <p className="hero-description">
              I turn raw footage into thoughtful,
              engaging edits built around story,
              pacing and visual identity.
            </p>


            <a
              href="#work"
              className="primary-link"
            >
              Explore work
              <ArrowDown size={18} />
            </a>

          </div>

          <HeroVisual />

        </section>


        {/* =================================================
            WORK
        ================================================= */}

        <section
          id="work"
          className="work-section"
        >

          <div className="section-heading">

            <p className="eyebrow">
              PORTFOLIO
            </p>

            <h2>
              Work
            </h2>

          </div>


          {/* FILTERS */}

          <div
            className="category-filters"
            role="tablist"
          >

            {[
              'All',
              'Gaming',
              'Information',
              'Stream Highlights',
              'Shorts',
            ].map(filter => (

              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={
                  activeFilter === filter
                }
                className={`category-filter ${
                  activeFilter === filter
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>

            ))}

          </div>


          {/* PROJECT GRID */}

          <div
            className="projects-grid"
            key={activeFilter}
          >

            {filteredProjects.map(project => (

              <article
                className="project-card"
                key={project.id}
              >

                <div className="project-media">
                  <span>
                    PROJECT{' '}
                    {String(
                      project.id
                    ).padStart(2, '0')}
                  </span>
                </div>


                <div className="project-info">

                  <div>

                    <p className="project-category">
                      {project.category.toUpperCase()}
                    </p>

                    <h3>
                      {project.title}
                    </h3>

                  </div>


                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                  />

                </div>

              </article>

            ))}

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
                    className="testimonial-card"
                  >

                    <div className="testimonial-quote-mark">
                      “
                    </div>


                    <p className="testimonial-quote">
                      {testimonial.quote}
                    </p>


                    <div className="testimonial-bottom">

                      <div className="testimonial-client">

                        <div className="testimonial-line" />

                        <p className="testimonial-name">
                          {testimonial.name}
                        </p>

                        <p className="testimonial-role">
                          {testimonial.role}
                        </p>

                      </div>


                      <div className="testimonial-avatar">
                        {testimonial.initials}
                      </div>

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
            ABOUT + CONTACT
        ================================================= */}

        <section
          id="about"
          className="about-section"
        >

          <div className="about-frame">

            {/* =============================================
                LEFT CONTENT
            ============================================= */}

            <div className="about-copy">

              <p className="about-eyebrow">
                ABOUT / LUCY
              </p>


              <h2 className="about-title">
                Behind the
                <br />
                edits.
              </h2>


              <p className="about-description">
                I’m a video editor focused on turning
                raw footage into edits that feel
                intentional, engaging and easy to watch.
                My approach is built around story,
                rhythm and visual identity — making
                every cut serve the bigger idea behind
                the video.
              </p>


              <div className="about-principles">

                <span className="principle-line" />

                <span>
                  STORY / RHYTHM / VISUAL IDENTITY
                </span>

              </div>


              {/* STATS */}

              <div className="about-stats">

                <div className="about-stat">

                  <strong>
                    3+
                  </strong>

                  <span>
                    YEARS EDITING
                  </span>

                </div>


                <div className="about-stat">

                  <strong>
                    50+
                  </strong>

                  <span>
                    PROJECTS
                  </span>

                </div>


                <div className="about-stat">

                  <strong>
                    100%
                  </strong>

                  <span>
                    COMMITMENT
                  </span>

                </div>

              </div>




            </div>


            {/* =============================================
                RIGHT DYNAMIC VISUAL
            ============================================= */}

            <div
              className="about-visual"
              aria-hidden="true"
            >

              <div className="visual-grid" />


              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />


              <div className="orbit-line orbit-line-one" />
              <div className="orbit-line orbit-line-two" />


              {/* FILM STRIP */}

              <div className="film-scene">

                <div className="film-strip">

                  {[
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                  ].map(frame => (

                    <div
                      className="film-frame"
                      key={frame}
                    >

                      <div className="frame-image">
                        <span>
                          {String(
                            frame
                          ).padStart(
                            2,
                            '0'
                          )}
                        </span>
                      </div>

                    </div>

                  ))}

                </div>

              </div>


              {/* GLOWING LIGHT */}

              <div className="visual-glow" />


              <div className="visual-particles">

                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />

              </div>


              {/* LABELS */}

              <span className="visual-label label-ideas">
                IDEAS
              </span>

              <span className="visual-label label-frames">
                FRAMES
              </span>

              <span className="visual-label label-stories">
                STORIES
              </span>

              <span className="visual-label label-impact">
                IMPACT
              </span>


              <span className="visual-dot dot-one" />
              <span className="visual-dot dot-two" />
              <span className="visual-dot dot-three" />
              <span className="visual-dot dot-four" />


              <div className="visual-center-line" />


              <div className="visual-caption">
                <em>More</em>
                <em>than</em>
                <em>cuts.</em>

                <span />
              </div>

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

            <div className="contact-ornament contact-ornament-left" aria-hidden="true">
              <span>GOOD</span>
              <span>IDEAS</span>
              <span>BETTER</span>
              <span>EDITS</span>
            </div>

            <div className="contact-ornament contact-ornament-right" aria-hidden="true">
              <span>LET’S</span>
              <span>MAKE</span>
              <span>IT</span>
              <span>HAPPEN</span>
            </div>

            <div className="contact-header">
              <p className="contact-eyebrow">CONTACT</p>
              <span className="contact-header-line" aria-hidden="true" />
              <h2 className="contact-title">
                Let’s create <em>something.</em>
              </h2>
              <p className="contact-tagline">
                IDEAS <span>×</span> STORIES <span>×</span> BETTER VIDEOS
              </p>
            </div>

            <div className="contact-grid">

              <div className="contact-column contact-social-column">
                <p className="contact-column-label">SOCIALS</p>

                <div className="contact-social-links">
                  <a href="https://youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">
                    <img src="https://cdn.simpleicons.org/youtube/ffffff" alt="" />
                  </a>
                  <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="" />
                  </a>
                  <a href="https://discord.com/" target="_blank" rel="noreferrer" aria-label="Discord">
                    <img src="https://cdn.simpleicons.org/discord/ffffff" alt="" />
                  </a>
                  <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">
                    <img src="https://cdn.simpleicons.org/x/ffffff" alt="" />
                  </a>
                </div>

                <p className="contact-column-note">Let’s stay connected.</p>
              </div>

              <div className="contact-column contact-email-column">
                <p className="contact-column-label">EMAIL</p>

                <a
                  className="contact-email-button"
                  href="mailto:hello@example.com?subject=Project%20Inquiry"
                >
                  <span className="contact-mail-icon" aria-hidden="true">
                    <Mail size={20} strokeWidth={1.5} />
                  </span>
                  <span>SEND ME AN EMAIL</span>
                  <ArrowUpRight size={20} strokeWidth={1.5} />
                </a>

                <p className="contact-column-note">Open for new projects and ideas.</p>
              </div>

              <div className="contact-column contact-software-column">
                <p className="contact-column-label">SOFTWARE I USE</p>

                <div className="contact-software-list">
                  <div className="contact-software-item" title="Adobe Premiere Pro">
                    <img src="https://cdn.simpleicons.org/adobepremierepro/9999ff" alt="Adobe Premiere Pro" />
                  </div>
                  <div className="contact-software-item" title="Adobe After Effects">
                    <img src="https://cdn.simpleicons.org/adobeaftereffects/9999ff" alt="Adobe After Effects" />
                  </div>
                  <div className="contact-software-item" title="DaVinci Resolve">
                    <img src="https://cdn.simpleicons.org/davinciresolve/ffffff" alt="DaVinci Resolve" />
                  </div>
                </div>

                <p className="contact-column-note">The right tools for better stories.</p>
              </div>

            </div>

            <div className="contact-bottom">
              <span>VIDEO EDITOR</span>
              <div className="contact-bottom-line" aria-hidden="true" />
              <span className="contact-bottom-name">LUCY</span>
              <div className="contact-bottom-line" aria-hidden="true" />
              <span>EDIT · CREATE · INSPIRE</span>
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
