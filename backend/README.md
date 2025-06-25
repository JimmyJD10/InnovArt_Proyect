# InnovArt Backend - API RESTful

Este repositorio contiene solo el backend (API Node.js/Express/Sequelize) del proyecto InnovArt.

## Estructura

- Código fuente y configuración en esta carpeta.
- No incluye el frontend.

## Cómo subir solo el backend a GitHub

1. Asegúrate de tener un `.gitignore` adecuado (ejemplo abajo).
2. Abre una terminal en la carpeta del backend:
   ```
   cd D:\innovart-red-artesanos\backend
   ```
3. Ejecuta estos comandos:

   ```sh
   git init
   git add .
   git commit -m "Backend InnovArt"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO_BACKEND.git
   git push -u origin main
   ```

   Cambia `TU_USUARIO` y `TU_REPO_BACKEND` por tu usuario y nombre de repositorio en GitHub.

## .gitignore recomendado

```
node_modules/
.env
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
Thumbs.db
.vscode/
.idea/
*.swp
coverage/
```

## Notas

- No subas archivos `.env` ni `node_modules`.
- Este repositorio es solo para el backend/API.
- Si tienes un frontend, súbelo en un repositorio aparte.

---
