import withContainer from 'lib-react-ghocs/withContainer';
import Favorites from './Favorites';

export default withContainer(
    ['favorites'],
    ['favorites'],
    Favorites,
);