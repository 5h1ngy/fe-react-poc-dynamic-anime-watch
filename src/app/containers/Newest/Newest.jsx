import _ from "lodash";
import React, { useEffect } from 'react';

import { Flex } from '@chakra-ui/react';

import Loader from 'app/components/Loader.todo';
import NoItems from 'app/components/NoItems.todo';

import withContainer from 'app/hocs/withContainer';
import SearchForm from './NewestSearchForm';
import Pagination from './NewestPagination';
import Cards from './NewestCards';

const NewestSearchForm = withContainer(
    ['newest', 'favorites', 'toWatch'],
    ['newest'],
    SearchForm,
);

const NewestPagination = withContainer(
    ['newest', 'favorites', 'toWatch'],
    ['newest'],
    Pagination,
);

const NewestCards = withContainer(
    ['newest', 'favorites', 'toWatch'],
    ['newest'],
    Cards,
);

function Newest({ actions, state }) {
    const { searchForm, pagination, loading, newest } = state;

    useEffect(() => {
        actions.newest.getNewest({
            offset: pagination.offset,
            size: pagination.size,
            statuses: searchForm.statuses,
            types: searchForm.types
        });
    }, [pagination.offset, pagination.size, searchForm.statuses, searchForm.types]);

    return (<Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        padding={"30px"}
        height={'100%'}
    >
        <Loader condition={loading.statuses && loading.types && loading.newest}>

            <NewestSearchForm />
            <NoItems condition={newest.length !== 0}>
                <NewestPagination />
                <NewestCards />

                {newest.length >= 15
                    ? <NewestPagination />
                    : undefined}
            </NoItems>
        </Loader>
    </Flex>)
}

export default Newest