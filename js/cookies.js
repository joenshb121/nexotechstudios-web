    (() => {
      const GA_ID = 'G-TLC47C2YS6'; // ID de medición de Google Analytics (G-XXXXXXX). Vacío = sin analítica ni banner.
      const KEY = 'nexo-cookies', $ = id => document.getElementById(id), box = $('ck');
      const get = () => {try {return localStorage.getItem(KEY)} catch (e) {return null}};
      const set = v => {try {localStorage.setItem(KEY, v)} catch (e) {}};
      let loaded = false;
      window.nexoTrack = () => {};
      function load() {
        if (loaded || !GA_ID) return; loaded = true;
        const sc = document.createElement('script'); sc.async = true; sc.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID; document.head.append(sc);
        window.dataLayer = window.dataLayer || []; window.gtag = function () {dataLayer.push(arguments)};
        gtag('js', new Date()); gtag('config', GA_ID, {anonymize_ip: true});
        window.nexoTrack = (ev, params) => gtag('event', ev, params || {});
      }
      if (!GA_ID) {$('ckOpen').hidden = true; return}
      const c = get();
      if (c === 'si') load(); else if (c !== 'no') box.classList.add('on');
      $('ckYes').onclick = () => {set('si'); box.classList.remove('on'); load()};
      $('ckNo').onclick = () => {set('no'); box.classList.remove('on')};
      $('ckOpen').onclick = e => {e.preventDefault(); box.classList.add('on')};
      // Eventos clave: qué lleva a pedir cotización
      document.addEventListener('click', e => {
        const a = e.target.closest('a'); if (!a) return;
        const h = a.getAttribute('href') || '';
        if (a.id === 'qa' || a.id === 'qe') nexoTrack('generate_lead', {metodo: a.id === 'qa' ? 'whatsapp' : 'correo', servicio: ($('qs') || {}).value || ''});
        else if (h.startsWith('https://wa.me')) nexoTrack('contacto_whatsapp', {ubicacion: a.id === 'wa' ? 'boton_flotante' : 'contacto'});
        else if (h.startsWith('mailto:')) nexoTrack('contacto_correo');
        else if (h.startsWith('tel:')) nexoTrack('contacto_telefono');
        else if (h.startsWith('proyectos/')) nexoTrack('abrir_demo', {demo: h.replace('proyectos/', '').replace('.html', '')});
        else if (h === '#cotizador') nexoTrack('ir_a_cotizar', {servicio: a.dataset.svc || ''});
      }, true);
    })();
  
