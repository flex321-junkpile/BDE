/* ===== BDE Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initMembershipTabs();
  initForms();
  checkLoginState();
  renderTestimonials();
  renderDashboard();
});

/* ===== Navigation ===== */
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Highlight active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

/* ===== Scroll Animations ===== */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ===== Membership Tabs ===== */
function initMembershipTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById('panel-' + target)?.classList.add('active');
    });
  });
}

/* ===== Forms ===== */
function initForms() {
  // Sign Up Form
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(signupForm));

      if (!data.name || !data.email) {
        showMessage(signupForm, 'Please fill in all required fields.', 'error');
        return;
      }

      // Save member data locally
      const members = JSON.parse(localStorage.getItem('bde_members') || '[]');
      const existing = members.find(m => m.email === data.email);
      if (existing) {
        showMessage(signupForm, 'An account with this email already exists.', 'error');
        return;
      }

      data.joinedDate = new Date().toLocaleDateString();
      data.status = 'Active';
      members.push(data);
      localStorage.setItem('bde_members', JSON.stringify(members));

      // Submit to Netlify — exclude password from the server-side log
      try {
        const { password, 'bot-field': _bot, ...safeData } = data;
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ 'form-name': 'bde-membership-signup', ...safeData }).toString()
        });
      } catch (_) { /* non-blocking — local save already succeeded */ }

      showMessage(signupForm, 'Welcome to BDE! You can now log in with your email.', 'success');
      signupForm.reset();
    });
  }

  // Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(loginForm));
      const members = JSON.parse(localStorage.getItem('bde_members') || '[]');
      const member = members.find(m => m.email === data.loginEmail);

      if (!member) {
        showMessage(loginForm, 'No account found with this email. Please sign up first.', 'error');
        return;
      }

      // Check password
      if (member.password && member.password !== data.loginPassword) {
        showMessage(loginForm, 'Incorrect password.', 'error');
        return;
      }

      localStorage.setItem('bde_current_user', JSON.stringify(member));
      showMessage(loginForm, 'Login successful! Redirecting to dashboard...', 'success');

      setTimeout(() => {
        // Switch to dashboard tab
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.querySelector('[data-tab="dashboard"]')?.classList.add('active');
        document.getElementById('panel-dashboard')?.classList.add('active');
        renderDashboard();
      }, 800);
    });
  }

  // RSVP Form
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(rsvpForm));

      if (!data.rsvpName || !data.rsvpEmail || !data.rsvpEvent) {
        showMessage(rsvpForm, 'Please fill in all fields.', 'error');
        return;
      }

      const rsvps = JSON.parse(localStorage.getItem('bde_rsvps') || '[]');
      rsvps.push({
        name: data.rsvpName,
        email: data.rsvpEmail,
        event: data.rsvpEvent,
        date: new Date().toLocaleDateString()
      });
      localStorage.setItem('bde_rsvps', JSON.stringify(rsvps));

      // Submit to Netlify so you receive email notifications and a server-side log
      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ 'form-name': 'bde-rsvp', ...data }).toString()
        });
      } catch (_) { /* non-blocking — local save already succeeded */ }

      showMessage(rsvpForm, 'RSVP confirmed! We look forward to seeing you.', 'success');
      rsvpForm.reset();
      renderDashboard();
    });
  }

  // Testimonial Form - with polish & preview flow
  const testimonialForm = document.getElementById('testimonial-form');
  if (testimonialForm) {
    testimonialForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(testimonialForm));

      if (!data.testName || !data.testQuote) {
        showMessage(testimonialForm, 'Please provide your name and testimony.', 'error');
        return;
      }

      // Show loading state on button
      const submitBtn = testimonialForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Polishing your words...';
      submitBtn.disabled = true;

      try {
        // Polish the testimony
        const polished = await polishTestimony(data.testQuote);

        // Show preview modal for approval
        showPolishPreview({
          original: data.testQuote,
          polished: polished,
          name: data.testName,
          role: data.testRole || 'Member'
        });
      } catch (err) {
        // If polishing fails, fall back to basic cleanup only
        const basicPolished = basicTextPolish(data.testQuote);
        showPolishPreview({
          original: data.testQuote,
          polished: basicPolished,
          name: data.testName,
          role: data.testRole || 'Member'
        });
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
}

