import Newest from "./containers/NewestContainer.js";
import store from './store.js';

const route = {
    id: "newest",
    path: 'newest',
    element: <Newest />,
    errorElement: <></>,
}

export { store }
export default route;