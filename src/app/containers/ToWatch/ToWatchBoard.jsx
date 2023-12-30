import React, { useEffect, useState } from 'react';
import { Badge, Wrap, WrapItem } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Flex, Box } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { randomColorScheme } from "app/shared/utils";
import { parseStatusColor, parseStatusLabel, parseSeason } from "app/shared/utils";
import Card from 'app/components/Card';
import TypographyNeon from "app/components/TypographyNeon";
import { initGroups, initItems, move, reorder } from "./shared/utils";

/**
 * Component representing a board for tracking watched items.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.actions - Actions for manipulating the watchlist.
 * @param {Object} props.state - Current state of the watchlist.
 * @returns {JSX.Element} - ToWatchBoard component.
 */
function ToWatchBoard({ actions, state }) {
    const { toWatch, inProgress, complete } = state;
    const toast = useToast();

    // State to manage the groups in the board
    const [groups, setGroups] = useState(initGroups([
        { label: 'Da Guardare', labelColor: 'Pink' },
        { label: 'In Corso', labelColor: 'Yellow' },
        { label: 'Completati', labelColor: 'Cyan' },
    ]));

    useEffect(() => {
        // Update groups when the state changes
        setGroups(
            groups.map(group => ({
                ...group,
                content: group.label === 'Da Guardare' ? initItems(toWatch)
                    : group.label === 'In Corso' ? initItems(inProgress)
                        : group.label === 'Completati' ? initItems(complete)
                            : []
            }))
        );

    }, [toWatch, inProgress, complete]);

    /**
     * Handles the removal of an item from the watchlist and displays a toast notification.
     *
     * @param {string} type - The type of the group (Da Guardare, In Corso, Completati).
     * @param {Object} anime - The anime object to be removed.
     */
    function handleToastRemove(type, anime) {
        const callback = (status) => {
            // Asynchronous toast notification with success or loading status
            const toastPromise = new Promise((resolve) => {
                setTimeout(() => resolve(200), 500);
            });

            toast.promise(toastPromise, {
                success: {
                    position: 'bottom-right', isClosable: true, duration: 1100,
                    status: 'error', title: `Rimosso dalla lista`, description: `${anime.title}`
                },
                loading: {
                    position: 'bottom-right', isClosable: true, duration: 1100,
                    status: 'warning', title: 'Rimozione...', description: `${anime.title}`
                },
            });
        }

        // Execute the appropriate action based on the group type
        switch (type) {
            case 'Da Guardare':
                actions.toWatch.removeToWatch({ anime, callback });
                break;
            case 'In Corso':
                actions.toWatch.removeInProgress({ anime, callback });
                break;
            case 'Completati':
                actions.toWatch.removeComplete({ anime, callback });
                break;
        }
    }

    /**
     * Handles the end of a drag and drop operation.
     *
     * @param {Object} result - The result object from the drag and drop operation.
     */
    function onDragEnd(result) {
        const { source, destination } = result;
        const sourceIndex = +source.droppableId;
        const destinationIndex = +destination.droppableId;

        // Do nothing if dropped outside a droppable area
        if (!destination) return;

        // If the source and destination are the same group, reorder items within the group
        if (sourceIndex === destinationIndex) {
            const items = reorder(groups[sourceIndex], source.index, destination.index);
            const updatedGroups = [...groups];
            updatedGroups[sourceIndex] = items;
            setGroups(updatedGroups);
        } else {
            // If moving between groups, move the item and update the groups
            const { result, removed } = move(groups[sourceIndex], groups[destinationIndex], source, destination);
            const updatedGroups = [...groups];
            updatedGroups[sourceIndex] = result[sourceIndex];
            updatedGroups[destinationIndex] = result[destinationIndex];

            const { label: typeDestination } = updatedGroups[destinationIndex]
            const { label: typeSource } = updatedGroups[sourceIndex]

            // Execute appropriate actions based on source and destination group types
            if (typeSource === 'Da Guardare') {
                actions.toWatch.removeToWatch({ anime: removed.content })
            } else if (typeSource === 'In Corso') {
                actions.toWatch.removeInProgress({ anime: removed.content })
            } else if (typeSource === 'Completati') {
                actions.toWatch.removeComplete({ anime: removed.content })
            }

            if (typeDestination === 'Da Guardare') {
                actions.toWatch.addToWatch({ anime: removed.content })
            } else if (typeDestination === 'In Corso') {
                actions.toWatch.addInProgress({ anime: removed.content })
            } else if (typeDestination === 'Completati') {
                actions.toWatch.addComplete({ anime: removed.content })
            }
        }
    }

    // JSX rendering of the component
    return (
        <Flex flexDirection={"column"} minWidth={'100%'} marginTop={'20px'} alignItems={"center"}>
            <DragDropContext onDragEnd={onDragEnd}>

                {groups.map((group, groupIndex) => (
                    <Droppable key={groupIndex} droppableId={`${groupIndex}`} direction="horizontal">
                        {provided => (
                            <>
                                <TypographyNeon text={group.label} color={group.labelColor} />
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
                                                            { label: 'Rimuovi dalla lista', icon: 'FcBookmark', onClick: () => handleToastRemove(group.label, item.content) },
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
        </Flex>
    );
}

export default ToWatchBoard;
