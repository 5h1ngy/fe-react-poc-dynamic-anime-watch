import _ from 'lodash';

/**
 * Genera un colore casuale da uno schema di colori predefinito.
 * @returns {string} Colore casuale.
 */
export function randomColorScheme() {
    return _.sample(["red", "orange", "yellow", "green", "purple", "pink"]);
}

/**
 * Converte uno stato in un colore associato.
 * @param {string} statuses - Lo stato da convertire.
 * @returns {string} Colore associato allo stato.
 */
export function parseStatusColor(statuses) {
    switch (statuses) {
        case "FINISHED":
            return 'green';
        case "ONGOING":
            return 'yellow';
        case "UPCOMING":
            return 'orange';
        case "UNKNOWN":
            return 'black';
        default:
            return statuses;
    }
}

/**
 * Converte uno stato in una label associata.
 * @param {string} statuses - Lo stato da convertire.
 * @returns {string} Label associata allo stato.
 */
export function parseStatusLabel(statuses) {
    switch (statuses) {
        case "FINISHED":
            return 'concluso';
        case "ONGOING":
            return 'in corso';
        case "UPCOMING":
            return 'in arrivo';
        case "UNKNOWN":
            return 'sconosciuto';
        default:
            return statuses;
    }
}

/**
 * Converte una stagione in una label associata.
 * @param {string} season - La stagione da convertire.
 * @returns {string} Label associata alla stagione.
 */
export function parseSeason(season) {
    switch (season) {
        case "SPRING":
            return 'primavera';
        case "SUMMER":
            return 'estate';
        case "FALL":
            return 'autunno';
        case "WINTER":
            return 'inverno';
        case "UNDEFINED":
            return 'sconosciuto';
        default:
            return season;
    }
}

/**
 * Converte un tipo in una label associata.
 * @param {string} type - Il tipo da convertire.
 * @returns {string} Label associata al tipo.
 */
export function parseTypesLabel(type) {
    switch (type) {
        case "TV":
            return 'Tv';
        case "MOVIE":
            return 'Film';
        case "OVA":
            return 'OVA';
        case "ONA":
            return 'ONA';
        case "SPECIAL":
            return 'Speciale';
        case "UNKNOWN":
            return 'sconosciuto';
        default:
            return type;
    }
}

/**
 * Traduce i nomi dei percorsi specifici.
 * @param {string} path - Il percorso da tradurre.
 * @returns {string} Nome tradotto del percorso.
 */
export function translatePathNames(path) {
    switch (path) {
        case "newest":
            return "Newest";
        case "favorites":
            return "Favorites";
        case "to-watch":
            return "To Watch List";
        default:
            return path;
    }
}
