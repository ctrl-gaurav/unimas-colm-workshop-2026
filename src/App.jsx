import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import chiWangPhoto from './assets/images/chi-wang.jpg';

/* ============================================
   Data
   ============================================ */
const SPEAKERS = [
  {
    name: 'Dawn Song',
    tentative: false,
    role: 'Professor, Computer Science',
    affiliation: 'UC Berkeley',
    photo: 'https://dawnsong.io/dawn-berkeley.png',
    website: 'https://dawnsong.io',
  },
  {
    name: 'Sergey Levine',
    tentative: false,
    role: 'Associate Professor, EECS',
    affiliation: 'UC Berkeley',
    photo: 'https://people.eecs.berkeley.edu/~svlevine/images/portrait_lab_small.png',
    website: 'https://people.eecs.berkeley.edu/~svlevine/',
  },
  {
    name: 'Chi Wang',
    tentative: false,
    role: 'Senior Staff Research Scientist, Creator of AutoGen',
    affiliation: 'Google DeepMind',
    photo: chiWangPhoto,
    website: 'https://www.linkedin.com/in/chi-wang-autogen',
  },
];

const ORGANIZERS = [
  {
    name: 'Xuan Wang',
    role: 'Assistant Professor, Computer Science',
    affiliation: 'Virginia Tech',
    photo: 'https://xuanwang91.github.io/images//img/Xuan2016.jpg',
    website: 'https://xuanwang91.github.io',
  },
  {
    name: 'Manling Li',
    role: 'Assistant Professor, Computer Science',
    affiliation: 'Northwestern University',
    photo: 'https://limanling.github.io/authors/admin/avatar_hudd2cb509b9271810998b42a25e34ae22_4743348_270x270_fill_q75_lanczos_center.jpg',
    website: 'https://limanling.github.io/',
  },
  {
    name: 'Wenqi Shi',
    role: 'Assistant Professor, Health Data Science',
    affiliation: 'UT Southwestern Medical Center',
    photo: 'https://wshi83.github.io/assets/img/profile.png',
    website: 'https://wshi83.github.io/',
  },
  {
    name: 'Yuchen Zhuang',
    role: 'Research Scientist',
    affiliation: 'Google DeepMind',
    photo: 'https://night-chen.github.io/assets/images/profile.png',
    website: 'https://night-chen.github.io/',
  },
  {
    name: 'Ligeng Zhu',
    role: 'Researcher',
    affiliation: 'Nvidia',
    photo: 'https://s.gravatar.com/avatar/3b0c57abe05e251bbcea1a00c60b67d2?s=240',
    website: 'https://lzhu.me/',
  },
  {
    name: 'Charles Flemming',
    role: 'Senior Researcher',
    affiliation: 'Cisco',
    photo: 'https://outshift-headless-cms-s3.s3.us-east-2.amazonaws.com/Charles_fleming.jpg',
    website: 'https://outshift.cisco.com/blog/author/charles-fleming',
  },
  {
    name: 'Di Jin',
    role: 'Co-founder',
    affiliation: 'Eigen AI',
    photo: 'https://jind11.github.io/images/avatar-best.jpg',
    website: 'https://jind11.github.io/',
  },
  {
    name: 'Zihan Wang',
    role: 'VP of Research',
    affiliation: 'Abaka AI',
    photo: 'https://beikewzh.github.io/assets/images/photos/zihan_photo.JPG',
    website: 'https://beikewzh.github.io/',
  },
  {
    name: 'Heng Ji',
    role: 'Professor, Computer Science',
    affiliation: 'UIUC',
    photo: 'https://ws.engr.illinois.edu/directory/viewphoto.aspx?photo=16852&s=300',
    website: 'https://blender.cs.illinois.edu/hengji.html',
  },
  {
    name: 'Jiawei Han',
    role: 'Michael Aiken Chair Professor, Computer Science',
    affiliation: 'UIUC',
    photo: 'https://ws.engr.illinois.edu/directory/viewphoto.aspx?photo=18410&s=300',
    website: 'http://hanj.cs.illinois.edu/',
  },
];

