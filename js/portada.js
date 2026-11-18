    /* Portada: conversación de WhatsApp que genera un pedido en el panel, con el código que lo hace */
    (() => {
      const $ = id => document.getElementById(id), M = $('hxM'), O = $('hxO'), B = $('hxB'), C0 = $('hxC'), W = $('hxw'); if (!M) return;
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const H = [22, 30, 26, 41, 38, 52, 47, 60, 55, 68, 62, 74];
      B.innerHTML = H.map(h => `<i style="height:${h}%"></i>`).join('');
      // Código con resaltado: [texto, clase] por fragmento
      const K = 'tk-k', S = 'tk-s', F = 'tk-f', Cm = 'tk-c';
      const CODE = [
        [['whatsapp', F], ['.on(', ''], ["'mensaje'", S], [', ', ''], ['async', K], [' (msg) => {', '']],
        [['  const', K], [' resp = ', ''], ['await', K], [' ia', F], ['.responder(msg, catalogo);', '']],
        [['  await', K], [' whatsapp', F], ['.enviar(msg.cliente, resp);', '']],
        [['  if', K], [' (resp.pedido) ', ''], ['panel', F], ['.agregar(resp.pedido);', ''], ['', 'tk-o']],
        [['});', '']]];
      const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      C0.innerHTML = CODE.map((l, i) => `<span class="ln" data-l="${i}"></span>`).join('');
      const lines = [...C0.children];
      const full = l => l.map(([t, c]) => c ? `<span class="${c}">${esc(t)}</span>` : esc(t)).join('');
      async function typeCode() {
        for (let i = 0; i < CODE.length; i++) {
          if (reduce) {lines[i].innerHTML = full(CODE[i]); continue}
          const txt = CODE[i].map(x => x[0]).join('');
          const t0 = performance.now(); // por tiempo real, así no se alarga si el navegador frena los temporizadores
          for (let n = 1; n < txt.length; n = Math.ceil((performance.now() - t0) / 9)) {
            let left = n, html = '';
            for (const [t, c] of CODE[i]) {const part = t.slice(0, Math.max(0, left)); left -= t.length; if (part) html += c ? `<span class="${c}">${esc(part)}</span>` : esc(part)}
            lines[i].innerHTML = html; await wait(16);
          }
          lines[i].innerHTML = full(CODE[i]);
        }
      }
      const mark = i => lines.forEach((l, k) => l.classList.toggle('on', k === i));
      const tag = t => {lines[3].lastElementChild.textContent = t ? '  // ✓ ' + t : ''};
      const C = [
        [['Hola, ¿tienen la playera básica en talla M?'], ['¡Hola! Sí, quedan 3 en talla M a $340. ¿Te la aparto?', 1], ['Sí, quiero 2'], ['Listo: 2 playeras M, $680. Te mando el enlace de pago.', 1]],
        [['¿Hacen envíos a Puebla?'], ['Sí, llega en 2 días y el envío es gratis desde $800.', 1], ['Entonces el vestido de lino, talla S'], ['Hecho: vestido de lino S, $1,150. Te mando el enlace de pago.', 1]]];
      const T = [680, 1150];
      let v = 18420, p = 47, w = 19, n = 1051, k = 0, vis = true, busy = false;
      const fmt = x => '$' + x.toLocaleString('es-MX'), wait = ms => new Promise(r => setTimeout(r, ms));
      const add = (t, me, cls = '') => {const d = document.createElement('div'); d.className = 'hx-m' + (me ? ' me' : '') + cls; d.textContent = t; M.append(d); return d};
      function pulse() { // un punto de luz viaja del celular a "Pedidos recientes"
        if (reduce) return Promise.resolve();
        const wr = W.getBoundingClientRect(), a = M.getBoundingClientRect(), tg = (O.offsetParent ? O : B).getBoundingClientRect();
        const d = document.createElement('i'); d.className = 'hx-dot'; W.append(d);
        const x0 = a.left - wr.left + 10, y0 = a.bottom - wr.top - 30, x1 = tg.left - wr.left + tg.width / 2, y1 = tg.top - wr.top + 12;
        return d.animate([{transform: `translate(${x0}px,${y0}px) scale(.4)`, opacity: 0}, {transform: `translate(${(x0 + x1) / 2}px,${Math.min(y0, y1) - 60}px) scale(1.2)`, opacity: 1}, {transform: `translate(${x1}px,${y1}px) scale(.8)`, opacity: .9}],
          {duration: 900, easing: 'cubic-bezier(.45,0,.2,1)'}).finished.then(() => d.remove());
      }
      function order(c) {
        v += T[c]; p++; w++; tag('#' + n + ' · ' + fmt(T[c]));
        [['hxV', fmt(v)], ['hxP', p], ['hxW', w]].forEach(([id, x]) => {const e = $(id); e.textContent = x; e.classList.add('up'); setTimeout(() => e.classList.remove('up'), 1600)});
        const li = document.createElement('li'); li.className = 'new'; li.innerHTML = `<span>#${n++} WhatsApp</span><em>${fmt(T[c])}</em>`;
        O.prepend(li); while (O.children.length > 3) O.lastChild.remove();
        const last = B.lastChild; last.style.height = Math.min(96, parseFloat(last.style.height) + 8) + '%';
      }
      async function play() {
        if (busy || !vis) return; busy = true; const c = k++ % C.length; M.textContent = ''; tag('');
        for (const [t, me] of C[c]) {
          if (me) {mark(1); const ty = add('escribiendo…', 1, ' ty'); await wait(1100); ty.remove(); mark(2)} else mark(0);
          add(t, me); await wait(me ? 1200 : 900);
        }
        mark(3); await pulse(); order(c); await wait(1400); mark(-1); await wait(2800); busy = false; play();
      }
      typeCode().then(() => {
        if (reduce) {C[0].forEach(([t, me]) => add(t, me)); order(0); return}
        new IntersectionObserver(([e]) => {vis = e.isIntersecting; if (vis) play()}).observe($('hx'));
      });
      // Inclinación 3D suave según el cursor (solo con mouse)
      if (!reduce && matchMedia('(hover:hover) and (pointer:fine)').matches) {
        const hx = $('hx');
        addEventListener('pointermove', e => {hx.style.setProperty('--tx', (e.clientX / innerWidth * 2 - 1).toFixed(3)); hx.style.setProperty('--ty', (e.clientY / innerHeight * 2 - 1).toFixed(3))}, {passive: true});
      }
    })();

    /* Partículas de la portada: constelación que se conecta con el cursor */
    (() => {
      const cv = document.getElementById('hxp'); if (!cv || !cv.getContext) return;
      const ctx = cv.getContext('2d'), hero = cv.parentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      let Wd, Ht, dpr, P = [], m = {x: -1e4, y: -1e4}, run = true, raf = 0;
      function size() {
        dpr = Math.min(devicePixelRatio || 1, 2); Wd = hero.clientWidth; Ht = hero.clientHeight;
        cv.width = Wd * dpr; cv.height = Ht * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = Math.round(Math.min(110, Wd * Ht / 14000));
        P = Array.from({length: n}, () => ({x: Math.random() * Wd, y: Math.random() * Ht, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.4 + .5}));
        if (reduce) draw();
      }
      function draw() {
        ctx.clearRect(0, 0, Wd, Ht);
        const L = 120;
        for (let i = 0; i < P.length; i++) {
          const a = P[i];
          if (!reduce) {
            a.x += a.vx; a.y += a.vy;
            if (a.x < 0 || a.x > Wd) a.vx *= -1; if (a.y < 0 || a.y > Ht) a.vy *= -1;
            const dx = m.x - a.x, dy = m.y - a.y, d = Math.hypot(dx, dy);
            if (d < 180) {a.x += dx / d * .35; a.y += dy / d * .35}
          }
          for (let j = i + 1; j < P.length; j++) {
            const b = P[j], d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < L) {ctx.strokeStyle = `rgba(216,195,160,${(1 - d / L) * .22})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()}
          }
          const dm = Math.hypot(a.x - m.x, a.y - m.y);
          if (dm < 170) {ctx.strokeStyle = `rgba(234,217,182,${(1 - dm / 170) * .45})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(m.x, m.y); ctx.stroke()}
          ctx.fillStyle = dm < 170 ? 'rgba(246,232,200,.95)' : 'rgba(216,195,160,.55)';
          ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 7); ctx.fill();
        }
      }
      function loop() {if (run) {draw(); raf = requestAnimationFrame(loop)}}
      size(); addEventListener('resize', () => {clearTimeout(size.t); size.t = setTimeout(size, 150)});
      hero.addEventListener('pointermove', e => {const r = cv.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top}, {passive: true});
      hero.addEventListener('pointerleave', () => {m.x = m.y = -1e4});
      if (reduce) return;
      new IntersectionObserver(([e]) => {run = e.isIntersecting; cancelAnimationFrame(raf); if (run) loop()}).observe(hero);
      document.addEventListener('visibilitychange', () => {run = !document.hidden; cancelAnimationFrame(raf); if (run) loop()});
    })();
  
