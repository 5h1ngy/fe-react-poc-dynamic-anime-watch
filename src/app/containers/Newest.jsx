import _ from "lodash";
import React, { useEffect } from 'react';

import { Badge, Flex, Wrap, WrapItem } from '@chakra-ui/react';

import SearchForm from 'app/components/SearchForm';
import Card from 'app/components/Card';
import Pagination from "app/components/Pagination";

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
                onClick: (payload) => actions.setStatus(payload),
                active: _.includes(filters.statuses, value)
            }))
        },
        {
            label: 'Tipo',
            labelColor: '#B794F4',
            values: types.map(type => ({
                label: parseTypesLabel(type),
                value: type,
                onClick: (payload) => actions.setType(payload),
                active: _.includes(filters.types, type)
            }))
        }
    ];

    useEffect(() => {
        actions.getStatuses();
        actions.getTypes();
        actions.getNewest(pagination.offset, pagination.size);
    }, [actions, pagination.offset, pagination.size]);

    useEffect(() => {
        actions.getNewest(pagination.offset, pagination.size, {
            statuses: !_.isEmpty(filters.statuses) ? filters.statuses : undefined,
            type: !_.isEmpty(filters.types) ? filters.types : undefined
        });
    }, [actions, pagination.offset, filters.statuses, filters.types, pagination.size]);

    return (<Flex direction={"column"} alignItems={"center"}>

        <Flex flexDir={"row"} mt={'1%'} w={'100%'} justifyContent={'center'}>
            <SearchForm tags={searchFormTags} />
        </Flex>

        <Flex flexDir={"row"} mt={'4%'} w={'80%'} justifyContent={'center'}>
            <Pagination
                totalItems={pagination.total}
                size={pagination.size}
                offset={pagination.offset}
                onPageChange={(offset) => actions.setPaginationNewest({ total: pagination.total, size: pagination.size, offset })}
            />
        </Flex>

        <Wrap mt='30px' spacing='30px' justify='center'>
            {newest.map(anime =>
                <WrapItem>
                    <Card
                        picture={anime.picture}
                        bedge={{
                            content: parseStatusLabel(anime.statuses),
                            color: parseStatusColor(anime.statuses)
                        }}
                        actions={[
                            { label: 'Da guardare', icon: 'FcInspection', onClick: () => actions.addFavorites(anime) },
                            { label: 'Aggiungi ai preferiti', icon: 'FcLike', onClick: () => actions.addToWatch(anime) },
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

        <Flex flexDir={"row"} mt={'4%'} w={'80%'} justifyContent={'center'}>
            <Pagination
                totalItems={pagination.total}
                size={pagination.size}
                offset={pagination.offset}
                onPageChange={(offset) => actions.setPaginationNewest({ total: pagination.total, size: pagination.size, offset })}
            />
        </Flex>
    </Flex>)
}

export default Newest