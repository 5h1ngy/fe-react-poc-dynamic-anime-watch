import React, { useEffect } from 'react';

import { Flex } from '@chakra-ui/react';

import { NoItems } from 'lib-react-gcomponents';

import withContainer from 'app/hocs/withContainer';
import Board from './ToWatchBoard';

const ToWatchBoard = withContainer(
    ['toWatch'],
    ['toWatch'],
    Board,
);

function ToWatch({ state }) {
    const { toWatch, inProgress, complete } = state;

    useEffect(() => {
        localStorage.setItem('toWatch_content', JSON.stringify(toWatch))
        localStorage.setItem('inProgress_content', JSON.stringify(inProgress))
        localStorage.setItem('complete_content', JSON.stringify(complete))
    }, [toWatch, inProgress, complete])

    return (<Flex
        direction={"column"}
        alignItems={"start"}
        padding={"30px"}
        height={'100%'}
    >
        <NoItems condition={toWatch.length !== 0 || inProgress.length !== 0 || complete.length !== 0}>
            <ToWatchBoard />
        </NoItems>
    </Flex>)
}

export default ToWatch