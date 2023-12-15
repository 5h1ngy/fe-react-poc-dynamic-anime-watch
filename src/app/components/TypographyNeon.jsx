import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

import '@fontsource/orbitron/600.css';

/**
 * Neon typography component with flickering effect.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.text - Text content to be displayed.
 * @param {string} [props.color='#ff80c0'] - Color of the neon text.
 * @param {boolean} [props.noWrap=true] - Whether to prevent text wrapping.
 * @returns {JSX.Element} - Neon typography component.
 */
const TypographyNeon = (props) => {
  // Keyframes for the flickering animation
  const flickerAnimation = keyframes(`
    to { 
      text-shadow: 0 0 5px ${props.color}, 0 0 10px ${props.color}, 0 0 15px ${props.color};
    }
  `);

  // Style properties for the neon text
  const styleProps = {
    fontSize: '1.5rem',
    fontFamily: "'Orbitron', sans-serif",
    color: props.color,
    textShadow: `0 0 1px ${props.color}, 0 0 2px ${props.color}, 0 0 3px ${props.color}`,
    animation: `${flickerAnimation} 1.5s infinite alternate`,
    whiteSpace: props.noWrap ? 'nowrap' : 'normal', // Set to 'nowrap' only if noWrap is true
  };

  return (
    <Box {...styleProps} {...props}>
      {props.text}
    </Box>
  );
};

// Prop types for TypographyNeon component
TypographyNeon.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  noWrap: PropTypes.bool,
};

// Default props for TypographyNeon component
TypographyNeon.defaultProps = {
  color: '#ff80c0', // Neon magenta color
  noWrap: true,
};

export default TypographyNeon;
