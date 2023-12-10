import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";

import withConfig from 'app/hocs/withConfig'
import withRouter from 'app/hocs/withRouter'

import Header from 'app/components/Header'
import Sidebar from 'app/components/Sidebar'

const rootStyle = {
    width: '100wh',
    height: '100vh',
}

const bodyStyle = {
    backgroundColor: 'blackAlpha.400',
    flexDirection: "row",
}

function LayoutTemplate({ router, config }) {
    const [paths, setPaths] = useState('')
    const sidebarDisclosure = useDisclosure();

    useEffect(() => {
        setPaths(router.location.pathname.split("/"))
    }, [router.location.pathname])

    return (
        <Box {...rootStyle}>
            <Header {...config.template.header} paths={[...paths]} onToggle={sidebarDisclosure.onToggle} />
            <Flex  {...bodyStyle}>
                <Sidebar isOpen={sidebarDisclosure.isOpen} items={config.template.sidebar.items} />

                <Box
                    maxHeight={'92.4vh'}
                    overflowX={"hidden"}
                    overflowY={"scroll"}
                    borderTopLeftRadius={'20px'}
                    backgroundColor={'gray.800'}
                >
                    <Outlet />
                </Box>
            </Flex >
        </Box >
    );
}

export default withRouter(withConfig(LayoutTemplate))
