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

  // Contact form handling: opens user's mail client with prefilled message
  const contactForm = document.querySelector('#contact-form');
  const contactFeedback = document.querySelector('#contact-feedback');
  const contactCancel = document.querySelector('#contact-cancel');
  const contactModal = document.querySelector('#modal-contact');

  if (contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name') || 'No name';
      const email = formData.get('email') || 'no-reply@example.com';
      const message = formData.get('message') || '';

      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`);

      // Open the default mail client using mailto:
      const mailto = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
      contactFeedback.textContent = 'Opening your email client...';
      // small timeout to allow feedback to be read
      setTimeout(() => {
        window.location.href = mailto;
        // close modal after attempt
        closeModal(contactModal);
        contactFeedback.textContent = '';
      }, 300);
    });
  }

  if (contactCancel){
    contactCancel.addEventListener('click', () => {
      closeModal(contactModal);
    });
  }

  // Project card interactions: open works modal and populate details
  const projectCards = document.querySelectorAll('.project-card');
  const worksModal = document.querySelector('#modal-works');
  if (projectCards.length && worksModal){
    projectCards.forEach((card) => {
      const onOpen = () => {
        const thumb = card.querySelector('img')?.src || '';
        const title = card.querySelector('h3')?.textContent || 'Project';
        const desc = card.querySelector('p')?.textContent || '';
        const body = worksModal.querySelector('.modal-body');
        if (body){
          body.innerHTML = `
            <div style="display:flex;gap:12px;flex-direction:column;align-items:stretch">
              <img src="${thumb}" alt="${title} image" style="width:100%;height:320px;object-fit:cover;border-radius:8px;" />
              <h3 style="margin:8px 0 4px;color:var(--text)">${title}</h3>
              <p style="color:var(--muted)">${desc}</p>
              <p style="color:var(--muted)">Replace this project detail with a longer description, links, and case study highlights.</p>
            </div>
          `;
        }
        openModal(worksModal);
      };

      card.addEventListener('click', onOpen);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      });
    });
  }
});


