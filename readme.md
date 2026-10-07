# Servidor estático con Express

Práctica de Laboratorio IV con Node.js, Express, dotenv y env-var. Sirve la aplicación estática incluida en `public/dist/`.

## Ejecución

```bash
npm install
cp .env.example .env
npm run dev
```

En PowerShell: `Copy-Item .env.example .env`. `PORT` establece el puerto y `PUBLIC_PATH` la carpeta pública; la plantilla utiliza `3080` y `public`. Ejecutar desde la raíz del repositorio. El script disponible es `dev`; no existe un script `start`.

`public/dist/` se conserva porque el servidor lo necesita y este repositorio no contiene las fuentes para reconstruir ese frontend.

Material académico histórico. El código y los archivos estáticos originales se mantienen sin cambios.
