import withContainer from 'app/hocs/withContainer';
import Favorites from './Favorites';

export default withContainer(
    ['favorites'],
    ['favorites'],
    Favorites,
);