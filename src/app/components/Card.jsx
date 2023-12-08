import _ from "lodash";
import React from 'react';
import {
  Box,
  Image,
  Text,
  Badge,
  Flex,
  Spacer,
  IconButton,
  Wrap, WrapItem,
  AspectRatio
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { FaHeart, FaPlay } from 'react-icons/fa';
import { FcExpand } from "react-icons/fc";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

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
const Card = (props) => {
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

  function assignTitle() {
    return typeof props.title === 'string'
      ? props.title
      : <>
        {props.title.content}
        <Badge borderRadius="full" mx="2" px="2" colorScheme={props.title.suffix.color}>
          {props.title.suffix.content}
        </Badge>
      </>
  }

  function assignContent() {
    return props.content.map(content =>
      _.isArray(content)
        ? (<Wrap my={'4px'}>
          <IconButton
            icon={<FcExpand />}
            isRound={true}
            variant='outline'
            colorScheme='teal'
          />
          {content.map(subContent => <WrapItem>{subContent}</WrapItem>)}
        </Wrap>)
        : (<Text my={'1px'} color="gray.500" fontSize="sm">{content}</Text>)
    )
  }

  return (
    <Box
      maxW={'220px'}
      maxH={'6000px'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      // bgColor="white"
      boxShadow="md"
    >
      <AspectRatio maxW='220px' ratio={10 / 12}>
        <Image src={props.picture} alt="Anime Cover" />
      </AspectRatio>

      <Flex align="center" p="2" marginTop={'-16.5rem'} marginBottom={'12.8rem'} flexDir={'row'} justifyContent={'flex-end'}>
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

      <Box p="4">
        <Wrap align="center" justify={'left'}>
          {/** Badge */}
          <WrapItem>
            <Badge borderRadius="full" colorScheme={props.bedge.color}>
              {props.bedge.content}
            </Badge>
          </WrapItem>
          {/** Title */}
          <WrapItem>{props.title}</WrapItem>
        </Wrap>

        <Flex flexDir={'column'}>
          {assignContent()}
        </Flex>
      </Box>
    </Box>
  );
};

Card.propTypes = {
  picture: PropTypes.string,
  title: PropTypes.oneOf(PropTypes.string, PropTypes.shape({
    suffix: PropTypes.shape({
      content: PropTypes.string,
      color: PropTypes.string,
    }),
    content: PropTypes.string
  })),
  content: PropTypes.arrayOf(PropTypes.string)
};

export default Card;
