import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    Collapse,
    Text,
    Flex,
    Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

/**
 * Componente AccordionItem - Rappresenta un elemento all'interno dell'Accordion.
 *
 * @component
 * @param {Object} props - Le props del componente.
 * @param {string} props.title - Il titolo dell'elemento AccordionItem.
 * @param {JSX.Element} props.children - Il contenuto dell'elemento AccordionItem.
 * @returns {JSX.Element} - Il componente AccordionItem.
 */
const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        // <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
        <Box borderRadius="md" p={4} mb={4}>
            <Flex align="center" justify="space-between">
                <Text fontSize="lg" fontWeight="bold">
                    {title}
                </Text>
                <Button onClick={() => setIsOpen(!isOpen)}>
                    {/* {isOpen ? 'Chiudi' : 'Apri'} */}
                    {isOpen ? 'x' : 'Filtri'}
                </Button>
            </Flex>
            <Collapse in={isOpen}>
                <Box mt={2}>{children}</Box>
            </Collapse>
        </Box>
    );
};

AccordionItem.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

/**
 * Componente Accordion - Rappresenta un accordion composto da AccordionItem.
 *
 * @component
 * @example
 * return (
 *   <Accordion>
 *     <AccordionItem title="Sezione 1">Contenuto della sezione 1</AccordionItem>
 *     <AccordionItem title="Sezione 2">Contenuto della sezione 2</AccordionItem>
 *   </Accordion>
 * );
 *
 * @param {Object} props - Le props del componente.
 * @param {JSX.Element[]} props.children - Gli elementi AccordionItem.
 * @returns {JSX.Element} - Il componente Accordion.
 */
const Accordion = ({ children }) => {
    return <><AccordionItem>{children}</AccordionItem></>;
};

Accordion.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Accordion;
