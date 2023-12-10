import React from 'react';
import PropTypes from 'prop-types';

import { Flex, Wrap, WrapItem } from '@chakra-ui/react';
import { TagLabel, TagLeftIcon, Tag } from '@chakra-ui/react';
import { Center, Heading, useDisclosure } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

import { generateRandomString } from 'app/shared/utils';

import TypographyNeon from "app/components/TypographyNeon";
import { randomColorScheme } from 'app/shared/utils';

/**
 * Componente principale per il form di ricerca.
 * @param {Object} props - Le proprietà del componente.
 * @param {Array} props.tags - Un array di categorie con etichette e valori.
 */
const SearchForm = ({ tags }) => {

    /**
     * Componente per gestire un singolo elemento di tag.
     * @param {Object} props - Le proprietà del componente.
     * @param {string} props.children - Il testo del tag.
     */
    function TagItem(props) {
        /**
         * Gestisce l'evento di aggiunta/rimozione del tag.
         */
        function handleAdd() {
            props.onClick(props.value)
        }

        return (
            <Tag
                size="lg"
                variant="subtle"
                colorScheme={props.active ? randomColorScheme() : 'gray'}
                onClick={handleAdd}
            >
                <TagLeftIcon boxSize='12px' as={!props.active ? AddIcon : CloseIcon} />
                <TagLabel>{props.children}</TagLabel>
            </Tag>
        );
    }

    return (tags.map((tag) => (
        <Flex alignItems="center" mx={"1%"} flexDir={"column"} justifyContent={'center'}>
            <Center mb={'6px'}>
                <Heading as='h3' size='lg'><TypographyNeon text={tag.label} colorScheme={tag.labelColor} /></Heading>
            </Center>
            <Wrap spacing="2">
                {tag.values.map((type) => (
                    <WrapItem key={generateRandomString()}>
                        <TagItem onClick={type.onClick} active={type.active} value={type.value}>{type.label}</TagItem>
                    </WrapItem>
                ))}
            </Wrap>
        </Flex>
    )));
};

SearchForm.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
            active: PropTypes.bool.isRequired,
        }).isRequired).isRequired
    }).isRequired).isRequired,
};

export default SearchForm;
