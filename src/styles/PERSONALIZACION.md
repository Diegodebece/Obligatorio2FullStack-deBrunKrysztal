## 🎨 PERSONALIZACIÓN DE COLORES

Si quieres cambiar los colores del CSS sin tocar nada más, es muy simple.

### 📍 Dónde están los colores

Abre: `src/styles/beautiful.css`

Ve al inicio (líneas 1-40) donde dice:
```css
:root {
  /* Colores principales */
  --primary: #6366f1;          ← Color principal (Indigo)
  --primary-dark: #4f46e5;     ← Más oscuro
  --primary-light: #818cf8;    ← Más claro
  --secondary: #ec4899;        ← Color secundario (Rosa)
  --secondary-dark: #be185d;   ← Más oscuro
  --secondary-light: #f472b6;  ← Más claro
```

### 🔄 Cómo cambiar un color

Simplemente reemplaza el código hexadecimal.

**Ejemplo 1: Cambiar de Indigo a Azul**
```css
/* DE */
--primary: #6366f1;

/* A */
--primary: #3b82f6;    /* Azul hermoso */
```

**Ejemplo 2: Cambiar de Rosa a Naranja**
```css
/* DE */
--secondary: #ec4899;

/* A */
--secondary: #f97316;  /* Naranja brillante */
```

### 🎯 Paletas de colores recomendadas

**OPCIÓN 1: Azul Profesional**
```css
--primary: #2563eb;        /* Azul vibrante */
--secondary: #f59e0b;      /* Ámbar */
```

**OPCIÓN 2: Verde Fresco**
```css
--primary: #16a34a;        /* Verde */
--secondary: #0ea5e9;      /* Cyan */
```

**OPCIÓN 3: Púrpura Elegante**
```css
--primary: #9333ea;        /* Púrpura */
--secondary: #ec4899;      /* Rosa */
```

**OPCIÓN 4: Rojo Energético**
```css
--primary: #dc2626;        /* Rojo */
--secondary: #f59e0b;      /* Naranja */
```

**OPCIÓN 5: Teal Moderno**
```css
--primary: #0d9488;        /* Teal */
--secondary: #8b5cf6;      /* Púrpura */
```

### 🌈 Generador de variantes

Cuando cambias `--primary`, también cambia:
```css
--primary-dark: (versión más oscura)
--primary-light: (versión más clara)
```

Necesitas actualizar estas también. Usa esta fórmula:

Si tu color principal es `#3b82f6` (Azul):
- **-dark**: Reduce saturación y luminosidad → `#1d4ed8`
- **-light**: Aumenta luminosidad → `#60a5fa`

Puedes usar herramientas online:
- [Colorhexa.com](https://www.colorhexa.com)
- [Coolors.co](https://coolors.co)
- [Color-hex.com](https://www.color-hex.com)

### 📝 Lista completa de variables personalizables

```css
:root {
  /* COLORES PRINCIPALES */
  --primary: #6366f1;              /* Cambiar aquí */
  --primary-dark: #4f46e5;         /* Y aquí */
  --primary-light: #818cf8;        /* Y aquí */
  
  /* COLORES SECUNDARIOS */
  --secondary: #ec4899;            /* Botones, acciones */
  --secondary-dark: #be185d;
  --secondary-light: #f472b6;
  
  /* SEMÁNTICOS */
  --success: #10b981;              /* Verde de OK */
  --success-light: #d1fae5;
  
  --warning: #f59e0b;              /* Naranja de advertencia */
  --warning-light: #fef3c7;
  
  --danger: #ef4444;               /* Rojo de error */
  --danger-light: #fee2e2;
  
  --info: #3b82f6;                 /* Azul de información */
  --info-light: #dbeafe;
}
```

### ✅ Cómo probar cambios

1. Abre `src/styles/beautiful.css`
2. Modifica un color en `:root`
3. Guarda (Ctrl+S)
4. Tu navegador recarga automáticamente
5. ¡Ves el cambio al instante!

No necesitas reiniciar nada, los cambios son inmediatos.

### 🎓 Ejemplo completo: Cambiar a tema Corporativo

**Original:**
```css
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --primary-light: #818cf8;
  --secondary: #ec4899;
  --secondary-dark: #be185d;
  --secondary-light: #f472b6;
}
```

**Cambia a:**
```css
:root {
  --primary: #003366;           /* Azul corporativo oscuro */
  --primary-dark: #002244;      /* Más oscuro */
  --primary-light: #0056b3;     /* Más claro */
  --secondary: #cc0000;         /* Rojo profesional */
  --secondary-dark: #990000;
  --secondary-light: #ff3333;
}
```

¡Y listo! Toda tu app cambia automáticamente.

### 💡 Tips profesionales

1. **Mantén contraste**: Un color claro + uno oscuro = fácil de leer
2. **Coherencia**: Usa máximo 2-3 colores principales
3. **Accesibilidad**: Verifica contraste en [WebAIM](https://webaim.org/resources/contrastchecker/)
4. **Prueba**: Visualiza en [Coolors](https://coolors.co) primero
5. **Guarda backup**: Copia el archivo antes de cambios grandes

### 🆘 Si algo se ve mal

Si hiciste cambios y algo se ve feo:
1. Presiona Ctrl+Z para deshacer
2. O reemplaza todo `:root { }` con el original
3. Los cambios se verán instantáneamente