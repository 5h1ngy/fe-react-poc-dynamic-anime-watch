import React from 'react';
import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react'; // Importa keyframes da @emotion/react

import '@fontsource/orbitron/600.css';

const TypographyNeon = ({ text, colorScheme: color }) => {
  const neonColor = color || '#ff80c0'; // Colore magenta neon

  const flickerAnimation = keyframes(`
    to { 
      text-shadow: 0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 15px ${neonColor};
    }
  `);

  const styleProps = {
    fontSize: '1.5rem',
    fontFamily: "'Orbitron', sans-serif",
    color: neonColor,
    textShadow: `0 0 1px ${neonColor}, 0 0 2px ${neonColor}, 0 0 3px ${neonColor}`,
    animation: `${flickerAnimation} 1.5s infinite alternate`,
  }

  return (
    <Box {...styleProps} >
      {text}
    </Box>
  );
};

export default TypographyNeon;
