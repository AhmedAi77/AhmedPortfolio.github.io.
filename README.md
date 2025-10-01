Portfolio — Ahmed Waleed

This is a single-page portfolio template built with plain HTML, CSS and JavaScript. It includes a hero, marquee, modal-based navigation and a simple contact form that opens the user's email client.

How to open locally

- On Windows, open the folder in File Explorer and double-click `index.html` to open it in your default browser.
- Or, serve it with a small static server (recommended for testing modals and assets):

  # using Python 3
  python -m http.server 8000

  # then open http://localhost:8000 in your browser

What to customize

- Replace `vectorised-1759220894366.svg` with your logo and update the alt text and brand name in `index.html`.
- Replace hero photo `WhatsApp Image 2025-09-29 at 20.44.48_7b971bcf.jpg` with your portrait images.
- Edit the About, Services and Works modal contents in `index.html`.
- Update the `mailto:` address in `script.js` (search for `youremail@example.com`) to receive messages.

Files changed/added

- `index.html` — main page with modal content and contact form
- `styles.css` — added styles for projects and contact form
- `script.js` — contact form wiring and project interactions
- `README.md` — this file

Next steps

- Add real project thumbnails and individual case-study pages.
- Optionally wire the contact form to a serverless function or form provider (Formspree, Netlify Forms) for direct submissions.

Enjoy! Replace any placeholder text and images with your real content.