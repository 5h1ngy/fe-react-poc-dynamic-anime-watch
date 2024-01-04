import axios from 'axios';

export async function getStatuses() {
    try {
        const response = await axios({
            url: `${process.env.REACT_APP_API}/newest/statuses`,
            method: 'GET',
            withCredentials: false,
        })

        return response.data
    } catch (error) {
        throw error
    }
}

export async function getTypes() {
    try {
        const response = await axios({
            url: `${process.env.REACT_APP_API}/newest/types`,
            method: 'GET',
            withCredentials: false,
        })

        return response.data
    } catch (error) {
        throw error
    }
}

export async function getNewest(offset, size, types = [], statuses = []) {
    try {
        const response = await axios({
            url: `${process.env.REACT_APP_API}/newest`,
            method: 'GET',
            withCredentials: false,
            params: {
                offset,
                size,
                types,
                statuses,
            }
        })

        return response.data
    } catch (error) {
        throw error
    }
}