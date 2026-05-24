# NexaStudio — Landing Page

Landing page profesional para agencia de desarrollo web e inteligencia artificial.

## 📁 Estructura del proyecto

```
NexaStudio/
├── index.html        ← Página principal
├── config.js         ← ⚙️ CONFIGURACIÓN (editá esto)
├── css/
│   └── estilos.css   ← Estilos visuales
├── js/
│   └── main.js       ← Lógica e interacciones
└── README.md
```

---

## ⚙️ Configuración rápida

Abrí el archivo **`config.js`** y actualizá tus datos:

```js
const CONFIG = {
  whatsapp: {
    numero: "5491112345678",  // ← Tu número con código de país
    mensaje: "Hola! ...",    // ← Mensaje predefinido al contactar
  },
  email: "contacto@tudominio.com",
  redes: {
    linkedin: "https://linkedin.com/company/tuempresa",
    github:   "https://github.com/tuusuario",
  },
  marca: {
    nombre:  "NexaStudio",     // ← Tu nombre de marca
    tagline: "...",
  },
};
```

### Número de WhatsApp — formato correcto

| País       | Ejemplo correcto   |
|------------|--------------------|
| Argentina  | `5491112345678`    |
| España     | `34612345678`      |
| México     | `521234567890`     |
| Colombia   | `573001234567`     |

---

## 🚀 Subir a GitHub Pages (gratis)

### Opción A — Desde la terminal (Git)

```bash
# 1. Inicializar repositorio
git init
git add .
git commit -m "feat: landing page inicial"

# 2. Crear repo en GitHub (sin README) y linkear
git remote add origin https://github.com/TUUSUARIO/TUNOMBRE-REPO.git
git branch -M main
git push -u origin main

# 3. Activar GitHub Pages
# → Ir a Settings → Pages → Source: Deploy from branch → main → / (root)
# → Tu URL será: https://TUUSUARIO.github.io/TUNOMBRE-REPO/
```

### Opción B — Desde GitHub.com (sin terminal)

1. Ir a [github.com/new](https://github.com/new) y crear un repositorio público
2. Hacer clic en **"uploading an existing file"**
3. Arrastrar todos los archivos del proyecto
4. Hacer commit
5. Ir a **Settings → Pages → Source: main / root → Save**

---

## ✏️ Personalizar contenido

Todo el contenido editable está en `index.html`:

- **Textos del hero** → buscá `<section id="hero">`
- **Servicios** → buscá `<section id="servicios">`
- **Proyectos** → buscá `<section id="proyectos">`
- **Estadísticas** → atributos `data-contador="40"` en el hero

---

## 🛠️ Tecnologías usadas

- HTML5 semántico
- CSS3 puro (sin frameworks)
- JavaScript vanilla
- Google Fonts (DM Serif Display + DM Sans)

No requiere instalación de dependencias ni build process.

---

## 📄 Licencia

Libre para uso personal y comercial.
