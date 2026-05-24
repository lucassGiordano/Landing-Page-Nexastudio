// ── NexaStudio · main.js ───────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  const cfg = window.CONFIG;
  if (!cfg) { console.error('config.js no cargó'); return; }

  // ── WhatsApp ───────────────────────────────────────────────────────────────
  const wsUrl = () =>
    `https://wa.me/${cfg.whatsapp.numero}?text=${encodeURIComponent(cfg.whatsapp.mensaje)}`;

  document.querySelectorAll('[data-ws]').forEach(el => { el.href = wsUrl(); });

  // ── Email ─────────────────────────────────────────────────────────────────
  document.querySelectorAll('[data-email]').forEach(el => {
    el.href = `mailto:${cfg.email}`;
    el.textContent = cfg.email;
  });

  // ── Redes (opcionales) ────────────────────────────────────────────────────
  if (cfg.redes) {
    if (cfg.redes.linkedin) document.querySelectorAll('[data-linkedin]').forEach(e => { e.href = cfg.redes.linkedin; e.style.display = ''; });
    if (cfg.redes.github)   document.querySelectorAll('[data-github]').forEach(e => { e.href = cfg.redes.github;   e.style.display = ''; });
  }

  // ── Nav scroll ────────────────────────────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ── Reveal on scroll ──────────────────────────────────────────────────────
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });

  // ── Contadores ────────────────────────────────────────────────────────────
  // Valor final visible de inmediato (nunca queda en 0)
  document.querySelectorAll('[data-contador]').forEach(num => {
    num.textContent = num.dataset.contador;
  });

  const animarContador = (el, destino, duracion = 1500) => {
    const inicio = performance.now();
    const update = (ahora) => {
      const progreso = Math.min((ahora - inicio) / duracion, 1);
      const ease = 1 - Math.pow(1 - progreso, 3);
      el.textContent = Math.round(ease * destino);
      if (progreso < 1) requestAnimationFrame(update);
      else el.textContent = destino;
    };
    requestAnimationFrame(update);
  };

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('[data-contador]').forEach(num => {
          animarContador(num, parseInt(num.dataset.contador));
        });
        statsObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.hero-stats').forEach(s => statsObserver.observe(s));

  // ── Formulario → WhatsApp ─────────────────────────────────────────────────
  const form = document.getElementById('form-contacto');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data     = new FormData(form);
      const nombre   = data.get('nombre');
      const email    = data.get('email');
      const servicio = data.get('servicio');
      const mensaje  = data.get('mensaje');
      const texto    = `Hola! Soy *${nombre}* (${email}).\n\n📋 Servicio: ${servicio}\n\n${mensaje}`;
      window.open(`https://wa.me/${cfg.whatsapp.numero}?text=${encodeURIComponent(texto)}`, '_blank');
      const btn = form.querySelector('.btn-enviar');
      const orig = btn.textContent;
      btn.textContent = '✓ Redirigiendo a WhatsApp...';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; form.reset(); }, 3000);
    });
  }

  // ── Mobile nav ────────────────────────────────────────────────────────────
  const toggle   = document.querySelector('.nav-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    let abierto = false;
    toggle.addEventListener('click', () => {
      abierto = !abierto;
      Object.assign(navLinks.style, {
        display: abierto ? 'flex' : '',
        flexDirection: 'column',
        position: 'absolute',
        top: '70px', left: '0', right: '0',
        background: 'rgba(3,18,46,0.97)',
        padding: '24px',
        backdropFilter: 'blur(16px)'
      });
      toggle.textContent = abierto ? '✕' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      abierto = false; navLinks.style.display = ''; toggle.textContent = '☰';
    }));
  }

  // ── Partículas hero ───────────────────────────────────────────────────────
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particulas;
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    const crearParticulas = () => Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: -Math.random() * 0.4 - 0.1,
      r: Math.random() * 1.5 + 0.5, op: Math.random() * 0.4 + 0.1
    }));
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      particulas.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(78,121,232,${p.op})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        if (p.x < 0 || p.x > W) p.vx *= -1;
      });
      requestAnimationFrame(loop);
    };
    resize(); particulas = crearParticulas(); loop();
    window.addEventListener('resize', () => { resize(); particulas = crearParticulas(); });
  }

});