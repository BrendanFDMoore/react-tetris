
import { combineEpics } from 'redux-observable';

import {
  johnnyFiveListener,
  buttonEvents,
  // ledOnCommands,
  // ledOffCommands,
  // ledBlinkCommands,
  // ledPulseCommands
} from './johnny';

export default combineEpics(
  // userLogin,
  // userLogout,
  // fetchPopularRepos,
  johnnyFiveListener,
  buttonEvents
  // ledOnCommands,
  // ledOffCommands,
  // ledBlinkCommands,
  // ledPulseCommands
);
