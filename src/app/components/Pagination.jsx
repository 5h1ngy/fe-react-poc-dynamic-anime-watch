import React from 'react';
import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <Flex justify="space-between" align="center" mt="4">
            <Text>
                Pagina {currentPage} di {totalPages} - Totale elementi: {totalItems}
            </Text>
            <Box mx={3}>
                <Button
                    variant="outline"
                    isDisabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Precedente
                </Button>
                <Button
                    ml="2"
                    variant="outline"
                    isDisabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Successiva
                </Button>
            </Box>
            <Box>
                <InputGroup>
                    <Input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={currentPage}
                        onChange={(e) => handlePageChange(Number(e.target.value))}
                    />
                    <InputRightElement>
                        <Button h={'100%'} onClick={() => handlePageChange(currentPage)}>
                            Vai
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
        </Flex>
    );
};

export default Pagination;
