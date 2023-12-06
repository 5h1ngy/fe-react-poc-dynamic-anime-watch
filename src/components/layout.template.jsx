import React from "react";
import {
    Avatar,
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import {
    FaBell,
    FaClipboardCheck,
    FaRss,
} from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import { Logo } from "@choc-ui/logo";

/**
 * Componente che rappresenta un singolo elemento di navigazione nel menu laterale.
 * @param {Object} props - Proprietà del componente.
 * @param {React.Component} props.icon - Icona del componente.
 * @param {React.Component} props.children - Contenuto del componente.
 * @returns {React.Component} - Elemento di navigazione.
 */
const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
        <Flex
            align="center"
            px="4"
            mx="2"
            rounded="md"
            py="3"
            cursor="pointer"
            color="whiteAlpha.700"
            _hover={{
                bg: "blackAlpha.300",
                color: "whiteAlpha.900",
            }}
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            {...rest}
        >
            {icon && (
                <Icon
                    mr="2"
                    boxSize="4"
                    _groupHover={{
                        color: "gray.300",
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};

/**
 * Componente che rappresenta il contenuto del menu laterale.
 * @param {Object} props - Proprietà del componente.
 * @returns {React.Component} - Contenuto del menu laterale.
 */
const SidebarContent = (props) => (
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
        w="60"
        {...props}
    >
        <Flex px="4" py="5" align="center">
            <Logo />
            <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
                Choc UI
            </Text>
        </Flex>
        <Flex
            direction="column"
            as="nav"
            fontSize="sm"
            color="gray.600"
            aria-label="Main Navigation"
        >
            <NavItem icon={MdHome}>Home</NavItem>
            <NavItem icon={FaRss}>Articles</NavItem>
            <NavItem icon={HiCollection}>Collections</NavItem>
            <NavItem icon={FaClipboardCheck}>Checklists</NavItem>
            <NavItem icon={HiCode}>Integrations</NavItem>
            <NavItem icon={AiFillGift}>Changelog</NavItem>
            <NavItem icon={BsGearFill}>Settings</NavItem>
        </Flex>
    </Box>
);

/**
 * Componente principale che rappresenta il layout della pagina.
 * @returns {React.Component} - Layout della pagina.
 */
export default function LayoutTemplate({ children }) {
    const sidebar = useDisclosure();

    return (
        <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">
            {/* Contenuto del menu laterale per schermi larghi */}
            <SidebarContent display={{ base: "none", md: "unset" }} />

            {/* Contenuto del menu laterale per schermi stretti */}
            <Drawer
                isOpen={sidebar.isOpen}
                onClose={sidebar.onClose}
                placement="left"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>

            {/* Contenuto principale della pagina */}
            <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
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
                    {/* Icona del menu per schermi stretti */}
                    <IconButton
                        aria-label="Menu"
                        display={{ base: "inline-flex", md: "none" }}
                        onClick={sidebar.onOpen}
                        icon={<FiMenu />}
                        size="sm"
                    />

                    {/* Campo di ricerca */}
                    <InputGroup w="96" display={{ base: "none", md: "flex" }}>
                        <InputLeftElement color="gray.500">
                            <FiSearch />
                        </InputLeftElement>
                        <Input placeholder="Search for articles..." />
                    </InputGroup>

                    {/* Icona della campana e avatar dell'utente */}
                    <Flex align="center">
                        <Icon color="gray.500" as={FaBell} cursor="pointer" />
                        <Avatar
                            ml="4"
                            size="sm"
                            name="anubra266"
                            src="https://avatars.githubusercontent.com/u/30869823?v=4"
                            cursor="pointer"
                        />
                    </Flex>
                </Flex>

                {/* Contenuto principale della pagina */}
                <Box as="main" p="4">
                    {/* Aggiungi qui il contenuto principale, rimuovi la box di esempio */}
                    {/* <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96" /> */}
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
