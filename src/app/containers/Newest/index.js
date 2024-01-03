import withContainer from 'app/hocs/withContainer';
import Newest from './Newest';

export default withContainer(
    ['newest', 'favorites', 'toWatch'],
    ['newest'],
    Newest,
);