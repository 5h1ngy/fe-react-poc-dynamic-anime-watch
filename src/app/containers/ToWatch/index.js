import withContainer from 'app/hocs/withContainer';
import ToWatch from './ToWatch';

export default withContainer(
    ['toWatch'],
    ['toWatch'],
    ToWatch,
);