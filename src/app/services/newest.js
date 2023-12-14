import _ from 'lodash';
import db from 'data/db.json';

export function getStatuses() {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(['FINISHED', 'ONGOING', 'UPCOMING', 'UNKNOWN'])
        }, 1000)
    })
}

export function getTypes() {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL', 'UNKNOWN'])
        }, 1000)
    })
}

export function getNewest(offset, size, type = undefined, statuses = undefined) {
    function buildFilter(anime) {
        if (type && statuses) {
            return _.includes(type, anime.type) || _.includes(statuses, anime.statuses)
        } if (type) {
            return _.includes(type, anime.type)
        } if (statuses) {
            return _.includes(statuses, anime.statuses)
        }
        return anime

    }

    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve({
                data: db.data
                    .filter(anime => anime.animeSeason.year === 2023 && anime.animeSeason.season === "FALL")
                    .filter(anime => !_.includes(anime.tags, 'hentai'))
                    .filter(anime => buildFilter(anime))
                    .slice((offset - 1) * size, ((offset - 1) * size) + size),
                total: db.data
                    .filter(anime => anime.animeSeason.year === 2023 && anime.animeSeason.season === "FALL")
                    .filter(anime => !_.includes(anime.tags, 'hentai'))
                    .filter(anime => buildFilter(anime))
                    .length
            })
        }, 1000)
    })
}