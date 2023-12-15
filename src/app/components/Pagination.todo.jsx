import React, { useRef } from 'react';
import { Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';

/**
 * Componente di paginazione con supporto per un layout responsive.
 *
 * @component
 * @param {Object} props - Proprietà del componente.
 * @param {number} props.totalItems - Il numero totale di elementi da paginare.
 * @param {number} props.size - Il numero di elementi visualizzati per pagina.
 * @param {number} props.offset - L'indice della pagina corrente.
 * @param {Function} props.onPageChange - Funzione chiamata quando cambia la pagina.
 * @returns {JSX.Element} Il componente di paginazione.
 */
const Pagination = ({ totalItems, size, offset, onPageChange }) => {
    const inputRef = useRef(null);

    const totalPages = Math.ceil(totalItems / size);

    /**
     * Gestisce il cambio di pagina.
     *
     * @param {number} newOffset - Il nuovo indice di pagina.
     */
    function handlePageChange(newOffset) {
        if (newOffset >= 1 && newOffset <= totalPages) {
            onPageChange(newOffset);
        }
    }

    return (
        <Flex justify="space-between" align="center" w="100%" marginY="15px" flexDirection={{ base: 'column', md: 'row' }}>
            <Flex flexDirection="row" alignItems="center" gap={'10px'}>
                {/* Sezione di input per cambiare pagina */}
                <InputGroup>
                    <Input
                        ref={inputRef}
                        type="number"
                        min="1"
                        max={totalPages}
                        value={offset}
                        onChange={(event) => handlePageChange(Number(event.target.value))}
                        onFocus={() => {
                            inputRef.current.focus();
                            inputRef.current.select();
                        }}
                    />
                    <InputRightElement>
                        <Button h="100%" onClick={() => handlePageChange(offset)}>
                            Vai
                        </Button>
                    </InputRightElement>
                </InputGroup>
                {/* Sezione informazioni sulla pagina */}
                <Text ml={4}>Pagina {offset} di {totalPages}</Text>
            </Flex>
            {/* Sezione bottoni di navigazione */}
            <Flex flexDirection="row" alignItems="center" mt={{ base: 4, md: 0 }}>
                {/* Sezione informazioni sul numero totale di risultati */}
                <Text mr={4}>{totalItems} risultati</Text>
                <Button
                    variant="outline"
                    isDisabled={offset === 1}
                    onClick={() => handlePageChange(offset - 1)}
                >
                    Precedente
                </Button>
                <Button
                    ml="2"
                    variant="outline"
                    isDisabled={offset === totalPages}
                    onClick={() => handlePageChange(offset + 1)}
                >
                    Successiva
                </Button>
            </Flex>
        </Flex>
    );
};

export default Pagination;
