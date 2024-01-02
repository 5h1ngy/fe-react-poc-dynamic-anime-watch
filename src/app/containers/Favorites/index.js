import withContainer from 'packages/hocs/withContainer';
import Favorites from './Favorites';

export default withContainer(
    ['favorites'],
    ['favorites'],
    Favorites,
);