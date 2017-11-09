/**
 * @module Epics/JohnnyFive
 * @desc User
 */

import Rx from 'rxjs';
import io from 'socket.io-client';
import keyMirror from 'fbjs/lib/keyMirror';
import todo from '../control/todo';

// import { ActionTypes } from 'constants/index';
import { ActionTypes, boardEvent, buttonPress, buttonRelease, buttonHold } from '../actions/johnny';
// import { keyboard } from '../actions';
import actions from '../actions';

console.log('actions >>>>>>>');
console.log(actions);
console.log('actions >>>>>>>');

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

// const fakeKeyboardEvent = (keyCode) => {
//   let keyboardEvent = document.createEvent('KeyboardEvent');
//   let initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined'
//     ? 'initKeyboardEvent' : 'initKeyEvent';
//   document.getElementById('fakeInput').focus();
//   keyboardEvent[initMethod](
//     'keydown', // event type : keydown, keyup, keypress
//     true, // bubbles
//     true, // cancelable
//     window, // viewArg: should be window
//     false, // ctrlKeyArg
//     false, // altKeyArg
//     false, // shiftKeyArg
//     false, // metaKeyArg
//     keyCode, // keyCodeArg : unsigned long the virtual key code, else 0
//     0 // charCodeArgs : unsigned long the Unicode character associated
//     // with the depressed key, else 0
//   );

//   document.dispatchEvent(keyboardEvent);
//   // jqlite.event.trigger({ type : 'keypress', which : character.charCodeAt(0) });
//   return { type: 'FAKE_KEYBOARD_PRESS', payload: { keycode: keyCode } };
// };

const johnnyButtonToTetrisButtonActionCreators = {
  // 4: actions.keyboard.drop,
  // 3: actions.keyboard.down,
  // 2: actions.keyboard.left,
  // 5: actions.keyboard.right,
  // 6: actions.keyboard.reset,
  // 7: actions.keyboard.pause,
  // 8: actions.keyboard.rotate,
  // 9: actions.keyboard.music,
  // 4: () => fakeKeyboardEvent(32), // drop, space, 32
  // 3: () => fakeKeyboardEvent(40), // down, cursor, 40
  // 2: () => fakeKeyboardEvent(37), // left, cursor, 37
  // 5: () => fakeKeyboardEvent(39), // right, cursor, 39
  // 6: () => fakeKeyboardEvent(82), // reset, r, 82
  // 7: () => fakeKeyboardEvent(80), // pause, p, 80
  // 8: () => fakeKeyboardEvent(38), // rotate, up cursor, 38
  // 9: () => fakeKeyboardEvent(83), // MUSIC, s, 38
  // 4: actions.keyboard.drop,
  // 3: actions.keyboard.down,
  // 2: actions.keyboard.left,
  // 5: actions.keyboard.right,
  // 6: actions.keyboard.reset,
  // 7: actions.keyboard.pause,
  // 8: actions.keyboard.rotate,
  // 9: actions.keyboard.music,
  4: todo.space, // drop, space, 32
  3: todo.down, // down, cursor, 40
  2: todo.left, // left, cursor, 37
  5: todo.right, // right, cursor, 39
  6: todo.r, // reset, r, 82
  7: todo.p, // pause, p, 80
  8: todo.rotate, // rotate, up cursor, 38
  9: todo.s, // MUSIC, s, 38
};

export function mapButtonPress(action$, store) {
  return action$.ofType(ActionTypes.JOHNNY_FIVE_BUTTON_PRESS)
    .map(e => {
      johnnyButtonToTetrisButtonActionCreators[e.payload.pin].down(store);
      return { type: 'FAKE_KEYBOARD_PRESS', payload: { type: e.type } };
    });
}

export function mapButtonRelease(action$, store) {
  return action$.ofType(ActionTypes.JOHNNY_FIVE_BUTTON_RELEASE)
    .map(e => {
      johnnyButtonToTetrisButtonActionCreators[e.payload.pin].up(store);
      return { type: 'FAKE_KEYBOARD_RELEASE', payload: { type: e.type } };
    });
}
