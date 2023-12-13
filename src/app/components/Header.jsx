import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import { Flex } from "@chakra-ui/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react';
import { ChevronRightIcon } from "@chakra-ui/icons";

import { translatePathNames } from "app/shared/utils";
import TypographyNeon from "app/components/TypographyNeon";

/**
 * Styles for the header component.
 */
const headerStyle = {
    width: '100%',
    backgroundColor: 'gray.900',
    padding: ' 15px 0 15px 40px',
    justifyContent: "space-between",
    alignItems: "center",
}

/**
 * Styles for the left container within the header.
 */
const containerLeftStyle = {
    flexDirection: "row",
    alignItems: "center",
}

/**
 * Styles for the right container within the header.
 */
const containerRightStyle = {
    flexDirection: "row",
}

/**
 * Function that defines the neon text style.
 *
 * @param {boolean} menu - Whether the menu is open.
 * @param {string} logoTextNeonColor - Color of the neon text.
 * @returns {Object} - Styles for the neon text.
 */
const neonTextStyle = (logoTextNeonColor) => ({
    color: logoTextNeonColor,
})

/**
 * Header component that displays a navigation bar.
 *
 * @param {Object} props - Component properties.
 * @param {string[]} props.paths - Array of paths for breadcrumb navigation.
 * @param {boolean} props.logo - Boolean indicating whether to display the logo.
 * @param {boolean} props.logoNeon - Boolean indicating whether the logo text should have a neon effect.
 * @param {string} props.logoTextNeonColor - Color for the neon text.
 * @param {string} props.logoText - Text to be displayed as the logo.
 * @param {boolean} props.breadcrumb - Boolean indicating whether to display the breadcrumb navigation.
 * @param {boolean} props.breadcrumbLogoText - Boolean indicating whether the logo text should be part of the breadcrumb.
 * @returns {JSX.Element} - Header component.
 */
function Header({
    paths,
    logo,
    logoNeon,
    logoTextNeonColor,
    logoText,
    breadcrumb,
    breadcrumbLogoText,
}) {
    /**
     * Component for the logo text.
     *
     * @returns {JSX.Element} - React element.
     */
    const LogoText = () =>
        logoNeon
            ? <TypographyNeon  {...neonTextStyle(logoTextNeonColor)} text={logoText} />
            : <Heading as='h4' size='md' >{logoText}</Heading>

    /**
     * Component for the breadcrumb navigation.
     *
     * @returns {JSX.Element} - React element.
     */
    const BreadcumbHeader = () =>
        <Breadcrumb separator={<ChevronRightIcon />}>
            {paths.map((path, index, paths) => (
                <BreadcrumbItem isCurrentPage={index === paths.length - 1} key={index}>
                    <BreadcrumbLink href={path !== ''
                        ? `${paths.slice(0, index).join('/')}`
                        : '/'
                    }>
                        {index === 0 && breadcrumbLogoText ? <LogoText /> : undefined}
                        {index !== 0 ? translatePathNames(path) : undefined}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>

    return (
        <Flex {...headerStyle}>
            <Flex {...containerLeftStyle}>

                {logo && <LogoText />}
                {breadcrumb && <BreadcumbHeader />}
            </Flex>
            <Flex {...containerRightStyle}>
                {/* Additional content for the right container */}
            </Flex>
        </Flex>
    );
}

Header.propTypes = {
    paths: PropTypes.arrayOf(PropTypes.string),
    logo: PropTypes.bool,
    logoNeon: PropTypes.bool,
    logoTextNeonColor: PropTypes.string,
    logoText: PropTypes.string,
    breadcrumb: PropTypes.bool,
    breadcrumbLogoText: PropTypes.bool,
}

Header.defaultProps = {
    paths: [],
    logo: false,
    logoNeon: false,
    logoTextNeonColor: undefined,
    logoText: undefined,
    breadcrumb: false,
    breadcrumbLogoText: false,
}

export default Header;
