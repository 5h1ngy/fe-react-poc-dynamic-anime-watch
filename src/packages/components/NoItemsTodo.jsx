const NoItems = ({ condition, children }) => (
    condition
        ? children
        : 'Non ci sono elementi da visualizzare'
)

export default NoItems