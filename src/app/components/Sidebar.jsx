import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Center, Icon } from "@chakra-ui/react";

import { Collapse, useDisclosure } from "@chakra-ui/react";

import * as icons from "react-icons/fc";


import NeonText from "../assets/NeonText";
import { generateRandomString } from "app/utils";

const navItemStyle = {
    align: "center",
    px: "4",
    mx: "2",
    rounded: "md",
    py: "4",
    cursor: "pointer",
    color: "whiteAlpha.700",
    _hover: { bg: "blackAlpha.300", color: "whiteAlpha.900" },
    role: "group",
    fontWeight: "semibold",
    transition: ".15s ease",
};

const activeNavItemStyle = {
    color: "white",
    bg: "brand.500",
};

function NavItem(props) {
    const { icon, children, isActive, ...rest } = props;

    return (
        <Flex
            {...navItemStyle}
            {...(isActive ? activeNavItemStyle : {})}
            {...rest}
        >
            {icon && (
                <Icon
                    mr="2"
                    boxSize="7"
                    _groupHover={{ color: "gray.300" }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
}

function Sidebar(props) {
    const { items, logoText, activeItemId } = props;
    const disclosure = useDisclosure();
    const integrations = items.map(
        (item) => (_.has(item, 'subItems') ? _.cloneDeep(disclosure) : undefined)
    );

    function assignNavItem() {
        return items.map((item, itemIndex) => (
            !_.has(item, 'subItems') ? (
                <NavItem
                    key={generateRandomString(8)}
                    icon={icons[item.icon]}
                    isActive={item.id === activeItemId}
                >
                    {item.label}
                </NavItem>
            ) : (
                <>
                    <NavItem
                        key={generateRandomString(8)}
                        icon={icons[item.icon]}
                        onClick={integrations[itemIndex].onToggle}
                        isActive={item.id === activeItemId}
                    >
                        {item.label}
                        <Icon
                            as={icons['FcExpand']}
                            ml="auto"
                            transform={integrations[itemIndex].isOpen && "rotate(180deg)"}
                        />
                    </NavItem>

                    <Collapse in={integrations[itemIndex].isOpen}>
                        {item.subItems.map((subItem) => (
                            <NavItem
                                key={generateRandomString(8)}
                                pl="12"
                                py="3"
                                icon={icons[subItem.icon]}
                                isActive={subItem.id === activeItemId}
                            >
                                {subItem.label}
                            </NavItem>
                        ))}
                    </Collapse>
                </>
            )
        ));
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
                <NeonText text={logoText} colorScheme="#ff80c0" />
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

export default Sidebar;
