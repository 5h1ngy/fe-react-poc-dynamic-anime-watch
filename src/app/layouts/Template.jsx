import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react";

import withConfig from 'app/hocs/withConfig'
import withRouter from 'app/hocs/withRouter'

import Header from 'app/components/Header'
import Sidebar from 'app/components/Sidebar'

const rootStyle = {
    width: '100vw',
    height: '100vh',
}

const bodyStyle = {
    backgroundColor: 'blackAlpha.400',
    flexDirection: "row",
}

const bodyContentStyle = (isOpen, menu, isLargerThan600) => ({
    borderTopRadius: '30px',
    backgroundColor: 'gray.800',
    marginLeft: menu && isLargerThan600
        ? isOpen ? '260px' : '80px'
        : '3vw',
    marginRight: '3vw',
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
})

function LayoutTemplate({ router, config }) {
    const [paths, setPaths] = useState('')
    const sidebarDisclosure = useDisclosure();
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)',);

    useEffect(() => {
        setPaths(router.location.pathname.split("/"))
    }, [router.location.pathname])

    return (
        <Box {...rootStyle}>
            <Header {...config.template.header}
                paths={[...paths]}
                onToggle={isLargerThan600 ? sidebarDisclosure.onToggle : () => { }}
                isOpen={sidebarDisclosure.isOpen}
            />
            {/** Body Rows */}
            <Flex {...bodyStyle} >

                {/** USE DRAWER! */}
                {config.template.header.menu
                    ? isLargerThan600 && <Sidebar
                        isOpen={sidebarDisclosure.isOpen}
                        items={config.template.sidebar.items}
                    />
                    : undefined
                }

                <Box {...bodyContentStyle(sidebarDisclosure.isOpen, config.template.header.menu, isLargerThan600)}>
                    <Outlet />
                </Box>
            </Flex >
        </Box >
    );
}

export default withRouter(withConfig(LayoutTemplate))
