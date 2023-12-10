export function parseStatusColor(status) {
    switch (status) {
        case "FINISHED": return 'green'
        case "ONGOING": return 'yellow'
        case "UPCOMING": return 'orange'
        case "UNKNOWN": return 'black'
        default: throw new Error('parseStatusColor no matching')
    }
}

export function parseStatusLabel(status) {
    switch (status) {
        case "FINISHED": return 'concluso'
        case "ONGOING": return 'in corso'
        case "UPCOMING": return 'in arrivo'
        case "UNKNOWN": return 'sconosciuto'
        default: throw new Error('parseStatusLabel no matching')
    }
}

export function parseSeason(season) {
    switch (season) {
        case "SPRING": return 'primavera'
        case "SUMMER": return 'estate'
        case "FALL": return 'autunno'
        case "WINTER": return 'inverno'
        case "UNDEFINED": return 'sconosciuto'
        default: throw new Error('parseSeason no matching')
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
        default: throw new Error('parseTypesLabel no matching')
    }
}