const TOPICS = [
  {
    icon: '\u{1F916}',
    title: 'LLM-Based Multi-Agent Coordination',
    desc: 'How language models can enable agents to communicate, reason together, and coordinate actions in shared environments.',
  },
  {
    icon: '\u{1F9BE}',
    title: 'Embodied Multi-Agent Systems',
    desc: 'Robotic teams, autonomous vehicles, and physical systems where multiple agents must work together under real-world constraints.',
  },
  {
    icon: '\u{1F4AC}',
    title: 'Emergent Communication',
    desc: 'How agents develop shared languages and protocols, from learned message passing to symbolic communication.',
  },
  {
    icon: '\u{1F30D}',
    title: 'World Models for Agent Coordination',
    desc: 'Using world models and simulators to help agents plan, predict, and coordinate in complex environments.',
  },
  {
    icon: '\u{1F504}',
    title: 'Multi-Agent Reinforcement Learning',
    desc: 'Learning algorithms for cooperative and competitive multi-agent settings, including parameter sharing and distributed training.',
  },
  {
    icon: '\u{1F517}',
    title: 'Unifying Physical and Digital Agents',
    desc: 'Bridging the gap between robotics-style control systems and AI-driven reasoning agents through shared design principles.',
  },
];

const DATES = [
  { date: 'June 23, 2026', label: 'Workshop Paper Submission Deadline', highlight: true },
  { date: 'July 24, 2026', label: 'Acceptance Notification', note: 'Authors will be notified of decisions' },
  { date: 'August 21, 2026', label: 'Camera-Ready Deadline', note: 'Final versions due' },
  { date: 'October 9, 2026', label: 'Workshop Day', note: 'Hilton Union Square, San Francisco', highlight: true },
];

const SCHEDULE = [
  { time: '8:30 AM - 8:45 AM', title: 'Opening Remarks', speaker: 'Workshop Organizers' },
  { time: '8:45 AM - 9:35 AM', title: 'Keynote Talk 1', speaker: 'Dawn Song' },
  { time: '9:35 AM - 10:25 AM', title: 'Keynote Talk 2', speaker: 'Sergey Levine' },
  { time: '10:25 AM - 10:55 AM', title: 'Coffee Break', isBreak: true },
  { time: '10:55 AM - 11:45 AM', title: 'Keynote Talk 3', speaker: 'Chi Wang' },
  { time: '11:45 AM - 12:30 PM', title: 'Contributed Talks (Oral)', speaker: 'Selected Authors' },
  { time: '12:30 PM - 1:45 PM', title: 'Lunch Break', isBreak: true },
  { time: '1:45 PM - 3:15 PM', title: 'Poster Session', speaker: 'All Accepted Authors' },
  { time: '3:15 PM - 3:45 PM', title: 'Coffee Break', isBreak: true },
  { time: '3:45 PM - 4:45 PM', title: 'Panel Discussion', speaker: 'Invited Speakers & Organizers' },
  { time: '4:45 PM - 5:00 PM', title: 'Closing Remarks & Best Paper Award', speaker: 'Workshop Organizers' },
  { time: '5:00 PM - 6:00 PM', title: 'Networking Reception & Poster Session', speaker: 'All Participants' },
];

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#topics', label: 'Topics' },
  { href: '#speakers', label: 'Speakers' },
  { href: '#dates', label: 'Dates' },
  { href: '#submission', label: 'Submission' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#organizers', label: 'Organizers' },
];

/* ============================================
   Components
   ============================================ */

