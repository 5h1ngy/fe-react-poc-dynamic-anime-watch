import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Icon } from "@chakra-ui/react";

import { Collapse, useDisclosure } from "@chakra-ui/react";

import * as icons from "react-icons/fc";


import NeonText from "../assets/NeonText";
import { generateRandomString } from "app/utils";

/**
 * Represents a navigation item in the sidebar.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @param {React.ElementType} props.icon - The icon component to be displayed.
 * @param {React.ReactNode} props.children - The content to be displayed next to the icon.
 * @returns {React.ReactNode} The JSX for the navigation item.
 */
function NavItem(props) {
    const { icon, children, ...rest } = props;

    return (
        <Flex
            align="center"
            px="4"
            mx="2"
            rounded="md"
            py="4"
            cursor="pointer"
            color="whiteAlpha.700"
            _hover={{ bg: "blackAlpha.300", color: "whiteAlpha.900" }}
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            {...rest}
        >
            {icon && (<Icon mr="2" boxSize="7" _groupHover={{ color: "gray.300" }} as={icon} />)}
            {children}
        </Flex>
    );
};

/**
 * Represents the sidebar navigation component.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @returns {React.ReactNode} The JSX for the sidebar.
 */
function Sidebar(props) {
    const disclosure = useDisclosure();
    const integrations = props.items.map(item => _.has(item, 'subItems') ? _.cloneDeep(disclosure) : undefined)

    function assignNavItem() {
        return props.items.map((item, itemIndex) => (
            !_.has(item, 'subItems')
                ? <NavItem key={generateRandomString(8)} icon={icons[item.icon]}>{item.label}</NavItem>
                : <>
                    <NavItem key={generateRandomString(8)} icon={icons[item.icon]} onClick={integrations[itemIndex].onToggle}>
                        {item.label}
                        <Icon as={icons['FcExpand']} ml="auto" transform={integrations[itemIndex].isOpen && "rotate(180deg)"} />
                    </NavItem>

                    <Collapse in={integrations[itemIndex].isOpen}>
                        {item.subItems.map(subItem => (<>
                            <NavItem pl="12" py="3" icon={icons[subItem.icon]}>{subItem.label}</NavItem>
                        </>))}
                    </Collapse>
                </>
        ))
    }

    return (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg="brand.600"
            borderColor="blackAlpha.300"
            borderRightWidth="1px"
            w="80"
            {...props}
        >
            <Flex px="4" py="5" align="center">
                <NeonText text={props.logoText} />
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="gray.600"
                aria-label="Main Navigation"
            >
                {assignNavItem()}
            </Flex>
        </Box>
    );
}

Sidebar.propTypes = {
    logoText: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        id: PropTypes.string,
        icon: PropTypes.string,
        subItem: PropTypes.shape({
            label: PropTypes.string,
            id: PropTypes.string,
            icon: PropTypes.string,
        })
    }))
}

Sidebar.defaultProp = {
    items: []
}

export default Sidebar;
