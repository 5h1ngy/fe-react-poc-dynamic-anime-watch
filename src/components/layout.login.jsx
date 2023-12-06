// Importa le librerie necessarie
import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Link,
    extendTheme,
    ThemeConfig,
    ColorModeProvider,
    CSSReset,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// Definisci il tema scuro
const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
    },
    styles: {
        global: (props) => ({
            body: {
                bg: mode('white', 'gray.800')(props),
                color: mode('gray.800', 'white')(props),
            },
        }),
    },
});

// Definisci il componente di login
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Implementa la logica di autenticazione qui
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <ChakraProvider theme={theme}>
            <ColorModeProvider>
                <CSSReset />
                <Flex
                    minHeight="100vh"
                    align="center"
                    justify="center"
                >
                    <Box
                        p={8}
                        maxWidth="400px"
                        borderWidth={1}
                        borderRadius={8}
                        boxShadow="lg"
                        bgColor={mode('white', 'gray.700')}
                        color={mode('gray.800', 'white')}
                    >
                        <Heading mb={4}>Login</Heading>
                        <FormControl id="email" mb={4}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" mb={6}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button colorScheme="teal" onClick={handleLogin} mb={6}>
                            Log in
                        </Button>
                        <Link color="teal.300" href="#">
                            Forgot password?
                        </Link>
                    </Box>
                </Flex>
            </ColorModeProvider>
        </ChakraProvider>
    );
};

export default LoginPage;
