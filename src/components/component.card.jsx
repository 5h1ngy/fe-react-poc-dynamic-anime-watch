import React from 'react';
import {
  Box,
  Image,
  Text,
  Badge,
  Flex,
  Spacer,
  IconButton,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { FaHeart, FaPlay } from 'react-icons/fa';

/**
 * Componente Card - Rappresenta una card stile Choc UI per un anime.
 *
 * @component
 * @example
 * return (
 *   <Card />
 * );
 *
 * @returns {JSX.Element} - Il componente Card.
 */
const Card = () => {
  /**
   * Genera un numero casuale compreso tra min e max.
   *
   * @param {number} min - Il valore minimo.
   * @param {number} max - Il valore massimo.
   * @returns {number} - Il numero casuale generato.
   */
  const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  /**
   * Genera uno stato casuale per l'anime (In corso o Concluso).
   *
   * @returns {string} - Lo stato casuale generato.
   */
  const generateRandomState = () =>
    Math.random() > 0.5 ? 'In corso' : 'Concluso';

  const animeImage =
    'https://example.com/path-to-your-anime-image.jpg'; // Sostituisci con il tuo URL dell'immagine

  const randomState = generateRandomState();
  const randomYear = generateRandomNumber(2000, 2023);
  const randomName = `Anime ${generateRandomNumber(1, 100)}`;
  const randomEpisodes = generateRandomNumber(1, 50);
  const randomTags = ['Azione', 'Fantasy', 'Commedia']; // Aggiungi i tag desiderati

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      // bgColor="white"
      boxShadow="md"
    >
      <Image src={animeImage} alt="Anime Cover" />

      <Box p="4">
        <Flex align="center">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {randomState}
          </Badge>
          <Spacer />
          <IconButton
            icon={<FaHeart />}
            colorScheme="red"
            aria-label="Aggiungi ai preferiti"
            mr="2"
          />
          <IconButton
            icon={<FaPlay />}
            colorScheme="teal"
            aria-label="Guarda ora"
          />
        </Flex>

        <Text fontSize="xl" fontWeight="bold" mt="2">
          {randomName}
        </Text>

        <Text color="gray.500" fontSize="sm" mt="2">
          Anno di Pubblicazione: {randomYear}
        </Text>

        <Text color="gray.500" fontSize="sm">
          Episodi: {randomEpisodes}
        </Text>

        <Flex mt="2">
          {randomTags.map((tag, index) => (
            <Badge key={index} mr="1" colorScheme="teal">
              {tag}
            </Badge>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

Card.propTypes = {
  // Aggiungi eventuali PropTypes necessari
};

export default Card;
