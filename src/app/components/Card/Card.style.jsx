/**
 * Styles for the card component.
 */
export const cardStyle = {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    maxW: '220px',
    borderWidth: "1px",
    borderRadius: "lg",
    overflow: "hidden",
}

/**
 * Styles for the cover of the card.
 */
export const coverStyle = {
    width: '220px',
    ratio: 10 / 12,
}

/**
 * Styles for the actions container.
 */
export const actionsStyle = {
    flexDir: 'row',
    justifyContent: 'flex-end',
    align: "center",
    padding: "2",
    marginTop: '-16.5rem',
    marginBottom: '12.8rem',
}

/**
 * Styles for the action buttons.
 * 
 * @param {React.Component} Icon - The icon component for the button.
 * @returns {Object} Styles for the action button.
 */
export const actionsButtonStyle = (Icon) => ({
    icon: Icon,
    fontSize: 28,
    marginRight: "2",
})

/**
 * Styles for the preview section of the card.
 */
export const previewStyle = {
    padding: "4",
}

/**
 * Styles for the content within the preview section.
 */
export const previewContentStyle = {
    align: "center",
    justify: 'left',
}

/**
 * Generate badge styles based on the provided badge information.
 * 
 * @param {Object} badge - The badge information.
 * @param {string} badge.color - The color of the badge.
 * @returns {Object} Styles for the badge.
 */
export const bedgeProps = (badge) => ({
    borderRadius: "full",
    colorScheme: badge.color,
})
