
import { combineEpics } from 'redux-observable';

import {
  johnnyFiveListener,
  buttonEvents,
  mapButtonPress,
  mapButtonRelease,
} from './johnny';

export default combineEpics(
  johnnyFiveListener,
  buttonEvents,
  mapButtonPress,
  mapButtonRelease
);
