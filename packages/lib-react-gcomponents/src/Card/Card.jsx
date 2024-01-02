import _ from "lodash";
import React from 'react';
import PropTypes from 'prop-types';

import { Box, Flex } from '@chakra-ui/react';
import { Image, AspectRatio } from '@chakra-ui/react';
import { Badge, IconButton } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import * as icons from "react-icons/fc";

import { generateRandomString } from "lib-react-gcommon/utils";

import Content from './Content.todo';

import {
  cardStyle,
  coverStyle,
  actionsStyle,
  actionsButtonStyle,
  previewStyle,
  previewContentStyle,
  bedgeProps
} from './Card.style';

/**
 * Card Component.
 * 
 * @component
 * @example
 * const actions = [
 *   { icon: 'FaHeart', label: 'Like', onClick: () => handleLike() },
 *   { icon: 'FaComment', label: 'Comment', onClick: () => handleComment() },
 * ];
 * const badge = { color: 'green', content: 'New' };
 * const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
 * const picture = 'https://example.com/image.jpg';
 * const title = 'Card Title';
 * 
 * <Card actions={actions} badge={badge} content={content} picture={picture} title={title} />
 * 
 * @param {Object} props - The component props.
 * @param {Object[]} props.actions - An array of actions to display as buttons.
 * @param {string} props.actions.icon - The icon for the action button.
 * @param {string} props.actions.label - The label for the action button.
 * @param {Function} props.actions.onClick - The callback function when the action button is clicked.
 * @param {Object} props.badge - The badge information.
 * @param {string} props.badge.color - The color of the badge.
 * @param {string} props.badge.content - The content of the badge.
 * @param {string} props.content - The content to be displayed in the card.
 * @param {string} props.picture - The URL of the picture for the card.
 * @param {string} props.title - The title of the card.
 * 
 * @returns {React.Component} The rendered Card component.
 */
function Card(props) {
  /**
   * Render the action buttons.
   * 
   * @returns {React.Component[]} An array of action buttons.
   */
  function Actions() {
    return props.actions.map(action => {
      const Icon = icons[action.icon]();

      return <IconButton {...actionsButtonStyle(Icon)}
        key={generateRandomString()}
        aria-label={action.label}
        onClick={() => action.onClick()}
      />
    })
  }

  /**
   * Render the preview content.
   * 
   * @returns {React.Component} The rendered preview content.
   */
  function Preview() {
    return <Box {...previewStyle}>
      <Wrap {...previewContentStyle}>
        <WrapItem>
          <Badge {...bedgeProps(props.badge)}>{props.badge.content}</Badge>
        </WrapItem>
        <WrapItem>
          {props.title}
        </WrapItem>
      </Wrap>

      <Flex flexDir={'column'}>
        <Content content={props.content} />
      </Flex>
    </Box>
  }

  return (<Box {...cardStyle}>
    <AspectRatio {...coverStyle}>
      <Image src={props.picture} />
    </AspectRatio>

    {props.actions
      ? <Flex {...actionsStyle}>
        <Actions />
      </Flex>
      : undefined
    }

    <Preview />
  </Box>);
};

Card.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })),
  badge: PropTypes.shape({
    color: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  content: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
