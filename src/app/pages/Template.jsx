import React from "react";
import { Outlet } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { useDisclosure, useColorMode, useColorModeValue } from "@chakra-ui/react";

import { FiMenu } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";

import withConfig from 'app/hocs/withConfig'
import withRouter from 'app/hocs/withRouter'
import Sidebar from 'app/components/Sidebar'

/**
 * LayoutTemplate component represents the main layout template for the application.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @param {object} props.router - The router-related props injected by the withRouter HOC.
 * @param {object} props.config - The configuration data injected by the withConfig HOC.
 * @returns {React.ReactNode} The JSX for the main layout template.
 */
function LayoutTemplate({ router, config }) {
    const { toggleColorMode: toggleMode } = useColorMode();
    const text = useColorModeValue("dark", "light");
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    // UseDisclosure hook to manage the state of the sidebar
    const sidebarDisclosure = useDisclosure();

    return (
        <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">
            {/* Sidebar for larger screens */}
            <Sidebar logoText={config.template.sidebar.logoText} items={config.template.sidebar.items} display={{ base: "none", md: "unset" }} />

            {/* Drawer for smaller screens */}
            <Drawer
                isOpen={sidebarDisclosure.isOpen}
                onClose={sidebarDisclosure.onClose}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <Sidebar logoText={config.template.sidebar.logoText} items={config.template.sidebar.items} w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>

            {/* Main content area */}
            <Box ml={{ base: 0, md: 80 }} transition=".3s ease">
                {/* Header */}
                <Flex
                    as="header"
                    align="center"
                    justify="space-between"
                    w="full"
                    px="4"
                    bg="white"
                    _dark={{ bg: "gray.800" }}
                    borderBottomWidth="1px"
                    borderColor="blackAlpha.300"
                    h="14"
                >
                    {/* Menu icon for smaller screens */}
                    <IconButton
                        aria-label="Menu"
                        display={{ base: "inline-flex", md: "none" }}
                        onClick={sidebarDisclosure.onOpen}
                        icon={<FiMenu />}
                        size="sm"
                    />

                    {/* Color mode switch */}
                    <IconButton
                        size="md"
                        fontSize="lg"
                        aria-label={`Switch to ${text} mode`}
                        variant="ghost"
                        color="current"
                        ml={{ base: "0", md: "3" }}
                        onClick={toggleMode}
                        icon={<SwitchIcon />}
                    />
                </Flex>

                {/* Main content area */}
                <Box as="main" p="4">
                    {/* Outlet to render nested routes */}
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

// Wrap LayoutTemplate with withRouter and withConfig HOCs
export default withRouter(withConfig(LayoutTemplate))
