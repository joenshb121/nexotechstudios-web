    const $ = id => document.getElementById(id), R = document.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const SV = {web: 'Página web ($4,500)', wab: 'Web + WhatsApp ($7,900)', sis: 'Web + Sistema ($12,000)', aut: 'Atención 24/7 por WhatsApp ($18,500)', ia: 'Asistente con IA', app: 'Sistema o app a la medida', db: 'Reportes de mi negocio', logo: 'Logo o identidad de marca', otro: 'No sé, quiero que me orienten'};
    const IC = {web: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M10 13l-2 2 2 2M14 13l2 2-2 2"/>', sw: '<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>', db: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>', ia: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>'};

    /* Servicios: las cuatro con la misma estructura */
    const SVC = [['web', 'Páginas web', 'Aparece en Google y recibe más mensajes.'],
    ['sw', 'Sistemas y apps', 'Ordena tu negocio sin libretas ni Excel.'],
    ['db', 'Reportes y datos', 'Conoce cuánto vendes y qué se te acaba.'],
    ['ia', 'WhatsApp automático e IA', 'Deja de perder clientes por no contestar.']];
    $('sv').innerHTML = SVC.map(s => `<article class="cd"><svg viewBox="0 0 24 24" aria-hidden="true">${IC[s[0]]}</svg><h3>${s[1]}</h3><p class="out">${s[2]}</p><a class="lk" href="#paquetes">Ver paquetes →</a></article>`).join('');

    /* Paquetes: escalera de 4 (cada uno incluye el anterior) + a la medida.
       [nombre, para qué, precio, incluye, ideal para, no incluye, cambios, servicio del cotizador, etiqueta] */
    const PK = [
      ['Página web', 'Aparece en Google y recibe más mensajes.', '4,500', ['Diseño con tu logo y tus colores', 'Se ve bien en celular y computadora', 'Botón para que te escriban por WhatsApp', 'Hasta 5 secciones: inicio, servicios, precios, ubicación y contacto', 'Lista para aparecer en Google'], 'Despachos, consultorios y profesionistas', 'Fotos y textos (nos los pasas tú)', '2 rondas de cambios incluidas', SV.web],
      ['Web + WhatsApp', 'Responde lo básico en automático, aunque estés ocupado.', '7,900', ['Todo lo de Página web', 'WhatsApp Business con tu catálogo y precios', 'Mensaje de bienvenida y de "fuera de horario" automáticos', 'Respuestas rápidas a las preguntas de siempre', 'Liga para que tus clientes agenden'], 'Salones, barberías, tiendas y restaurantes', 'Conversaciones automáticas completas (eso es Atención 24/7)', '2 rondas de cambios incluidas', SV.wab, 'Para empezar'],
      ['Web + Sistema', 'Guarda clientes, citas y productos, y edítalos tú.', '12,000', ['Todo lo de Web + WhatsApp', 'Hasta 10 secciones', 'Catálogo, agenda o lista de clientes (hasta 3)', 'Panel para cambiar precios y textos sin pedirnos nada', 'Respaldos de tu información'], 'Consultorios, gimnasios y tiendas con catálogo', 'Que el WhatsApp conteste y agende solo', '2 rondas de cambios · o en 3 mensualidades sin intereses', SV.sis],
      ['Atención 24/7', 'Deja de perder clientes por no contestar.', '18,500', ['Todo lo de Web + Sistema', 'WhatsApp oficial que contesta a cualquier hora', 'Confirma citas y toma pedidos', 'Recordatorios automáticos a tus clientes', 'Hasta 3 conversaciones automáticas (ej. citas, pedidos y dudas)'], 'Consultorios, restaurantes y negocios con citas', 'Lo que Meta cobra por algunos mensajes (ver abajo)', '3 rondas de cambios · o en 3 mensualidades sin intereses', SV.aut]
    ];
    const MED = [
      ['Asistente con IA', 'Resuelve las dudas de tus clientes a cualquier hora.', '26,500', ['Todo lo de Web + Sistema', 'Asistente que contesta con tu catálogo y precios', 'Se puede sumar a tu WhatsApp'], 'Tiendas con muchos productos e inmobiliarias', 'El pago por uso de la IA (ver abajo)', '3 rondas de cambios · o en 3 mensualidades sin intereses', SV.ia],
      ['Sistema o app a la medida', 'Ordena tu negocio sin libretas ni Excel.', '35,000', ['Usuarios con distintos permisos', 'Panel de control', 'Alcance y entregas por escrito'], 'Escuelas, empresas medianas y negocios con sucursales', 'Funciones fuera de lo acordado', 'Cambios definidos en la propuesta · o en 3 mensualidades sin intereses', SV.app],
      ['Reportes de tu negocio', 'Conoce cuánto vendes y qué se te acaba.', '4,500', ['Ordenamos tus Excel o sistemas actuales', 'Tablero con ventas, clientes o inventario', 'Respaldos'], 'Negocios que ya venden y quieren ver sus números', 'Página web o sistema (se cotizan aparte)', 'Alcance definido en la propuesta', SV.db]
    ];
    const card = ([n, d, p, i, id, no, rv, s, t]) => `<article class="pk${t ? ' rec' : ''}">${t ? `<span class="tag" style="align-self:flex-start">${t}</span>` : ''}<h3>${n}</h3><p class="mu">${d}</p><p class="p">$${p} <small>desde · pago único · MXN</small></p><h4>Incluye</h4><ul>${i.map(x => `<li>${x}</li>`).join('')}</ul><p class="lm"><b>Ideal para:</b> ${id}<br><b>No incluye:</b> ${no}<br>${rv}</p><a class="btn ${t ? 'bg' : ''}" href="#cotizador" data-svc="${s}">Cotizar ${n}</a></article>`;
    $('pkg').innerHTML = PK.map(card).join(''); $('pkm').innerHTML = MED.map(card).join('');


    /* Cotizador */
    const sel = $('qs'); sel.innerHTML = Object.values(SV).map(v => `<option>${v}</option>`).join('');
    function msg() {return [`Hola, soy ${$('qn').value.trim() || '(mi nombre)'}.`, `Quiero cotizar: ${sel.value}.`, $('qb').value.trim() && `Mi negocio: ${$('qb').value.trim()}.`, $('qd').value.trim() && `Detalles: ${$('qd').value.trim()}`, '¿Me compartes una propuesta?'].filter(Boolean).join('\n')}
    function build() {$('qa').href = 'https://wa.me/525574631184?text=' + encodeURIComponent(msg()); $('qe').href = 'mailto:business@nexotechstudios.com?subject=' + encodeURIComponent('Cotización: ' + sel.value) + '&body=' + encodeURIComponent(msg())}
    document.querySelectorAll('.q input,.q textarea,.q select').forEach(e => e.addEventListener('input', build)); build();
    [$('qa'), $('qe')].forEach(a => a.addEventListener('click', e => {const m = $('qm'); if ($('qn').value.trim().length < 2) {e.preventDefault(); m.textContent = 'Escribe tu nombre para saber con quién hablar.'; m.style.color = '#E0907A'; $('qn').focus(); return } build(); m.style.color = 'var(--ok)'; m.textContent = 'Abriendo tu cotización lista para enviar.'}));
    document.addEventListener('click', e => {const a = e.target.closest('[data-svc]'); if (a) {sel.value = a.dataset.svc; build()} });
    document.querySelectorAll('.mm a').forEach(a => a.addEventListener('click', () => a.closest('details').open = false));

    /* Aparición deslizante al hacer scroll */
    if ('IntersectionObserver' in window && !reduce) {
      const SD = CSS.supports('animation-timeline: view()');  // si el navegador anima con el scroll, no duplicar
      const RV = [...(SD ? [] : [['.ba-a', 'rl'], ['.ba-d', 'rr'], ['.w > .hd', 'rl']]), ['#pkg', 'rr'], ['#pkm', ''], ['.cs-b li', ''], ['.cst > .cd', ''], ['.sec .eb', ''], ['.g3 > .cd', ''], ['.g4 > .cd', ''], ['.stp > li', ''], ['.note', ''], ['.fq details', ''], ['.q', ''], ['.ct', ''], ['#contacto .t', ''], ['.cs:not(.cs-alt) > .cs-v', 'rl'], ['.cs-alt > .cs-v', 'rr'], ['.cs:not(.cs-alt) > .cs-t', 'rr'], ['.cs-alt > .cs-t', 'rl'], ['.hx-cap', '']], els = [];
      RV.forEach(([q, c]) => document.querySelectorAll(q).forEach(e => {e.classList.add('rv'); if (c) e.classList.add(c); els.push(e)}));
      const io = new IntersectionObserver(es => {let k = 0; es.forEach(en => {if (!en.isIntersecting) return; const t = en.target, dl = Math.min(k++, 4) * 90; t.style.setProperty('--dl', dl + 'ms'); t.classList.add('in'); io.unobserve(t); setTimeout(() => {t.classList.remove('rv', 'rl', 'rr', 'in'); t.style.removeProperty('--dl')}, 1200 + dl)})}, {threshold: .12, rootMargin: '0px 0px -6% 0px'});
      els.forEach(e => io.observe(e))
    }
  
