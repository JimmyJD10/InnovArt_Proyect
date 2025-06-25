# InnovArt - Red Social y Marketplace de Artesanos

Este repositorio contiene tanto el backend (API Node.js/Express/Sequelize) como el frontend (Next.js/React/Tailwind) del proyecto InnovArt.

## Estructura

- `/backend` - API RESTful (Node.js, Express, Sequelize, MySQL)
- `/frontend` - Frontend web (Next.js, React, TailwindCSS)

## Cómo subir a GitHub

1. Asegúrate de tener el archivo `.gitignore` correcto en la raíz (ya lo tienes).
2. Abre una terminal en la carpeta raíz del proyecto (`d:\innovart-red-artesanos`).
3. Ejecuta estos comandos:

```sh
git init
git add .
git commit -m "Proyecto InnovArt: backend y frontend juntos"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

4. Reemplaza `TU_USUARIO` y `TU_REPO` por tu usuario y nombre de repositorio en GitHub.

## Notas

- No se suben archivos `.env`, `node_modules`, ni carpetas de build gracias al `.gitignore`.
- Puedes mantener ambos proyectos juntos mientras los desarrollas en paralelo.
- Si en el futuro necesitas separar backend y frontend, puedes hacerlo fácilmente.

---