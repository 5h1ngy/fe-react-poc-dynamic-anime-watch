import withContainer from 'ghocs/withContainer';
import Newest from './Newest';

export default withContainer(
    ['newest', 'favorites', 'toWatch'],
    ['newest'],
    Newest,
);