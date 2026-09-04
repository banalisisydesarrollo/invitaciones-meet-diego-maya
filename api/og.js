import { ImageResponse } from '@vercel/og';
import React from 'react';

export const config = {
  runtime: 'edge',
};

export default function handler() {
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
      'REUNIÓN VIRTUAL'
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}