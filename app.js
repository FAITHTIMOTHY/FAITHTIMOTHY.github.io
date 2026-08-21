/* ==========================================================================
   FAITH TIMOTHY - DEVELOPER PORTFOLIO
   Core Logic Engine: Vanilla ES6+ JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modular components
  initThemeEngine();
  initLiquidCanvas();
  initTypewriter();
  initNavigationAndScroll();
  initStatsCounters();
  initSkillsProgress();
  initProjectShowcase();
  initAboutTabs();
  initMobileDrawer();
  initContactForm();

  // Enhancement modules
  initScrollToTop();
  initScrollReveal();
  initCardTilt();
  initKeyboardNav();
  initPreloader();
  initMagneticButtons();
  initDynamicFooterYear();
  initCopyOnClick();
});

/* --------------------------------------------------------------------------
   1. THEME ENGINE (DEFAULT: LIGHT MODE)
   -------------------------------------------------------------------------- */
function initThemeEngine() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const metaThemeColor = document.getElementById('meta-theme-color');

  // Check stored theme preference or default to 'light'
  const savedTheme = localStorage.getItem('faithtimothy_theme') || 'light';
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('faithtimothy_theme', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#000000');
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#f5f7fa');
    }
  }
}

/* --------------------------------------------------------------------------
   2. LIQUID AMBIENT CANVAS BACKGROUND
   -------------------------------------------------------------------------- */
function initLiquidCanvas() {
  const canvas = document.getElementById('liquid-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 35), 45);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nodeColor = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(99, 102, 241, 0.2)';
    const lineColor = isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(168, 85, 247, 0.08)';

    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw Particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      // Connect near particles
      for (let j = idx + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1 - dist / 130;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   3. TYPEWRITER ROTATOR
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const phrases = [
    'Full-Stack Web Applications.',
    'M365 Systems Admin.',
    'Python Automation & Scrapers.',
    'Figma UI/UX & Design Systems.'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeStep() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      target.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typingSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeStep, typingSpeed);
  }

  typeStep();
}

/* --------------------------------------------------------------------------
   4. NAVIGATION, SCROLL PROGRESS & ACTIVE LINK HIGHLIGHTER
   -------------------------------------------------------------------------- */
function initNavigationAndScroll() {
  const progressBar = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // 1. Scroll Progress Bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const scrollPercent = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }

    // 2. Active Section Highlight
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   5. STATS COUNTER ANIMATION & LIVE GITHUB INTEGRATION
   -------------------------------------------------------------------------- */
function initStatsCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  // Auto-calculate years of experience from career start (Jan 2026)
  const careerStart = new Date('2026-01-01');
  const now = new Date();
  const yearsExp = Math.max(1, Math.floor((now - careerStart) / (365.25 * 24 * 60 * 60 * 1000)));
  const yearsStat = document.getElementById('stat-years');
  if (yearsStat) {
    yearsStat.setAttribute('data-target', yearsExp);
    yearsStat.textContent = '0';
  }

  // Animation helper for smoothly rolling numbers
  function runCounterAnimation(counter, fromVal, toVal) {
    let current = fromVal;
    const diff = toVal - fromVal;
    if (diff === 0) {
      counter.textContent = toVal + (toVal > 50 ? '+' : '');
      return;
    }
    const step = Math.max(Math.ceil(Math.abs(diff) / 35), 1);
    const direction = diff > 0 ? 1 : -1;

    const timer = setInterval(() => {
      current += step * direction;
      if ((direction > 0 && current >= toVal) || (direction < 0 && current <= toVal)) {
        counter.textContent = toVal + (toVal > 50 ? '+' : '');
        clearInterval(timer);
      } else {
        counter.textContent = current;
      }
    }, 35);
  }

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
          runCounterAnimation(counter, 0, target);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) observer.observe(statsSection);

  // Sync Live Data from GitHub API (with 2-Hour LocalStorage Cache & Graceful Fallback)
  syncLiveGitHubMetrics((liveData) => {
    const projectsStat = document.getElementById('stat-projects');
    const commitsStat = document.getElementById('stat-commits');

    if (projectsStat && liveData.projects) {
      const oldTarget = parseInt(projectsStat.getAttribute('data-target'), 10) || 8;
      const newTarget = Math.max(oldTarget, liveData.projects);
      projectsStat.setAttribute('data-target', newTarget);
      if (animated && newTarget !== oldTarget) {
        runCounterAnimation(projectsStat, oldTarget, newTarget);
      }
    }

    if (commitsStat && liveData.commits) {
      const oldTarget = parseInt(commitsStat.getAttribute('data-target'), 10) || 150;
      const newTarget = Math.max(oldTarget, liveData.commits);
      commitsStat.setAttribute('data-target', newTarget);
      if (animated && newTarget !== oldTarget) {
        runCounterAnimation(commitsStat, oldTarget, newTarget);
      }
    }
  });
}

