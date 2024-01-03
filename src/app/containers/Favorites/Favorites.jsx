import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { NoItems } from 'lib-react-gcomponents';
import withContainer from 'app/hocs/withContainer';
import Cards from './FavoritesCards';

const FavoritesCards = withContainer(
    ['favorites'],
    ['favorites'],
    Cards,
);

function Favorites({ state }) {
    const { favorites } = state;

    useEffect(() => {
        if (favorites.length !== 0) {
            localStorage.setItem('favorites_content', JSON.stringify(favorites))
        }
    }, [favorites])

    return (<Flex
        direction={"column"}
        alignItems={"center"}
        padding={"30px"}
        height={'100%'}
    >
        <NoItems condition={favorites.length !== 0}>
            <FavoritesCards />
        </NoItems>
    </Flex>)
}

export default Favorites