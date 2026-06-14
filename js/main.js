// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
if(menuToggle && menu){
  menuToggle.addEventListener('click', ()=>{
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> menu.classList.remove('open'));
  });
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
reveals.forEach(el=>io.observe(el));

// ===== Typewriter titles (category grid) =====
const catTitles = document.querySelectorAll('.cat-label .title');

if (catTitles.length) {
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.dataset.text || '';
      const cursor = el.querySelector('.cursor');
      const card = el.closest('.cat-card');
      const allCards = Array.from(document.querySelectorAll('.cat-card'));
      const index = allCards.indexOf(card);
      const delay = index * 180;

      setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
          if (i < text.length) {
            if (cursor) {
              cursor.insertAdjacentText('beforebegin', text[i]);
            }
            i++;
          } else {
            clearInterval(interval);
          }
        }, 45);
      }, delay);

      titleObserver.unobserve(el);
    });
  }, { threshold: 0.3 });

  catTitles.forEach(el => titleObserver.observe(el));
}

// ===== Lightbox =====
const galleryImages = Array.from(document.querySelectorAll('.thumb img, .frame img'));

if (galleryImages.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Cerrar">&times;</button>
    <button class="lightbox-prev" aria-label="Anterior">&#8249;</button>
    <img src="" alt="">
    <button class="lightbox-next" aria-label="Siguiente">&#8250;</button>
    <div class="lightbox-counter"></div>
  `;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const lbCounter = lightbox.querySelector('.lightbox-counter');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const img = galleryImages[currentIndex];
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lbCounter.textContent = (currentIndex + 1) + ' / ' + galleryImages.length;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}
