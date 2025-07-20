document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const themeBtn = document.getElementById('themeBtn');
  const body = document.body;

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const closeBtn = document.getElementById('closeBtn');
  const sidebar = document.getElementById('sidebar');
  const collapseBtn = document.getElementById('collapseBtn');

  let currentIndex = 0;

  // === FILTER FUNCTIONALITY ===
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        item.classList.remove('fade-in');
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          setTimeout(() => item.classList.add('fade-in'), 10);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // === SHUFFLE FUNCTIONALITY ===
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      const gallery = document.getElementById('gallery');
      const items = Array.from(galleryItems).filter(item => item.style.display !== 'none');
      const shuffled = items.sort(() => 0.5 - Math.random());

      gallery.innerHTML = '';
      shuffled.forEach(item => {
        item.classList.remove('fade-in');
        gallery.appendChild(item);
        setTimeout(() => item.classList.add('fade-in'), 50);
      });
    });
  }

  // === THEME TOGGLE ===
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      themeBtn.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });
  }

  // === LIGHTBOX FUNCTIONALITY ===
  function showLightbox(index) {
    const visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    if (index < 0 || index >= visibleItems.length) return;
    currentIndex = index;
    const img = visibleItems[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const visibleItems = Array.from(galleryItems).filter(i => i.style.display !== 'none');
      const visibleIndex = visibleItems.indexOf(item);
      showLightbox(visibleIndex);
    });
  });

  prevBtn.addEventListener('click', () => showLightbox(currentIndex - 1));
  nextBtn.addEventListener('click', () => showLightbox(currentIndex + 1));
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  // ✅ THIS LINE WAS OUTSIDE BEFORE — now inside DOMContentLoaded
  collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

});
