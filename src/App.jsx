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

   These are temporary examples.
   Later these can come from the CMS.
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

function App() {

  /* =======================================================
     WORK FILTER
  ======================================================= */

  const [activeFilter, setActiveFilter] = useState('All')


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

  const carouselTrackRef = useRef(null)

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
     CLONES

     Example with 3 visible cards:

     [3][4][5]
     [1][2][3][4][5]
     [1][2][3]

     This allows us to loop forever.
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
     RESET INDEX WHEN CARD COUNT CHANGES
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
     MEASURE CARD STEP

     Card width + gap.
  ======================================================= */

  useEffect(() => {

    const calculateStep = () => {

      if (!cardRef.current) {
        return
      }

      const cardWidth =
        cardRef.current.getBoundingClientRect().width

      const styles =
        window.getComputedStyle(
          cardRef.current
        )

      const marginRight =
        parseFloat(
          styles.marginRight
        ) || 0

      setStep(cardWidth + marginRight)
    }


    calculateStep()


    const resizeObserver =
      new ResizeObserver(
        calculateStep
      )


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

     Converts cloned index back into the real index.
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
     NEXT
  ======================================================= */

  const nextTestimonial = () => {

    if (!isAnimating) {
      return
    }

    setCurrentIndex(
      (previous) =>
        previous + 1
    )
  }


  /* =======================================================
     PREVIOUS
  ======================================================= */

  const previousTestimonial = () => {

    if (!isAnimating) {
      return
    }

    setCurrentIndex(
      (previous) =>
        previous - 1
    )
  }


  /* =======================================================
     DOT
  ======================================================= */

  const goToTestimonial = (
    index
  ) => {

    if (!isAnimating) {
      return
    }

    setCurrentIndex(
      testimonials.length + index
    )
  }


  /* =======================================================
     LOOP RESET

     When we reach a clone, immediately move back to
     the corresponding real card without animation.
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

      const correctedIndex =
        testimonials.length

      setIsAnimating(false)

      setCurrentIndex(
        correctedIndex
      )

      requestAnimationFrame(() => {

        requestAnimationFrame(() => {
          setIsAnimating(true)
        })

      })

      return
    }


    if (
      currentIndex <
      firstRealIndex
    ) {

      const correctedIndex =
        testimonials.length +
        (
          currentIndex -
          testimonials.length
        )

      setIsAnimating(false)

      setCurrentIndex(
        correctedIndex
      )

      requestAnimationFrame(() => {

        requestAnimationFrame(() => {
          setIsAnimating(true)
        })

      })

      return
    }


    if (
      currentIndex >
      lastRealIndex
    ) {

      const correctedIndex =
        currentIndex -
        testimonials.length

      setIsAnimating(false)

      setCurrentIndex(
        correctedIndex
      )

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
          (project) =>
            project.category ===
            activeFilter
        )


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <div className="site">


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

            <a href="#contact">
              Contact
            </a>

          </div>


          <button
            className="theme-toggle"
            type="button"
            aria-label="Toggle theme"
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
            ].map(
              (filter) => (

                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={
                    activeFilter ===
                    filter
                  }
                  className={`category-filter ${
                    activeFilter ===
                    filter
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setActiveFilter(
                      filter
                    )
                  }
                >
                  {filter}
                </button>

              )
            )}

          </div>


          {/* PROJECT GRID */}

          <div
            className="projects-grid"
            key={activeFilter}
          >

            {filteredProjects.map(
              (project) => (

                <article
                  className="project-card"
                  key={project.id}
                >

                  <div className="project-media">

                    <span>
                      PROJECT{' '}
                      {String(
                        project.id
                      ).padStart(
                        2,
                        '0'
                      )}
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

              )
            )}

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
              ref={carouselTrackRef}
              className={`testimonial-track ${
                isAnimating
                  ? 'testimonial-track-animated'
                  : ''
              }`}
              style={{
                transform:
                  `translate3d(-${
                    currentIndex *
                    step
                  }px, 0, 0)`,
              }}
              onTransitionEnd={
                handleCarouselTransitionEnd
              }
            >

              {clonedTestimonials.map(
                (
                  testimonial,
                  index
                ) => (

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


          {/* =================================================
              TESTIMONIAL CONTROLS
          ================================================= */}

          <div className="testimonial-navigation">


            {/* PREVIOUS */}

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


            {/* DOTS */}

            <div className="testimonial-dots">

              {testimonials.map(
                (
                  _,
                  index
                ) => (

                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to testimonial ${
                      index + 1
                    }`}
                    className={`testimonial-dot ${
                      normalizedRealIndex ===
                      index
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      goToTestimonial(
                        index
                      )
                    }
                  />

                )
              )}

            </div>


            {/* NEXT */}

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

          <div className="section-heading">

            <p className="eyebrow">
              ABOUT
            </p>

            <h2>
              Behind the edits.
            </h2>

          </div>


          <div className="about-content">

            <p>
              About content will be managed
              through the CMS.
            </p>

          </div>

        </section>


        {/* =================================================
            CONTACT
        ================================================= */}

        <section
          id="contact"
          className="contact-section"
        >

          <div className="section-heading">

            <p className="eyebrow">
              CONTACT
            </p>

            <h2>
              Let's make something.
            </h2>

          </div>


          <div className="contact-content">

            <p>
              Contact information and
              platforms will be managed
              through the CMS.
            </p>


            <div className="contact-links">

              <a href="#contact">
                <Camera size={18} />
                Instagram
                <ArrowUpRight size={16} />
              </a>


              <a href="#contact">
                <Play size={18} />
                YouTube
                <ArrowUpRight size={16} />
              </a>


              <a href="#contact">
                <MessageCircle size={18} />
                Discord
                <ArrowUpRight size={16} />
              </a>


              <a href="#contact">
                <Mail size={18} />
                Email
                <ArrowUpRight size={16} />
              </a>

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

          <span>
            Instagram ↗
          </span>

          <span>
            YouTube ↗
          </span>

          <span>
            Discord ↗
          </span>

          <span>
            Email ↗
          </span>

          <span>
            © {new Date().getFullYear()} LUCY.
          </span>

        </div>

      </footer>

    </div>
  )
}


export default App