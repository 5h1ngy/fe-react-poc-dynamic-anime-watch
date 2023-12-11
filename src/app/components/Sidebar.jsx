import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import { Box, Flex, Center, Icon, IconButton, Button } from "@chakra-ui/react";
import { Collapse, useDisclosure } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons"
import * as icons from "react-icons/fc";

import TypographyNeon from "./TypographyNeon";
import { generateRandomString } from "app/shared/utils";

const sidebarStyle = {

}

function Sidebar({ isOpen, items, display }) {
    return <Flex {...sidebarStyle}
        position={"fixed"}
        width={isOpen ? "260px" : '80px'}
        padding={'8px'}
        alignItems={isOpen ? 'flex-start' : 'center'}
        flexDirection={"column"}

    >
        {items.map(item =>
            isOpen
                ? !_.has(item, 'subItems')
                    ? <Button
                        padding={'13px'}
                        margin={'6px 0 6px 9px'}
                        borderRadius={'10px'}
                        variant='ghost'
                        leftIcon={icons[item.icon]({ size: '16px' })}
                        minWidth={'226px'}
                        justifyContent={'flex-start'}
                    >
                        {item.label}
                    </Button>
                    : <Button
                        padding={'13px'}
                        margin={'6px 0 6px 9px'}
                        borderRadius={'10px'}
                        variant='ghost'
                        leftIcon={icons[item.icon]({ size: '16px' })}
                        rightIcon={<ArrowDownIcon marginLeft={'80px'} />}
                        minWidth={'226px'}
                        justifyContent={'flex-start'}
                        backgroundColor={'gray.800'}
                    >
                        {item.label}
                    </Button>
                : <IconButton
                    padding={'5px'}
                    margin={'5px 0 5px 0'}
                    boxSize={'40px'}
                    icon={icons[item.icon]({ size: '16px' })}
                />
        )}
    </Flex>
}

Sidebar.propTypes = {
    isOpen: PropTypes.bool,
    items: PropTypes.array,
}

Sidebar.defaultProps = {
    isOpen: false,
    items: [],
}

export default Sidebar;