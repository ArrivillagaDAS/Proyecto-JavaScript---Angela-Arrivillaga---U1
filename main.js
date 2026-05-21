class CpToast extends HTMLElement {

  constructor() {
    super();
    this._svgs = {
      success: `<svg width="16" height="16" fill="none" stroke="#22c55e" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
      error:   `<svg width="16" height="16" fill="none" stroke="#ef4444" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
      warning: `<svg width="16" height="16" fill="none" stroke="#f59e0b" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      info:    `<svg width="16" height="16" fill="none" stroke="#3b82f6" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    };
    this.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none';
  }
  show(msg, type = 'info', duration = 3500) {
    const el = document.createElement('div');
    el.style.cssText = `display:flex;align-items:flex-start;gap:10px;padding:13px 16px;border-radius:10px;background:#1e2840;border:1px solid #252e45;box-shadow:0 8px 32px rgba(0,0,0,.4);min-width:280px;max-width:380px;pointer-events:all;animation:_tIn .3s ease forwards;font-family:'Barlow',sans-serif;font-size:14px;line-height:1.4;color:#e2e8f4`;
    const colors = { success:'#22c55e', error:'#ef4444', warning:'#f59e0b', info:'#3b82f6' };
    const icono = this._svgs[type] || this._svgs.info;
    el.innerHTML = `<span style="flex-shrink:0;margin-top:1px">${icono}</span><span style="flex:1;color:${colors[type]||'#e2e8f4'}">${msg}</span>`;
    this.appendChild(el);
    setTimeout(() => {
      el.style.animation = '_tOut .2s ease forwards';
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }, duration);
  }
}

class CpBadge extends HTMLElement {
  static get observedAttributes() { return ['status']; }
  connectedCallback() { this._renderizar(); }
  attributeChangedCallback() { this._renderizar(); }
  _renderizar() {
    const s = this.getAttribute('status') || 'active';
    const labels = {
      active: '<span style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block"></span> Activo',
      completed: '<span style="font-family:\'Barlow Condensed\',sans-serif;font-weight:700;letter-spacing:.04em">Completado</span>'
    };
    const styles = {
      active: 'background:rgba(34,197,94,.12);color:#22c55e;border:1px solid rgba(34,197,94,.2)',
      completed: 'background:rgba(59,130,246,.12);color:#3b82f6;border:1px solid rgba(59,130,246,.2)'
    };
    this.style.cssText = `display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:4px;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;${styles[s]||styles.active}`;
    this.innerHTML = labels[s] || labels.active;
  }
}

class CpStatCard extends HTMLElement {
  // iconos svg para cada tipo de stat
  static svgs = {
    vehiculos: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>`,
    activos:   `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 12h3a2 2 0 0 0 0-4H9v8"/></svg>`,
    check:     `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
    ingresos:  `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  };

  connectedCallback() { this._renderizar(); }
  _renderizar() {
    const val = this.getAttribute('value') || '0';
    const lbl = this.getAttribute('label') || '';
    const iconKey = this.getAttribute('icon-key') || 'vehiculos';
    const accent = this.getAttribute('accent') || '#f97316';
    const accentDim = this.getAttribute('accent-dim') || 'rgba(249,115,22,.12)';
    const small = this.getAttribute('small') === 'true';
    const svg = CpStatCard.svgs[iconKey] || CpStatCard.svgs.vehiculos;
    this.style.cssText = `background:#131929;border:1px solid #252e45;border-radius:10px;padding:20px;position:relative;overflow:hidden;display:block`;
    this.innerHTML = `
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${accent}"></div>
      <div style="width:38px;height:38px;border-radius:9px;background:${accentDim};display:flex;align-items:center;justify-content:center;margin-bottom:14px;color:${accent}">${svg}</div>
      <div style="font-family:'Barlow Condensed',sans-serif;font-size:${small?'21px':'30px'};font-weight:800;line-height:1;color:#e2e8f4">${val}</div>
      <div style="font-size:10px;font-weight:600;font-family:'Barlow',sans-serif;color:#94a3b8;margin-top:6px;letter-spacing:.1em;text-transform:uppercase">${lbl}</div>
    `;
  }
}

customElements.define('cp-toast', CpToast);
customElements.define('cp-badge', CpBadge);
customElements.define('cp-stat-card', CpStatCard);


// utilidades varias

