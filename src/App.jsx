import {
  ArrowUpRight,
  ArrowDown,
  Camera,
  Play,
  Mail,
  MessageCircle,
} from 'lucide-react'
import './App.css'

function App() {
  return (
    <div className="site">

      {/* NAVIGATION */}
      <header className="site-header">
        <nav className="navbar">
          <a href="#home" className="logo">
            <span className="logo-full">LUCY.</span>
            <span className="logo-mark">L.</span>
          </a>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#work">Work</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          <button className="theme-toggle" type="button" aria-label="Toggle theme">
            ◐
          </button>
        </nav>
      </header>

      <main>

        {/* HERO */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <p className="eyebrow">VIDEO EDITOR</p>

            <h1>
              Editing with
              <br />
              <span>story, rhythm</span>
              <br />
              and intent.
            </h1>

            <p className="hero-description">
              I turn raw footage into thoughtful, engaging edits built around
              story, pacing and visual identity.
            </p>

            <a href="#work" className="primary-link">
              Explore work <ArrowDown size={18} />
            </a>
          </div>
        </section>

        {/* FEATURED WORK */}
        <section className="featured-section">
          <div className="section-heading">
            <p className="eyebrow">SELECTED</p>
            <h2>Featured work</h2>
          </div>

          <div className="featured-placeholder">
            Featured projects will appear here.
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="work-section">
          <div className="section-heading">
            <p className="eyebrow">PORTFOLIO</p>
            <h2>Work</h2>
          </div>

          <div className="category-filters">
            <button type="button">All</button>
            <button type="button">Gaming</button>
            <button type="button">Information</button>
            <button type="button">Stream Highlights</button>
            <button type="button">Shorts</button>
          </div>

          <div className="work-placeholder">
            Projects will appear here.
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="testimonials-section">
          <div className="section-heading">
            <p className="eyebrow">CLIENTS</p>
            <h2>What clients say</h2>
          </div>

          <div className="testimonial-placeholder">
            Testimonials will appear here.
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="about-section">
          <div className="section-heading">
            <p className="eyebrow">ABOUT</p>
            <h2>Behind the edits.</h2>
          </div>

          <div className="about-content">
            <p>
              About content will be managed through the CMS.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section">
          <div className="section-heading">
            <p className="eyebrow">CONTACT</p>
            <h2>Let's make something.</h2>
          </div>

          <div className="contact-content">
            <p>
              Contact information and platforms will be managed through the CMS.
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

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <span className="logo-full">LUCY.</span>
            <p>VIDEO EDITOR</p>
            <p>Editing with story, rhythm and intent.</p>
          </div>

          <a href="#home" className="back-to-top">
            Back to top <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="footer-bottom">
          <span>Instagram ↗</span>
          <span>YouTube ↗</span>
          <span>Discord ↗</span>
          <span>Email ↗</span>
          <span>© {new Date().getFullYear()} LUCY.</span>
        </div>
      </footer>

    </div>
  )
}

export default App