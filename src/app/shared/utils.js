import _ from 'lodash';

/**
 * Genera una stringa casuale di una determinata lunghezza.
 *
 * @param {number} length La lunghezza della stringa casuale.
 * @returns {string} Una stringa casuale.
 */
export function generateRandomString(length = 8) {
    /**
     * Inizializza la stringa casuale.
     */
    let result = "";

    /**
     * Crea un array di tutti i caratteri ammessi.
     */
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    /**
     * Ottieni la lunghezza dell'array dei caratteri.
     */
    const charactersLength = characters.length;

    /**
     * Inizializza un contatore.
     */
    let counter = 0;

    /**
     * Genera la stringa casuale.
     */
    while (counter < length) {
        // Genera un indice casuale nell'array dei caratteri.
        const randomIndex = Math.floor(Math.random() * charactersLength);

        // Aggiungi il carattere all'indice casuale alla stringa casuale.
        result += characters.charAt(randomIndex);

        // Incrementa il contatore.
        counter += 1;
    }

    /**
     * Restituisce la stringa casuale.
     */
    return result;
}

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
    }
}