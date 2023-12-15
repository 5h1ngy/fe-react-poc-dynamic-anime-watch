import _ from "lodash";
import React, { useEffect } from 'react';

import { Badge, Flex, Wrap, WrapItem } from '@chakra-ui/react';

import SearchForm from 'app/components/SearchForm.todo';
import Card from 'app/components/Card/Card';
import Pagination from "app/components/Pagination.todo";

import { randomColorScheme } from "app/shared/utils";
import { parseStatusColor, parseStatusLabel, parseSeason, parseTypesLabel } from "app/shared/utils";

function Favorites({ actions, state }) {
    const { favorites, pagination } = state;

    useEffect(() => {
        console.log('Favorites.pagination', pagination)
    }, [pagination.offset, pagination.size]);

    return (<Flex direction={"column"} alignItems={"center"} padding={"30px"}>

        <Pagination
            totalItems={pagination.total}
            size={pagination.size}
            offset={pagination.offset}
            onPageChange={(offset) => actions.favorites.setPagination({ total: pagination.total, size: pagination.size, offset })}
        />

        <Wrap marginY={'15px'} spacing='30px' justify='center'>
            {favorites.map(anime =>
                <WrapItem>
                    <Card
                        picture={anime.picture}
                        badge={{
                            content: parseStatusLabel(anime.statuses),
                            color: parseStatusColor(anime.statuses)
                        }}
                        // actions={[
                        //     { label: 'Da guardare', icon: 'FcInspection', onClick: () => actions.favorites.addFavorites(anime) },
                        //     { label: 'Aggiungi ai preferiti', icon: 'FcLike', onClick: () => actions.toWatch.addToWatch(anime) },
                        // ]}
                        title={anime.title}
                        content={[
                            `Anno: ${parseSeason(anime.animeSeason.season)} ${anime.animeSeason.year}`,
                            `${anime.type} - Episodi: ${anime.episodes}`,
                            anime.tags.map((tag, index) => <Badge key={index} mr="1" colorScheme={randomColorScheme()}>{tag}</Badge>)
                        ]}
                    />
                </WrapItem>
            )}
        </Wrap>

        <Pagination
            totalItems={pagination.total}
            size={pagination.size}
            offset={pagination.offset}
            onPageChange={(offset) => actions.favorites.setPagination({ total: pagination.total, size: pagination.size, offset })}
        />
    </Flex>)
}

export default Favorites