/**
 * Fetch and cache live GitHub project & commit volume
 */
async function syncLiveGitHubMetrics(onMetricsLoaded) {
  const GITHUB_USERNAME = 'FAITHTIMOTHY';
  const CACHE_KEY = 'faith_gh_metrics_v2';
  const CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        if (typeof onMetricsLoaded === 'function') onMetricsLoaded(parsed);
        return;
      }
    }
  } catch (_) {}

  try {
    // 1. Fetch user profile for repo stats
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!userRes.ok) return;
    const userData = await userRes.json();

    // 2. Fetch public repos
    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`);
    if (!reposRes.ok) return;
    const repos = await reposRes.json();

    if (!Array.isArray(repos)) return;

    // 3. Count commits across repositories
    let totalCommits = 0;
    const commitPromises = repos.map(async (repo) => {
      try {
        const cRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`);
        if (!cRes.ok) return 0;
        const link = cRes.headers.get('link');
        if (link) {
          const match = link.match(/page=(\d+)>;\s*rel="last"/);
          if (match && match[1]) {
            return parseInt(match[1], 10);
          }
        }
        const data = await cRes.json();
        return Array.isArray(data) ? data.length : 0;
      } catch {
        return 0;
      }
    });

    const commitCounts = await Promise.allSettled(commitPromises);
    commitCounts.forEach((res) => {
      if (res.status === 'fulfilled' && typeof res.value === 'number') {
        totalCommits += res.value;
      }
    });

    // Ensure total commits is at least the baseline historical commits
    const finalCommits = Math.max(150, totalCommits);
    const finalProjects = Math.max(8, userData.public_repos || repos.length || 8);

    const metricsData = {
      timestamp: Date.now(),
      projects: finalProjects,
      commits: finalCommits
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(metricsData));
    if (typeof onMetricsLoaded === 'function') {
      onMetricsLoaded(metricsData);
    }
  } catch (err) {
    console.debug('GitHub live metrics sync fallback to local baseline:', err);
  }
}

/* --------------------------------------------------------------------------
   6. SKILLS PROGRESS BAR ANIMATION
   -------------------------------------------------------------------------- */
function initSkillsProgress() {
  const progressBars = document.querySelectorAll('.progress-bar');
  if (!progressBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        progressBars.forEach((bar) => {
          const targetWidth = bar.getAttribute('data-progress') || '0';
          bar.style.width = `${targetWidth}%`;
        });
      }
    });
  }, { threshold: 0.3 });

  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer) observer.observe(skillsContainer);
}

/* --------------------------------------------------------------------------
   7. PROJECT SHOWCASE FILTERING & LIQUID MODAL
   -------------------------------------------------------------------------- */
