import withContainer from 'lib-react-ghocs/withContainer';
import Newest from './Newest';

export default withContainer(
    ['newest', 'favorites', 'toWatch'],
    ['newest'],
    Newest,
);