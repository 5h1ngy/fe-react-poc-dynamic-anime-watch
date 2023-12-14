// Import delle librerie e componenti necessari
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { GridItem, Grid } from "@chakra-ui/react"

// Import degli Higher Order Components (HOCs)
import withConfig from 'app/hocs/withConfig'
import withRouter from 'app/hocs/withRouter'

// Import dei componenti personalizzati
import Header from 'app/components/Header'
import Sidebar from 'app/components/Sidebar'

// Stili per il componente principale (root)
const rootStyle = {
    height: "100%",
    backgroundColor: 'gray.900',
}

// Stili per il contenitore del corpo
const bodyContainerStyle = {
    borderTopRadius: '30px',
    backgroundColor: 'gray.800',
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
}

// Funzione principale del componente
function LayoutTemplate({ router, config }) {
    // Stato per tracciare il percorso attuale
    const [paths, setPaths] = useState('')

    // Hook di Chakra UI per il controllo della visibilità di un componente
    const sidebarDisclosure = useDisclosure();

    // Hook di Chakra UI per la gestione delle dimensioni dello schermo
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)');

    // Effetto collaterale che si attiva quando cambia il percorso della route
    useEffect(() => {
        setPaths(router.location.pathname.split("/"))
    }, [router.location.pathname])

    // Effetto collaterale che si attiva quando cambiano le dimensioni dello schermo
    useEffect(() => {
        // Chiude la Sidebar se le dimensioni superano i 600px
        if (sidebarDisclosure.isOpen) sidebarDisclosure.onToggle()
    }, [isLargerThan600, sidebarDisclosure])

    // Restituisce l'elemento principale del layout
    return (
        <Grid {...rootStyle}
            // Definizione delle colonne del layout
            templateColumns={
                !config.template.sidebar.menu
                    ? `0px 1fr` // Se la Sidebar non è presente, la prima colonna ha larghezza 0
                    : `${sidebarDisclosure.isOpen ? "240px" : "60px"} 1fr` // Altrimenti, larghezza variabile in base all'apertura della Sidebar
            }
        >

            {/* Sidebar a sinistra */}
            <GridItem colSpan={1}>
                {/* Contenuto della Sidebar */}
                {config.template.sidebar.menu
                    ? <Sidebar {...config.template.sidebar} /* Config props */
                        onToggle={sidebarDisclosure.onToggle}
                        isOpen={sidebarDisclosure.isOpen}
                    />
                    : undefined
                }
            </GridItem>

            {/* Area principale a destra */}
            <GridItem colSpan={1}>
                {/* Secondo livello di Grid per organizzare Header sopra l'Outlet */}
                <Grid templateRows="min-content 1fr">
                    {/* Header sopra l'Outlet */}
                    <GridItem
                        rowSpan={1}
                    >
                        {/* Header */}
                        <Header {...config.template.header} /* Config props */
                            paths={[...paths]}
                            isOpen={sidebarDisclosure.isOpen}
                        />
                    </GridItem>

                    {/* Outlet (corpo) sotto l'Header */}
                    <GridItem {...bodyContainerStyle}
                        rowSpan={1}
                    >
                        {/* Contenuto del Corpo */}
                        <Outlet />
                    </GridItem>
                </Grid>

            </GridItem>
        </Grid>
    );
}

// Wrapping del componente con HOCs
export default withRouter(withConfig(LayoutTemplate))
