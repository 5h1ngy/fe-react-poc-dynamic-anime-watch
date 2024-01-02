import _ from "lodash";
import React from 'react';

import { Badge, Wrap, WrapItem } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

import Card from 'app/components/Card';

import { randomColorScheme } from "lib-react-gcommon/utils";
import { parseStatusColor, parseStatusLabel, parseSeason } from "lib-react-gcommon/utils";

function FavoritesCards({ actions, state }) {
    const { favorites } = state;
    const toast = useToast()

    function handleToasRemove(anime) {
        actions.favorites.removeFavorite({
            anime, callback: (status) => {

                const toastPromise = new Promise((resolve) => {
                    setTimeout(() => resolve(200), 500)
                })

                toast.promise(toastPromise, {
                    success: {
                        position: 'bottom-right', isClosable: true, duration: 1100,
                        status: 'error', title: `Rimosso dalla lista preferiti`, description: `${anime.title}`
                    },
                    loading: {
                        position: 'bottom-right', isClosable: true, duration: 1100,
                        status: 'warning', title: 'Rimozione...', description: `${anime.title}`
                    },
                })
            }
        })
    }

    return (<Wrap marginY={'15px'} spacing='30px' justify='center'>
        {favorites.map(anime =>
            <WrapItem>
                <Card
                    picture={anime.picture}
                    badge={{
                        content: parseStatusLabel(anime.statuses),
                        color: parseStatusColor(anime.statuses)
                    }}
                    actions={[
                        { label: 'Rimuovi dai preferiti', icon: 'FcDislike', onClick: () => handleToasRemove(anime) },
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
    </Wrap>)
}

export default FavoritesCards