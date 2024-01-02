import _ from 'lodash';

export function randomColorScheme() {
    return _.sample(["red", "orange", "yellow", "green", "purple", "pink"])
}

export function parseStatusColor(statuses) {
    switch (statuses) {
        case "FINISHED": return 'green'
        case "ONGOING": return 'yellow'
        case "UPCOMING": return 'orange'
        case "UNKNOWN": return 'black'
        default: return statuses
    }
}

export function parseStatusLabel(statuses) {
    switch (statuses) {
        case "FINISHED": return 'concluso'
        case "ONGOING": return 'in corso'
        case "UPCOMING": return 'in arrivo'
        case "UNKNOWN": return 'sconosciuto'
        default: return statuses
    }
}

export function parseSeason(season) {
    switch (season) {
        case "SPRING": return 'primavera'
        case "SUMMER": return 'estate'
        case "FALL": return 'autunno'
        case "WINTER": return 'inverno'
        case "UNDEFINED": return 'sconosciuto'
        default: return season
    }
}

export function parseTypesLabel(type) {
    switch (type) {
        case "TV": return 'Tv'
        case "MOVIE": return 'Film'
        case "OVA": return 'OVA'
        case "ONA": return 'ONA'
        case "SPECIAL": return 'Speciale'
        case "UNKNOWN": return 'sconosciuto'
        default: return type
    }
}

export function translatePathNames(path) {
    switch (path) {
        case "newest": {
            return "Newest"
        }
        case "favorites": {
            return "Favorites"
        }
        case "to-watch": {
            return "To Watch List"
        }
    }
}