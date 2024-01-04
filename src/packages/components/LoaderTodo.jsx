import _ from "lodash";
import React from 'react';

import { CircularProgress } from '@chakra-ui/react'

const Loader = ({ condition, children }) => (
    condition
        ? <CircularProgress isIndeterminate color='gray.800' size={'30vh'} />
        : children
)

export default Loader