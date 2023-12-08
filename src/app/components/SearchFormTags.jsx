import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box, TagLeftIcon,
    Flex, Select, Input, Button,
    Wrap, WrapItem, Divider, Tag,
    TagLabel, TagCloseButton,
    IconButton,
    useDisclosure
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import { FcExpand } from "react-icons/fc";

import { generateRandomString } from 'app/utils';

const SearchForm = ({ categories, onSearch }) => {
    const [selectedType] = useState('');
    const [selectedStatus] = useState('');
    const [searchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);


    const disclosure = useDisclosure();

    /**
     * Handles the click event on a tag. Toggles tag selection and dispatches the search action.
     * @param {string} tag - The clicked tag
     */
    const handleTagClick = (tag) => {
        // Toggle tag selection
        const newSelectedTags = selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag];
        setSelectedTags(newSelectedTags);

        // Dispatch search action with selected tags
        onSearch({
            type: selectedType,
            status: selectedStatus,
            searchTerm,
            selectedTags: newSelectedTags,
        });
    };

    return (<Flex alignItems="center" flexDir={"column"}>
        {categories.map((category) => <>
            {category.label}
            <Wrap spacing="2">
                {category.values.map((type) => <>
                    <WrapItem key={generateRandomString()}>
                        <Tag
                            size="lg"
                            variant="subtle"
                            colorScheme={selectedType === type ? 'teal' : 'gray'}
                            onClick={() => handleTagClick(type)}
                        >
                            <TagLeftIcon boxSize='12px' as={AddIcon} onClick={() => console.log('asd')} />
                            <TagLabel>{type.label}</TagLabel>
                        </Tag>
                    </WrapItem>
                </>)}
            </Wrap>
        </>)}
    </Flex>);
};

SearchForm.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }))
    })).isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
