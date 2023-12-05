import Home from '../containers/container.home'

export default () => ({
    path: '/home',
    errorElement: <></>,
    loader: function homeLoader() {
        return {};
    },
    element: <Home />
});