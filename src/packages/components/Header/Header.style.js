/**
 * Stili dell'header.
 */
export const headerStyle = {
    width: '100%',
    backgroundColor: 'gray.900',
    padding: ' 15px 40px 15px 40px',
    justifyContent: "space-between",
    alignItems: "center",
}

/**
 * Stili del contenitore sinistro dell'header.
 */
export const containerLeftStyle = {
    flexDirection: "row",
    alignItems: "center",
}

/**
 * Stili del contenitore destro dell'header.
 */
export const containerRightStyle = {
    flexDirection: "row",
    alignItems: "center",
}

/**
 * Stili del testo neon.
 * @param {string} logoTextNeonColor - Colore del testo neon.
 * @returns {Object} Stili del testo neon.
 */
export const neonTextStyle = (logoTextNeonColor) => ({
    color: logoTextNeonColor,
})