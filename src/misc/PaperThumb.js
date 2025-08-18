// PaperThumb.jsx
import React from 'react';
import CardMedia from '@mui/material/CardMedia';

export default function Component({
  image = '',
  title = '',
  height = 400,      // ← plus grand par défaut
  fit = 'contain',
  sx = {},
}) {
  const h = typeof height === 'number' ? `${height}px` : height;

  return (
    <CardMedia
      component="img"
      image={image}
      alt={title}
      sx={{
        display: 'block',
        width: '100%',
        height: h,           // ← contrôle la taille
        objectFit: fit,      // 'contain' = jamais rognée
        objectPosition: 'center',
        borderRadius: 1,
        ...sx,
      }}
    />
  );
}
