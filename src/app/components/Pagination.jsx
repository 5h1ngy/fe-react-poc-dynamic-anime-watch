import React, { useRef, useEffect } from 'react';
import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';

const Pagination = ({ totalItems, size, offset, onPageChange }) => {
    const inputRef = useRef(null);

    const totalPages = Math.ceil(totalItems / size);

    function handlePageChange(offset) {
        if (offset >= 1 && offset <= totalPages) {
            onPageChange(offset);
        }
    };

    return (
        <Flex justify="space-between" align="center" w={'100%'} marginY={'15px'}>
            <Flex flexDirection={'row'} alignItems={'center'}>

                <Flex flexDirection={'row'} alignItems={'center'}>
                    <Text mr={4}>pagina {offset} di {totalPages}</Text>
                </Flex>

                <Flex flexDirection={'row'} alignItems={'center'}>
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
                            <Button h={'100%'} onClick={() => handlePageChange(offset)}>
                                Vai
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex>

            </Flex>
            <Flex Flex flexDirection={'row'} alignItems={'center'}>
                <Text mr={4}>
                    {totalItems} risultati
                </Text>
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
