import _ from 'lodash';

/**
 * Generates a random string of a specified length.
 *
 * @param {number} length - The length of the random string.
 * @returns {string} - A random string.
 */
export function generateRandomString(length = 8) {
    /**
     * Initialize the random string.
     */
    let result = "";

    /**
     * Create an array of all allowed characters.
     */
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    /**
     * Get the length of the characters array.
     */
    const charactersLength = characters.length;

    /**
     * Initialize a counter.
     */
    let counter = 0;

    /**
     * Generate the random string.
     */
    while (counter < length) {
        // Generate a random index in the characters array.
        const randomIndex = Math.floor(Math.random() * charactersLength);

        // Add the character at the random index to the random string.
        result += characters.charAt(randomIndex);

        // Increment the counter.
        counter += 1;
    }

    /**
     * Return the random string.
     */
    return result;
}
