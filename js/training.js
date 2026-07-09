// BDE Community Service Training — Quiz Engine + Certificate Generator
// Depends on:
//   js/training-bank.js   (BDE_TRAINING_QUESTIONS)
//   js/training-hints.js  (BDE_TRAINING_HINTS — parallel array, same order)
//   jsPDF v2 (CDN)
//
// Flow per question:
//   pick choice -> Check Answer
//     correct      -> show explanation (green)   -> Continue
//     wrong (1st)  -> show hint (yellow)         -> Try Again
//     wrong (2nd)  -> show correct + explanation -> Continue
//
// Scoring: question is marked correct only if first attempt was correct.
// Pass threshold: 80%.
// Progress saved to localStorage after every Continue/Try-Again, restored on load.

(function () {
  'use strict';

  const PASS_PERCENT = 80;
  const TOTAL = BDE_TRAINING_QUESTIONS.length;
  const STORAGE_KEY = (typeof window !== 'undefined' && window.BDE_TRAINING_STORAGE_KEY)
    ? window.BDE_TRAINING_STORAGE_KEY
    : 'bde_training_progress_v1';
  const TRAINING_TITLE = (typeof window !== 'undefined' && window.BDE_TRAINING_TITLE)
    ? window.BDE_TRAINING_TITLE
    : 'Community Service Training';

  const state = {
    name: '',
    email: '',
    questions: [],
    index: 0,
    answers: [],
    firstRight: [],
    attempts: 0
  };

  // ---------- Helpers ----------
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function $(id) { return document.getElementById(id); }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ---------- Persistence ----------
  function saveProgress() {
    try {
      const payload = {
        name: state.name,
        email: state.email,
        index: state.index,
        answers: state.answers,
        firstRight: state.firstRight,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      flashSaveStatus();
    } catch (e) { /* localStorage may be disabled */ }
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const p = JSON.parse(raw);
      if (!p || !p.name || typeof p.index !== 'number') return null;
      if (!Array.isArray(p.answers) || p.answers.length !== TOTAL) return null;
      return p;
    } catch (e) { return null; }
  }

  function clearProgress() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  function flashSaveStatus() {
    const el = $('save-status');
    if (!el) return;
    el.textContent = 'Progress saved ✓';
    el.style.opacity = '1';
    clearTimeout(flashSaveStatus._t);
    flashSaveStatus._t = setTimeout(() => { el.style.opacity = '0.55'; }, 1500);
  }

  // ---------- Screens ----------
  function showIntro() {
    const intro = $('screen-intro');
    if (intro) intro.hidden = false;
    $('screen-start').hidden = true;
    $('screen-quiz').hidden = true;
    $('screen-result').hidden = true;
  }
  function showStart(saved) {
    const intro = $('screen-intro');
    if (intro) intro.hidden = true;
    $('screen-start').hidden = false;
    $('screen-quiz').hidden = true;
    $('screen-result').hidden = true;

    const banner = $('resume-banner');
    if (saved && countAnswered(saved.answers) > 0 && saved.index < TOTAL) {
      const answered = countAnswered(saved.answers);
      $('resume-name').textContent = saved.name;
      $('resume-progress').textContent = `Question ${saved.index + 1} of ${TOTAL} · ${answered} answered`;
      banner.hidden = false;
      // Prefill the form so they don't have to retype
      $('start-name').value = saved.name || '';
      $('start-email').value = saved.email || '';
    } else {
      banner.hidden = true;
    }
  }
  function showQuiz() {
    $('screen-start').hidden = true;
    $('screen-quiz').hidden = false;
    $('screen-result').hidden = true;
    renderQuestion();
  }
  function showResult(result) {
    $('screen-start').hidden = true;
    $('screen-quiz').hidden = true;
    $('screen-result').hidden = false;
    renderResult(result);
  }

  function countAnswered(arr) {
    return arr.filter(a => a !== null && a !== undefined).length;
  }

  // ---------- Setup ----------
  function buildQuestions() {
    return BDE_TRAINING_QUESTIONS.map((item, idx) => {
      const correct = item.choices[0];
      const display = shuffle(item.choices);
      const meta = BDE_TRAINING_HINTS[idx] || { hint: '', explanation: '' };
      return {
        n: idx + 1,
        topic: item.topic,
        q: item.q,
        choices: display,
        correct: correct,
        hint: meta.hint,
        explanation: meta.explanation
      };
    });
  }

  // ---------- Question Rendering ----------
  function renderQuestion() {
    const q = state.questions[state.index];
    const pct = Math.round(((state.index) / TOTAL) * 100);

    $('q-progress-text').textContent = `Question ${state.index + 1} of ${TOTAL}`;
    $('q-progress-bar').style.width = pct + '%';
    $('q-topic').textContent = q.topic;
    $('q-text').textContent = q.q;

    $('q-feedback').hidden = true;
    $('q-feedback').className = 'quiz-feedback';
    $('q-feedback').innerHTML = '';

    state.attempts = 0;

    renderChoices(q, /*disabled*/ false, /*selected*/ null);

    $('q-prev').disabled = state.index === 0;
    $('q-check').hidden = false;
    $('q-check').textContent = 'Check Answer';
    $('q-check').disabled = true;
    $('q-next').hidden = true;
    $('q-next').textContent = state.index === TOTAL - 1 ? 'Submit Training' : 'Continue';

    $('btn-save-exit').hidden = false;
  }

  function renderChoices(q, disabled, selected) {
    const choicesEl = $('q-choices');
    choicesEl.innerHTML = '';
    q.choices.forEach((choice, i) => {
      const id = `choice-${state.index}-${i}-${state.attempts}`;
      const wrap = document.createElement('label');
      wrap.className = 'quiz-choice';
      if (disabled) wrap.classList.add('locked');
      wrap.htmlFor = id;
      wrap.innerHTML = `
        <input type="radio" name="q-${state.index}-${state.attempts}" id="${id}" value="${escapeHtml(choice)}" ${selected === choice ? 'checked' : ''} ${disabled ? 'disabled' : ''}>
        <span class="choice-text">${escapeHtml(choice)}</span>
      `;
      wrap.querySelector('input').addEventListener('change', () => {
        $('q-check').disabled = false;
      });
      choicesEl.appendChild(wrap);
    });
  }

  function getSelectedChoice() {
    const checked = document.querySelector(`input[name="q-${state.index}-${state.attempts}"]:checked`);
    return checked ? checked.value : null;
  }

  // ---------- Check / Continue ----------
  function onCheck() {
    const q = state.questions[state.index];
    const picked = getSelectedChoice();
    if (!picked) return;

    state.attempts++;
    const isRight = picked === q.correct;

    if (state.attempts === 1) {
      state.answers[state.index] = picked;
      state.firstRight[state.index] = isRight;
      saveProgress();
    }

    if (isRight) {
      renderChoices(q, true, picked);
      showFeedback('correct', q, picked);
      $('q-check').hidden = true;
      $('q-next').hidden = false;
    } else if (state.attempts === 1) {
      showFeedback('hint', q, picked);
      $('q-check').textContent = 'Try Again';
      $('q-check').disabled = true;
      renderChoices(q, false, null);
    } else {
      renderChoices(q, true, picked);
      showFeedback('reveal', q, picked);
      $('q-check').hidden = true;
      $('q-next').hidden = false;
    }
  }

  function showFeedback(kind, q, picked) {
    const el = $('q-feedback');
    el.hidden = false;
    el.className = 'quiz-feedback';

    if (kind === 'correct') {
      el.classList.add('feedback-correct');
      el.innerHTML = `
        <div class="feedback-label">✓ Correct</div>
        <p class="feedback-text">${escapeHtml(q.explanation)}</p>
      `;
    } else if (kind === 'hint') {
      el.classList.add('feedback-hint');
      el.innerHTML = `
        <div class="feedback-label">Not quite — here's a hint</div>
        <p class="feedback-text">${escapeHtml(q.hint)}</p>
        <p class="feedback-sub">Pick again and check your answer.</p>
      `;
    } else if (kind === 'reveal') {
      el.classList.add('feedback-reveal');
      el.innerHTML = `
        <div class="feedback-label">The correct answer is:</div>
        <p class="feedback-text"><strong>${escapeHtml(q.correct)}</strong></p>
        <p class="feedback-explain">${escapeHtml(q.explanation)}</p>
      `;
    }
  }

  function onContinue() {
    if (state.index < TOTAL - 1) {
      state.index++;
      saveProgress();
      renderQuestion();
    } else {
      const result = grade();
      clearProgress();
      showResult(result);
    }
  }

  function onPrev() {
    if (state.index > 0) {
      state.index--;
      saveProgress();
      renderQuestion();
    }
  }

  function onSaveAndExit() {
    saveProgress();
    alert('Your progress has been saved. You can close this tab and come back anytime — your spot will be waiting for you on this same device/browser.');
  }

  // ---------- Grading ----------
  function grade() {
    let correct = 0;
    const review = [];
    state.questions.forEach((q, i) => {
      const wasRight = !!state.firstRight[i];
      if (wasRight) correct++;
      review.push({
        n: q.n,
        topic: q.topic,
        q: q.q,
        given: state.answers[i] || '(skipped)',
        correct: q.correct,
        explanation: q.explanation,
        ok: wasRight
      });
    });
    const pct = Math.round((correct / TOTAL) * 100);
    return { correct, total: TOTAL, pct, passed: pct >= PASS_PERCENT, review };
  }

  // ---------- Result Rendering ----------
  function renderResult(r) {
    $('result-pass').hidden = !r.passed;
    $('result-fail').hidden = r.passed;
    $('result-score').textContent = `${r.correct} / ${r.total}`;
    $('result-pct').textContent = r.pct + '%';

    const byTopic = {};
    r.review.forEach(item => {
      if (!byTopic[item.topic]) byTopic[item.topic] = { right: 0, total: 0 };
      byTopic[item.topic].total++;
      if (item.ok) byTopic[item.topic].right++;
    });
    const breakdown = $('result-breakdown');
    breakdown.innerHTML = '';
    Object.keys(byTopic).forEach(t => {
      const b = byTopic[t];
      const row = document.createElement('div');
      row.className = 'topic-row';
      row.innerHTML = `<span class="topic-name">${escapeHtml(t)}</span><span class="topic-score">${b.right} / ${b.total}</span>`;
      breakdown.appendChild(row);
    });

    const wrong = r.review.filter(x => !x.ok);
    const wrongList = $('result-wrong');
    wrongList.innerHTML = '';
    if (wrong.length === 0) {
      wrongList.innerHTML = '<p>You got every question right on the first try. Outstanding.</p>';
    } else {
      wrong.forEach(item => {
        const card = document.createElement('div');
        card.className = 'wrong-card';
        card.innerHTML = `
          <div class="wrong-q"><strong>Q${item.n}.</strong> ${escapeHtml(item.q)}</div>
          <div class="wrong-given">Your first answer: <span>${escapeHtml(item.given)}</span></div>
          <div class="wrong-correct">Correct: <span>${escapeHtml(item.correct)}</span></div>
          <div class="wrong-explain">${escapeHtml(item.explanation || '')}</div>
        `;
        wrongList.appendChild(card);
      });
    }

    if (r.passed) {
      $('btn-download-cert').onclick = () => generateCertificate(state.name, r.pct);
      notifyCompletion(state.name, state.email, r);
      // Auto-download the certificate after a brief pause so the user sees the success message first.
      setTimeout(() => {
        try { generateCertificate(state.name, r.pct); } catch (e) { /* user can still click the button */ }
      }, 1200);
    }
  }

  // ---------- Certificate (jsPDF) ----------
  function generateCertificate(name, pct) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'letter' });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const NAVY = '#2b2d2f';
    const GOLD = '#C9A84C';
    const GOLD_L = '#E8C87A';

    doc.setFillColor(NAVY);
    doc.rect(0, 0, W, H, 'F');

    doc.setDrawColor(GOLD);
    doc.setLineWidth(4);
    doc.rect(24, 24, W - 48, H - 48);
    doc.setLineWidth(1);
    doc.rect(36, 36, W - 72, H - 72);

    doc.setTextColor(GOLD);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(34);
    doc.text('BROTHERS DEDICATED TO EXCELLENCE', W / 2, 120, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(GOLD_L);
    const liveTitle = (typeof window !== 'undefined' && window.BDE_TRAINING_TITLE) || TRAINING_TITLE;
    doc.text(liveTitle, W / 2, 148, { align: 'center' });

    doc.setDrawColor(GOLD);
    doc.setLineWidth(2);
    doc.line(W / 2 - 80, 165, W / 2 + 80, 165);

    doc.setFontSize(22);
    doc.setTextColor('#ffffff');
    doc.setFont('helvetica', 'normal');
    doc.text('Certificate of Completion', W / 2, 215, { align: 'center' });

    doc.setFontSize(14);
    doc.text('This certifies that', W / 2, 260, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(34);
    doc.setTextColor(GOLD);
    doc.text(name, W / 2, 310, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    doc.setTextColor('#ffffff');
    const certBody = (typeof window !== 'undefined' && window.BDE_TRAINING_CERT_BODY)
      ? window.BDE_TRAINING_CERT_BODY
      : ['has successfully completed the BDE Community Service Training,',
         'covering Anger Management, Police Interaction, Public Engagement,',
         'Constitutional Rights, and Mental Health.'];
    certBody.forEach((line, i) => {
      doc.text(line, W / 2, 350 + (i * 20), { align: 'center' });
    });

    // Community service hours line — configurable per training (default 5)
    const trainingHours = (typeof window !== 'undefined' && window.BDE_TRAINING_HOURS)
      ? window.BDE_TRAINING_HOURS
      : 5;
    doc.setFontSize(13);
    doc.setTextColor(GOLD_L);
    doc.setFont('helvetica', 'bold');
    doc.text(
      `This training represents ${trainingHours} hours of community service completed.`,
      W / 2, 430, { align: 'center' }
    );
    doc.setFont('helvetica', 'normal');

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const certId = 'BDE-' + today.getFullYear() + (today.getMonth() + 1).toString().padStart(2, '0') + today.getDate().toString().padStart(2, '0') + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();

    doc.setFontSize(11);
    doc.setTextColor('#ffffff');
    doc.text(`Awarded ${dateStr}`, W / 2, H - 110, { align: 'center' });

    doc.setDrawColor(GOLD);
    doc.setLineWidth(1);
    doc.line(W / 2 - 120, H - 80, W / 2 + 120, H - 80);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Tarnell Sands, Founder & President', W / 2, H - 65, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(GOLD_L);
    doc.text('Brothers Dedicated To Excellence  ·  501(c)(3) Nonprofit  ·  EIN 33-4838953', W / 2, H - 50, { align: 'center' });
    doc.text(`Certificate ID: ${certId}  ·  bdexcellence.org`, W / 2, H - 36, { align: 'center' });

    const safeName = name.replace(/[^a-zA-Z0-9]/g, '_');
    doc.save(`BDE_Training_Certificate_${safeName}.pdf`);
  }

  // Expose for preview page
  window.BDE_generateCertificate = generateCertificate;

  // ---------- Netlify completion notification ----------
  function notifyCompletion(name, email, r) {
    if (location.protocol === 'file:') return;
    const data = new FormData();
    data.append('form-name', 'bde-training-completion');
    data.append('name', name);
    data.append('email', email);
    data.append('score', r.correct + '/' + r.total);
    data.append('percent', r.pct + '%');
    data.append('passed', r.passed ? 'Yes' : 'No');
    data.append('completed_at', new Date().toISOString());
    fetch('/', { method: 'POST', body: data }).catch(() => {});
  }

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    // Only initialize quiz UI on the training page (skip on cert-preview etc.)
    if (!document.getElementById('screen-start')) return;

    const saved = loadProgress();
    // If they have saved progress, skip the intro and go straight to enrollment with the resume banner.
    // Otherwise, show the intro/overview first.
    if (saved && countAnswered(saved.answers) > 0) {
      showStart(saved);
    } else {
      showIntro();
    }

    // Intro → Enrollment
    const btnIntroContinue = $('btn-intro-continue');
    if (btnIntroContinue) {
      btnIntroContinue.addEventListener('click', e => {
        e.preventDefault();
        showStart(null);
      });
    }

    // Back to overview from enrollment
    const linkBack = $('link-back-to-intro');
    if (linkBack) {
      linkBack.addEventListener('click', e => {
        e.preventDefault();
        showIntro();
      });
    }

    // Start (fresh)
    $('btn-start').addEventListener('click', e => {
      e.preventDefault();
      const name = $('start-name').value.trim();
      const email = $('start-email').value.trim();
      if (!name) { $('start-name').focus(); return; }
      if (!email) { $('start-email').focus(); return; }
      clearProgress();
      state.name = name;
      state.email = email;
      state.questions = buildQuestions();
      state.answers = new Array(TOTAL).fill(null);
      state.firstRight = new Array(TOTAL).fill(false);
      state.index = 0;
      state.attempts = 0;
      saveProgress();
      showQuiz();
    });

    // Resume
    const btnResume = $('btn-resume');
    if (btnResume) {
      btnResume.addEventListener('click', e => {
        e.preventDefault();
        const s = loadProgress();
        if (!s) { showStart(null); return; }
        state.name = s.name;
        state.email = s.email;
        state.questions = buildQuestions();
        state.answers = s.answers.slice();
        state.firstRight = (s.firstRight || []).slice();
        while (state.firstRight.length < TOTAL) state.firstRight.push(false);
        state.index = Math.max(0, Math.min(TOTAL - 1, s.index || 0));
        state.attempts = 0;
        showQuiz();
      });
    }

    // Start over (discard saved)
    const btnDiscard = $('btn-discard-saved');
    if (btnDiscard) {
      btnDiscard.addEventListener('click', e => {
        e.preventDefault();
        if (confirm('Start over from question 1? Your saved progress will be cleared.')) {
          clearProgress();
          showStart(null);
        }
      });
    }

    $('q-prev').addEventListener('click', onPrev);
    $('q-check').addEventListener('click', onCheck);
    $('q-next').addEventListener('click', onContinue);
    $('btn-save-exit').addEventListener('click', onSaveAndExit);

    $('btn-retry').addEventListener('click', () => {
      clearProgress();
      state.questions = buildQuestions();
      state.answers = new Array(TOTAL).fill(null);
      state.firstRight = new Array(TOTAL).fill(false);
      state.index = 0;
      state.attempts = 0;
      saveProgress();
      showQuiz();
    });
  });

})();
