document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('#menu');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  if (toggle && menu){
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Modal system
  // - Any link with [data-modal-target="#id"] opens the matching modal
  // - ESC or clicking overlay/close button closes it
  // - Body gets .modal-open to prevent background scroll
  const openModal = (modal) => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    // set focus to the close button for accessibility
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    // remove lock if no other modals are open
    const anyOpen = document.querySelector('.modal[aria-hidden="false"]');
    if (!anyOpen) document.body.classList.remove('modal-open');
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-target]');
    if (trigger) {
      e.preventDefault();
      const selector = trigger.getAttribute('data-modal-target');
      const modal = document.querySelector(selector);
      openModal(modal);
      return;
    }

    const closeBtn = e.target.closest('.modal-close');
    if (closeBtn) {
      const modal = closeBtn.closest('.modal');
      closeModal(modal);
      return;
    }

    // Click outside panel closes
    const overlay = e.target.classList.contains('modal');
    if (overlay) closeModal(e.target);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const open = document.querySelector('.modal[aria-hidden="false"]');
      if (open) closeModal(open);
    }
  });

  // Entrance reveal animations
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced){
    const revealables = document.querySelectorAll('[data-reveal]');
    revealables.forEach((el) => {
      const dir = el.getAttribute('data-reveal');
      const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
      setTimeout(() => {
        el.classList.add('reveal-in');
        el.classList.add(dir === 'right' ? 'right' : 'up');
      }, delay);
    });
  }

  // Seamless marquee duplication
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack && marqueeTrack.children.length){
    const originals = Array.from(marqueeTrack.children);
    originals.forEach((node) => {
      const clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden','true');
      marqueeTrack.appendChild(clone);
    });
  }
});


