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

// ===== Lightbox (iOS-safe: estilos 100% inline, sin depender de CSS) =====
var galleryThumbs = Array.from(document.querySelectorAll('.thumb, .frame'));
var galleryImages = galleryThumbs.map(function(t){ return t.querySelector('img'); });

if (galleryImages.length) {
  var currentIndex = 0;

  var lb = document.createElement('div');
  lb.style.cssText = 'display:none;position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background:rgba(0,0,0,0.93);z-index:9999;overflow:hidden;';
  document.body.appendChild(lb);

  var lbImg = document.createElement('img');
  lbImg.style.cssText = 'position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);max-width:92%;max-height:82%;width:auto;height:auto;display:block;';
  lb.appendChild(lbImg);

  var btnClose = document.createElement('button');
  btnClose.textContent = '×';
  btnClose.style.cssText = 'position:absolute;top:14px;right:18px;background:none;border:none;color:#f5d547;font-size:2.6rem;cursor:pointer;z-index:10000;line-height:1;-webkit-appearance:none;appearance:none;padding:0;';
  lb.appendChild(btnClose);

  var btnPrev = document.createElement('button');
  btnPrev.textContent = '‹';
  btnPrev.style.cssText = 'position:absolute;left:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);background:none;border:none;color:#f5d547;font-size:3rem;cursor:pointer;z-index:10000;-webkit-appearance:none;appearance:none;padding:0;';
  lb.appendChild(btnPrev);

  var btnNext = document.createElement('button');
  btnNext.textContent = '›';
  btnNext.style.cssText = 'position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);background:none;border:none;color:#f5d547;font-size:3rem;cursor:pointer;z-index:10000;-webkit-appearance:none;appearance:none;padding:0;';
  lb.appendChild(btnNext);

  var lbCounter = document.createElement('div');
  lbCounter.style.cssText = 'position:absolute;bottom:16px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);color:#9a958c;font-size:0.75rem;letter-spacing:0.2em;white-space:nowrap;';
  lb.appendChild(lbCounter);

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lb.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    var img = galleryImages[currentIndex];
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

  galleryThumbs.forEach(function(thumb, index) {
    thumb.addEventListener('click', function(e) {
      e.preventDefault();
      openLightbox(index);
    });
  });

  btnClose.addEventListener('click', function(e) { e.stopPropagation(); closeLightbox(); });
  btnPrev.addEventListener('click', function(e) { e.stopPropagation(); showPrev(); });
  btnNext.addEventListener('click', function(e) { e.stopPropagation(); showNext(); });

  lb.addEventListener('click', function(e) {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', function(e) {
    if (lb.style.display === 'none') return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}
