import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import { Flex, IconButton, Button } from "@chakra-ui/react";
import { HamburgerIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import * as icons from "react-icons/fc";

import { useNavigate } from "react-router-dom";

import {
    containerItemStyle,
    itemStyle,
    sidebarStyle,
} from './Sidebar.style';

/**
 * Barra laterale principale.
 * @param {Object} props - Proprietà della barra laterale.
 * @param {function} props.onToggle - Funzione di callback per la chiusura/apertura della barra laterale.
 * @param {boolean} props.isOpen - Indica se la barra laterale è aperta o chiusa.
 * @param {boolean} props.expanse - Indica se la barra laterale deve espandersi.
 * @param {Array} props.items - Elenco degli elementi della barra laterale.
 * @returns {React.Element} Componente della barra laterale.
 */
function Sidebar({ onToggle, isOpen, expanse, items }) {
    const navigate = useNavigate();

    /**
     * Icona del menu per aprire/chiusa la barra laterale.
     * @returns {React.Element} Icona del menu.
     */
    function MenuIcon() {
        return <IconButton
            icon={isOpen ? <ArrowLeftIcon /> : <HamburgerIcon />}
            variant={!isOpen ? 'solid' : 'ghost'}
            onClick={() => onToggle()}
        />;
    }

    /**
     * Contenitore degli elementi della barra laterale.
     * @param {Object} props - Proprietà del contenitore.
     * @param {boolean} props.enable - Abilita o disabilita il contenitore.
     * @param {React.Element} props.children - Elementi figlio.
     * @returns {React.Element} Contenitore degli elementi.
     */
    function ContainerItems({ enable, children }) {
        return <Flex {...containerItemStyle(isOpen, enable)}>
            {children}
        </Flex>;
    }

    /**
     * Elementi della barra laterale.
     * @returns {Array} Array di elementi della barra laterale.
     */
    function Items() {
        return items.map(item => {
            const Icon = icons[item.icon];

            return <ContainerItems enable={_.has(item, 'subItems')} key={item.label}>
                {isOpen
                    ? <Button {...itemStyle(<Icon size={'16px'} />)} onClick={() => navigate(item.path)}>{item.label}</Button>
                    : <IconButton icon={<Icon size={'16px'} />} onClick={() => navigate(item.path)} />
                }

                {_.get(item, 'subItems', []).map(subItem => {
                    const SubIcon = icons[subItem.icon];

                    return isOpen
                        ? <Button {...itemStyle(<SubIcon size={'16px'} />)} key={subItem.label} onClick={() => navigate(item.path)}>{subItem.label}</Button>
                        : <IconButton icon={<SubIcon size={'16px'} />} key={subItem.label} onClick={() => navigate(item.path)} />;
                })}
            </ContainerItems>;
        });
    }

    return <Flex {...sidebarStyle(isOpen)} gap={'10px'}>

        {expanse && <Flex
            width={'100%'}
            justifyContent={isOpen ? 'flex-end' : 'center'}
            flexDirection={"row"}
            padding={'15px'}
        >
            <MenuIcon />
        </Flex>}

        <Flex
            width={'100%'}
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={'10px'}
            padding={'10px'}
        >
            <Items />
        </Flex>

    </Flex>;
}

// Proprietà di Sidebar con relative tipizzazioni.
Sidebar.propTypes = {
    onToggle: PropTypes.func,
    isOpen: PropTypes.bool,
    expanse: PropTypes.bool,
    items: PropTypes.array,
};

// Valori predefiniti per le proprietà di Sidebar.
Sidebar.defaultProps = {
    onToggle: () => { },
    isOpen: false,
    expanse: false,
    items: [],
};

export default Sidebar;
