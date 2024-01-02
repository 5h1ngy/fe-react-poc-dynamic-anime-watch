import withContainer from 'packages/hocs/withContainer';
import Newest from './Newest';

export default withContainer(
    ['newest', 'favorites', 'toWatch'],
    ['newest'],
    Newest,
);