const svgTarjeta = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`;

const $ = id => document.getElementById(id);
const obtenerIdUnico = () => Math.random().toString(36).substr(2,9) + Date.now().toString(36);
const formatearMoneda = v => new Intl.NumberFormat('es-GT',{style:'currency',currency:'GTQ'}).format(v);
const formatearFecha = d => { try { return new Date(d+'T12:00:00').toLocaleDateString('es-GT',{day:'2-digit',month:'short',year:'numeric'}); } catch { return d; } };
const componenteToast = document.getElementById('anfitrionToast');
const lanzarToast = (msg, type='info') => componenteToast.show(msg, type);
function mostrarError(id, msg) { const e = $(id); if(e){ e.textContent = msg; e.classList.remove('hidden'); } }
function ocultarError(id) { const e = $(id); if(e) e.classList.add('hidden'); }

// devuelve la hora actual en formato HH:MM
function horaActual() { return new Date().toTimeString().slice(0,5); }


// localStorage wrapper 

const Almacen = {
  _obtener(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  _guardar(k,v) { localStorage.setItem(k, JSON.stringify(v)); },
  obtenerUsuario()   { return this._obtener('cp_user') || { name:'Admin', email:'admin@campusparking.com', password:'Admin123' }; },
  guardarUsuario(u)  { this._guardar('cp_user', u); },
  obtenerTipos()  { return this._obtener('cp_types') || []; },
  guardarTipos(a) { this._guardar('cp_types', a); },
  obtenerRegistros()   { return this._obtener('cp_recs') || []; },
  guardarRegistros(a)  { this._guardar('cp_recs', a); },
};
if (!Almacen._obtener('cp_user')) Almacen.guardarUsuario({ name:'Admin', email:'admin@campusparking.com', password:'Admin123' });


// slots disponibles del parqueadero — A-01 hasta A-20

const SLOTS_TOTALES = Array.from({ length: 20 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `A-${num}`;
});

// devuelve los slots que no tienen un registro activo en este momento
function obtenerSlotsLibres(idExcluir = null) {
  const recs = Almacen.obtenerRegistros();
  const ocupados = recs
    .filter(r => r.status === 'active' && r.id !== idExcluir)
    .map(r => r.slot);
  return SLOTS_TOTALES.filter(s => !ocupados.includes(s));
}

// llena un <select> con los slots libres
function llenarSelectSlots(selectId, slotActual = null, idExcluir = null) {
  const sel = $(selectId);
  const libres = obtenerSlotsLibres(idExcluir);
  const lista = (slotActual && !libres.includes(slotActual))
    ? [slotActual, ...libres]
    : libres;
  if (!lista.length) {
    sel.innerHTML = '<option value="">— Sin espacios disponibles —</option>';
    return;
  }
  sel.innerHTML = '<option value="">— Elige un espacio —</option>' +
    lista.map(s => `<option value="${s}"${s === slotActual ? ' selected' : ''}>${s}</option>`).join('');
}


// autenticacion — login, registro y manejo de sesion

const Autenticacion = {
  _usuarioActual: null,
  estaLogueado() {
    const u = localStorage.getItem('cp_sesion_activa');
    if (u) {
      this._usuarioActual = JSON.parse(u);
      return true;
    }
    return false;
  },
  obtenerUsuarioLogueado() {
    return this._usuarioActual;
  },
  iniciarSesion(correo, pass) {
    const correoLimpio = correo.trim().toLowerCase();
    const adminConfig = Almacen.obtenerUsuario();
    if (correoLimpio === adminConfig.email.toLowerCase() && pass === adminConfig.password) {
      this._usuarioActual = { usuario: 'admin', nombre: adminConfig.name, correo: adminConfig.email, rol: 'admin' };
      localStorage.setItem('cp_sesion_activa', JSON.stringify(this._usuarioActual));
      return true;
    }
    const cuentas = JSON.parse(localStorage.getItem('cp_cuentas_clientes') || '[]');
    const cuentaEncontrada = cuentas.find(c => c.correo.toLowerCase() === correoLimpio && c.clave === pass);
    if (cuentaEncontrada) {
      this._usuarioActual = { usuario: cuentaEncontrada.correo, nombre: cuentaEncontrada.nombre, correo: cuentaEncontrada.correo, rol: 'cliente' };
      localStorage.setItem('cp_sesion_activa', JSON.stringify(this._usuarioActual));
      return true;
    }
    return false;
  },
  registrarCliente(nombre, correo, clave) {
    if (!nombre || !correo || !clave) return false;
    const correoLimpio = correo.trim().toLowerCase();
    const adminConfig = Almacen.obtenerUsuario();
    if (correoLimpio === adminConfig.email.toLowerCase()) {
      lanzarToast('El correo electronico coincide con el administrador.', 'error');
      return false;
    }
    const cuentas = JSON.parse(localStorage.getItem('cp_cuentas_clientes') || '[]');
    if (cuentas.find(c => c.correo.toLowerCase() === correoLimpio)) {
      lanzarToast('El correo electronico ya esta registrado.', 'error');
      return false;
    }
    cuentas.push({ nombre, correo: correoLimpio, clave });
    localStorage.setItem('cp_cuentas_clientes', JSON.stringify(cuentas));
    return true;
  },
  cerrarSesion() {
    this._usuarioActual = null;
    localStorage.removeItem('cp_sesion_activa');
    $('correoLogin').value = '';
    $('claveLogin').value = '';
    $('vistaApp').classList.add('hidden');
    $('vistaCliente').classList.add('hidden');
    $('vistaLogin').classList.remove('hidden');
  }
};


// helpers para abrir/cerrar overlays

const Modal = {
  abrir(id) { $(id).classList.add('open'); },
  cerrar(id) { $(id).classList.remove('open'); }
};
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => Modal.cerrar(b.dataset.close)));
document.querySelectorAll('.overlay').forEach(o => o.addEventListener('click', e => { if(e.target===o) Modal.cerrar(o.id); }));


// navegacion entre vistas del admin

const Navegacion = {
  titulos: { panel:'Dashboard', tiposVehiculo:'Tipos de Vehículo', parqueadero:'Parqueadero', reportes:'Reportes' },
  irA(vista) {
    document.querySelectorAll('.vs').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.ni[data-view]').forEach(n => n.classList.remove('active'));
    $(`vista${vista.charAt(0).toUpperCase() + vista.slice(1)}`).classList.add('active');
    const btn = document.querySelector(`.ni[data-view="${vista}"]`);
    if (btn) btn.classList.add('active');
    $('tituloBarraSuperior').textContent = this.titulos[vista] || vista;
    this.cerrarBarraLateral();
    if (vista==='panel') PanelDashboard.renderizar();
    else if (vista==='tiposVehiculo') TiposVehiculo.renderizar();
    else if (vista==='parqueadero') ParqueaderoModulo.renderizar();
    // al entrar a reportes inicializamos las fechas por defecto
    else if (vista==='reportes') ReportesModulo.init();
  },
  cerrarBarraLateral() { $('barraLateral').classList.remove('open'); $('capaSuperpuestaLateral').classList.remove('show'); },
  alternarBarraLateral() { $('barraLateral').classList.toggle('open'); $('capaSuperpuestaLateral').classList.toggle('show'); }
};


// perfil del administrador
// al guardar cualquier cambio (nombre, correo o contrasena) se cierra la sesion

const Perfil = {
  abrir() {
    const u = Almacen.obtenerUsuario();
    $('perfilNombre').value = u.name;
    $('perfilCorreo').value = u.email;
    $('perfilClave').value = '';
    $('perfilClaveConfirmar').value = '';
    ocultarError('errorPerfilClave');
    Modal.abrir('capaPerfil');
  },
  guardar() {
    const name  = $('perfilNombre').value.trim();
    const email = $('perfilCorreo').value.trim();
    const pass  = $('perfilClave').value;
    const passC = $('perfilClaveConfirmar').value;
    if (!name || !email) { lanzarToast('Nombre y correo son requeridos.', 'error'); return; }
    if (pass && pass !== passC) { $('errorPerfilClave').classList.remove('hidden'); return; }
    ocultarError('errorPerfilClave');
    const u = Almacen.obtenerUsuario();
    u.name = name; u.email = email;
    if (pass) u.password = pass;
    Almacen.guardarUsuario(u);
    Modal.cerrar('capaPerfil');
    lanzarToast('Perfil actualizado. Por seguridad, vuelve a iniciar sesion.', 'success');
    // cerramos la sesion para que el usuario confirme su identidad con los nuevos datos
    setTimeout(() => Autenticacion.cerrarSesion(), 1800);
  }
};


// crud de tipos de vehiculo

const TiposVehiculo = {
  _idEditar: null,
  renderizar() {
    const types = Almacen.obtenerTipos();
    const body  = $('cuerpoTiposVehiculo');
    if (!types.length) { body.innerHTML=''; $('vacioTiposVehiculo').classList.remove('hidden'); return; }
    $('vacioTiposVehiculo').classList.add('hidden');
    body.innerHTML = types.map(t => `
      <tr>
        <td><span class="mono">${t.code}</span></td>
        <td>${t.name}</td>
        <td><strong>${formatearMoneda(t.rate)}</strong></td>
        <td><div class="acts">
          <button class="btn btn-ghost btn-icon btn-sm" title="Editar" onclick="TiposVehiculo.editar('${t.id}')">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn btn-danger btn-icon btn-sm" title="Eliminar" onclick="TiposVehiculo.confirmarEliminacion('${t.id}')">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6M14,11v6M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2"/></svg>
          </button>
        </div></td>
      </tr>`).join('');
  },
  abrirNuevo() {
    this._idEditar = null;
    $('tituloModalTipoVehiculo').textContent = 'Nuevo Tipo de Vehículo';
    $('codigoTipoVehiculo').value = ''; $('nombreTipoVehiculo').value = ''; $('tarifaTipoVehiculo').value = '';
    ['errorCodigoTipoVehiculo','errorNombreTipoVehiculo','errorTarifaTipoVehiculo'].forEach(ocultarError);
    Modal.abrir('capaTiposVehiculo');
  },
  editar(id) {
    const t = Almacen.obtenerTipos().find(x => x.id===id);
    if (!t) return;
    this._idEditar = id;
    $('tituloModalTipoVehiculo').textContent = 'Editar Tipo de Vehículo';
    $('codigoTipoVehiculo').value = t.code; $('nombreTipoVehiculo').value = t.name; $('tarifaTipoVehiculo').value = t.rate;
    ['errorCodigoTipoVehiculo','errorNombreTipoVehiculo','errorTarifaTipoVehiculo'].forEach(ocultarError);
    Modal.abrir('capaTiposVehiculo');
  },
  guardar() {
    const code = $('codigoTipoVehiculo').value.trim().toUpperCase();
    const name = $('nombreTipoVehiculo').value.trim();
    const rate = parseFloat($('tarifaTipoVehiculo').value);
    let ok = true;
    if (!code) { mostrarError('errorCodigoTipoVehiculo','El código es requerido.'); ok=false; } else ocultarError('errorCodigoTipoVehiculo');
    if (!name) { mostrarError('errorNombreTipoVehiculo','El nombre es requerido.'); ok=false; } else ocultarError('errorNombreTipoVehiculo');
    if (isNaN(rate)||rate<0) { mostrarError('errorTarifaTipoVehiculo','Ingrese una tarifa válida.'); ok=false; } else ocultarError('errorTarifaTipoVehiculo');
    if (!ok) return;
    const types = Almacen.obtenerTipos();
    if (types.find(t => t.code===code && t.id!==this._idEditar)) { mostrarError('errorCodigoTipoVehiculo','Código ya existe.'); return; }
    if (this._idEditar) {
      const i = types.findIndex(t => t.id===this._idEditar);
      types[i] = {...types[i], code, name, rate};
      lanzarToast('Tipo actualizado.', 'success');
    } else {
      types.push({ id:obtenerIdUnico(), code, name, rate, createdAt:Date.now() });
      lanzarToast('Tipo de vehículo creado.', 'success');
    }
    Almacen.guardarTipos(types); Modal.cerrar('capaTiposVehiculo'); this.renderizar();
  },
  confirmarEliminacion(id) {
    const t = Almacen.obtenerTipos().find(x => x.id===id);
    const active = Almacen.obtenerRegistros().some(r => r.vehicleTypeId===id && r.status==='active');
    if (active) { lanzarToast('No se puede eliminar: tipo en uso por vehículos activos.', 'error'); return; }
    $('mensajeConfirmar').textContent = `¿Eliminar el tipo "${t?.name}"? Esta acción no se puede deshacer.`;
    $('btnConfirmarEliminar').onclick = () => { this._eliminar(id); Modal.cerrar('capaConfirmar'); };
    Modal.abrir('capaConfirmar');
  },
  _eliminar(id) {
    Almacen.guardarTipos(Almacen.obtenerTipos().filter(t => t.id!==id));
    lanzarToast('Tipo eliminado.', 'success'); this.renderizar();
  }
};


// registros de entrada/salida del parqueadero

const ParqueaderoModulo = {
  _idEditar: null,
  _idFinalizar: null,
  _busqueda: '',
  // hora capturada cuando se abre el formulario de nuevo registro
  _horaEntradaCapturada: null,
  renderizar() {
    const recs  = Almacen.obtenerRegistros();
    const types = Almacen.obtenerTipos();
    const body  = $('cuerpoParqueadero');
    const q = this._busqueda.toUpperCase();
    const list = q ? recs.filter(r => r.plate.includes(q)) : recs;
    if (!list.length) { body.innerHTML=''; $('vacioParqueadero').classList.remove('hidden'); return; }
    $('vacioParqueadero').classList.add('hidden');
    body.innerHTML = list.map(r => {
      const vt = types.find(t => t.id===r.vehicleTypeId);
      return `<tr>
        <td><span class="plate">${r.plate}</span></td>
        <td>${vt?.name||'—'}</td>
        <td><span class="mono">${r.slot}</span></td>
        <td>${formatearFecha(r.date)}</td>
        <td><span class="mono">${r.entryTime}</span></td>
        <td><span class="mono">${r.exitTime||'—'}</span></td>
        <td>${r.cost!=null?`<strong>${formatearMoneda(r.cost)}</strong>`:'—'}</td>
        <td><cp-badge status="${r.status}"></cp-badge></td>
        <td><div class="acts">
          ${r.status==='active'?`<button class="btn btn-success btn-sm" onclick="ParqueaderoModulo.abrirFinalizar('${r.id}')">Salida</button>`:''}
          <button class="btn btn-ghost btn-icon btn-sm" onclick="ParqueaderoModulo.editar('${r.id}')" title="Editar">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn btn-danger btn-icon btn-sm" onclick="ParqueaderoModulo.confirmarEliminacion('${r.id}')" title="Eliminar">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6M14,11v6M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2"/></svg>
          </button>
        </div></td>
      </tr>`;
    }).join('');
    document.querySelectorAll('cp-badge').forEach(b => b._renderizar && b._renderizar());
  },
  _llenarTipos() {
    const sel = $('tipoParqueadero');
    sel.innerHTML = '<option value="">— Seleccione un tipo —</option>' +
      Almacen.obtenerTipos().map(t => `<option value="${t.id}">${t.name} — ${formatearMoneda(t.rate)}/h</option>`).join('');
  },
  abrirNuevo() {
    if (!Almacen.obtenerTipos().length) { lanzarToast('Primero debe crear tipos de vehículo.','warning'); return; }
    this._idEditar = null;
    $('tituloModalParqueadero').textContent = 'Nuevo Registro';
    $('placaParqueadero').value = '';
    $('fechaParqueadero').value = new Date().toISOString().split('T')[0];
    // capturamos la hora exacta en que el admin abre el formulario
    this._horaEntradaCapturada = horaActual();
    $('entradaParqueadero').value = this._horaEntradaCapturada;
    // llenamos el select con los slots disponibles en este momento
    llenarSelectSlots('slotParqueadero');
    this._llenarTipos();
    ['errorPlacaParqueadero','errorSlotParqueadero','errorTipoParqueadero'].forEach(ocultarError);
    Modal.abrir('capaParqueadero');
  },
  editar(id) {
    const r = Almacen.obtenerRegistros().find(x => x.id===id);
    if (!r) return;
    this._idEditar = id;
    $('tituloModalParqueadero').textContent = 'Editar Registro';
    $('placaParqueadero').value = r.plate;
    $('fechaParqueadero').value = r.date;
    // al editar conservamos la hora original del registro
    this._horaEntradaCapturada = r.entryTime;
    $('entradaParqueadero').value = r.entryTime;
    // al editar incluimos el slot actual aunque ya no este libre
    llenarSelectSlots('slotParqueadero', r.slot, id);
    this._llenarTipos();
    $('tipoParqueadero').value = r.vehicleTypeId;
    ['errorPlacaParqueadero','errorSlotParqueadero','errorTipoParqueadero'].forEach(ocultarError);
    Modal.abrir('capaParqueadero');
  },
  guardar() {
    const plate = $('placaParqueadero').value.trim().toUpperCase();
    const slot  = $('slotParqueadero').value;
    const vtId  = $('tipoParqueadero').value;
    const date  = $('fechaParqueadero').value;
    const entry = this._horaEntradaCapturada;
    let ok = true;
    if (!plate) { mostrarError('errorPlacaParqueadero','La placa es requerida.'); ok=false; }
    else if (!/^[A-Z]{3}[0-9]{3}$/.test(plate)) { mostrarError('errorPlacaParqueadero','Formato inválido. Use ABC123 (3 letras + 3 números).'); ok=false; }
    else ocultarError('errorPlacaParqueadero');
    if (!slot) { mostrarError('errorSlotParqueadero','Seleccione un slot disponible.'); ok=false; } else ocultarError('errorSlotParqueadero');
    if (!vtId) { mostrarError('errorTipoParqueadero','Seleccione un tipo.'); ok=false; } else ocultarError('errorTipoParqueadero');
    if (!ok) return;
    const recs = Almacen.obtenerRegistros();
    if (recs.find(r => r.plate===plate && r.status==='active' && r.id!==this._idEditar)) { mostrarError('errorPlacaParqueadero','Esta placa ya tiene un servicio activo.'); return; }
    if (recs.find(r => r.slot===slot && r.status==='active' && r.id!==this._idEditar)) { mostrarError('errorSlotParqueadero','Este slot ya está ocupado.'); return; }
    if (this._idEditar) {
      const i = recs.findIndex(r => r.id===this._idEditar);
      recs[i] = {...recs[i], plate, slot, vehicleTypeId:vtId, date, entryTime:entry};
      lanzarToast('Registro actualizado.', 'success');
    } else {
      recs.unshift({ id:obtenerIdUnico(), plate, slot, vehicleTypeId:vtId, date, entryTime:entry, exitTime:null, cost:null, status:'active', createdAt:Date.now() });
      lanzarToast('Vehículo registrado.', 'success');
    }
    Almacen.guardarRegistros(recs); Modal.cerrar('capaParqueadero'); this.renderizar();
  },
  abrirFinalizar(id) {
    const r = Almacen.obtenerRegistros().find(x => x.id===id);
    if (!r) return;
    this._idFinalizar = id;
    const vt = Almacen.obtenerTipos().find(t => t.id===r.vehicleTypeId);
    $('infoFinalizar').innerHTML = `<strong style="font-family:'JetBrains Mono',monospace;background:#fff;color:#111;padding:2px 8px;border-radius:4px;border:2px solid #222;letter-spacing:.1em">${r.plate}</strong> &nbsp;·&nbsp; ${vt?.name||'—'} &nbsp;·&nbsp; Entrada: <strong>${r.entryTime}</strong> &nbsp;·&nbsp; Tarifa: <strong>${formatearMoneda(vt?.rate||0)}/h</strong>`;
    ocultarError('errorFinalizar'); $('pantallaCosto').classList.add('hidden');
    Modal.abrir('capaFinalizar');
  },
  // calcula el costo usando la hora actual como salida — no se puede elegir hora manual
  _calcularCosto() {
    const r  = Almacen.obtenerRegistros().find(x => x.id===this._idFinalizar);
    if (!r) return null;
    const vt = Almacen.obtenerTipos().find(t => t.id===r.vehicleTypeId);
    // la hora de salida es ahora mismo, no la elige el usuario
    const exitT = horaActual();
    const [eh,em] = r.entryTime.split(':').map(Number);
    const [xh,xm] = exitT.split(':').map(Number);
    const eM = eh*60+em, xM = xh*60+xm;
    if (xM <= eM) { mostrarError('errorFinalizar','La hora de salida actual es igual o anterior a la entrada. Verifica el horario.'); return null; }
    ocultarError('errorFinalizar');
    const mins = xM - eM;
    const hrs  = mins / 60;
    const cost = Math.ceil(hrs * (vt?.rate||0));
    const h = Math.floor(mins/60), m = mins%60;
    $('duracionCosto').textContent = `Duración: ${h}h ${m}m`;
    $('montoCosto').textContent = formatearMoneda(cost);
    $('pantallaCosto').classList.remove('hidden');
    return { exitTime: exitT, cost };
  },
  finalizar() {
    const res = this._calcularCosto();
    if (!res) return;
    const recs = Almacen.obtenerRegistros();
    const i = recs.findIndex(r => r.id===this._idFinalizar);
    recs[i] = {...recs[i], exitTime:res.exitTime, cost:res.cost, status:'completed'};
    Almacen.guardarRegistros(recs);
    Modal.cerrar('capaFinalizar');
    this.renderizar();
    lanzarToast(`Servicio finalizado. Total: ${formatearMoneda(res.cost)}`, 'success');
  },
  confirmarEliminacion(id) {
    $('mensajeConfirmar').textContent = '¿Está seguro de que desea eliminar este registro de parqueo?';
    $('btnConfirmarEliminar').onclick = () => { this._eliminar(id); Modal.cerrar('capaConfirmar'); };
    Modal.abrir('capaConfirmar');
  },
  _eliminar(id) {
    Almacen.guardarRegistros(Almacen.obtenerRegistros().filter(r => r.id!==id));
    lanzarToast('Registro eliminado.', 'success'); this.renderizar();
  }
};


// dashboard — estadísticas y tabla de recientes

const PanelDashboard = {

  renderizar() {
    const recs  = Almacen.obtenerRegistros();
    const types = Almacen.obtenerTipos();
    const today = new Date().toISOString().split('T')[0];
    const active       = recs.filter(r => r.status==='active').length;
    const compToday    = recs.filter(r => r.status==='completed' && r.date===today);
    const revenue      = compToday.reduce((s,r) => s+(r.cost||0), 0);
    $('fechaPanel').textContent = new Date().toLocaleDateString('es-GT',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
    $('cuadriculaEstadisticas').innerHTML = `
      <cp-stat-card value="${types.length}" label="Tipos de vehículo" icon-key="vehiculos" accent="#f97316" accent-dim="rgba(249,115,22,.12)"></cp-stat-card>
      <cp-stat-card value="${active}" label="Vehículos activos" icon-key="activos" accent="#22c55e" accent-dim="rgba(34,197,94,.12)"></cp-stat-card>
      <cp-stat-card value="${compToday.length}" label="Completados hoy" icon-key="check" accent="#3b82f6" accent-dim="rgba(59,130,246,.12)"></cp-stat-card>
      <cp-stat-card value="${formatearMoneda(revenue)}" label="Ingresos hoy" icon-key="ingresos" accent="#f59e0b" accent-dim="rgba(245,158,11,.12)" small="true"></cp-stat-card>
    `;
    document.querySelectorAll('cp-stat-card').forEach(c => c.connectedCallback && c.connectedCallback());

    // disponibilidad por tipo
    const CAPACIDAD_POR_TIPO = 10;
    const espaciosHtml = types.length ? types.map(t => {
      const ocupados = recs.filter(r => r.vehicleTypeId === t.id && r.status === 'active').length;
      const disponibles = Math.max(0, CAPACIDAD_POR_TIPO - ocupados);
      const pct = Math.round((disponibles / CAPACIDAD_POR_TIPO) * 100);
      const color = pct > 50 ? '#22c55e' : pct > 20 ? '#f59e0b' : '#ef4444';
      return `<tr>
        <td style="padding:12px 16px; font-weight:600">${t.name}</td>
        <td style="padding:12px 16px; text-align:center"><span class="mono">${ocupados}</span></td>
        <td style="padding:12px 16px; text-align:center"><span style="color:${color}; font-weight:700; font-family:var(--fm)">${disponibles}</span></td>
        <td style="padding:12px 16px">
          <div style="background:var(--bg);border-radius:4px;height:8px;overflow:hidden">
            <div style="height:100%;width:${pct}%;background:${color};border-radius:4px;transition:width .3s"></div>
          </div>
        </td>
      </tr>`;
    }).join('') : `<tr><td colspan="4" style="padding:20px;text-align:center;color:var(--text-d)">No hay tipos de vehículo configurados.</td></tr>`;
    $('tablaEspaciosDisponibles').innerHTML = espaciosHtml;
    const recent = recs.slice(0,8);
    $('cuerpoRecientes').innerHTML = !recent.length
      ? `<tr><td colspan="5" style="text-align:center;padding:32px;color:#4a5568">Sin registros recientes.</td></tr>`
      : recent.map(r => {
          const vt = types.find(t => t.id===r.vehicleTypeId);
          return `<tr>
            <td><span class="plate">${r.plate}</span></td>
            <td>${vt?.name||'—'}</td>
            <td><span class="mono">${r.slot}</span></td>
            <td><span class="mono">${r.date} ${r.entryTime}</span></td>
            <td><cp-badge status="${r.status}"></cp-badge></td>
          </tr>`;
        }).join('');
    document.querySelectorAll('cp-badge').forEach(b => b._renderizar && b._renderizar());
  }
};


// todo lo que ve el cliente registrado

const ClienteModulo = {
  // hora guardada al momento de abrir el formulario de registro
  _horaEntradaCliente: null,

  init() {
    this.renderizarPanelCliente();
    this.renderizarMisVehiculos();
    this.renderizarTarifasCliente();
    this.generarQRContactoFijo();
    this._vincularMenuCliente();
    this._vincularEventos();
  },
  _vincularMenuCliente() {
    const elementosMenu = [
      { boton: 'menuCliPanel',        subVista: 'subCliPanel',        titulo: 'Mi Estado' },
      { boton: 'menuCliMisVehiculos', subVista: 'subCliMisVehiculos', titulo: 'Mis Vehículos' },
      { boton: 'menuCliPrecios',      subVista: 'subCliPrecios',      titulo: 'Tarifas del Parqueadero' },
      { boton: 'menuCliUbicacion',    subVista: 'subCliUbicacion',    titulo: 'Ubicación' },
      { boton: 'menuCliContacto',     subVista: 'subCliContacto',     titulo: 'Soporte Administrativo' }
    ];
    elementosMenu.forEach(item => {
      $(item.boton).onclick = () => {
        elementosMenu.forEach(b => {
          $(b.boton).classList.remove('active');
          $(b.subVista).classList.add('hidden');
        });
        $(item.boton).classList.add('active');
        $(item.subVista).classList.remove('hidden');
        $('tituloBarraCliente').textContent = item.titulo;
        if (item.boton === 'menuCliUbicacion') ClienteModulo.iniciarMapa();
      };
    });
  },
  abrirPago(id) {
    const r   = Almacen.obtenerRegistros().find(x => x.id === id);
    if (!r) return;
    this._idPago = id;
    const vt = Almacen.obtenerTipos().find(t => t.id === r.vehicleTypeId);
    $('infoPago').innerHTML = `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <span class="plate">${r.plate}</span>
        <span style="color:var(--text-d)">${vt?.name||'—'}</span>
        <span>Slot <strong>${r.slot}</strong></span>
        <span>Entrada: <strong>${r.entryTime}</strong></span>
        <span style="color:var(--primary);font-weight:600">Tarifa: ${formatearMoneda(vt?.rate||0)}/h</span>
      </div>`;
    // mostramos la hora actual de forma automatica, el cliente no la puede cambiar
    $('salidaPago').value = horaActual();
    $('pantallaCostoPago').classList.add('hidden');
    ['errPagoNum','errPagoNombre','errPagoVence','errPagoCVV','errorSalidaPago'].forEach(ocultarError);
    $('pagoNumTarjeta').value = '';
    $('pagoNombre').value = '';
    $('pagoVence').value = '';
    $('pagoCVV').value = '';
    $('pagoIconoTarjetaInput').innerHTML = svgTarjeta;
    Modal.abrir('capaPago');
  },
  // usa la hora actual como salida, no se puede manipular manualmente
  _calcularCostoPago() {
    const r  = Almacen.obtenerRegistros().find(x => x.id === this._idPago);
    if (!r) return null;
    const vt = Almacen.obtenerTipos().find(t => t.id === r.vehicleTypeId);
    const exitT = horaActual();
    // actualizamos el campo de solo lectura con la hora recalculada
    $('salidaPago').value = exitT;
    const [eh,em] = r.entryTime.split(':').map(Number);
    const [xh,xm] = exitT.split(':').map(Number);
    const eM = eh*60+em, xM = xh*60+xm;
    if (xM <= eM) { mostrarError('errorSalidaPago','La hora actual es igual o anterior a la entrada. Verifica el horario.'); return null; }
    ocultarError('errorSalidaPago');
    const mins = xM - eM;
    const hrs  = mins / 60;
    const cost = Math.ceil(hrs * (vt?.rate||0));
    const h = Math.floor(mins/60), m = mins%60;
    $('duracionPago').textContent = `Duración: ${h}h ${m}m`;
    $('montoPago').textContent = formatearMoneda(cost);
    $('pantallaCostoPago').classList.remove('hidden');
    return { exitTime: exitT, cost };
  },
  confirmarPago() {
    const res = this._calcularCostoPago();
    if (!res) return;
    // validacion basica de datos de tarjeta
    const num    = $('pagoNumTarjeta').value.replace(/\s/g,'');
    const nombre = $('pagoNombre').value.trim();
    const vence  = $('pagoVence').value.trim();
    const cvv    = $('pagoCVV').value.trim();
    let ok = true;
    if (num.length < 16)        { mostrarError('errPagoNum','Número de tarjeta incompleto.'); ok=false; } else ocultarError('errPagoNum');
    if (!nombre)                 { mostrarError('errPagoNombre','Ingrese el nombre.'); ok=false; } else ocultarError('errPagoNombre');
    if (!/^\d{2} \/ \d{2}$/.test(vence)) { mostrarError('errPagoVence','Formato MM / AA.'); ok=false; } else ocultarError('errPagoVence');
    if (cvv.length < 3)         { mostrarError('errPagoCVV','CVV inválido.'); ok=false; } else ocultarError('errPagoCVV');
    if (!ok) return;
    // guardamos el pago con los datos calculados
    const recs = Almacen.obtenerRegistros();
    const i = recs.findIndex(r => r.id === this._idPago);
    recs[i] = {...recs[i], exitTime: res.exitTime, cost: res.cost, status: 'completed'};
    Almacen.guardarRegistros(recs);
    Modal.cerrar('capaPago');
    this.renderizarMisVehiculos();
    this.renderizarPanelCliente();
    lanzarToast(`Pago exitoso — Total: ${formatearMoneda(res.cost)}`, 'success');
  },
  iniciarMapa() {
    if (this._mapaIniciado) { this._mapa.invalidateSize(); return; }
    // edificio TEC, Zona 4, Guatemala
    const lat = 14.6056, lng = -90.5133;
    this._mapa = L.map('mapaLeaflet', { zoomControl: true, scrollWheelZoom: false }).setView([lat, lng], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(this._mapa);
    const icono = L.divIcon({
      html: '<div style="background:var(--primary);width:36px;height:36px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4)"></div>',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      className: ''
    });
    L.marker([lat, lng], { icon: icono })
      .addTo(this._mapa)
      .bindPopup('<b style="font-family:Barlow Condensed,sans-serif;font-size:15px">Campus Parking</b><br><span style="font-size:13px;color:#555">Edificio TEC, Zona 4<br>Ciudad de Guatemala</span>', { maxWidth: 200 })
      .openPopup();
    this._mapaIniciado = true;
  },
  _vincularEventos() {
    $('btnCliRegistrarVehiculo').onclick = () => this.abrirRegistroVehiculo();
    $('btnGuardarVehiculoCliente').onclick = () => this.guardarVehiculo();
    $('cliPlaca').addEventListener('input', function(){ this.value = this.value.toUpperCase(); });
    $('btnCalcularPago').onclick   = () => this._calcularCostoPago();
    $('btnConfirmarPago').onclick   = () => this.confirmarPago();
    $('pagoNumTarjeta').addEventListener('input', function() {
      let v = this.value.replace(/\D/g,'').slice(0,16);
      this.value = v.replace(/(\d{4})(?=\d)/g,'$1 ');
      $('pagoIconoTarjetaInput').innerHTML = svgTarjeta;
    });
    $('pagoVence').addEventListener('input', function() {
      let v = this.value.replace(/\D/g,'');
      if (v.length >= 2) v = v.slice(0,2) + ' / ' + v.slice(2,4);
      this.value = v;
    });
    $('btnPerfilCliente').onclick = () => this.abrirPerfil();
    $('btnGuardarPerfilCliente').onclick = () => this.guardarPerfil();
  },
  renderizarPanelCliente() {
    const u = Autenticacion.obtenerUsuarioLogueado();
    const avatarCli = $('avatarCliente');
    if (avatarCli && u?.nombre) avatarCli.textContent = u.nombre.charAt(0).toUpperCase();
    if ($('nombreClienteSuperior')) $('nombreClienteSuperior').textContent = u?.nombre || 'Cliente';
    if ($('subCliPanelSub')) $('subCliPanelSub').textContent = `Hola, ${u?.nombre || 'Cliente'}`;
    const recs = Almacen.obtenerRegistros();
    const tipos = Almacen.obtenerTipos();
    const CAPACIDAD_POR_TIPO = 10;
    const totalCapacidad = tipos.length * CAPACIDAD_POR_TIPO;
    const activos = recs.filter(r => r.status === 'active').length;
    const disponibles = Math.max(0, totalCapacidad - activos);
    $('cliDisponibles').textContent = `${disponibles} de ${totalCapacidad}`;
    const misRecs = recs.filter(r => r.ownerCorreo === u?.correo && r.status === 'active');
    if (misRecs.length) {
      $('cliStatusAuto').innerHTML = misRecs.map(r => {
        const vt = tipos.find(t => t.id === r.vehicleTypeId);
        const dotSvg = `<svg width="8" height="8" viewBox="0 0 8 8" style="vertical-align:middle;margin-right:4px"><circle cx="4" cy="4" r="4" fill="#22c55e"/></svg>`;
        return `<div style="margin-bottom:6px">${dotSvg}<strong>${r.plate}</strong> · Slot: ${r.slot} · <span style="color:var(--text-d)">${vt?.name||'—'}</span></div>`;
      }).join('');
    } else {
      $('cliStatusAuto').innerHTML = `<span style="color:var(--text-d)">Sin vehículos registrados actualmente.</span>`;
    }
  },
  renderizarMisVehiculos() {
    const u = Autenticacion.obtenerUsuarioLogueado();
    const recs = Almacen.obtenerRegistros().filter(r => r.ownerCorreo === u?.correo);
    const tipos = Almacen.obtenerTipos();
    const body = $('cuerpoMisVehiculos');
    if (!recs.length) { body.innerHTML = ''; $('vacioMisVehiculos').classList.remove('hidden'); return; }
    $('vacioMisVehiculos').classList.add('hidden');
    body.innerHTML = recs.map(r => {
      const vt = tipos.find(t => t.id === r.vehicleTypeId);
      const costoCell = r.status === 'completed'
        ? `<td style="font-family:var(--fm);font-weight:700;color:var(--primary)">${r.cost != null ? formatearMoneda(r.cost) : '—'}</td>`
        : `<td style="color:var(--text-m)">En curso</td>`;
      const accionCell = r.status === 'active'
        ? `<td><button class="btn btn-success btn-sm" onclick="ClienteModulo.abrirPago('${r.id}')">Pagar</button></td>`
        : `<td><span style="font-size:12px;color:var(--text-m)">—</span></td>`;
      return `<tr>
        <td><span class="plate">${r.plate}</span></td>
        <td>${vt?.name||'—'}</td>
        <td><span class="mono">${r.slot}</span></td>
        <td><span class="mono">${r.entryTime}</span></td>
        <td><span class="mono">${r.exitTime||'—'}</span></td>
        ${costoCell}
        <td><cp-badge status="${r.status}"></cp-badge></td>
        ${accionCell}
      </tr>`;
    }).join('');
    document.querySelectorAll('cp-badge').forEach(b => b._renderizar && b._renderizar());
  },
  abrirRegistroVehiculo() {
    const tipos = Almacen.obtenerTipos();
    if (!tipos.length) { lanzarToast('El administrador aún no ha configurado tipos de vehículo.', 'warning'); return; }
    $('cliPlaca').value = '';
    $('cliFecha').value = new Date().toISOString().split('T')[0];
    // capturamos la hora al momento exacto en que el cliente abre el formulario
    this._horaEntradaCliente = horaActual();
    $('cliEntrada').value = this._horaEntradaCliente;
    // llenamos el select de slots con los disponibles ahora mismo
    llenarSelectSlots('cliSlot');
    $('cliTipo').innerHTML = '<option value="">— Seleccione tipo —</option>' +
      tipos.map(t => `<option value="${t.id}">${t.name} — ${formatearMoneda(t.rate)}/h</option>`).join('');
    ['errCliPlaca','errCliSlot','errCliTipo'].forEach(ocultarError);
    Modal.abrir('capaRegistroVehiculoCliente');
  },
  guardarVehiculo() {
    const u = Autenticacion.obtenerUsuarioLogueado();
    const plate = $('cliPlaca').value.trim().toUpperCase();
    const slot  = $('cliSlot').value;
    const vtId  = $('cliTipo').value;
    const date  = $('cliFecha').value;
    const entry = this._horaEntradaCliente;
    let ok = true;
    if (!plate) { mostrarError('errCliPlaca','La placa es requerida.'); ok=false; }
    else if (!/^[A-Z]{3}[0-9]{3}$/.test(plate)) { mostrarError('errCliPlaca','Formato inválido. Ej: ABC123'); ok=false; }
    else ocultarError('errCliPlaca');
    if (!slot) { mostrarError('errCliSlot','Seleccione un slot disponible.'); ok=false; } else ocultarError('errCliSlot');
    if (!vtId) { mostrarError('errCliTipo','Seleccione un tipo.'); ok=false; } else ocultarError('errCliTipo');
    if (!ok) return;
    const recs = Almacen.obtenerRegistros();
    if (recs.find(r => r.plate===plate && r.status==='active')) { mostrarError('errCliPlaca','Esta placa ya tiene un servicio activo.'); return; }
    if (recs.find(r => r.slot===slot && r.status==='active')) { mostrarError('errCliSlot','Este slot ya está ocupado.'); return; }
    recs.unshift({ id:obtenerIdUnico(), plate, slot, vehicleTypeId:vtId, date, entryTime:entry, exitTime:null, cost:null, status:'active', ownerCorreo:u.correo, createdAt:Date.now() });
    Almacen.guardarRegistros(recs);
    Modal.cerrar('capaRegistroVehiculoCliente');
    lanzarToast('¡Vehículo registrado exitosamente!', 'success');
    this.renderizarPanelCliente();
    this.renderizarMisVehiculos();
  },
  abrirPerfil() {
    const u = Autenticacion.obtenerUsuarioLogueado();
    const cuentas = JSON.parse(localStorage.getItem('cp_cuentas_clientes') || '[]');
    const cuenta = cuentas.find(c => c.correo === u?.correo);
    if (!cuenta) return;
    $('cliPerfilNombre').value = cuenta.nombre;
    $('cliPerfilCorreo').value = cuenta.correo;
    $('cliPerfilClave').value = '';
    $('cliPerfilClaveConfirmar').value = '';
    ocultarError('errCliPerfilClave');
    Modal.abrir('capaPerfilCliente');
  },
  // al guardar el perfil del cliente tambien se cierra la sesion
  // para que vuelva a autenticarse con los datos nuevos
  guardarPerfil() {
    const u = Autenticacion.obtenerUsuarioLogueado();
    const nombre = $('cliPerfilNombre').value.trim();
    const correo = $('cliPerfilCorreo').value.trim().toLowerCase();
    const clave  = $('cliPerfilClave').value;
    const claveC = $('cliPerfilClaveConfirmar').value;
    if (!nombre || !correo) { lanzarToast('Nombre y correo son requeridos.', 'error'); return; }
    if (clave && clave !== claveC) { $('errCliPerfilClave').classList.remove('hidden'); return; }
    ocultarError('errCliPerfilClave');
    const cuentas = JSON.parse(localStorage.getItem('cp_cuentas_clientes') || '[]');
    const idx = cuentas.findIndex(c => c.correo === u?.correo);
    if (idx === -1) return;
    cuentas[idx].nombre = nombre;
    cuentas[idx].correo = correo;
    if (clave) cuentas[idx].clave = clave;
    localStorage.setItem('cp_cuentas_clientes', JSON.stringify(cuentas));
    Modal.cerrar('capaPerfilCliente');
    lanzarToast('Perfil actualizado. Por seguridad, vuelve a iniciar sesion.', 'success');
    // cerramos la sesion para que el cliente confirme con los nuevos datos
    setTimeout(() => Autenticacion.cerrarSesion(), 1800);
  },
  renderizarTarifasCliente() {
    const listadoTipos = Almacen.obtenerTipos();
    const tablaCuerpo = $('cuerpoPreciosCliente');
    if (!listadoTipos.length) {
      tablaCuerpo.innerHTML = `<tr><td colspan="2" style="padding:12px; text-align:center; color:var(--text-d)">No hay tarifas configuradas.</td></tr>`;
      return;
    }
    tablaCuerpo.innerHTML = listadoTipos.map(t => `
      <tr style="border-bottom:1px solid var(--border)">
        <td style="padding:12px; font-weight:600;">${t.name}</td>
        <td style="padding:12px; text-align:right; font-family:var(--fm); color:var(--primary); font-weight:700;">${formatearMoneda(t.rate)}/h</td>
      </tr>
    `).join('');
  },
  generarQRContactoFijo() {
    const textoMensajeWhatsApp = "Hola Soporte de Campus Parking Guatemala, requiero asistencia con un espacio del parqueadero.";
    const urlEnlaceCompleto = `https://wa.me/50254067622?text=${encodeURIComponent(textoMensajeWhatsApp)}`;
    const urlApiQrExterna = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(urlEnlaceCompleto)}`;
    $('qrContactoFijo').innerHTML = `<img src="${urlApiQrExterna}" alt="QR Soporte" style="display:block; margin: 0 auto; background:white; padding:10px; border-radius:var(--rs); box-shadow: 0 4px 12px rgba(0,0,0,0.2);">`;
  }
};


// reporte estadístico por tipo de vehículo
// muestra: codigo, nombre, numero de vehiculos parqueados, tiempo total de los servicios y total recaudado

const ReportesModulo = {

  // establece fechas por defecto y vacía la tabla
  init() {
    const hoy = new Date().toISOString().split('T')[0];
    const primerDiaMes = hoy.slice(0, 8) + '01';
    $('reporteFechaInicio').value = primerDiaMes;
    $('reporteFechaFin').value = hoy;
    // mostramos la tabla vacía al entrar
    $('cuerpoReportes').innerHTML = '';
    $('vacioReportes').classList.remove('hidden');
  },

  // calcula la diferencia en horas entre dos strings
  _calcularHoras(horaEntrada, horaSalida) {
    if (!horaEntrada || !horaSalida) return 0;
    const [hE, mE] = horaEntrada.split(':').map(Number);
    const [hS, mS] = horaSalida.split(':').map(Number);
    const minutos = (hS * 60 + mS) - (hE * 60 + mE);
    return minutos > 0 ? minutos / 60 : 0;
  },

  // convierte horas decimales
  _formatearTiempo(horas) {
    const h = Math.floor(horas);
    const m = Math.round((horas - h) * 60);
    if (h === 0) return `${m}m`;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  },

  // genera el reporte con los filtros actuales
  generar() {
    const inicio = $('reporteFechaInicio').value;
    const fin    = $('reporteFechaFin').value;

    if (!inicio || !fin) { lanzarToast('Selecciona ambas fechas para generar el reporte.', 'warning'); return; }
    if (inicio > fin)    { lanzarToast('La fecha de inicio no puede ser mayor a la fecha fin.', 'error'); return; }

    const tipos     = Almacen.obtenerTipos();
    const registros = Almacen.obtenerRegistros();

    // filtramos solo registros completados dentro del rango de fechas
    const filtrados = registros.filter(r =>
      r.status === 'completed' && r.date >= inicio && r.date <= fin
    );

    if (!filtrados.length) {
      $('cuerpoReportes').innerHTML = '';
      $('vacioReportes').classList.remove('hidden');
      return;
    }

    // agrupamos los datos por tipo de vehiculo
    const agrupado = {};
    filtrados.forEach(r => {
      if (!agrupado[r.vehicleTypeId]) {
        agrupado[r.vehicleTypeId] = { cantidad: 0, horasTotal: 0, montoTotal: 0 };
      }
      agrupado[r.vehicleTypeId].cantidad++;
      agrupado[r.vehicleTypeId].horasTotal += this._calcularHoras(r.entryTime, r.exitTime);
      agrupado[r.vehicleTypeId].montoTotal += r.cost || 0;
    });

    const body = $('cuerpoReportes');
    $('vacioReportes').classList.add('hidden');

    // construimos las filas por tipo de vehiculo
    body.innerHTML = tipos
      .filter(t => agrupado[t.id])
      .map(t => {
        const d = agrupado[t.id];
        return `<tr>
          <td><span class="mono">${t.code}</span></td>
          <td>${t.name}</td>
          <td style="text-align:center"><strong>${d.cantidad}</strong></td>
          <td style="text-align:center; font-family:var(--fm)">${this._formatearTiempo(d.horasTotal)}</td>
          <td style="text-align:right"><strong>${formatearMoneda(d.montoTotal)}</strong></td>
        </tr>`;
      }).join('');

    // fila de totales al final
    const totalVehiculos = filtrados.length;
    const totalHoras     = Object.values(agrupado).reduce((s, d) => s + d.horasTotal, 0);
    const totalMonto     = Object.values(agrupado).reduce((s, d) => s + d.montoTotal, 0);

    body.innerHTML += `<tr style="border-top:2px solid var(--border); background:var(--bg)">
      <td colspan="2" style="font-weight:700; font-family:'Barlow Condensed',sans-serif; letter-spacing:.04em; text-transform:uppercase; font-size:11px; color:var(--text-d)">Totales</td>
      <td style="text-align:center"><strong>${totalVehiculos}</strong></td>
      <td style="text-align:center; font-family:var(--fm)">${this._formatearTiempo(totalHoras)}</td>
      <td style="text-align:right"><strong>${formatearMoneda(totalMonto)}</strong></td>
    </tr>`;
  }
};


// inicializacion y arranque de la app

const Aplicacion = {

  init() {
    Autenticacion.estaLogueado() ? this.mostrarApp() : this.mostrarLogin();
    this._vincularEventos();
  },
  mostrarLogin() {
    $('vistaLogin').classList.remove('hidden');
    $('vistaApp').classList.add('hidden');
    $('vistaCliente').classList.add('hidden');
  },
  mostrarApp() {
    const u = Autenticacion.obtenerUsuarioLogueado();
    $('vistaLogin').classList.add('hidden');
    if (u.rol === 'admin') {
      $('vistaApp').classList.remove('hidden');
      this.actualizarInterfaz();
      Navegacion.irA('panel');
    } else {
      $('nombreClienteSuperior').textContent = u.nombre;
      $('vistaCliente').classList.remove('hidden');
      ClienteModulo.init();
    }
  },
  actualizarInterfaz() {
    const u = Almacen.obtenerUsuario();
    const init = u.name.charAt(0).toUpperCase();
    $('avatarBarra').textContent = init;
    $('nombreBarra').textContent  = u.name;
    $('correoBarra').textContent  = u.email;
  },
  _vincularEventos() {

    // toggle entre login y registro
    $('enlaceIrARegistro').onclick = (e) => {
      e.preventDefault();
      $('tarjetaLogin').classList.add('hidden');
      $('tarjetaRegistro').classList.remove('hidden');
    };
    $('enlaceIrALogin').onclick = (e) => {
      e.preventDefault();
      $('tarjetaRegistro').classList.add('hidden');
      $('tarjetaLogin').classList.remove('hidden');
    };

    // crear cuenta nueva
    $('btnRegistrarCuenta').onclick = () => {
      const nom = $('regNombre').value.trim();
      const cor = $('regCorreo').value.trim();
      const cla = $('regClave').value;
      if (Autenticacion.registrarCliente(nom, cor, cla)) {
        lanzarToast('¡Cuenta creada correctamente! Ya puede ingresar.', 'success');
        $('tarjetaRegistro').classList.add('hidden');
        $('tarjetaLogin').classList.remove('hidden');
        $('regNombre').value = ''; $('regCorreo').value = ''; $('regClave').value = '';
        $('registroError').classList.add('hidden');
      } else {
        $('registroError').classList.remove('hidden');
      }
    };

    // submit del login
    $('btnIngresar').onclick = () => {
      const email  = $('correoLogin').value.trim();
      const pass   = $('claveLogin').value;
      if (Autenticacion.iniciarSesion(email, pass)) {
        ocultarError('errorLogin');
        this.mostrarApp();
      }
      else $('errorLogin').classList.remove('hidden');
    };

    // navegacion
    document.querySelectorAll('.ni[data-view]').forEach(b => b.addEventListener('click', () => Navegacion.irA(b.dataset.view)));

    // hamburguesa mobile
    $('btnHamburguesa').addEventListener('click', () => Navegacion.alternarBarraLateral());
    $('capaSuperpuestaLateral').addEventListener('click', () => Navegacion.cerrarBarraLateral());

    // cerrar sesion
    $('btnCerrarSesion').addEventListener('click', () => { if(confirm('¿Cerrar sesión?')) Autenticacion.cerrarSesion(); });
    $('btnCerrarSesionCliente').onclick = () => { if(confirm('¿Cerrar sesión de cliente?')) Autenticacion.cerrarSesion(); };

    // perfil admin
    $('btnPerfilBarra').addEventListener('click', () => Perfil.abrir());
    $('btnGuardarPerfil').addEventListener('click', () => Perfil.guardar());

    // tipos de vehiculo
    $('btnAgregarTipoVehiculo').addEventListener('click', () => TiposVehiculo.abrirNuevo());
    $('btnGuardarTipoVehiculo').addEventListener('click', () => TiposVehiculo.guardar());

    // parqueadero
    $('btnAgregarParqueadero').addEventListener('click', () => ParqueaderoModulo.abrirNuevo());
    $('btnGuardarParqueadero').addEventListener('click', () => ParqueaderoModulo.guardar());
    $('btnCalcular').addEventListener('click', () => ParqueaderoModulo._calcularCosto());
    $('btnTerminar').addEventListener('click', () => ParqueaderoModulo.finalizar());

    // placas siempre en mayuscula
    $('placaParqueadero').addEventListener('input', function(){ this.value = this.value.toUpperCase(); });

    // busqueda en tiempo real
    $('buscarParqueadero').addEventListener('input', function(){ ParqueaderoModulo._busqueda = this.value.trim(); ParqueaderoModulo.renderizar(); });

    // boton de generar reporte
    $('btnGenerarReporte').addEventListener('click', () => ReportesModulo.generar());
  }
};

Aplicacion.init();