function PersonCard({ person }) {
  return (
    <div className="person-card">
      <div className="person-photo">
        {person.photo ? (
          <img src={person.photo} alt={person.name} loading="lazy" />
        ) : (
          <div className="person-photo-placeholder">
            {person.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
      <div className="person-name">{person.name}</div>
      {person.tentative && <div className="person-tentative">(tentative)</div>}
      <div className="person-role">{person.role}</div>
      <div className="person-affiliation">{person.affiliation}</div>
      {person.website && (
        <div className="person-link-wrapper">
          <a href={person.website} className="person-link" target="_blank" rel="noopener noreferrer">
            Website &#8599;
          </a>
        </div>
      )}
    </div>
  );
}

function useFadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function FadeIn({ children, className = '' }) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}

/* ============================================
   Main App
   ============================================ */
function App() {
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Track active section for nav highlighting
  useEffect(() => {
    const sections = NAV_ITEMS.map(item => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e) => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="#top" className="navbar-brand">
            <span>UniMAS</span> @ COLM 2026
          </a>

          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === item.href.slice(1) ? 'active' : ''}
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '\u{1F319}' : '\u{2600}\u{FE0F}'}
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '\u{2715}' : '\u{2630}'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="top">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            COLM 2026 Workshop
          </div>
          <h1>UniMAS</h1>
          <p className="hero-subtitle">
            A Unified View of Multi-Agent Systems for Embodied AI
          </p>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-icon">{'\u{1F4C5}'}</span>
              October 9, 2026
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-icon">{'\u{1F4CD}'}</span>
              Hilton Union Square, San Francisco
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-icon">{'\u{1F3DB}\u{FE0F}'}</span>
              Co-located with COLM 2026
            </div>
          </div>
          <div className="hero-actions">
            <a href="#submission" className="btn btn-primary">
              Submit a Paper &#8599;
            </a>
            <a href="#about" className="btn btn-outline">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">About</div>
              <h2 className="section-title">Workshop Overview</h2>
              <p className="section-description">
                Connecting robotics, control, and embodied systems with LLM agents, world models, and multi-agent AI.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="about-content">
              <div className="about-text">
                <p>
                  Multi-agent systems show up everywhere in the real world: robotic teams, self-driving cars,
                  factory floors, and healthcare settings where multiple agents need to work together under
                  uncertainty and changing conditions. At the same time, recent AI progress has produced a
                  new kind of multi-agent system built on large language models, vision-language models, and
                  world models that can reason, plan, and coordinate in simulated environments.
                </p>
                <p>
                  But these two worlds are still disconnected. Robotics treats multi-agent systems as
                  physically grounded control problems with hard safety constraints. Modern AI treats them
                  as reasoning and representation problems. Robotics cares about dynamics, constraints, and
                  distributed control. AI focuses on learned representations, flexible interaction, and emergent
                  communication.
                </p>
                <p>
                  <strong>UniMAS</strong> tackles this gap head-on. We reframe multi-agent systems as a single
                  problem of embodied intelligence that spans both physical and digital domains. The focus is on
                  shared principles of representation, coordination, and distributed decision-making that apply
                  across both paradigms.
                </p>
                <p>
                  We want to build a community with a common vocabulary, aligned assumptions, and a clear view
                  of the core challenges. If you work on robotics, control, LLM agents, world models, or
                  multi-agent reinforcement learning, this workshop is for you.
                </p>
              </div>
              <div className="about-highlights">
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F3AF}'}</span>
                  <div>
                    <h4>Bridging Two Paradigms</h4>
                    <p>Connecting physically grounded robotics with AI-driven reasoning agents.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F91D}'}</span>
                  <div>
                    <h4>Cross-Disciplinary</h4>
                    <p>Robotics, control, NLP, reinforcement learning, and embodied AI under one roof.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F4AC}'}</span>
                  <div>
                    <h4>Full-Day Program</h4>
                    <p>Six keynotes, panel discussion, poster session, and networking reception.</p>
                  </div>
                </div>
                <div className="highlight-card">
                  <span className="highlight-icon">{'\u{1F331}'}</span>
                  <div>
                    <h4>Open to All</h4>
                    <p>Travel awards for students, K-12 outreach, and support for underrepresented groups.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Topics */}
      <section className="section section-alt" id="topics">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Call for Papers</div>
              <h2 className="section-title">Topics of Interest</h2>
              <p className="section-description">
                We invite submissions on topics spanning the full range of multi-agent systems for embodied AI. Topics include but are not limited to:
              </p>
            </div>
          </FadeIn>

          <div className="topics-grid">
            {TOPICS.map((topic, i) => (
              <FadeIn key={i}>
                <div className="topic-card">
                  <span className="topic-icon">{topic.icon}</span>
                  <h3>{topic.title}</h3>
                  <p>{topic.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Keynote Speakers */}
      <section className="section" id="speakers">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Confirmed Speakers</div>
              <h2 className="section-title">Keynote Speakers</h2>
              <p className="section-description">
                Leading researchers working across multi-agent systems, robotics, and foundation models.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="people-grid">
              {SPEAKERS.map((person, i) => (
                <PersonCard key={i} person={person} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Important Dates */}
      <section className="section section-alt" id="dates">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Important Dates</div>
              <h2 className="section-title">Key Deadlines</h2>
              <p className="section-description">
                All deadlines are 11:59 PM Anywhere on Earth (AoE).
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="timeline">
              {DATES.map((item, i) => (
                <div className="timeline-item" key={i}>
                  <div className={`timeline-dot ${item.highlight ? 'highlight' : ''}`}></div>
                  <div className="timeline-content">
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-label">{item.label}</div>
                    {item.note && <div className="timeline-note">{item.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Submission */}
      <section className="section" id="submission">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Submit</div>
              <h2 className="section-title">Paper Submission</h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="submission-card">
              <h3>Submit Your Work</h3>
              <p>
                We welcome research papers describing original, ongoing, or recently published work.
                All submissions are non-archival and will be hosted on OpenReview.
              </p>

              <div className="submission-details">
                <div className="submission-detail">
                  <h4>Format</h4>
                  <p>9 pages main text + unlimited references (COLM 2026 format)</p>
                </div>
                <div className="submission-detail">
                  <h4>Review Process</h4>
                  <p>At least two reviews per paper from domain experts</p>
                </div>
                <div className="submission-detail">
                  <h4>Submission Platform</h4>
                  <p>OpenReview</p>
                </div>
              </div>

              <p>
                Each paper will be reviewed by program committee members with expertise in
                robotics, control, and AI/LLM agents. Conflicts of interest are handled
                following standard COLM/OpenReview policies. Accepted papers will be
                presented as posters or oral talks.
              </p>

              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                href="https://openreview.net"
                className="btn-submit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit on OpenReview &#8599;
              </a>
              <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                OpenReview submission site link will be updated soon.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Schedule */}
      <section className="section section-alt" id="schedule">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Program</div>
              <h2 className="section-title">Tentative Schedule</h2>
              <p className="section-description">
                October 9, 2026 | Hilton Union Square, San Francisco
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="schedule-table">
              {SCHEDULE.map((item, i) => (
                <div className={`schedule-row ${item.isBreak ? 'break-row' : ''}`} key={i}>
                  <div className="schedule-time">{item.time}</div>
                  <div className="schedule-event">
                    <div className="schedule-event-title">{item.title}</div>
                    {item.speaker && !item.isBreak && (
                      <div className="schedule-event-speaker">{item.speaker}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Organizers */}
      <section className="section" id="organizers">
        <div className="container">
          <FadeIn>
            <div className="section-header">
              <div className="section-label">Team</div>
              <h2 className="section-title">Workshop Organizers</h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="people-grid">
              {ORGANIZERS.map((person, i) => (
                <PersonCard key={i} person={person} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span>UniMAS</span> Workshop
          </div>
          <p className="footer-text">
            Co-located with COLM 2026 | October 9, 2026 | San Francisco, USA
          </p>
          <div className="footer-links">
            <a href="https://colmweb.org" target="_blank" rel="noopener noreferrer">COLM 2026</a>
            <a href="https://colmweb.org/cfw.html" target="_blank" rel="noopener noreferrer">Call for Workshops</a>
            <a href="#submission">Submit a Paper</a>
            <a href="mailto:unimas-colm2026@googlegroups.com">Contact</a>
          </div>
          <div className="footer-divider"></div>
          <p className="footer-copyright">
            &copy; 2026 UniMAS Workshop. All participants must follow the{' '}
            <a href="https://colmweb.org" target="_blank" rel="noopener noreferrer">
              COLM Code of Conduct
            </a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