function showMessage(form, text, type) {
  let msgEl = form.querySelector('.form-message');
  if (!msgEl) {
    msgEl = document.createElement('div');
    msgEl.className = 'form-message';
    form.appendChild(msgEl);
  }
  msgEl.textContent = text;
  msgEl.className = `form-message ${type}`;

  setTimeout(() => {
    msgEl.style.display = 'none';
  }, 5000);
}

/* ===== Check Login State ===== */
function checkLoginState() {
  const user = JSON.parse(localStorage.getItem('bde_current_user') || 'null');
  if (user && document.getElementById('panel-dashboard')) {
    // Auto-show dashboard if logged in
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector('[data-tab="dashboard"]')?.classList.add('active');
    document.getElementById('panel-dashboard')?.classList.add('active');
  }
}

/* ===== Render Dashboard ===== */
function renderDashboard() {
  const container = document.getElementById('dashboard-content');
  if (!container) return;

  const user = JSON.parse(localStorage.getItem('bde_current_user') || 'null');
  if (!user) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-light);">Please log in to view your dashboard.</p>';
    return;
  }

  const rsvps = JSON.parse(localStorage.getItem('bde_rsvps') || '[]')
    .filter(r => r.email === user.email);

  container.innerHTML = `
    <div class="dashboard">
      <div class="dashboard-header">
        <h3>Welcome, ${escapeHtml(user.name)}</h3>
        <p style="color:var(--text-light);">Member since ${user.joinedDate || 'N/A'}</p>
      </div>

      <div class="dashboard-card">
        <h4>Membership Status</h4>
        <span class="status-badge">${user.status || 'Active'}</span>
        <p style="margin-top:8px;">Email: ${escapeHtml(user.email)}</p>
        ${user.phone ? `<p>Phone: ${escapeHtml(user.phone)}</p>` : ''}
      </div>

      <div class="dashboard-card">
        <h4>Your RSVPs</h4>
        ${rsvps.length ? `
          <div class="rsvp-list">
            ${rsvps.map(r => `
              <div class="rsvp-item">
                <span class="event-name">${escapeHtml(r.event)}</span>
                <span class="rsvp-status">Confirmed</span>
              </div>
            `).join('')}
          </div>
        ` : '<p>No RSVPs yet. Visit the RSVP tab to register for upcoming events.</p>'}
      </div>

      <div style="text-align:center;margin-top:24px;">
        <button class="logout-btn" onclick="logout()">Log Out</button>
      </div>
    </div>
  `;
}

function logout() {
  localStorage.removeItem('bde_current_user');
  // Switch to login tab
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector('[data-tab="login"]')?.classList.add('active');
  document.getElementById('panel-login')?.classList.add('active');
  renderDashboard();
}

