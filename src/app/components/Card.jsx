import _ from "lodash";
import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Collapse } from '@chakra-ui/react';
import { Image, AspectRatio } from '@chakra-ui/react';
import { Text, Badge, IconButton } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import * as icons from "react-icons/fc";
import { FcCollapse } from "react-icons/fc";

import { generateRandomString } from "app/shared/utils";

/**
 * Componente Card per visualizzare informazioni strutturate.
 * @param {Object} props - Le proprietà del componente.
 * @param {string} props.picture - URL dell'immagine.
 * @param {Object} props.bedge - Informazioni sulla medaglia.
 * @param {string} props.bedge.content - Contenuto della medaglia.
 * @param {string} props.bedge.color - Colore della medaglia.
 * @param {Array} props.actions - Array di azioni.
 * @param {string} props.actions.label - Etichetta dell'azione.
 * @param {string} props.actions.icon - Icona dell'azione.
 * @param {string} props.actions.color - Colore dell'azione.
 * @param {string} props.title - Titolo della card.
 * @param {Array} props.content - Contenuto della card.
 */
const Card = (props) => {

  /**
   * Componente Actions per mostrare le azioni sulla card.
   * @returns {Array} - Array di azioni.
   */
  const Actions = () =>
    props.actions.map(action =>
      <IconButton
        key={generateRandomString()}
        icon={icons[action.icon]()}
        fontSize={28}
        aria-label={action.label}
        onClick={() => action.onClick()}
        mr="2"
      />
    );

  /**
   * Componente Content per mostrare il contenuto della card.
   * @returns {Array} - Array di elementi di contenuto.
   */
  const Content = () => {
    const disclosure = useDisclosure();

    return props.content.map(content => !_.isArray(content)
      ? <Text my={'1px'} color="gray.500" fontSize="sm">
        {content}
      </Text>
      : <Flex mt={'20px'} align={"center"} flexDir={"column"}>
        <IconButton onClick={disclosure.onToggle} transform={disclosure.isOpen && "rotate(180deg)"}
          icon={<FcCollapse />} variant='ghost' colorScheme='teal' size='24' w={'100vh'}
        />
        <Collapse in={disclosure.isOpen}>
          <Wrap my={'4px'}>
            {content.map(subContent => <WrapItem key={generateRandomString()}>{subContent}</WrapItem>)}
          </Wrap>
        </Collapse>
      </Flex>
    );
  };

  return (
    <Box maxW={'220px'} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
      <AspectRatio maxW='220px' ratio={10 / 12}>
        <Image src={props.picture} alt="Anime Cover" />
      </AspectRatio>

      {props.actions &&
        <Flex flexDir={'row'} justifyContent={'flex-end'} align="center" p="2" marginTop={'-16.5rem'} marginBottom={'12.8rem'}>
          <Actions />
        </Flex>
      }

      <Box p="4">
        <Wrap align="center" justify={'left'}>
          <WrapItem>
            <Badge borderRadius="full" colorScheme={props.bedge.color}>
              {props.bedge.content}
            </Badge>
          </WrapItem>
          <WrapItem>{props.title}</WrapItem>
        </Wrap>

        <Flex flexDir={'column'}>
          <Content />
        </Flex>
      </Box>
    </Box>
  );
};

Card.propTypes = {
  picture: PropTypes.string.isRequired,
  bedge: PropTypes.shape({
    content: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  })),
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
  ])).isRequired
};

Card.defaultProps = {
  actions: undefined
}

export default Card;
