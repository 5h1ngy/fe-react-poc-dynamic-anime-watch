import React from 'react';
import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react'; // Importa keyframes da @emotion/react

import '@fontsource/orbitron/600.css';

const flickerAnimation = (neonColor) => keyframes`
  to {
    text-shadow: 0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 15px ${neonColor};
  }
`;

const TypographyNeon = ({ text, colorScheme }) => {
  const neonColor = colorScheme || '#ff80c0'; // Colore magenta neon

  // Stile inline con animazione definita
  const neonTextStyle = {
    fontSize: '1.5rem',
    fontFamily: "'Orbitron', sans-serif",
    color: neonColor,
    textShadow: `0 0 1px ${neonColor}, 0 0 2px ${neonColor}, 0 0 3px ${neonColor}`,
  };

  return (
    <Box as="span" className="neon-text" style={neonTextStyle} animation={`${flickerAnimation(neonColor)} 1.5s infinite alternate`}>
      {text}
    </Box>
  );
};

export default TypographyNeon;
