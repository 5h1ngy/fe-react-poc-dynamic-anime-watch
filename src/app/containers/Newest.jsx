import _ from "lodash";
import React from 'react';

import AnimeSearchForm from 'app/components/Search';
import Card from 'app/components/Card';
import db from 'data/db.json';

import { Badge, Wrap, WrapItem } from '@chakra-ui/react';

function Newest() {

    function parseStatus(status) {
        switch (status) {
            case "FINISHED": return 'green'
            case "ONGOING": return 'yellow'
            case "UPCOMING": return 'orange'
            case "UNKNOWN": return 'black'
        }
    }

    function parseSeason(season) {
        switch (season) {
            case "SPRING": return 'primavera'
            case "SUMMER": return 'estate'
            case "FALL": return 'autunno'
            case "WINTER": return 'inverno'
            case "UNDEFINED": return 'sconosciuto'
        }
    }

    return (<>
        {/** Display the search form for anime */}
        <AnimeSearchForm />
        <Wrap spacing='30px' justify='center'>
            {/** Display the Card component */}
            {db.data.filter(anime => (
                anime.animeSeason.year === 2023
                && anime.status === "ONGOING"
                && anime.animeSeason.season === "FALL"
                && anime.type === "TV"
                && anime.tags.filter(tag => tag === 'FANTASY')
            )).map(anime =>
                <WrapItem>
                    <Card
                        picture={anime.picture}
                        bedge={{
                            content: anime.status,
                            color: parseStatus(anime.status)
                        }}
                        actions={[
                            { id: '', label: '', icon: '' },
                            { id: '', label: '', icon: '' }
                        ]}
                        title={anime.title}
                        content={[
                            `Anno: ${parseSeason(anime.animeSeason.season)} ${anime.animeSeason.year}`,
                            `${anime.type} - Episodi: ${anime.episodes}`,
                            anime.tags.map((tag, index) => (<Badge key={index} mr="1" colorScheme="teal">{tag}</Badge>))
                        ]}
                    />
                </WrapItem>
            )}
        </Wrap>

    </>)
}

export default Newest