function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidMeetLink(link) {
  try {
    const url = new URL(link);

    return (
      /^https?:$/.test(url.protocol) &&
      /(^|\.)meet\.google\.com$/i.test(url.hostname)
    );
  } catch {
    return false;
  }
}

export default function handler(req, res) {
  const requestUrl = new URL(req.url, `https://${req.headers.host}`);
  const params = requestUrl.searchParams;

  const title =
    params.get('titulo') || 'REUNIÓN VIRTUAL';

  const description =
    params.get('descripcion') ||
    'Acompáñanos en este espacio de encuentro, diálogo y construcción colectiva.';

  const date = params.get('fecha') || '';

  const start =
    params.get('inicio') || '09:00';

  const end =
    params.get('fin') || '10:00';

  const meet =
    params.get('meet') || '';

  const baseUrl =
    requestUrl.origin;

  /*
   * Construimos nuevamente los parámetros para mantener
   * una URL limpia y consistente.
   */
  const query = new URLSearchParams({
    titulo: title,
    descripcion: description,
    fecha: date,
    inicio: start,
    fin: end,
    meet: meet,
  }).toString();

  /*
   * URL canónica de esta invitación.
   */
  const invitationUrl =
    `${baseUrl}/api/invitacion?${query}`;

  /*
   * URL de la imagen Open Graph.
   */
  const ogUrl =
    `${baseUrl}/api/og?${query}`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>
    ${escapeHtml(title)} | Invitación Meet
  </title>

  <meta
    name="description"
    content="${escapeHtml(description)}"
  >

  <!-- OPEN GRAPH -->

  <meta
    property="og:type"
    content="website"
  >

  <meta
    property="og:title"
    content="${escapeHtml(title)}"
  >

  <meta
    property="og:description"
    content="${escapeHtml(description)}"
  >

  <meta
    property="og:image"
    content="${escapeHtml(ogUrl)}"
  >

  <meta
    property="og:image:secure_url"
    content="${escapeHtml(ogUrl)}"
  >

  <meta
    property="og:image:type"
    content="image/png"
  >

  <meta
    property="og:image:width"
    content="1200"
  >

  <meta
    property="og:image:height"
    content="630"
  >

  <meta
    property="og:image:alt"
    content="${escapeHtml(`Invitación: ${title}`)}"
  >

  <meta
    property="og:url"
    content="${escapeHtml(invitationUrl)}"
  >

  <!-- TWITTER / WHATSAPP COMPATIBILITY -->

  <meta
    name="twitter:card"
    content="summary_large_image"
  >

  <meta
    name="twitter:title"
    content="${escapeHtml(title)}"
  >

  <meta
    name="twitter:description"
    content="${escapeHtml(description)}"
  >

  <meta
    name="twitter:image"
    content="${escapeHtml(ogUrl)}"
  >

</head>

<body>

  <h1>${escapeHtml(title)}</h1>

  <p>${escapeHtml(description)}</p>

  <p>
    <strong>Fecha:</strong>
    ${escapeHtml(date)}
  </p>

  <p>
    <strong>Hora:</strong>
    ${escapeHtml(start)} - ${escapeHtml(end)}
  </p>

  ${
    isValidMeetLink(meet)
      ? `
        <p>
          <a href="${escapeHtml(meet)}">
            Ingresar a Google Meet
          </a>
        </p>
      `
      : ''
  }

  <p>
    <a href="${escapeHtml(invitationUrl)}">
      Abrir invitación
    </a>
  </p>

</body>
</html>`;

  res.setHeader(
    'Content-Type',
    'text/html; charset=utf-8'
  );

  /*
   * Evitamos que Vercel/WhatsApp conserve demasiado tiempo
   * una versión anterior de los metadatos.
   */
  res.setHeader(
    'Cache-Control',
    'public, max-age=0, s-maxage=60, stale-while-revalidate=60'
  );

  res.status(200).send(html);
}