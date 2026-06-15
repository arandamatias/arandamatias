// Mobile menu toggle
var menuToggle = document.getElementById('menuToggle');
var menu = document.getElementById('menu');
if(menuToggle && menu){
  menuToggle.addEventListener('click', function(){
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ menu.classList.remove('open'); });
  });
}

// Reveal on scroll
var reveals = document.querySelectorAll('.reveal');
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
reveals.forEach(function(el){ io.observe(el); });

// ===== Typewriter titles =====
var catTitles = document.querySelectorAll('.cat-label .title');
if (catTitles.length) {
  var titleObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var text = el.dataset.text || '';
      var cursor = el.querySelector('.cursor');
      var card = el.closest('.cat-card');
      var allCards = Array.from(document.querySelectorAll('.cat-card'));
      var index = allCards.indexOf(card);
      var delay = index * 180;
      setTimeout(function() {
        var i = 0;
        var interval = setInterval(function() {
          if (i < text.length) {
            if (cursor) cursor.insertAdjacentText('beforebegin', text[i]);
            i++;
          } else {
            clearInterval(interval);
          }
        }, 45);
      }, delay);
      titleObserver.unobserve(el);
    });
  }, { threshold: 0.3 });
  catTitles.forEach(function(el){ titleObserver.observe(el); });
}

// ===== Lightbox (iOS-safe: estilos inline + fadeIn + swipe) =====
var galleryThumbs = Array.from(document.querySelectorAll('.thumb, .frame'));
var galleryImages = galleryThumbs.map(function(t){ return t.querySelector('img'); });

if (galleryImages.length) {
  var currentIndex = 0;

  // Inyectar keyframes de fadeIn en el documento
  var styleTag = document.createElement('style');
  styleTag.textContent = '@-webkit-keyframes lbFadeIn{from{opacity:0}to{opacity:1}}@keyframes lbFadeIn{from{opacity:0}to{opacity:1}}';
  document.head.appendChild(styleTag);

  // Overlay
  var lb = document.createElement('div');
  lb.style.cssText = 'display:none;position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background:rgba(0,0,0,0.93);z-index:9999;overflow:hidden;';
  document.body.appendChild(lb);

  // Imagen
  var lbImg = document.createElement('img');
  lbImg.style.cssText = 'position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);max-width:92%;max-height:82%;width:auto;height:auto;display:block;';
  lb.appendChild(lbImg);

  // Botón cerrar
  var btnClose = document.createElement('button');
  btnClose.textContent = '×';
  btnClose.style.cssText = 'position:absolute;top:14px;right:18px;background:none;border:none;color:#f5d547;font-size:2.6rem;cursor:pointer;z-index:10000;line-height:1;-webkit-appearance:none;appearance:none;padding:8px;';
  lb.appendChild(btnClose);

  // Botón anterior
  var btnPrev = document.createElement('button');
  btnPrev.textContent = '‹';
  btnPrev.style.cssText = 'position:absolute;left:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);background:none;border:none;color:#f5d547;font-size:3rem;cursor:pointer;z-index:10000;-webkit-appearance:none;appearance:none;padding:8px;';
  lb.appendChild(btnPrev);

  // Botón siguiente
  var btnNext = document.createElement('button');
  btnNext.textContent = '›';
  btnNext.style.cssText = 'position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);background:none;border:none;color:#f5d547;font-size:3rem;cursor:pointer;z-index:10000;-webkit-appearance:none;appearance:none;padding:8px;';
  lb.appendChild(btnNext);

  // Contador
  var lbCounter = document.createElement('div');
  lbCounter.style.cssText = 'position:absolute;bottom:16px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);color:#9a958c;font-size:0.75rem;letter-spacing:0.2em;white-space:nowrap;';
  lb.appendChild(lbCounter);

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lb.style.display = 'block';
    lb.style.WebkitAnimation = 'lbFadeIn 0.3s ease';
    lb.style.animation = 'lbFadeIn 0.3s ease';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.style.display = 'none';
    lb.style.WebkitAnimation = '';
    lb.style.animation = '';
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

  // Abrir desde grilla
  galleryThumbs.forEach(function(thumb, index) {
    thumb.addEventListener('click', function(e) {
      e.preventDefault();
      openLightbox(index);
    });
  });

  // Botones
  btnClose.addEventListener('click', function(e) { e.stopPropagation(); closeLightbox(); });
  btnPrev.addEventListener('click', function(e) { e.stopPropagation(); showPrev(); });
  btnNext.addEventListener('click', function(e) { e.stopPropagation(); showNext(); });

  // Click en fondo cierra
  lb.addEventListener('click', function(e) {
    if (e.target === lb) closeLightbox();
  });

  // Teclado
  document.addEventListener('keydown', function(e) {
    if (lb.style.display === 'none') return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // ===== Swipe táctil =====
  var touchStartX = 0;
  var touchStartY = 0;

  lb.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  lb.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    // Solo registrar si el movimiento horizontal supera 40px y es mayor al vertical
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) showNext();
      else showPrev();
    }
  }, { passive: true });
}
