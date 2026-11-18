/* Páginas legales: índice automático, sección activa, progreso de lectura y aparición suave */
(() => {
  const main = document.querySelector('main'), toc = document.getElementById('toc');
  const H = [...main.querySelectorAll('h2')];
  H.forEach((h, i) => {
    const m = h.textContent.match(/^(\d+)\.\s*(.*)$/);
    h.id = h.id || 'sec-' + (i + 1);
    if (m) h.innerHTML = `<span class="n">${m[1]}</span><span>${m[2]}</span>`;
  });
  toc.innerHTML = '<nav><details open><summary>Contenido</summary><h4>Contenido</h4><ol>' +
    H.map(h => `<li><a href="#${h.id}">${h.lastElementChild ? h.lastElementChild.textContent : h.textContent}</a></li>`).join('') + '</ol></details></nav>';
  const narrow = matchMedia('(max-width: 999px)'), det = toc.querySelector('details');
  const sync = () => det.open = !narrow.matches; sync(); narrow.addEventListener('change', sync); // en escritorio siempre abierto
  const links = [...toc.querySelectorAll('a')];
  toc.addEventListener('click', e => {if (e.target.closest('a') && narrow.matches) det.open = false});
  // Sección activa en el índice
  const io1 = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id));
  }), {rootMargin: '-20% 0px -70% 0px'});
  H.forEach(h => io1.observe(h));
  // Aparición suave de bloques
  const blocks = [...main.children].filter(el => !el.classList.contains('lg-hero'));
  const io2 = new IntersectionObserver(es => es.forEach(e => {if (e.isIntersecting) {e.target.classList.add('in'); io2.unobserve(e.target)}}), {rootMargin: '0px 0px -8% 0px'});
  blocks.forEach(b => {b.classList.add('rv'); io2.observe(b)});
  // Progreso de lectura y botón para subir
  const bar = document.querySelector('.lg-prog'), up = document.querySelector('.lg-up');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
    up.classList.toggle('show', scrollY > 600);
  };
  addEventListener('scroll', onScroll, {passive: true}); onScroll();
  up.addEventListener('click', () => scrollTo({top: 0}));
})();
