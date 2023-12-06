import React, { useState } from 'react';
import {
    Box,
    Flex,
    Input,
    Button,
    Select,
    Checkbox,
    Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

/**
 * Componente SearchForm per la ricerca avanzata.
 *
 * @component
 * @example
 * return (
 *   <SearchForm onSearch={(formData) => handleSearch(formData)} />
 * );
 *
 * @param {Object} props - Le props del componente.
 * @param {function} props.onSearch - La funzione di gestione della ricerca.
 * @returns {JSX.Element} - Il componente SearchForm.
 */
const SearchForm = ({ onSearch }) => {
    const [formData, setFormData] = useState({
        textInput: '',
        numberInput: '',
        dateInput: '',
        selectInput: '',
        checkboxInput: false,
    });

    /**
     * Gestisce il cambiamento di input e aggiorna lo stato formData.
     *
     * @param {string} field - Il campo di input.
     * @param {string | number | boolean} value - Il valore del campo di input.
     */
    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    /**
     * Gestisce la ricerca e chiama la funzione onSearch con i dati di ricerca correnti.
     */
    const handleSearch = () => {
        onSearch(formData);
    };

    return (
        <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
            <Flex justify="space-between" align="center" flexWrap="wrap">
                <Input
                    placeholder="Campo di testo"
                    value={formData.textInput}
                    onChange={(e) => handleInputChange('textInput', e.target.value)}
                    mb={2}
                />

                <Input
                    type="number"
                    placeholder="Campo numerico"
                    value={formData.numberInput}
                    onChange={(e) => handleInputChange('numberInput', e.target.value)}
                    mb={2}
                />

                <Input
                    type="date"
                    placeholder="Campo data"
                    value={formData.dateInput}
                    onChange={(e) => handleInputChange('dateInput', e.target.value)}
                    mb={2}
                />

                <Select
                    placeholder="Selezione multipla"
                    value={formData.selectInput}
                    onChange={(e) => handleInputChange('selectInput', e.target.value)}
                    mb={2}
                >
                    <option value="opzione1">Opzione 1</option>
                    <option value="opzione2">Opzione 2</option>
                    <option value="opzione3">Opzione 3</option>
                </Select>

                <Flex align="center" mb={2}>
                    <Checkbox
                        isChecked={formData.checkboxInput}
                        onChange={(e) =>
                            handleInputChange('checkboxInput', e.target.checked)
                        }
                        mr={2}
                    />
                    <Text>Checkbox</Text>
                </Flex>

                <Button colorScheme="teal" onClick={handleSearch}>
                    Cerca
                </Button>
            </Flex>
        </Box>
    );
};

SearchForm.propTypes = {
    /**
     * La funzione di gestione della ricerca.
     * @param {Object} formData - Dati di ricerca attuali.
     */
    onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
