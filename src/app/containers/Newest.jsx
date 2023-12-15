import _ from "lodash";
import React, { useEffect } from 'react';

import { Badge, Flex, Wrap, WrapItem } from '@chakra-ui/react';

import SearchForm from 'app/components/SearchForm.todo';
import Card from 'app/components/Card/Card';
import Pagination from "app/components/Pagination.todo";

import { randomColorScheme } from "app/shared/utils";
import { parseStatusColor, parseStatusLabel, parseSeason, parseTypesLabel } from "app/shared/utils";

function Newest({ actions, state }) {
    const { statuses, types, newest, pagination, filters } = state;

    const searchFormTags = [
        {
            label: 'Stato',
            labelColor: '#F6E05E',
            values: statuses.map(value => ({
                label: parseStatusLabel(value),
                value: value,
                onClick: (payload) => actions.newest.setStatus(payload),
                active: _.includes(filters.statuses, value)
            }))
        },
        {
            label: 'Tipo',
            labelColor: '#B794F4',
            values: types.map(type => ({
                label: parseTypesLabel(type),
                value: type,
                onClick: (payload) => actions.newest.setType(payload),
                active: _.includes(filters.types, type)
            }))
        }
    ];

    useEffect(() => {
        actions.newest.getStatuses();
        actions.newest.getTypes();
        actions.newest.getNewest({
            ...pagination,
            statuses: undefined,
            types: undefined
        });
    }, [actions, pagination.offset, pagination.size]);

    useEffect(() => {
        actions.newest.getNewest({
            ...pagination,
            statuses: !_.isEmpty(filters.statuses) ? filters.statuses : undefined,
            types: !_.isEmpty(filters.types) ? filters.types : undefined
        });
    }, [actions, pagination.offset, filters.statuses, filters.types, pagination.size]);

    return (<Flex direction={"column"} alignItems={"center"} padding={"30px"}>

        <SearchForm tags={searchFormTags} />

        <Pagination
            totalItems={pagination.total}
            size={pagination.size}
            offset={pagination.offset}
            onPageChange={(offset) => actions.newest.setPagination({ total: pagination.total, size: pagination.size, offset })}
        />

        <Wrap marginY={'15px'} spacing='30px' justify='center'>
            {newest.map(anime =>
                <WrapItem>
                    <Card
                        picture={anime.picture}
                        badge={{
                            content: parseStatusLabel(anime.statuses),
                            color: parseStatusColor(anime.statuses)
                        }}
                        actions={[
                            { label: 'Da guardare', icon: 'FcLike', onClick: () => actions.favorites.addFavorites(anime) },
                            { label: 'Aggiungi ai preferiti', icon: 'FcInspection', onClick: () => actions.toWatch.addToWatch(anime) },
                        ]}
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
            onPageChange={(offset) => actions.newest.setPagination({ total: pagination.total, size: pagination.size, offset })}
        />
    </Flex>)
}

export default Newest