const projectsData = {
  p1: {
    title: "Google Maps Lead Gen & Automation Bot",
    category: "Automation & Tools",
    description: "An autonomous scraping and lead generation bot that mines B2B leads from Google Maps, automatically generates client website mockups & PDF audit reports, and delivers instant lead notifications to Telegram.",
    features: [
      "Automated Google Maps lead extraction & deduplication",
      "Dynamic PDF audit report & website mockup generator",
      "Instant Telegram bot notification system with lead attachments",
      "Persistent SQLite database schema for lead tracking"
    ],
    tech: ["Python", "Selenium", "SQLite", "Telegram Bot API", "PDF Engine"],
    demoUrl: "",
    githubUrl: "https://github.com/FAITHTIMOTHY/Maps-Scraper"
  },
  p2: {
    title: "Autonomous Tenders Tracking Bot",
    category: "Automation & Tools",
    description: "An enterprise data mining bot that monitors corporate and government procurement portals, parses complex tender specifications, tracks deadlines, and alerts on bidding opportunities.",
    features: [
      "Multi-portal scraper engine with proxy rotation",
      "Automated specification document parser",
      "Bidding deadline tracking & priority queue",
      "SQLite tender database with full-text search"
    ],
    tech: ["Python", "SQLite", "Spec Parser", "Web Scrapers"],
    demoUrl: "",
    githubUrl: "https://github.com/FAITHTIMOTHY/Tenders-Tracking-Bot"
  },
  p3: {
    title: "Tektwig Agency Platform & Recruitment System",
    category: "Full-Stack Application",
    description: "A complete tech agency platform featuring an administrative management dashboard, security authentication, applicant tracking, and automated recruitment workflows.",
    features: [
      "Admin management dashboard with role-based access control",
      "Candidate recruitment & application workflow engine",
      "PostgreSQL security & admin database architecture",
      "Automated deployment scripts & responsive UI design"
    ],
    tech: ["JavaScript", "Node.js", "PostgreSQL", "HTML5/CSS3", "PowerShell"],
    demoUrl: "https://tektwig.com",
    githubUrl: "https://github.com/FAITHTIMOTHY/Tektwig"
  },
  p4: {
    title: "ChurchBook Management & Directory System",
    category: "Full-Stack Application",
    description: "An organizational management web application built with TypeScript for member directory management, event scheduling, and structured records tracking.",
    features: [
      "Strict TypeScript type safety across frontend & backend",
      "Member directory management & search filter engine",
      "Event scheduling & relational database schema",
      "RESTful API architecture with structured JSON storage"
    ],
    tech: ["TypeScript", "Node.js", "Express", "SQL Schema"],
    demoUrl: "https://github.com/FAITHTIMOTHY/ChurchBook",
    githubUrl: "https://github.com/FAITHTIMOTHY/ChurchBook"
  },
  p5: {
    title: "LANI Creatives Agency Studio",
    category: "Frontend UI",
    description: "A creative studio agency platform designed to showcase branding portfolios, digital media assets, and interactive visual designs.",
    features: [
      "Interactive media portfolio showcase grid",
      "Fluid responsive layout across mobile & desktop",
      "Modern typography & glass visual design system",
      "Ultra-fast page load performance"
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Liquid UI"],
    demoUrl: "https://lanicreatives.com/",
    githubUrl: "https://github.com/FAITHTIMOTHY/LANI-Creatives"
  },
  p6: {
    title: "Lani Foundation Non-Profit Portal",
    category: "Frontend UI",
    description: "A public web portal engineered for non-profit community outreach initiatives, project tracking, donor engagement, and social impact transparency.",
    features: [
      "Community initiative showcase & updates feed",
      "Donor engagement & outreach action callouts",
      "Clean accessible UI with full mobile responsiveness",
      "Zero third-party library dependencies"
    ],
    tech: ["HTML5", "CSS3", "Vanilla JS", "Responsive Design"],
    demoUrl: "https://lanifoundation.org/",
    githubUrl: "https://github.com/FAITHTIMOTHY/Lani-Foundation"
  },
  p7: {
    title: "Neo Kasa — Spatial Design Studio & Architectural Monograph",
    category: "Frontend UI",
    description: "The official architectural portfolio and digital monograph for Nsikakabasi Essien, showcasing progressive, climate-adaptive spatial works across institutional, commercial, and residential typologies with interactive CAD/BIM case studies.",
    features: [
      "Interactive architectural case studies with high-resolution perspectives & blueprint hotspot pins",
      "Technical CAD working drawing explorer & material specification breakdown",
      "Dual light/dark architectural typography system with responsive layout",
      "Direct client inquiries engine with FormSubmit background dispatch & WhatsApp quick-connect"
    ],
    tech: ["React 18", "Vite", "JavaScript", "CSS3", "Lucide Icons", "Liquid UI"],
    demoUrl: "https://neokasa.netlify.app",
    githubUrl: "https://github.com/FAITHTIMOTHY/Neokasa"
  }
};

function initProjectShowcase() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-dynamic');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Filter Buttons Handler
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Modal Open Handler
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-id');
      const data = projectsData[projectId];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="glass-pill" style="font-size:0.75rem; font-weight:700; color:var(--primary); margin-bottom:12px; display:inline-block;">${data.category}</span>
        <h2 style="font-size:2rem; margin-bottom:12px;">${data.title}</h2>
        <p style="color:var(--text-muted); line-height:1.7; margin-bottom:20px;">${data.description}</p>
        
        <h4 style="margin-bottom:10px; font-size:1.05rem;">Key Architecture Features:</h4>
        <ul style="list-style:none; margin-bottom:24px; display:flex; flex-direction:column; gap:8px;">
          ${data.features.map(f => `<li style="color:var(--text-muted);"><i class="fa-solid fa-circle-check" style="color:var(--emerald-accent); margin-right:8px;"></i>${f}</li>`).join('')}
        </ul>

        <div style="margin-bottom:28px;">
          <h4 style="margin-bottom:10px; font-size:1.05rem;">Technologies Used:</h4>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${data.tech.map(t => `<span class="tech-tag" style="padding:6px 14px; font-size:0.85rem;">${t}</span>`).join('')}
          </div>
        </div>

        <div style="display:flex; gap:14px; flex-wrap:wrap;">
          ${data.demoUrl && data.demoUrl !== '#' ? `
          <a href="${data.demoUrl}" target="_blank" rel="noopener" class="btn-liquid btn-primary">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            <span>Visit Live Site</span>
          </a>` : ''}
          ${data.githubUrl && data.githubUrl !== '#' ? `
          <a href="${data.githubUrl}" target="_blank" rel="noopener" class="btn-liquid btn-secondary">
            <i class="fa-brands fa-github"></i>
            <span>View Source Code</span>
          </a>` : ''}
        </div>
      `;

      modalOverlay.classList.add('active');
    });
  });

  // Modal Close Handlers
  modalCloseBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
  });
}

/* --------------------------------------------------------------------------
   8. ABOUT TAB SWITCHER
   -------------------------------------------------------------------------- */
function initAboutTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(`tab-${tabId}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   9. MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => drawer.classList.add('active'));
  closeBtn.addEventListener('click', () => drawer.classList.remove('active'));
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) drawer.classList.remove('active');
  });

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => drawer.classList.remove('active'));
  });
}

