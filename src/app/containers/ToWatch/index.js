import withContainer from 'packages/hocs/withContainer';
import ToWatch from './ToWatch';

export default withContainer(
    ['toWatch'],
    ['toWatch'],
    ToWatch,
);