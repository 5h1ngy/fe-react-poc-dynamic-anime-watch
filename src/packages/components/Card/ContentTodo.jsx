import _ from "lodash";
import React from 'react';

import { Flex, Collapse } from '@chakra-ui/react';
import { Text, IconButton } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { FcUp, FcDown } from "react-icons/fc";

import { generateRandomString } from "gcommon/utils";

const simpleContentStyle = {
  marginY: '1px',
  color: "gray.500",
  fontSize: "sm",
}

const complexContentStyle = {
  marginTop: '20px',
  align: "center",
  flexDir: "column",
}

function Content({ content }) {
  const disclosure = useDisclosure();

  return content.map(content => !_.isArray(content)
    ? <Text {...simpleContentStyle}>
      {content}
    </Text>
    : <Flex {...complexContentStyle}>

      <Wrap marginY={'4px'}>
        {content.slice(0, 1).map(subContent =>
          <WrapItem key={generateRandomString()}>{subContent}</WrapItem>
        )}

        {content.slice(2, content.length - 1).length !== 0 &&
          <IconButton
            onClick={disclosure.onToggle}
            icon={disclosure.isOpen ? <FcUp /> : <FcDown />}
            variant='ghost'
            colorScheme='teal'
            size={'16px'}
          />}
      </Wrap>

      {content.slice(2, content.length - 1).length !== 0 &&
        <Collapse in={disclosure.isOpen}>
          <Wrap my={'4px'}>
            {content.slice(2, content.length - 1).map(subContent =>
              <WrapItem key={generateRandomString()}>{subContent}</WrapItem>
            )}
          </Wrap>
        </Collapse>}

    </Flex>
  );
};

export default Content
