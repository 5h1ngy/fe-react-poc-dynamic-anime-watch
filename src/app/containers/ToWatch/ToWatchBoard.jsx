import _ from "lodash";
import React, { useEffect, useState } from 'react';

import { Badge, Wrap, WrapItem } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Flex, Button, Box } from "@chakra-ui/react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { randomColorScheme } from "app/shared/utils";
import { parseStatusColor, parseStatusLabel, parseSeason } from "app/shared/utils";
import Card from 'app/components/Card';
import TypographyNeon from "app/components/TypographyNeon";


// Reorder function for handling item reordering within the same list
const reorder = (list, startIndex, endIndex) => {
    const result = list;
    const [removed] = result.content.splice(startIndex, 1);
    result.content.splice(endIndex, 0, removed);
    return result;
};

// Move function for moving items between different lists
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = source;
    const destClone = destination;
    const [removed] = sourceClone.content.splice(droppableSource.index, 1);
    destClone.content.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const initItems = (items) =>
    items.map((occurrence, index) => ({
        id: `item-${index}-${new Date().getTime()}`,
        content: occurrence
    }))

const initGroups = (groups) =>
    groups.map((group, index) => ({
        id: `group-${index}-${new Date().getTime()}`,
        label: group,
        content: []
    }))

function ToWatchBoard({ actions, state }) {
    const { toWatch } = state;
    const toast = useToast()
    const [groups, setGroups] = useState(
        initGroups(['Da Guardare', 'In Corso', 'Completati'])
    );

    useEffect(() => {
        setGroups((initialState) => {
            initialState
                .filter(group => group.label === 'Da Guardare')
                .forEach(group => group.content = initItems(toWatch))

            return initialState
        })
    }, [])

    function handleToasRemove(anime) {
        actions.toWatch.removeToWatch({
            anime, callback: (status) => {

                const toastPromise = new Promise((resolve) => {
                    setTimeout(() => resolve(200), 500)
                })

                toast.promise(toastPromise, {
                    success: {
                        position: 'bottom-right', isClosable: true, duration: 1100,
                        status: 'error', title: `Rimosso dalla lista 'da guardare'`, description: `${anime.title}`
                    },
                    loading: {
                        position: 'bottom-right', isClosable: true, duration: 1100,
                        status: 'warning', title: 'Rimozione...', description: `${anime.title}`
                    },
                })
            }
        })
    }

    // Handle the end of a drag operation
    function onDragEnd(result) {
        const { source, destination } = result;

        // Dropped outside the list
        if (!destination) {
            return;
        }

        const sourceIndex = +source.droppableId;
        const destinationIndex = +destination.droppableId;

        if (sourceIndex === destinationIndex) {
            // Reorder within the same list
            const items = reorder(groups[sourceIndex], source.index, destination.index);
            const updatedGroups = [...groups];
            updatedGroups[sourceIndex] = items;
            setGroups(updatedGroups);
        } else {
            // Move item to a different list
            const result = move(groups[sourceIndex], groups[destinationIndex], source, destination);
            const updatedGroups = [...groups];
            updatedGroups[sourceIndex] = result[sourceIndex];
            updatedGroups[destinationIndex] = result[destinationIndex];

            // Remove empty groups
            // setGroups(updatedGroups.filter(group => group.length));
        }
    }

    return (<Flex flexDirection={"column"} minWidth={'100%'} marginTop={'20px'} alignItems={"center"}>
        <DragDropContext onDragEnd={onDragEnd}>

            {groups.map((group, groupIndex) => (
                <Droppable key={groupIndex} droppableId={`${groupIndex}`} direction="horizontal">
                    {provided => (
                        <>
                            <TypographyNeon text={group.label} color={randomColorScheme()} />
                            <Flex flexDirection={"row"}
                                ref={provided.innerRef}
                                {...provided.droppableProps}

                                backgroundColor={'gray.900'}
                                boxShadow={"0 4px 8px rgba(0, 0, 0, 0.5)"}
                                borderRadius={"lg"}
                                width={'80vw'}
                                minHeight={'500px'}
                                marginY={'20px'}
                                padding={'10px'}
                                gap={'14px'}
                                overflowX={"scroll"}
                            >

                                {group.content.map((item, itemIndex) => (
                                    <Draggable key={item.id} draggableId={item.id} index={itemIndex}>
                                        {provided =>
                                            <Box
                                                ref={provided.innerRef}
                                                style={{ ...provided.draggableProps.style }}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Card
                                                    picture={item.content.picture}
                                                    badge={{
                                                        content: parseStatusLabel(item.content.statuses),
                                                        color: parseStatusColor(item.content.statuses)
                                                    }}
                                                    actions={[
                                                        { label: 'Rimuovi dai preferiti', icon: 'FcDislike', onClick: () => handleToasRemove(item.content) },
                                                    ]}
                                                    title={item.content.title}
                                                    content={[
                                                        `Anno: ${parseSeason(item.content.animeSeason.season)} ${item.content.animeSeason.year}`,
                                                        `${item.content.type} - Episodi: ${item.content.episodes}`,
                                                        item.content.tags.map((tag, index) => <Badge key={index} mr="1" colorScheme={randomColorScheme()}>{tag}</Badge>)
                                                    ]}
                                                />
                                            </Box>
                                        }
                                    </Draggable>
                                ))}
                                {provided.placeholder}

                            </Flex>
                        </>
                    )}
                </Droppable>
            ))}

        </DragDropContext>
    </Flex>);
}

export default ToWatchBoard