import Home from '../containers/container.home'
import LayoutTemplate from '../components/layout.template'
import LayoutLogin from '../components/layout.login'
import Pricing from '../components/component.pricing'
import AnimeSearchForm from '../components/component.animeSearchForm'
import Accordion from '../components/component.accordion'
import Card from '../components/component.card'
import anime from '../services/anime-offline-database.json'

console.log(anime.data[400])

export default () => ({
    path: '/home',
    errorElement: <></>,
    loader: function homeLoader() {
        return {};
    },
    element: (<LayoutTemplate>
        <AnimeSearchForm />
        <Card />
    </LayoutTemplate>)
});