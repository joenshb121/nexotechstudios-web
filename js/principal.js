    const $ = id => document.getElementById(id), R = document.documentElement, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const SV = {ese: 'Paquete Esencial: página web simple', wab: 'Paquete WhatsApp Básico: web simple y WhatsApp Business configurado', con: 'Paquete Conecta: web con base de datos', aut: 'Paquete Automatiza: web, base de datos y WhatsApp automático', ia: 'Paquete Inteligente: web con base de datos e IA', app: 'Aplicación o software a la medida', db: 'Base de datos o tablero de reportes', logo: 'Logo o identidad de marca'};
    const IC = {web: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M10 13l-2 2 2 2M14 13l2 2-2 2"/>', sw: '<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>', db: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>', ia: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>'};

    /* Servicios: las cuatro con la misma estructura */
    const SVC = [['web', 'Desarrollo web', 'Sitios corporativos, landing pages, tiendas en línea y catálogos, listos para celular.', 'Para que tu negocio aparezca, se vea profesional y reciba contactos.', '$4,500', 'Página web simple', SV.ese],
    ['sw', 'Software y aplicaciones', 'Apps web, sistemas administrativos y plataformas personalizadas, hechas a la medida.', 'Para ordenar procesos que ninguna herramienta comercial resuelve bien.', '$35,000', 'Aplicación a la medida', SV.app],
    ['db', 'Datos y gestión empresarial', 'Bases de datos, organización de información, reportes, dashboards y análisis.', 'Para decidir con números al día y sin capturar dos veces.', '$4,500', 'Base de datos sola', SV.db],
    ['ia', 'Automatización e IA', 'Automatización de procesos, asistentes inteligentes, chatbots e integraciones.', 'Para responder más rápido y dedicar menos horas a tareas repetitivas.', '$7,900', 'Web y WhatsApp Business', SV.wab]];
    $('sv').innerHTML = SVC.map(s => `<article class="cd"><svg viewBox="0 0 24 24" aria-hidden="true">${IC[s[0]]}</svg><h3>${s[1]}</h3><p>${s[2]}</p><p class="mu">${s[3]}</p><div class="pr">Desde<b>${s[4]} MXN</b><span class="mu">${s[5]}</span></div><a class="btn" href="#cotizador" data-svc="${s[6]}">Cotizar</a></article>`).join('');

    /* Paquetes por servicio: [nombre, descripción, precio, incluye, no incluye, revisiones y límites, servicio, recomendado] */
    const X = 'Cambios fuera del alcance acordado', H = 'Dominio y hosting';
    const PK = {
      web: ['Desarrollo web', [['Esencial', 'Página web simple', '4,500', ['Diseño a tu marca', 'Adaptada a celular y laptop', 'Botón directo a WhatsApp', 'SEO básico y puesta en línea'], [H, 'Contenido y fotos (los aportas tú)', X], '2 rondas de revisión · hasta 5 secciones', SV.ese], ['Conecta', 'Web y base de datos', '12,000', ['Hasta 10 secciones con animaciones', 'Catálogo, clientes o citas guardados (3 tipos de registro)', 'Panel para editar tu contenido', 'Respaldos de tu información'], [H, 'WhatsApp automático e IA', X], '2 rondas de revisión', SV.con]]],
      sw: ['Software', [['App a la medida', 'Web o móvil, con usuarios y panel', '35,000', ['Usuarios con roles', 'Panel de control', 'Alcance y entregables por escrito'], [H, 'Mantenimiento mensual (opcional)', 'Funciones fuera del alcance acordado'], 'Rondas de revisión definidas en la propuesta', SV.app]]],
      db: ['Datos', [['Base de datos sola', 'Diseño, optimización y migración', '4,500', ['Diseño de la base de datos', 'Optimización y migración de lo que ya tienes', 'Respaldos', 'Reportes o tablero, según el alcance'], ['Página web o aplicación (se cotizan aparte)', 'Mantenimiento mensual (opcional)'], 'Alcance y revisiones definidos en la propuesta', SV.db]]],
      ia: ['Automatización e IA', [['WhatsApp Básico', 'Web simple y WhatsApp Business', '7,900', ['Todo lo de Esencial', 'WhatsApp Business con catálogo', 'Saludo, mensaje de ausencia y respuestas rápidas', 'Liga para que tus clientes agenden'], ['Respuestas con IA o API oficial (eso es Automatiza)', H, X], '2 rondas de revisión · en tu número de WhatsApp Business', SV.wab], ['Automatiza', 'Web, datos y WhatsApp', '18,500', ['Todo lo de Conecta', 'Respuestas automáticas 24/7', 'Confirmación de citas y pedidos', 'Recordatorios a tus clientes'], ['Costo de la API oficial de Meta', H, 'Asistente de IA'], '3 rondas de revisión · hasta 3 flujos de mensajes', SV.aut], ['Inteligente', 'Web, datos e IA en tu página', '26,500', ['Todo lo de Conecta', 'Asesor de IA con tu catálogo', 'Resuelve preguntas frecuentes', 'Opción de sumar WhatsApp'], ['Costo por consulta de la IA', H, 'Mantenimiento mensual (opcional)'], '3 rondas de revisión · un asistente y un catálogo', SV.ia, 1]]]
    };
    const ks = Object.keys(PK);
    function showPk(k) {$('pkg').innerHTML = PK[k][1].map(([n, d, p, i, no, rv, s, r]) => `<article class="pk${r ? ' rec' : ''}">${r ? '<span class="tag" style="align-self:flex-start">Recomendado</span>' : ''}<h3>${n}</h3><p class="mu">${d}</p><p class="p">$${p} <small>desde, MXN</small></p><h4>Incluye</h4><ul>${i.map(x => `<li>${x}</li>`).join('')}</ul><h4>No incluye</h4><ul class="no">${no.map(x => `<li>${x}</li>`).join('')}</ul><p class="lm">${rv}</p><a class="btn ${r ? 'bg' : ''}" href="#cotizador" data-svc="${s}">Cotizar ${n}</a></article>`).join('')}
    tabs($('pt'), ks.map(k => PK[k][0]), i => showPk(ks[i])); showPk(ks[0]);

    /* Pestañas accesibles (teclado: flechas) */
    function tabs(box, names, cb) {
      box.innerHTML = names.map((t, i) => `<button class="tab" role="tab" aria-selected="${i == 0}" tabindex="${i ? -1 : 0}">${t}</button>`).join(''); const b = [...box.children];
      const sel = i => {b.forEach((x, j) => {x.setAttribute('aria-selected', j == i); x.tabIndex = j == i ? 0 : -1}); cb(i)};
      b.forEach((x, i) => {x.onclick = () => sel(i); x.onkeydown = e => {const d = {ArrowRight: 1, ArrowLeft: -1}[e.key]; if (d) {const n = (i + d + b.length) % b.length; sel(n); b[n].focus(); e.preventDefault()} }})
    }


    /* Cotizador */
    const sel = $('qs'); sel.innerHTML = Object.values(SV).map(v => `<option>${v}</option>`).join('');
    function msg() {return [`Hola, soy ${$('qn').value.trim() || '(mi nombre)'}.`, `Quiero cotizar: ${sel.value}.`, $('qb').value.trim() && `Mi negocio: ${$('qb').value.trim()}.`, $('qd').value.trim() && `Detalles: ${$('qd').value.trim()}`, '¿Me compartes una propuesta?'].filter(Boolean).join('\n')}
    function build() {$('qa').href = 'https://wa.me/525564331354?text=' + encodeURIComponent(msg()); $('qe').href = 'mailto:business@nexotechstudios.com?subject=' + encodeURIComponent('Cotización: ' + sel.value) + '&body=' + encodeURIComponent(msg())}
    document.querySelectorAll('.q input,.q textarea,.q select').forEach(e => e.addEventListener('input', build)); build();
    [$('qa'), $('qe')].forEach(a => a.addEventListener('click', e => {const m = $('qm'); if ($('qn').value.trim().length < 2) {e.preventDefault(); m.textContent = 'Escribe tu nombre para saber con quién hablar.'; m.style.color = '#E0907A'; $('qn').focus(); return } build(); m.style.color = 'var(--ok)'; m.textContent = 'Abriendo tu cotización lista para enviar.'}));
    document.addEventListener('click', e => {const a = e.target.closest('[data-svc]'); if (a) {sel.value = a.dataset.svc; build()} });
    document.querySelectorAll('.mm a').forEach(a => a.addEventListener('click', () => a.closest('details').open = false));

    /* Aparición deslizante al hacer scroll */
    if ('IntersectionObserver' in window && !reduce) {
      const RV = [['.w > .hd', 'rl'], ['#pkg', 'rr'], ['.sec .eb', ''], ['.g3 > .cd', ''], ['.g4 > .cd', ''], ['.stp > li', ''], ['.note', ''], ['.fq details', ''], ['.q', ''], ['.ct', ''], ['#contacto .t', ''], ['.cs:not(.cs-alt) > .cs-v', 'rl'], ['.cs-alt > .cs-v', 'rr'], ['.cs:not(.cs-alt) > .cs-t', 'rr'], ['.cs-alt > .cs-t', 'rl'], ['.hx-cap', '']], els = [];
      RV.forEach(([q, c]) => document.querySelectorAll(q).forEach(e => {e.classList.add('rv'); if (c) e.classList.add(c); els.push(e)}));
      const io = new IntersectionObserver(es => {let k = 0; es.forEach(en => {if (!en.isIntersecting) return; const t = en.target, dl = Math.min(k++, 4) * 90; t.style.setProperty('--dl', dl + 'ms'); t.classList.add('in'); io.unobserve(t); setTimeout(() => {t.classList.remove('rv', 'rl', 'rr', 'in'); t.style.removeProperty('--dl')}, 1200 + dl)})}, {threshold: .12, rootMargin: '0px 0px -6% 0px'});
      els.forEach(e => io.observe(e))
    }
  
