import _ from "lodash";
import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { Badge, Flex, Wrap, WrapItem } from '@chakra-ui/react';

import SearchFormTags from 'app/components/SearchForm';
import Card from 'app/components/Card';
import Pagination from "app/components/Pagination";

import { getStatuses, getTypes, getNewest } from "app/store/newest"
import { setPagination, setStatusSelected, setTypeSelected } from "app/store/newest"
import { randomColorScheme } from "app/assets/utils";

function parseStatusColor(status) {
    switch (status) {
        case "FINISHED": return 'green'
        case "ONGOING": return 'yellow'
        case "UPCOMING": return 'orange'
        case "UNKNOWN": return 'black'
        default: throw new Error('parseStatusColor no matching')
    }
}

function parseStatusLabel(status) {
    switch (status) {
        case "FINISHED": return 'concluso'
        case "ONGOING": return 'in corso'
        case "UPCOMING": return 'in arrivo'
        case "UNKNOWN": return 'sconosciuto'
        default: throw new Error('parseStatusLabel no matching')
    }
}

function parseSeason(season) {
    switch (season) {
        case "SPRING": return 'primavera'
        case "SUMMER": return 'estate'
        case "FALL": return 'autunno'
        case "WINTER": return 'inverno'
        case "UNDEFINED": return 'sconosciuto'
        default: throw new Error('parseSeason no matching')
    }
}

function parseTypesLabel(type) {
    switch (type) {
        case "TV": return 'Tv'
        case "MOVIE": return 'Film'
        case "OVA": return 'OVA'
        case "ONA": return 'ONA'
        case "SPECIAL": return 'Speciale'
        case "UNKNOWN": return 'sconosciuto'
        default: throw new Error('parseTypesLabel no matching')
    }
}

function Newest(props) {
    useEffect(() => {
        props.actions.getStatuses()
        props.actions.getTypes()
        props.actions.getNewest(props.state.pagination.offset, props.state.pagination.size)
    }, [])

    useEffect(() => {
        props.actions.getNewest(props.state.pagination.offset, props.state.pagination.size, {
            status: props.state.status.selected.length !== 0
                ? props.state.status.selected
                : undefined,
            type: props.state.types.selected.length !== 0
                ? props.state.types.selected
                : undefined
        })
    }, [props.state.status.selected, props.state.types.selected])

    return (<Flex direction={"column"} alignItems={"center"}>
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

        <Pagination
            totalItems={props.state.pagination.total}
            itemsPerPage={props.state.pagination.size}
            currentPage={props.state.pagination.offset}
            onPageChange={() => { }}
        />

        <Wrap mt='30px' spacing='30px' justify='center'>
            {props.state.newest.value.map(anime =>
                <WrapItem>
                    <Card
                        picture={anime.picture}
                        bedge={{
                            content: parseStatusLabel(anime.status),
                            color: parseStatusColor(anime.status)
                        }}
                        actions={[
                            { label: 'Da guardare', icon: 'FcInspection' },
                            { label: 'Aggiungi ai preferiti', icon: 'FcLike' }
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
            totalItems={props.state.pagination.total}
            itemsPerPage={props.state.pagination.size}
            currentPage={props.state.pagination.offset}
            onPageChange={() => { }}
        />
    </Flex>)
}

function mapStateToProps(state) {
    return state['routes/newest'];
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getNewest: (offset, size, opts = { status: undefined, type: undefined }) => dispatch(getNewest({
        offset, size, status: opts.status, type: opts.type
    })),
    getStatuses: () => dispatch(getStatuses()),
    getTypes: () => dispatch(getTypes()),
    setPagination: (payload) => dispatch(setPagination(payload)),
    setStatusSelected: (payload) => dispatch(setStatusSelected(payload)),
    setTypeSelected: (payload) => dispatch(setTypeSelected(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => ({
    state: stateProps,
    actions: dispatchProps,
    ...ownProps,
}))(Newest)