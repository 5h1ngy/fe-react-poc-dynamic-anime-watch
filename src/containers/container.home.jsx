import React, { useEffect } from 'react';
import anime from '../services/anime-offline-database.json'
import { Card, Image, Stack, CardBody, CardFooter, Button, Tag, Heading } from '@chakra-ui/react';

const Home = ({ }) => {
    const POS = 100;

    useEffect(() => {
        console.log(anime.data[POS])
    }, [])

    return (<>
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={anime.data[POS].picture}
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>{anime.data[POS].title}</Heading>

                    {anime.data[POS].tags.map(tag => <Tag>{tag}</Tag>)}
                </CardBody>

                <CardFooter>
                    <Button variant='solid' colorScheme='blue'>
                        Buy Latte
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    </>)
}

// Home.PropTypes = {

// }

// Home.defaultProps = {

// }

export default Home