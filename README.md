# 🅿️ Campus Parking — Sistema de Gestión
 
¡Hola! 👋 Bienvenid@ al repo de **Campus Parking**, una aplicación web para la gestión de un parqueadero, desarrollada como proyecto individual de JavaScript.
 
La idea surgió de un problema real: el parqueadero llevaba todo a mano, lo que generaba errores en los cobros e inconformidades de los clientes. Este sistema reemplaza ese proceso manual con algo mucho más ordenado y confiable.
 
---
 
## 🌟 ¿Qué hace la app?
 
Campus Parking permite registrar vehículos, calcular el tiempo de permanencia y cobrar según la tarifa configurada para cada tipo de vehículo, todo desde el navegador, sin necesidad de servidor ni base de datos externa.
 
---
 
## 👤 Vistas y módulos
 
La app tiene dos portales distintos según quién inicie sesión:
 
### Portal Administrador
- 🔐 **Login** — autenticación con email y contraseña
- 📊 **Dashboard** — estadísticas del día: vehículos activos, completados e ingresos
- 🚙 **Tipos de vehículo** — CRUD completo (código, nombre y tarifa por hora)
- 🅿️ **Parqueadero** — registro de entradas y salidas, cálculo de costo y búsqueda por placa
- 👤 **Perfil** — edición de nombre, correo y contraseña del admin
### Portal Cliente
- 📋 **Mi estado** — resumen del vehículo activo y espacios disponibles
- 🚗 **Mis vehículos** — historial y opción de pagar el servicio activo
- 💰 **Tarifas** — tabla de precios por tipo de vehículo
- 📍 **Ubicación** — mapa interactivo con la dirección del parqueadero
- 📞 **Soporte** — QR de contacto directo por WhatsApp
---
 
## 💳 Simulación de pago
 
Los clientes pueden pagar su servicio activo directamente desde la app. El flujo incluye:
1. Ingresar la hora de salida
2. Calcular el costo según la tarifa y el tiempo de permanencia
3. Llenar los datos de tarjeta (simulado, no se almacena nada)
4. Confirmar el pago
---
 
## 🛠️ Stack usado
 
- **HTML5** — estructura semántica completa
- **CSS3** — diseño oscuro con variables CSS, Flexbox y Grid
- **JavaScript (Vanilla)** — toda la lógica de la app
- **Web Components** — `cp-toast`, `cp-badge` y `cp-stat-card` para reutilización
- **localStorage** — persistencia de datos sin backend
- **Leaflet.js** — mapa interactivo en la vista de ubicación
---
 
## 📁 Estructura del proyecto
 
```
Proyecto_JavaScript_/
 ├── index.html      # toda la estructura HTML de la app
 ├── style.css       # estilos, tema oscuro, responsive
 └── main.js         # lógica completa: auth, módulos, web components
```
 
---
 
## 🚀 ¿Cómo correrlo?
 
No necesita instalación. Solo abre `index.html` en el navegador y listo.
 
Las credenciales del admin por defecto son:
 
```
email:      admin@campusparking.com
contraseña: Admin123
```
 
---
 
## ✅ Validaciones implementadas
 
- Formato de placa obligatorio: `ABC123` (3 letras + 3 números)
- Placa y slot únicos por servicio activo
- Hora de salida debe ser posterior a la hora de entrada
- Slot no puede estar ocupado por otro vehículo activo
- Datos de tarjeta validados antes de confirmar pago
---
 
## 📱 Responsive
 
La app funciona en móvil, tablet y escritorio. La barra lateral se colapsa en pantallas pequeñas con un menú hamburguesa.
