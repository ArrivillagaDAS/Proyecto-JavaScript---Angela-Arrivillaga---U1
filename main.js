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
  // íconos SVG para cada tipo de stat
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


// localStorage wrapper — lectura/escritura de datos

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


// autenticación — login, registro y manejo de sesión

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
      lanzarToast('El correo electrónico coincide con el administrador.', 'error');
      return false;
    }
    const cuentas = JSON.parse(localStorage.getItem('cp_cuentas_clientes') || '[]');
    if (cuentas.find(c => c.correo.toLowerCase() === correoLimpio)) {
      lanzarToast('El correo electrónico ya está registrado.', 'error');
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


// navegación entre vistas del admin

const Navegacion = {
  titulos: { panel:'Dashboard', tiposVehiculo:'Tipos de Vehículo', parqueadero:'Parqueadero' },
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
  },
  cerrarBarraLateral() { $('barraLateral').classList.remove('open'); $('capaSuperpuestaLateral').classList.remove('show'); },
  alternarBarraLateral() { $('barraLateral').classList.toggle('open'); $('capaSuperpuestaLateral').classList.toggle('show'); }
};