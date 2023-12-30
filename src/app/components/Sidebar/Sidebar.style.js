/**
 * Stili del sidebar in base alla sua apertura.
 * @param {boolean} isOpen - Indica se la barra laterale è aperta o chiusa.
 * @returns {Object} Stili del sidebar.
 */
export const sidebarStyle = (isOpen) => ({
    position: "fixed",
    width: isOpen ? "240px" : "60px",
    alignItems: 'center',
    flexDirection: "column",
});

/**
 * Stili dell'elemento della barra laterale.
 * @param {React.Element} leftIcon - Icona a sinistra dell'elemento.
 * @returns {Object} Stili dell'elemento.
 */
export const itemStyle = (leftIcon) => ({
    variant: 'ghost',
    leftIcon,
    justifyContent: "flex-start",
    width: '100%',
});

/**
 * Stili del contenitore degli elementi della barra laterale.
 * @param {boolean} isOpen - Indica se la barra laterale è aperta o chiusa.
 * @param {boolean} enable - Abilita o disabilita lo stile del contenitore.
 * @returns {Object} Stili del contenitore degli elementi.
 */
export const containerItemStyle = (isOpen, enable) => ({
    backgroundColor: enable && isOpen ? 'gray.800' : undefined,
    width: "100%",
    direction: "column",
    borderRadius: "10px",
    gap: '10px',
});