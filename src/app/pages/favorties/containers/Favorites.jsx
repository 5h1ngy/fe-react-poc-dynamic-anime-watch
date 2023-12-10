import _ from "lodash";
import React, { useEffect } from 'react';

import { Badge, Flex, Wrap, WrapItem } from '@chakra-ui/react';

import SearchFormTags from 'app/components/SearchForm';
import Card from 'app/components/Card';
import Pagination from "app/components/Pagination";

import { randomColorScheme } from "app/shared/utils";
import { parseStatusColor, parseStatusLabel, parseSeason, parseTypesLabel } from "app/shared/utils";

function Favorites(props) {
    useEffect(() => {
        props.actions.getStatuses();
        props.actions.getTypes();
        props.actions.getNewest(props.state.pagination.offset, props.state.pagination.size);
    }, [props.actions, props.state.pagination.offset, props.state.pagination.size]);

    useEffect(() => {
        props.actions.getNewest(props.state.pagination.offset, props.state.pagination.size, {
            status: props.state.status.selected.length !== 0
                ? props.state.status.selected
                : undefined,
            type: props.state.types.selected.length !== 0
                ? props.state.types.selected
                : undefined
        });
    }, [props.actions, props.state.pagination.offset, props.state.status.selected, props.state.types.selected, props.state.pagination.size]);

    return (<Flex direction={"column"} alignItems={"center"}>

        <Flex flexDir={"row"} mt={'1%'} w={'100%'} justifyContent={'center'}>
            <SearchFormTags
                tags={[
                    {
                        label: 'Stato',
                        labelColor: '#F6E05E',
                        values: props.state.status.value.map(status => ({
                            label: parseStatusLabel(status),
                            value: status,
                            onClick: (status) => props.actions.setStatusSelected(status),
                            active: _.includes(props.state.status.selected, status)
                        }))
                    },
                    {
                        label: 'Tipo',
                        labelColor: '#B794F4',
                        values: props.state.types.value.map(type => ({
                            label: parseTypesLabel(type),
                            value: type,
                            onClick: (type) => props.actions.setTypeSelected(type),
                            active: _.includes(props.state.types.selected, type)
                        }))
                    }
                ]}
            />
        </Flex>

        <Flex flexDir={"row"} mt={'4%'} w={'80%'} justifyContent={'center'}>
            <Pagination
                totalItems={props.state.pagination.total}
                size={props.state.pagination.size}
                offset={props.state.pagination.offset}
                onPageChange={(offset) => props.actions.setPaginationNewest({
                    total: props.state.pagination.total,
                    size: props.state.pagination.size,
                    offset,
                })}
            />
        </Flex>

        <Wrap mt='30px' spacing='30px' justify='center'>
            {props.state.favorites.value.map(anime =>
                <WrapItem>
                    <Card
                        picture={anime.picture}
                        bedge={{
                            content: parseStatusLabel(anime.status),
                            color: parseStatusColor(anime.status)
                        }}
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
                totalItems={props.state.pagination.total}
                size={props.state.pagination.size}
                offset={props.state.pagination.offset}
                onPageChange={(offset) => props.actions.setPaginationNewest({
                    total: props.state.pagination.total,
                    size: props.state.pagination.size,
                    offset,
                })}
            />
        </Flex>
    </Flex>)
}

export default Favorites