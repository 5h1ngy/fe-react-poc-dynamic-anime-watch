import _ from 'lodash';

export function randomColorScheme() {
    return _.sample(["red", "orange", "yellow", "green","purple", "pink"])
}