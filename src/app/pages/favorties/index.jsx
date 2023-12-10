import Favorites from "./containers/FavoritesContainer.js";
import store from './store.js';

const route = {
    id: "favorites",
    path: 'favorites',
    element: <Favorites />,
    errorElement: <></>,
}

export { store }
export default route;