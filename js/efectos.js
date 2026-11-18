    /* ===== NEXO · efectos de acabado (enlace activo, foco de luz, inclinación, imán) ===== */
    (() => {
      const R = document.documentElement;
      const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
      const rd = matchMedia('(prefers-reduced-motion: reduce)').matches;

      /* Enlace activo en el menú según la sección visible */
      if ('IntersectionObserver' in window) {
        const links = [...document.querySelectorAll('nav .l a')];
        const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
        const io = new IntersectionObserver(es => es.forEach(en => {
          const a = map.get(en.target.id);
          if (a && en.isIntersecting) links.forEach(l => l.classList.toggle('on', l === a));
        }), {rootMargin: '-45% 0px -50% 0px'});
        map.forEach((a, id) => {const s = document.getElementById(id); s && io.observe(s);});
      }
      if (!fine) return;

      /* Foco de luz en tarjetas, inclinación suave e imán en botones */
      const SP = '.cd,.pk,.gl,.app';
      let ev = null, raf = 0, cur = null, mag = null;
      const reset = () => {
        if (cur) {cur.classList.remove('tl'); cur.style.removeProperty('--rx'); cur.style.removeProperty('--ry'); cur = null;}
        if (mag) {mag.style.translate = ''; mag = null;}
      };
      function tick() {
        raf = 0; const e = ev;
        R.style.setProperty('--gx', e.clientX + 'px');
        R.style.setProperty('--gy', e.clientY + 'px');
        document.querySelectorAll(SP).forEach(c => {
          const r = c.getBoundingClientRect();
          if (r.bottom < -300 || r.top > innerHeight + 300) return;
          c.style.setProperty('--px', (e.clientX - r.left) + 'px');
          c.style.setProperty('--py', (e.clientY - r.top) + 'px');
        });
        if (rd) return;
        const t = e.target.closest && e.target.closest('.cd,.pk');
        if (cur && cur !== t) {cur.classList.remove('tl'); cur.style.removeProperty('--rx'); cur.style.removeProperty('--ry');}
        if (t) {
          const r = t.getBoundingClientRect();
          t.style.setProperty('--ry', (((e.clientX - r.left) / r.width - .5) * 5).toFixed(2) + 'deg');
          t.style.setProperty('--rx', (-((e.clientY - r.top) / r.height - .5) * 5).toFixed(2) + 'deg');
          t.classList.add('tl');
        }
        cur = t;
        const b = e.target.closest && e.target.closest('.btn');
        if (mag && mag !== b) mag.style.translate = '';
        if (b) {
          const r = b.getBoundingClientRect();
          b.style.translate = (((e.clientX - r.left) / r.width - .5) * 10).toFixed(1) + 'px ' + (((e.clientY - r.top) / r.height - .5) * 8).toFixed(1) + 'px';
        }
        mag = b;
      }
      addEventListener('pointermove', e => {ev = e; if (!raf) raf = requestAnimationFrame(tick);}, {passive: true});
      R.addEventListener('pointerleave', reset);
    })();
  
