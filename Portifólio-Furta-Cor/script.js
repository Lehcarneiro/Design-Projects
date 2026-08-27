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

  if (btnLightning) {
    btnLightning.addEventListener('click', () => {
      openModal('Stack & Habilidades ⚡', 'Especializada em Desenvolvimento Front-end, Back-end, UI/UX Design e Desenvolvimento de Jogos.');
    });
  }

  if (btnStar) {
    btnStar.addEventListener('click', (e) => {
      createSparkles(e.clientX, e.clientY);
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Sparkle / Confetti Effect for the Star Icon
  function createSparkles(x, y) {
    const colors = ['#f8007b', '#86efee', '#ffd1ea', '#fff389', '#c4b5fd', '#9dfcd2'];
    const count = 18;

    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      const angle = (Math.PI * 2 * i) / count;
      const distance = 40 + Math.random() * 50;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance;
      const size = 6 + Math.random() * 8;
      const color = colors[Math.floor(Math.random() * colors.length)];

      sparkle.style.position = 'fixed';
      sparkle.style.left = `${x || window.innerWidth / 2}px`;
      sparkle.style.top = `${y || window.innerHeight / 2}px`;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.backgroundColor = color;
      sparkle.style.borderRadius = '50%';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '999';
      sparkle.style.boxShadow = `0 0 10px ${color}`;
      sparkle.style.transition = 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s ease';

      document.body.appendChild(sparkle);

      requestAnimationFrame(() => {
        sparkle.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
        sparkle.style.opacity = '0';
      });

      setTimeout(() => {
        sparkle.remove();
      }, 800);
    }
  }
});
