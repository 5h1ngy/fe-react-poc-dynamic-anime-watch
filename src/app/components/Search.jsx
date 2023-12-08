import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  Checkbox,
  Select,
  Button,
  Spacer,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Importa le icone necessarie
import PropTypes from 'prop-types';

/**
 * Componente AnimeSearchForm - Rappresenta una form per la ricerca di anime.
 *
 * @component
 * @example
 * return (
 *   <AnimeSearchForm onSearch={(formData) => console.log(formData)} />
 * );
 *
 * @param {Object} props - Le props del componente.
 * @param {function} props.onSearch - La funzione di gestione della ricerca.
 * @returns {JSX.Element} - Il componente AnimeSearchForm.
 */
const AnimeSearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    animeName: '',
    startDate: '',
    ongoing: false,
    tags: [],
  });

  const [isFormVisible, setFormVisibility] = useState(false);

  /**
   * Gestisce il cambiamento di input e aggiorna lo stato formData.
   *
   * @param {string} field - Il campo di input.
   * @param {string | number | boolean | string[]} value - Il valore del campo di input.
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
    <Box p={4} borderRadius="md">
      <Button
        colorScheme="teal"
        onClick={() => setFormVisibility(!isFormVisible)}
        mb={2}
        leftIcon={isFormVisible ? <FiChevronUp /> : <FiChevronDown />}
      >
        {isFormVisible ? 'Nascondi Ricerca' : 'Mostra Ricerca'}
      </Button>

      {isFormVisible && (
        <Wrap spacing={4}>
          <WrapItem>
            <Input
              shadow="md"
              placeholder="Nome dell'anime"
              value={formData.animeName}
              onChange={(e) => handleInputChange('animeName', e.target.value)}
              mb={2}
            />
          </WrapItem>

          <WrapItem>
            <Input
              shadow="md"
              type="date"
              placeholder="Data di inizio"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              mb={2}
            />
          </WrapItem>

          <WrapItem>
            <Flex align="center" mb={2} shadow="md">
              <Checkbox
                isChecked={formData.ongoing}
                onChange={(e) => handleInputChange('ongoing', e.target.checked)}
                mr={2}
              />
              <Box>Ongoing</Box>
            </Flex>
          </WrapItem>

          <WrapItem>
            <Select
              shadow="md"
              placeholder="Seleziona tag"
              value={formData.tags}
              onChange={(e) =>
                handleInputChange(
                  'tags',
                  Array.isArray(e) ? e.map((option) => option.value) : []
                )
              }
              isMulti
              mb={2}
            >
              <option value="fantasy">Fantasy</option>
              <option value="action">Action</option>
              <option value="romance">Romance</option>
            </Select>
          </WrapItem>

          <WrapItem>
            <Button
              colorScheme="teal"
              leftIcon={<FiSearch />}
              onClick={handleSearch}
            />
          </WrapItem>
        </Wrap>
      )}
    </Box>
  );
};

AnimeSearchForm.propTypes = {
  /**
   * La funzione di gestione della ricerca.
   * @param {Object} formData - Dati di ricerca attuali.
   */
  onSearch: PropTypes.func.isRequired,
};

export default AnimeSearchForm;
