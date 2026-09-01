# Invitaciones Meet - Diego Maya Salazar

Versión 1: aplicación estática para crear y previsualizar una invitación personalizada para Google Meet.

## Archivos
- `index.html`: aplicación completa (HTML + CSS + JavaScript).
- `assets/membrete-diego-maya.jpg`: imagen institucional suministrada.

## Uso local
Abre `index.html` con Chrome/Edge.

1. Cambia título, descripción, fecha y horas.
2. Pega el enlace real de Google Meet.
3. El botón verde de la tarjeta se convierte en un enlace funcional.
4. La aplicación no necesita servidor ni base de datos en esta versión.

## Publicar en Vercel
1. Sube esta carpeta a un repositorio de GitHub.
2. En Vercel selecciona "Add New Project".
3. Importa el repositorio.
4. Framework: Other / Static.
5. Build command: dejar vacío.
6. Output directory: `.` (raíz).
7. Deploy.

También puedes arrastrar la carpeta/proyecto a un flujo de despliegue de Vercel si tu cuenta lo permite.

## Próxima versión
- Generar un enlace único para cada invitación.
- Página pública de cada reunión.
- Vista previa optimizada para WhatsApp (Open Graph).
- Botón para copiar enlace.
- Botón para compartir por WhatsApp.
- Opcionalmente, guardar las invitaciones.
