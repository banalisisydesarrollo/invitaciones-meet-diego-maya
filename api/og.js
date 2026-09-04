import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          color: '#123b7a',
          fontSize: '60px',
          fontWeight: 'bold',
          fontFamily: 'Arial',
        }}
      >
        REUNIÓN VIRTUAL
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
