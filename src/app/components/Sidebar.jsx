import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import { Box, Flex, Center, Icon, IconButton, Button } from "@chakra-ui/react";
import { Collapse, useDisclosure } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons"
import * as icons from "react-icons/fc";
import { ChevronRightIcon, HamburgerIcon, ArrowLeftIcon } from "@chakra-ui/icons";

import TypographyNeon from "./TypographyNeon";
import { generateRandomString } from "app/shared/utils";

const sidebarStyle = (isOpen) => ({
    position: "fixed",
    width: isOpen ? "240px" : "60px",
    padding: '15px',
    alignItems: 'center',
    flexDirection: "column",
})

const itemStyle = (icon) => ({
    padding: '5px',
    boxSize: '40px',
    icon,
})

const subItemDefaultStyle = (icon) => ({
    borderRadius: '10px',
    variant: 'ghost',
    leftIcon: icon,
    minWidth: '100%',
    justifyContent: 'flex-start',
})

function Sidebar({ onToggle, isOpen, expanse, items }) {

    function MenuIcon() {
        return <Flex
            width={'100%'}
            justifyContent={isOpen ? 'flex-end' : 'center'}
            flexDirection={"row"}
        >
            <IconButton
                icon={isOpen ? <ArrowLeftIcon va /> : <HamburgerIcon />}
                variant={!isOpen ? 'solid' : 'ghost'}
                onClick={() => onToggle()}
            />
        </Flex>
    }

    function SubItems({ item }) {
        const Icon = icons[item.icon];

        return !_.has(item, 'subItems')
            ? <Button {...subItemDefaultStyle(<Icon size={'16px'} />)}>
                {item.label}
            </Button>
            : <Button {...subItemDefaultStyle(<Icon size={'16px'} />)}
                rightIcon={<ArrowDownIcon marginLeft={'60px'} />}
                backgroundColor={'gray.800'}
            >
                {item.label}
            </Button>
    }

    function Items() {
        return items.map(item => {
            const Icon = icons[item.icon];

            return !isOpen
                ? <IconButton {...itemStyle(<Icon size={'16px'} />)} />
                : <SubItems item={item} />
        })
    }

    return <Flex {...sidebarStyle(isOpen)} gap={'10px'}>
        {expanse && <MenuIcon />}
        <Items />
    </Flex>
}

Sidebar.propTypes = {
    onToggle: PropTypes.func,
    isOpen: PropTypes.bool,
    expanse: PropTypes.bool,
    items: PropTypes.array,
}

Sidebar.defaultProps = {
    onToggle: () => { },
    isOpen: false,
    expanse: false,
    items: [],
}

export default Sidebar;