/* ===== Render Testimonials ===== */
function renderTestimonials() {
  const container = document.getElementById('user-testimonials');
  if (!container) return;

  const testimonials = JSON.parse(localStorage.getItem('bde_testimonials') || '[]');

  if (!testimonials.length) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <h3 style="text-align:center;font-size:1.6rem;margin-bottom:32px;">Community Testimonies</h3>
    <div class="testimonial-grid">
      ${testimonials.map(t => `
        <div class="testimonial-card fade-in visible">
          <span class="quote-mark">&ldquo;</span>
          <blockquote>${escapeHtml(t.quote)}</blockquote>
          <div class="testimonial-author">
            <div class="avatar">${getInitials(t.name)}</div>
            <div>
              <div class="name">${escapeHtml(t.name)}</div>
              <div class="title">${escapeHtml(t.role)}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ===== Helpers ===== */
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ===== Testimony Polishing System ===== */

/**
 * Basic text cleanup - capitalization, punctuation, spacing.
 * Runs instantly with no API call.
 */
function basicTextPolish(text) {
  let polished = text.trim();

  // Collapse multiple spaces / newlines into single spaces
  polished = polished.replace(/\s+/g, ' ');

  // Capitalize first letter of the entire text
  polished = polished.charAt(0).toUpperCase() + polished.slice(1);

  // Capitalize first letter after sentence-ending punctuation
  polished = polished.replace(/([.!?])\s+([a-z])/g, (_, punct, letter) => {
    return punct + ' ' + letter.toUpperCase();
  });

  // Capitalize "I" when standalone
  polished = polished.replace(/\bi\b/g, 'I');

  // Fix "i'm" -> "I'm", "i've" -> "I've", "i'll" -> "I'll", "i'd" -> "I'd"
  polished = polished.replace(/\bI'([a-z])/g, (_, l) => "I'" + l);

  // Capitalize "BDE" always
  polished = polished.replace(/\bbde\b/gi, 'BDE');

  // Ensure the text ends with proper punctuation
  if (!/[.!?]$/.test(polished)) {
    polished += '.';
  }

  // Fix double punctuation
  polished = polished.replace(/([.!?]){2,}/g, '$1');

  // Fix space before punctuation
  polished = polished.replace(/\s+([.!?,;:])/g, '$1');

  // Smart quotes - opening
  polished = polished.replace(/(^|[\s(])"([^"])/g, '$1\u201C$2');
  // Smart quotes - closing
  polished = polished.replace(/([^"])"/g, '$1\u201D');

  // Em dashes
  polished = polished.replace(/\s*--\s*/g, '\u2014');
  polished = polished.replace(/\s*-\s+/g, '\u2014');

  return polished;
}

/**
 * Full polish using LanguageTool API (free, no key required).
 * Corrects grammar, spelling, and style while keeping voice authentic.
 */
async function polishTestimony(text) {
  // Step 1: Basic cleanup first
  let polished = basicTextPolish(text);

  // Step 2: Send to LanguageTool for grammar/spelling corrections
  try {
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        text: polished,
        language: 'en-US',
        disabledRules: 'WHITESPACE_RULE,EN_QUOTES',
        level: 'picky'
      })
    });

    if (!response.ok) throw new Error('API request failed');

    const result = await response.json();

    // Apply corrections in reverse order so offsets stay valid
    const matches = result.matches || [];
    const sortedMatches = matches
      .filter(m => m.replacements && m.replacements.length > 0)
      .sort((a, b) => b.offset - a.offset);

    for (const match of sortedMatches) {
      const replacement = match.replacements[0].value;
      const start = match.offset;
      const end = start + match.length;
      polished = polished.slice(0, start) + replacement + polished.slice(end);
    }
  } catch (err) {
    // If the API fails, we still return the basic-polished version
    console.warn('LanguageTool API unavailable, using basic polish only:', err.message);
  }

  return polished;
}

/**
 * Show the polish preview modal so the user can approve or edit.
 */
function showPolishPreview({ original, polished, name, role }) {
  // Remove existing modal if present
  const existing = document.getElementById('polish-modal');
  if (existing) existing.remove();

  const hasChanges = original.trim() !== polished.trim();

  const modal = document.createElement('div');
  modal.id = 'polish-modal';
  modal.className = 'polish-modal-overlay';
  modal.innerHTML = `
    <div class="polish-modal">
      <div class="polish-modal-header">
        <h3>Review Your Testimony</h3>
        <p class="polish-modal-subtitle">We've polished your words for grammar and flow. Your voice stays yours${hasChanges ? '\u2014we just cleaned it up.' : '.'}</p>
      </div>

      ${hasChanges ? `
        <div class="polish-compare">
          <div class="polish-compare-col">
            <span class="polish-label">Your Original</span>
            <div class="polish-text polish-text--original">${escapeHtml(original)}</div>
          </div>
          <div class="polish-compare-col">
            <span class="polish-label polish-label--gold">Polished Version</span>
            <div class="polish-text polish-text--polished">${escapeHtml(polished)}</div>
          </div>
        </div>
      ` : `
        <div class="polish-compare">
          <div class="polish-compare-col" style="grid-column:1/-1;">
            <span class="polish-label polish-label--gold">Your Testimony</span>
            <div class="polish-text polish-text--polished">${escapeHtml(polished)}</div>
          </div>
        </div>
      `}

      <div class="polish-edit-section" style="display:none;">
        <span class="polish-label">Edit Your Testimony</span>
        <textarea class="polish-edit-textarea">${polished}</textarea>
      </div>

      <div class="polish-modal-actions">
        <button class="btn btn--gold polish-btn-approve" style="flex:1;">Approve &amp; Publish</button>
        <button class="btn btn--outline polish-btn-edit" style="flex:1;color:var(--navy);border-color:var(--navy);">Edit Myself</button>
        ${hasChanges ? '<button class="btn btn--outline polish-btn-original" style="flex:1;color:var(--navy);border-color:var(--navy);">Use My Original</button>' : ''}
        <button class="btn btn--outline polish-btn-cancel" style="flex:0.5;color:var(--text-muted);border-color:rgba(0,0,0,0.15);">Cancel</button>
      </div>

      <p class="polish-credit">Polished with grammar correction to match the quality of BDE.</p>
    </div>
  `;

  document.body.appendChild(modal);

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  // Wire up buttons
  const approveBtn = modal.querySelector('.polish-btn-approve');
  const editBtn = modal.querySelector('.polish-btn-edit');
  const originalBtn = modal.querySelector('.polish-btn-original');
  const cancelBtn = modal.querySelector('.polish-btn-cancel');
  const editSection = modal.querySelector('.polish-edit-section');
  const editTextarea = modal.querySelector('.polish-edit-textarea');
  const compareSection = modal.querySelector('.polish-compare');

  // Approve the polished version
  approveBtn.addEventListener('click', () => {
    // Check if we're in edit mode
    const finalText = editSection.style.display !== 'none'
      ? editTextarea.value
      : polished;
    saveTestimony(name, role, finalText);
    closePolishModal(modal);
  });

  // Edit manually
  editBtn.addEventListener('click', () => {
    if (editSection.style.display === 'none') {
      editSection.style.display = 'block';
      compareSection.style.display = 'none';
      editTextarea.focus();
      editBtn.textContent = 'Back to Preview';
    } else {
      // Update polished text from textarea and go back
      polished = editTextarea.value;
      const polishedEl = modal.querySelector('.polish-text--polished');
      if (polishedEl) polishedEl.textContent = polished;
      editSection.style.display = 'none';
      compareSection.style.display = '';
      editBtn.textContent = 'Edit Myself';
    }
  });

  // Use original (unpolished)
  if (originalBtn) {
    originalBtn.addEventListener('click', () => {
      saveTestimony(name, role, original);
      closePolishModal(modal);
    });
  }

  // Cancel
  cancelBtn.addEventListener('click', () => {
    closePolishModal(modal);
  });

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePolishModal(modal);
  });
}

function closePolishModal(modal) {
  document.body.style.overflow = '';
  modal.classList.add('closing');
  setTimeout(() => modal.remove(), 300);
}

function saveTestimony(name, role, quote) {
  const testimonials = JSON.parse(localStorage.getItem('bde_testimonials') || '[]');
  testimonials.push({
    name: name,
    role: role,
    quote: quote,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('bde_testimonials', JSON.stringify(testimonials));

  const form = document.getElementById('testimonial-form');
  if (form) {
    showMessage(form, 'Your testimony is live. Thank you for sharing your story, brother.', 'success');
    form.reset();
  }
  renderTestimonials();
}

/* ===== Events Data ===== */
const upcomingEvents = [
  {
    month: 'APR',
    day: '25',
    year: '2026',
    title: 'Brotherhood Workout & Hike',
    time: '8:00 AM',
    location: 'Great Falls Park, Virginia',
    description: 'Lace up and show up. We\'re taking it outdoors — a brotherhood workout and hike through the trails at Great Falls. Come ready to push yourself and lock in with your brothers in nature.',
    flyer: 'flyer-higher-ground.html'
  }
];

const pastEvents = [
  {
    title: 'Fellowship Round Table',
    date: 'January 10, 2026',
    tag: 'Fellowship',
    description: 'Brothers came together for an open, no-filter round table — fellowshipping, collaborating on ideas, and sharpening each other through real conversation. Business, growth, relationships, and everything in between.',
    icon: '&#129309;'
  },
  {
    title: 'Community Sock Drive',
    date: 'November 23, 2025',
    tag: 'Community',
    description: 'Brothers hit the streets of Washington, D.C. and passed out over 300 socks to homeless and unhoused community members. Showing up where it matters most.',
    icon: '&#129510;'
  },
  {
    title: "Summer Men's Fellowship Hike",
    date: 'July 19, 2025',
    tag: 'Fellowship',
    description: "Brothers came together for a summer men's fellowship hike at Scott's Run. Fresh air, brotherhood, and real connection on the trail.",
    icon: '&#129406;'
  },
  {
    title: "Men's Fellowship Poker Night",
    date: 'April 27, 2025',
    tag: 'Fellowship',
    description: 'Brothers gathered for a night of cards, conversation, and brotherhood. A relaxed evening of fellowship and good energy around the table.',
    icon: '&#127183;'
  }
];
