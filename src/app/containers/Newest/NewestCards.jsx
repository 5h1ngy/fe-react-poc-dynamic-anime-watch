import React from 'react';

import { Badge, Wrap, WrapItem } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

import { Card } from 'lib-react-gcomponents';

import { parseStatusColor, parseStatusLabel, parseSeason, randomColorScheme } from "app/common";

function Newest({ actions, state }) {
    const { newest } = state;
    const toast = useToast()

    function handleToastToWatch(anime) {
        actions.toWatch.addToWatch({
            anime, callback: (status) => {

                const toastPromise = new Promise((resolve, reject) => {
                    setTimeout(() => status === true ? resolve(200) : reject(200), 500)
                })

                toast.promise(toastPromise, {
                    success: {
                        position: 'bottom-right', isClosable: true, duration: 1100,
                        title: `Aggiunto alla lista da guardare`, description: `${anime.title}`
                    },
                    error: {
                        position: 'bottom-right', isClosable: true, duration: 1100,
                        status: 'error', title: 'Aggiunto in precedenza', description: `${anime.title}`
                    },
                    loading: {
                        position: 'bottom-right', isClosable: true, duration: 1100,
                        status: 'warning', title: 'Aggiungo alla lista da guardare...', description: `${anime.title}`
                    },
                })
            }
        })
    }

    function handleToastFavorites(anime) {
        actions.favorites.addFavorite({
            anime, callback: (status) => {

                const toastPromise = new Promise((resolve, reject) => {
                    setTimeout(() => status === true ? resolve(200) : reject(200), 500)
                })

                toast.promise(toastPromise, {
                    success: {
                        position: 'bottom-right', isClosable: true, duration: 1100,
                        title: `Aggiunto ai Preferiti`, description: `${anime.title}`
                    },
                    error: {
                        position: 'bottom-right', isClosable: true, duration: 1100,
                        status: 'error', title: 'Aggiunto in precedenza', description: `${anime.title}`
                    },
                    loading: {
                        position: 'bottom-right', isClosable: true, duration: 1100,
                        status: 'warning', title: 'Aggiungo ai preferiti...', description: `${anime.title}`
                    },
                })
            }
        })
    }

    return (<Wrap marginY={'15px'} spacing='30px' justify='center'>
        {newest.map(anime =>
            <WrapItem>
                <Card
                    picture={anime.picture}
                    badge={{
                        content: parseStatusLabel(anime.statuses),
                        color: parseStatusColor(anime.statuses)
                    }}
                    actions={[
                        { label: 'Da guardare', icon: 'FcLike', onClick: () => handleToastFavorites(anime) },
                        { label: 'Aggiungi ai preferiti', icon: 'FcInspection', onClick: () => handleToastToWatch(anime) },
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

export default Newest