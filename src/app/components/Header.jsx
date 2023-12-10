import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import { IconButton, Flex } from "@chakra-ui/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";

import { translatePathNames } from "app/shared/utils";
import TypographyNeon from "app/components/TypographyNeon";

/**
 * Stile del componente Header.
 */
const headerStyle = {
    width: '100wh',
    height: '70px',
    backgroundColor: 'blackAlpha.400',
    padding: '0 20px 0 20px',
    justifyContent: "space-between",
    alignItems: "center",
}

/**
 * Componente funzionale Header.
 * @param {object} props - Proprietà del componente.
 * @param {boolean} props.breadcrumb - Flag per visualizzare il breadcrumb.
 * @param {boolean} props.breadcrumbLogoText - Flag per visualizzare il testo del logo nel breadcrumb.
 * @param {string} props.logoTextNeon - Effetto neon per il testo del logo.
 * @param {string} props.logoText - Testo del logo.
 * @param {string[]} props.paths - Array di percorsi per il breadcrumb.
 * @param {function} props.onToggle - Funzione da chiamare quando l'icona del menu viene cliccata.
 * @returns {JSX.Element} - Elemento React.
 */
function Header({ breadcrumb, breadcrumbLogoText, logoTextNeon, logoText, paths, onToggle }) {

    /**
     * Componente per il testo del logo.
     * @returns {JSX.Element} - Elemento React.
     */
    const LogoText = () =>
        logoTextNeon
            ? <TypographyNeon text={logoText} colorScheme={logoTextNeon} />
            : logoText

    /**
     * Componente per il breadcrumb.
     * @returns {JSX.Element} - Elemento React.
     */
    const BreadcumbHeader = () =>
        <Breadcrumb separator={<ChevronRightIcon />}>
            {paths.map((path, index, paths) => (
                <BreadcrumbItem isCurrentPage={index === paths.length - 1} key={index}>
                    <BreadcrumbLink href={path !== '' ? `${paths.slice(0, index).join('/')}` : '/'}>
                        {/** Logo come percorso nel breadcrumb */}
                        {index === 0 && breadcrumbLogoText ? <LogoText /> : undefined}
                        {/** Altri percorsi */}
                        {index !== 0 ? translatePathNames(path) : undefined}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>

    return (
        <Flex {...headerStyle}>
            {/** Contenitore sinistro */}
            <Flex flexDirection={"row"}>

                {/** Icona del menu */}
                <IconButton onClick={() => onToggle()} variant='solid' icon={<HamburgerIcon />} marginRight={'15px'} />

                {/** Testo del logo come stringa */}
                {breadcrumbLogoText ? undefined : <LogoText />}

                {/** Breadcrumb (collegamenti ipertestuali di navigazione) */}
                {breadcrumb ? <BreadcumbHeader /> : undefined}

            </Flex>
            {/** Contenitore destro */}
            <Flex flexDirection={"row"}>

            </Flex>
        </Flex>
    );
}

Header.propTypes = {
    breadcrumb: PropTypes.bool,
    breadcrumbLogoText: PropTypes.bool,
    logoTextNeon: PropTypes.string,
    logoText: PropTypes.string,
    paths: PropTypes.arrayOf(PropTypes.string),
    onToggle: PropTypes.func,
}

Header.defaultProps = {
    breadcrumb: false,
    breadcrumbLogoText: false,
    logoTextNeon: '',
    logoText: '',
    paths: [],
    onToggle: undefined,
}

export default Header;
