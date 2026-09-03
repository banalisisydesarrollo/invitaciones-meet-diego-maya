import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

function formatDate(value) {
  if (!value) return 'Fecha por definir';
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return 'Fecha por definir';
  const date = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatTime(value) {
  if (!value) return 'Hora por definir';
  const [h, min] = value.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(min)) return 'Hora por definir';
  const suffix = h >= 12 ? 'p. m.' : 'a. m.';
  const hour = (h % 12) || 12;
  return `${hour}:${String(min).padStart(2, '0')} ${suffix}`;
}

function truncate(text, max) {
  const clean = (text || '').trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

export default async function handler(req) {
  const url = new URL(req.url);
  const p = url.searchParams;

  const title = truncate(p.get('titulo') || 'REUNIÓN VIRTUAL', 48);
  const description = truncate(
    p.get('descripcion') || 'Acompáñanos en este espacio de encuentro, diálogo y construcción colectiva.',
    105,
  );
  const date = formatDate(p.get('fecha') || '');
  const start = formatTime(p.get('inicio') || '09:00');
  const end = formatTime(p.get('fin') || '10:00');
  const host = url.origin;
  const membrete = `${host}/assets/membrete-diego-maya.jpg`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          color: '#14213d',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div style={{ display: 'flex', width: '100%', height: '108px', background: '#ffffff' }}>
          <img
            src={membrete}
            width="1200"
            height="108"
            style={{ width: '1200px', height: '108px', objectFit: 'contain' }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '16px 55px 10px',
            background: 'linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)',
          }}
        >
          <div style={{ display: 'flex', color: '#1464d2', fontSize: '18px', fontWeight: 800, letterSpacing: '2px' }}>
            ESTÁS INVITADO(A)
          </div>
          <div style={{ display: 'flex', color: '#123b7a', fontSize: title.length > 34 ? '36px' : '43px', fontWeight: 800, marginTop: '4px' }}>
            {title}
          </div>
          <div style={{ display: 'flex', color: '#526277', fontSize: '17px', lineHeight: 1.25, maxWidth: '920px', marginTop: '8px' }}>
            {description}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', padding: '6px 46px 12px' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #dce7f3', borderRadius: '14px', padding: '11px 15px' }}>
            <div style={{ display: 'flex', width: '38px', height: '38px', alignItems: 'center', justifyContent: 'center', background: '#eaf2ff', borderRadius: '10px', fontSize: '20px' }}>📅</div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px' }}>
              <div style={{ display: 'flex', color: '#1464d2', fontSize: '11px', fontWeight: 800, letterSpacing: '1px' }}>FECHA</div>
              <div style={{ display: 'flex', fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>{date}</div>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #dce7f3', borderRadius: '14px', padding: '11px 15px' }}>
            <div style={{ display: 'flex', width: '38px', height: '38px', alignItems: 'center', justifyContent: 'center', background: '#eaf2ff', borderRadius: '10px', fontSize: '20px' }}>🕘</div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px' }}>
              <div style={{ display: 'flex', color: '#1464d2', fontSize: '11px', fontWeight: 800, letterSpacing: '1px' }}>HORA</div>
              <div style={{ display: 'flex', fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>{start} – {end}</div>
            </div>
          </div>

          <div style={{ flex: 0.8, display: 'flex', alignItems: 'center', border: '1px solid #dce7f3', borderRadius: '14px', padding: '11px 15px' }}>
            <div style={{ display: 'flex', width: '38px', height: '38px', alignItems: 'center', justifyContent: 'center', background: '#eaf2ff', borderRadius: '10px', fontSize: '20px' }}>💻</div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px' }}>
              <div style={{ display: 'flex', color: '#1464d2', fontSize: '11px', fontWeight: 800, letterSpacing: '1px' }}>MODALIDAD</div>
              <div style={{ display: 'flex', fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>Google Meet</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', margin: '0 46px', padding: '15px 24px', borderRadius: '14px', background: 'linear-gradient(135deg, #0d2e62, #164d9c)', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', color: '#ffffff', fontSize: '18px', fontWeight: 700 }}>Haz clic para ingresar a la reunión</div>
          <div style={{ display: 'flex', background: '#18b85a', color: '#ffffff', padding: '12px 28px', borderRadius: '10px', fontSize: '17px', fontWeight: 900 }}>INGRESAR A LA REUNIÓN</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', color: '#526277', fontSize: '13px', marginTop: '10px' }}>
          Tu participación es muy importante. ¡Te esperamos!
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
      },
    },
  );
}
