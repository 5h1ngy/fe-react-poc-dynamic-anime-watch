import _ from "lodash";
import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex, Collapse } from '@chakra-ui/react';
import { Image, AspectRatio } from '@chakra-ui/react';
import { Text, Badge, IconButton } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import * as icons from "react-icons/fc";
import { FcExpand } from "react-icons/fc";

import { generateRandomString } from "app/utils";

/**
 * Card Component
 * @param {Object} props - Component props
 * @param {string} props.picture - URL of the image
 * @param {Object} props.bedge - Badge information
 * @param {string} props.bedge.content - Content of the badge
 * @param {string} props.bedge.color - Color scheme for the badge
 * @param {Array} props.actions - Array of action objects
 * @param {string} props.actions.label - Label for the action
 * @param {string} props.actions.icon - Icon for the action
 * @param {string} props.actions.color - Color scheme for the action
 * @param {string} props.title - Title of the card
 * @param {Array} props.content - Array of content elements, can be string or nested elements
 * @returns {React.Component} Card component
 */
const Card = (props) => {

  /**
   * Renders action buttons
   * @returns {Array} Array of JSX elements representing action buttons
   */
  const Actions = () =>
    props.actions.map(action =>
      <IconButton
        key={generateRandomString()}
        icon={icons[action.icon]({ size: 30 })}
        colorScheme={action.color}
        aria-label={action.label}
        mr="2"
      />
    );

  /**
   * Renders content based on its type (simple or nested)
   * @returns {Array} Array of JSX elements representing content
   */
  const Content = () => {
    const disclosure = useDisclosure();

    return props.content.map(content => !_.isArray(content)
      /** SIMPLE CONTENT */
      ? <Text my={'1px'} color="gray.500" fontSize="sm">
        {content}
      </Text>
      /** NESTED CONTENT */
      : <Flex mt={'20px'} align={"center"} flexDir={"column"}>
        {/** BUTTON */}
        <IconButton onClick={disclosure.onToggle} transform={disclosure.isOpen && "rotate(180deg)"}
          icon={<FcExpand />} variant='ghost' colorScheme='teal' size='24' w={'100vh'}
        />
        {/** COLLAPSIBLE CONTENT */}
        <Collapse in={disclosure.isOpen}>
          <Wrap my={'4px'}>
            {content.map(subContent => <WrapItem key={generateRandomString()}>{subContent}</WrapItem>)}
          </Wrap>
        </Collapse>
      </Flex>
    );
  };

  return (
    // bgColor="white" 
    <Box maxW={'220px'} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
      {/** IMAGE */}
      <AspectRatio maxW='220px' ratio={10 / 12}>
        <Image src={props.picture} alt="Anime Cover" />
      </AspectRatio>

      {/** ACTIONS */}
      <Flex flexDir={'row'} justifyContent={'flex-end'} align="center" p="2" marginTop={'-16.5rem'} marginBottom={'12.8rem'}>
        <Actions />
      </Flex>

      {/** HEADER */}
      <Box p="4">
        <Wrap align="center" justify={'left'}>
          {/** BADGE */}
          <WrapItem>
            <Badge borderRadius="full" colorScheme={props.bedge.color}>
              {props.bedge.content}
            </Badge>
          </WrapItem>
          {/** TITLE */}
          <WrapItem>{props.title}</WrapItem>
        </Wrap>

        {/** CONTENT */}
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
  })).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
  ])).isRequired
};

export default Card;
