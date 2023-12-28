import _ from "lodash";
import React, { useEffect } from 'react';

import { Flex } from '@chakra-ui/react';

import NoItems from 'app/components/NoItems.todo';

import Container from './Container';
import Board from './ToWatchBoard';

const ToWatchBoard = Container(Board)

function ToWatch({ state }) {
    const { toWatch } = state;

    useEffect(() => {
        if(toWatch.length !== 0){
            localStorage.setItem('toWatch_content', JSON.stringify(toWatch))
        }
    }, [toWatch])

    return (<Flex
        direction={"column"}
        alignItems={"start"}
        padding={"30px"}
        height={'100%'}
    >
        <NoItems condition={toWatch.length !== 0}>
            <ToWatchBoard />
        </NoItems>
    </Flex>)
}

export default ToWatch