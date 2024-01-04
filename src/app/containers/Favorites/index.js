import withContainer from 'ghocs/withContainer';
import Favorites from './Favorites';

export default withContainer(
    ['favorites'],
    ['favorites'],
    Favorites,
);