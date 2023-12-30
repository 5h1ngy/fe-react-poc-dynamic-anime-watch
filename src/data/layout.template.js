export default {
    // Configurazione per l'header della pagina
    "header": {
        // Indica se visualizzare il logo nell'header
        "logo": false,
        // Indica se applicare l'effetto neon al testo del logo
        "logoNeon": true,
        // Colore del testo neon del logo
        "logoTextNeonColor": "#ff80c0",
        // Testo del logo
        "logoText": "[Anime] ToWatch",
        // Indica se visualizzare la breadcrumb nell'header
        "breadcrumb": true,
        // Indica se visualizzare il testo del logo nella breadcrumb
        "breadcrumbLogoText": true
    },
    // Configurazione per la barra laterale
    "sidebar": {
        // Indica se visualizzare il menu nella barra laterale
        "menu": true,
        // Indica se la barra laterale deve espandersi
        "expanse": true,
        // Elenco degli elementi della barra laterale
        "items": [
            {
                // Percorso associato all'elemento
                "path": "/newest",
                // Etichetta dell'elemento
                "label": "Newest",
                // Icona associata all'elemento (FcAdvertising)
                "icon": "FcAdvertising"
            },
            {
                "path": "/favorites",
                "label": "Favorites",
                "icon": "FcLike"
            },
            {
                "path": "/to-watch",
                "label": "To Watch",
                "icon": "FcTodoList",
                // Sottocategorie dell'elemento "To Watch"
                "subItems": [
                    {
                        "label": "In Progress",
                        "path": "",
                        "icon": "FcIdea"
                    },
                    {
                        "label": "Complete",
                        "path": "",
                        "icon": "FcOk"
                    }
                ]
            },
            {
                "path": "",
                "label": "Search",
                "icon": "FcSearch"
            }
        ]
    }
}