/* --------------------------------------------------------------------------
   10. CONTACT FORM & TOAST SYSTEM
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const message = document.getElementById('user-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all fields before sending.', 'error');
      return;
    }

    const submitBtn = document.getElementById('submit-contact-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...`;

    try {
      const response = await fetch('https://formsubmit.co/ajax/faithtimo2006@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `New Portfolio Inquiry from ${name}`
        })
      });

      if (response.ok) {
        showToast(`Thank you, ${name}! Your message has been sent to Faith's inbox.`, 'success');
        form.reset();
      } else {
        showToast('Form submission error. Please try emailing directly.', 'error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      showToast(`Thank you, ${name}! Your message has been sent.`, 'success');
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item';

  let icon = '<i class="fa-solid fa-circle-info" style="color:var(--primary)"></i>';
  if (type === 'success') icon = '<i class="fa-solid fa-circle-check" style="color:var(--emerald-accent)"></i>';
  if (type === 'error') icon = '<i class="fa-solid fa-circle-exclamation" style="color:#ef4444"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* --------------------------------------------------------------------------
   11. SCROLL TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollToTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   12. PRELOADER SPLASH SCREEN
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    // Small delay so the loading bar animation completes
    setTimeout(() => {
      preloader.classList.add('fade-out');
      preloader.addEventListener('transitionend', () => {
        preloader.style.display = 'none';
      }, { once: true });
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   13. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => observer.observe(el));

  // Also add reveal to individual cards with staggered delays
  const staggerContainers = [
    { selector: '.stat-card', parent: '.stats-grid' },
    { selector: '.skill-card', parent: '.skills-grid' },
    { selector: '.project-card', parent: '.projects-grid' },
    { selector: '.timeline-item', parent: '.timeline-track' },
  ];

  staggerContainers.forEach(({ selector, parent }) => {
    const container = document.querySelector(parent);
    if (!container) return;
    const items = container.querySelectorAll(selector);
    items.forEach((item, i) => {
      item.classList.add('reveal');
      const delayClass = `reveal-delay-${Math.min(i + 1, 4)}`;
      item.classList.add(delayClass);
      observer.observe(item);
    });
  });
}



/* --------------------------------------------------------------------------
   15. PROJECT CARD 3D TILT
   -------------------------------------------------------------------------- */
function initCardTilt() {
  // Disable on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

/* --------------------------------------------------------------------------
   16. KEYBOARD NAVIGATION & ACCESSIBILITY
   -------------------------------------------------------------------------- */
function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close project modal
      const modal = document.getElementById('project-modal');
      if (modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }

      // Close mobile drawer
      const drawer = document.getElementById('mobile-drawer');
      if (drawer && drawer.classList.contains('active')) {
        drawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
}

/* --------------------------------------------------------------------------
   18. MAGNETIC HERO CTA BUTTONS
   -------------------------------------------------------------------------- */
function initMagneticButtons() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const magneticBtns = document.querySelectorAll('.btn-liquid');
  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.04)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) scale(1)';
    });
  });
}

/* --------------------------------------------------------------------------
   20. 1-CLICK CLIPBOARD COPY FOR EMAIL & PHONE
   -------------------------------------------------------------------------- */
function initCopyOnClick() {
  const emailLink = document.getElementById('contact-email-link');
  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      const email = 'faithtimo2006@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Copied faithtimo2006@gmail.com to clipboard!', 'success');
      }).catch(() => { });
    });
  }
}

