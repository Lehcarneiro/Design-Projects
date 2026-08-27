/**
 * Portfólio Letícia Carneiro - Furta-Cor Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Modal Elements
  const modal = document.getElementById('contactModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const chatLauncher = document.getElementById('chatLauncher');
  const btnMail = document.getElementById('btnMail');
  const btnGlobe = document.getElementById('btnGlobe');
  const btnLightning = document.getElementById('btnLightning');
  const btnStar = document.getElementById('btnStar');

  // Open Modal Helper
  function openModal(title, desc) {
    if (modal) {
      if (title) {
        const titleEl = modal.querySelector('.modal-title');
        if (titleEl) titleEl.textContent = title;
      }
      if (desc) {
        const descEl = modal.querySelector('.modal-desc');
        if (descEl) descEl.textContent = desc;
      }
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  // Close Modal Helper
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // Event Listeners for Modal
  if (chatLauncher) {
    chatLauncher.addEventListener('click', () => {
      openModal('Vamos Conversar! 💬', 'Estou disponível para novos projetos, freelas e parcerias em Design, Games e Web.');
    });
  }

  if (btnMail) {
    btnMail.addEventListener('click', () => {
      openModal('Entre em Contato ✉️', 'Envie uma mensagem direta para trocar ideias sobre desenvolvimento e design.');
    });
  }

  if (btnGlobe) {
    btnGlobe.addEventListener('click', () => {
      openModal('Conexões & Redes 🌐', 'Acompanhe meus trabalhos, repositórios e artigos nas redes sociais.');
    });
  }

  // Navigation Bar Contact Button
  const navContactBtns = document.querySelectorAll('#navBtnContact, .nav-btn-contact');
  navContactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('Vamos Conversar! ✨', 'Entre em contato para oportunidades de estágio e projetos em Design, Games, Web e Mobile.');
    });
  });

  // Magic Star Sparkles Particle System
  const magicStarBtns = document.querySelectorAll('#magicStarBtn, .btn-magic-star, #btnStar');
  let comboCount = 0;
  let comboResetTimeout = null;

  function triggerMagicSparkles(originX, originY) {
    comboCount++;

    if (comboResetTimeout) clearTimeout(comboResetTimeout);
    comboResetTimeout = setTimeout(() => {
      comboCount = 0;
    }, 2400);

    const colors = ['#f8007b', '#86efee', '#ffd1ea', '#fff389', '#c4b5fd', '#9dfcd2', '#fa0079', '#67e8f9', '#ffffff'];
    const starSymbols = ['✦', '★', '✨', '⭐', '✧', '•', '✴'];

    // More clicks = more sparkles!
    const baseCount = 18;
    const count = Math.min(baseCount + comboCount * 10, 95);
    const spreadRadius = Math.min(60 + comboCount * 45, window.innerWidth * 0.75);

    // Bounce feedback on button
    magicStarBtns.forEach(btn => {
      btn.style.transform = `scale(${Math.min(1.15 + comboCount * 0.05, 1.45)}) rotate(${comboCount * 22}deg)`;
      setTimeout(() => {
        btn.style.transform = '';
      }, 220);
    });

    // Combo badge when clicking fast
    if (comboCount >= 3) {
      showComboBadge(originX, originY, comboCount);
    }

    for (let i = 0; i < count; i++) {
      const isSymbol = Math.random() > 0.35;
      const el = document.createElement('div');

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
      const distance = 30 + Math.random() * spreadRadius;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance - (Math.random() * 45); // slight float up

      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = 0.75 + Math.random() * 0.65;
      const rotation = (Math.random() - 0.5) * 720;

      el.style.position = 'fixed';
      el.style.left = `${originX || window.innerWidth / 2}px`;
      el.style.top = `${originY || window.innerHeight / 2}px`;
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9999';
      el.style.userSelect = 'none';

      if (isSymbol) {
        const sym = starSymbols[Math.floor(Math.random() * starSymbols.length)];
        el.textContent = sym;
        el.style.fontSize = `${12 + Math.random() * (12 + Math.min(comboCount * 2, 14))}px`;
        el.style.color = color;
        el.style.textShadow = `0 0 12px ${color}, 0 0 4px #ffffff`;
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
      } else {
        const size = 5 + Math.random() * (7 + Math.min(comboCount * 1.5, 12));
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.backgroundColor = color;
        el.style.borderRadius = '50%';
        el.style.boxShadow = `0 0 14px ${color}, 0 0 4px #ffffff`;
      }

      el.style.transition = `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration}s ease`;

      document.body.appendChild(el);

      requestAnimationFrame(() => {
        el.style.transform = `translate(${destX}px, ${destY}px) scale(0) rotate(${rotation}deg)`;
        el.style.opacity = '0';
      });

      setTimeout(() => {
        el.remove();
      }, duration * 1000);
    }
  }

  function showComboBadge(x, y, count) {
    const existing = document.getElementById('magicComboBadge');
    if (existing) existing.remove();

    const badge = document.createElement('div');
    badge.id = 'magicComboBadge';
    badge.textContent = count >= 8 ? `SUPER COMBO x${count}` : `Brilho x${count}!`;
    badge.style.position = 'fixed';
    badge.style.left = `${Math.min(Math.max(20, x + 15), window.innerWidth - 180)}px`;
    badge.style.top = `${Math.max(20, y - 45)}px`;
    badge.style.padding = '5px 13px';
    badge.style.borderRadius = '999px';
    badge.style.background = 'linear-gradient(135deg, #f8007b 0%, #86efee 50%, #fef08a 100%)';
    badge.style.color = '#18181b';
    badge.style.fontFamily = 'var(--font-display, sans-serif)';
    badge.style.fontSize = '0.78rem';
    badge.style.fontWeight = '900';
    badge.style.boxShadow = '0 6px 20px rgba(248, 0, 123, 0.45)';
    badge.style.pointerEvents = 'none';
    badge.style.zIndex = '10000';
    badge.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease';
    badge.style.transform = 'translateY(0) scale(1)';

    document.body.appendChild(badge);

    setTimeout(() => {
      badge.style.transform = 'translateY(-18px) scale(0.85)';
      badge.style.opacity = '0';
      setTimeout(() => badge.remove(), 450);
    }, 950);
  }

  magicStarBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const clickX = e.clientX || (rect.left + rect.width / 2);
      const clickY = e.clientY || (rect.top + rect.height / 2);
      triggerMagicSparkles(clickX, clickY);
    });
  });
});
