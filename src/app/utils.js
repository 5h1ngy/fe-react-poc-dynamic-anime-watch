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