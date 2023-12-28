import _ from "lodash";
import React, { useEffect, useState } from 'react';

import { Badge, Wrap, WrapItem } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Flex, Button, Box } from "@chakra-ui/react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { randomColorScheme } from "app/shared/utils";
import { parseStatusColor, parseStatusLabel, parseSeason } from "app/shared/utils";
import Card from 'app/components/Card';


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

            console.log(initialState)
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

    return (<Flex flexDirection={"row"} height={'100%'} marginTop={'20px'}>
        {/* Drag and drop context for handling the drag events */}
        <DragDropContext onDragEnd={onDragEnd}>
            {/* Map through state to create Droppable lists */}
            {groups.map((group, groupIndex) => (
                <Droppable key={groupIndex} droppableId={`${groupIndex}`}>
                    {(provided, snapshot) => (
                        <Flex flexDirection={"column"}
                            ref={provided.innerRef}

                            backgroundColor={'gray.900'}
                            boxShadow={"0 4px 8px rgba(0, 0, 0, 0.5)"}
                            borderRadius={"lg"}
                            width={'250px'}
                            height={'100%'}
                            marginX={'7px'}
                            padding={'10px'}

                            {...provided.droppableProps}
                        >
                            <h1>{group.label}</h1>
                            {/* Map through items in the list to create Draggable items */}
                            {group.content.map((item, itemIndex) => (
                                <Draggable key={item.id} draggableId={item.id} index={itemIndex}>
                                    {(provided, snapshot) => (
                                        <Box
                                            ref={provided.innerRef}

                                            boxShadow={"0 4px 8px rgba(0, 0, 0, 0.5)"}
                                            maxWidth={'220px'}
                                            borderWidth={"1px"}
                                            borderRadius={"lg"}
                                            userSelect={"none"}
                                            marginY={'10px'}
                                            background={snapshot.isDragging ? "lightgreen" : "grey"}

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

                                        // <Box
                                        //     ref={provided.innerRef}

                                        //     boxShadow={"0 4px 8px rgba(0, 0, 0, 0.5)"}
                                        //     maxWidth={'250px'}
                                        //     borderWidth={"1px"}
                                        //     borderRadius={"lg"}
                                        //     userSelect={"none"}
                                        //     marginY={'10px'}
                                        //     background={snapshot.isDragging ? "lightgreen" : "grey"}

                                        //     style={{ ...provided.draggableProps.style }}
                                        //     {...provided.draggableProps}
                                        //     {...provided.dragHandleProps}
                                        // >
                                        //     <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        //         {item.content}
                                        //         {/* Button to delete an item */}
                                        //         <button
                                        //             type="button"
                                        //             onClick={() => {
                                        //                 const newState = [...groups];
                                        //                 newState[groupIndex].splice(itemIndex, 1);
                                        //                 setGroups(newState.filter(group => group.length));
                                        //             }}
                                        //         >
                                        //             delete
                                        //         </button>
                                        //     </div>
                                        // </Box>

                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Flex>
                    )}
                </Droppable>
            ))}
        </DragDropContext>
    </Flex>);
}

export default ToWatchBoard