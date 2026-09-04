import React from 'react';
import { ImageResponse } from '@vercel/og';

export default function handler(req) {
  const url = new URL(req.url);

  const titulo =
    url.searchParams.get('titulo') || 'REUNIÓN VIRTUAL';

  return new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          color: '#123b7a',
          fontSize: 60,
          fontWeight: 'bold',
          fontFamily: 'Arial',
        },
      },
      titulo
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}