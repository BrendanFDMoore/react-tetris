/**
 * @module Epics/JohnnyFive
 * @desc User
 */

import Rx from 'rxjs';
import io from 'socket.io-client';
import keyMirror from 'fbjs/lib/keyMirror';

// import { ActionTypes } from 'constants/index';
import { ActionTypes, boardEvent, buttonPress, buttonRelease, buttonHold } from '../actions/johnny';

const JohnnyFiveComponentTypes = keyMirror({
  button: undefined,
  led: undefined,
});

const socketconfig = require('../socket/config');

const johnnyFiveEventStream = new Rx.Subject();
const socket = io(socketconfig.ADDRESS);

export function johnnyFiveListener(action$) {
  return action$.ofType(ActionTypes.JOHNNY_FIVE_INITIALIZE)
    .first()
    .flatMap(() => {
      socket.on('johnny event', (event) => {
        johnnyFiveEventStream.next(boardEvent(event));
      });
      return johnnyFiveEventStream;
    });
}

/**
 * transformBoardEventStringToObject
 *
 * @param {string} eventString
 *
 * @returns {Object}
 */
const transformBoardEventStringToObject = (eventString) => {
  const eventTags = eventString.split(':');
  return {
    component: eventTags[0],
    pin: eventTags[1],
    event: eventTags[2],
  };
};

const buttonEventActionMap = {
  press: buttonPress,
  release: buttonRelease,
  hold: buttonHold,
};

export function buttonEvents(action$) {
  return action$.ofType(ActionTypes.JOHNNY_FIVE_BOARD_EVENT)
    .map(e => transformBoardEventStringToObject(e.payload.eventType))
    .filter(e => e.component === JohnnyFiveComponentTypes.button)
    .filter(e => Object.keys(buttonEventActionMap).includes(e.event))
    .map(e => (buttonEventActionMap[e.event](e.pin)));
}
