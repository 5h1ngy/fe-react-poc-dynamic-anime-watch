import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Wrap, WrapItem, useBreakpointValue } from '@chakra-ui/react';
import { TagLabel, TagLeftIcon, Tag } from '@chakra-ui/react';
import { Center, Heading } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { generateRandomString } from 'gcommon/utils';

import TypographyNeon from "./TypographyNeon";
import { randomColorScheme } from 'app/common';

/**
 * Componente principale per il form di ricerca.
 * @param {Object} props - Le proprietà del componente.
 * @param {Array} props.tags - Un array di categorie con etichette e valori.
 */
const SearchForm = ({ tags }) => {
    const [_wrapDirection, setWrapDirection] = useState("row");

    // Usiamo useBreakpointValue per ottenere il valore in base alla dimensione dello schermo
    const breakpointDirection = useBreakpointValue({ base: "column", md: "row" });

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

    // Aggiorniamo la direzione quando cambia la dimensione dello schermo
    useEffect(() => {
        setWrapDirection(breakpointDirection);
    }, [breakpointDirection]);

    return (
        <Wrap align={'center'} justify={'center'} marginBottom={'15px'} spacing={'40px'}>
            {tags.map((tag) => (
                <WrapItem key={generateRandomString()} flexDirection={'column'} alignItems="center" alignContent={'center'} justifyContent={'center'}>
                    <Center mb={'6px'}>
                        <Heading as='h3' size='lg'><TypographyNeon text={tag.label} color={tag.labelColor} /></Heading>
                    </Center>
                    <Wrap spacing="10px" marginTop={'10px'}>
                        {tag.values.map((type) => (
                            <WrapItem boxShadow={"0 4px 8px rgba(0, 0, 0, 0.5)"} key={generateRandomString()} alignItems="center" alignContent={'center'} justifyContent={'center'}>
                                <TagItem onClick={type.onClick} active={type.active} value={type.value}>{type.label}</TagItem>
                            </WrapItem>
                        ))}
                    </Wrap>
                </WrapItem>
            ))}
        </Wrap>
    );
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