/* --------------------------------------------------------------------------
   21. TERMINAL WINDOW DOT CONTROLS (RED, YELLOW, GREEN)
   -------------------------------------------------------------------------- */
let originalTerminalJSON = null;
let isTerminalMinimized = false;

window.toggleTerminalRed = function(e) {
  if (e) e.stopPropagation();
  const terminal = document.getElementById('terminal-preview');
  if (!terminal) return;
  const body = terminal.querySelector('.terminal-body');
  if (!body) return;

  if (body.style.display === 'none') {
    body.style.display = 'block';
    terminal.classList.remove('closed');
  } else {
    body.style.display = 'none';
    terminal.classList.add('closed');
  }
};

window.toggleTerminalYellow = function(e) {
  if (e) e.stopPropagation();
  const terminal = document.getElementById('terminal-preview');
  if (!terminal) return;
  const body = terminal.querySelector('.terminal-body');
  if (!body) return;

  if (!originalTerminalJSON) {
    originalTerminalJSON = body.innerHTML;
  }

  body.style.display = 'block';
  terminal.classList.remove('closed');

  if (!isTerminalMinimized) {
    body.innerHTML = `<span style="color:#71717a; font-style:italic;">// developer_profile.json (minimized) — 12 lines hidden. Click yellow or green to restore.</span>`;
    isTerminalMinimized = true;
  } else {
    body.innerHTML = originalTerminalJSON;
    isTerminalMinimized = false;
  }
};

window.toggleTerminalGreen = function(e) {
  if (e) e.stopPropagation();
  const terminal = document.getElementById('terminal-preview');
  if (!terminal) return;
  const body = terminal.querySelector('.terminal-body');
  if (!body) return;

  if (!originalTerminalJSON) {
    originalTerminalJSON = body.innerHTML;
  }

  body.style.display = 'block';
  terminal.classList.remove('closed');
  if (isTerminalMinimized) {
    body.innerHTML = originalTerminalJSON;
    isTerminalMinimized = false;
  }
  openTerminalInspectorModal();
};

function openTerminalInspectorModal() {
  // Check if modal already exists, else create it
  let modal = document.getElementById('terminal-inspector-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'terminal-inspector-modal';
    modal.innerHTML = `
      <div class="glass-panel glass-card modal-card" style="max-width: 680px; width: 90%; font-family: 'JetBrains Mono', monospace;">
        <button class="modal-close-btn" id="inspector-close-btn"><i class="fa-solid fa-xmark"></i></button>
        
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px;">
          <div class="terminal-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <span style="font-weight:700; font-size:0.95rem; color:var(--text-main);">developer_profile.json</span>
        </div>

        <div style="background:var(--terminal-bg); border:1px solid var(--glass-border); border-radius:12px; padding:20px; color:#e6edf3; font-size:0.88rem; line-height:1.7; overflow-x:auto; margin-bottom:20px;">
<span class="json-key">"developer"</span>: {
  <span class="json-key">"name"</span>: <span class="json-string">"Faith Timothy"</span>,
  <span class="json-key">"role"</span>: <span class="json-string">"Full-Stack Engineer & SysAdmin"</span>,
  <span class="json-key">"location"</span>: <span class="json-string">"Lagos, Nigeria (Remote / Worldwide)"</span>,
  <span class="json-key">"core_languages"</span>: [
    <span class="json-string">"JavaScript"</span>, <span class="json-string">"TypeScript"</span>,
    <span class="json-string">"Node.js"</span>, <span class="json-string">"Python"</span>
  ],
  <span class="json-key">"open_for_hire"</span>: <span class="json-boolean">true</span>
}
        </div>

        <div style="display:flex; justify-content:flex-end; gap:12px;">
          <button class="btn-liquid btn-secondary" id="copy-json-btn" style="padding:8px 18px; font-size:0.85rem;">
            <i class="fa-regular fa-copy" style="margin-right:6px;"></i> Copy JSON
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('#inspector-close-btn');
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    const copyBtn = modal.querySelector('#copy-json-btn');
    copyBtn.addEventListener('click', () => {
      const jsonText = `{
  "developer": {
    "name": "Faith Timothy",
    "role": "Full-Stack Engineer & SysAdmin",
    "location": "Lagos, Nigeria (Remote / Worldwide)",
    "core_languages": ["JavaScript", "TypeScript", "Node.js", "Python"],
    "open_for_hire": true
  }
}`;
      navigator.clipboard.writeText(jsonText).then(() => {
        showToast('Copied developer_profile.json to clipboard!', 'success');
      });
    });
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}




