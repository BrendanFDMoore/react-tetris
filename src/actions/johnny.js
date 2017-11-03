// @flow
/**
 * @module Actions/Johnny
 * @desc Actions for Johnny
 */

import keyMirror from 'fbjs/lib/keyMirror';

// import { ActionTypes } from 'constants/index';
export const ActionTypes = keyMirror({
  JOHNNY_FIVE_INITIALIZE: undefined,
  JOHNNY_FIVE_BOARD_EVENT: undefined,
  JOHNNY_FIVE_BUTTON_PRESS: undefined,
  JOHNNY_FIVE_BUTTON_RELEASE: undefined,
  JOHNNY_FIVE_BUTTON_HOLD: undefined,
  JOHNNY_FIVE_LED_ON: undefined,
  JOHNNY_FIVE_LED_OFF: undefined,
  JOHNNY_FIVE_LED_BLINK: undefined,
  JOHNNY_FIVE_LED_PULSE: undefined,
});

/**
 * initializeJohnnyFive
 *
 * @returns {Object}
 */
export function initializeJohnnyFive() {
  return {
    type: ActionTypes.JOHNNY_FIVE_INITIALIZE,
  };
}

/**
 * boardEvent
 *
 * @param {string} eventType
 *
 * @returns {Object}
 */
export function boardEvent(eventType) {
  return {
    type: ActionTypes.JOHNNY_FIVE_BOARD_EVENT,
    payload: {
      eventType,
    },
  };
}

/**
 * buttonPress
 *
 * @param {number} pin
 *
 * @returns {Object}
 */
export function buttonPress(pin) {
  return {
    type: ActionTypes.JOHNNY_FIVE_BUTTON_PRESS,
    payload: {
      pin,
    },
  };
}

/**
 * buttonRelease
 *
 * @param {number} pin
 *
 * @returns {Object}
 */
export function buttonRelease(pin) {
  return {
    type: ActionTypes.JOHNNY_FIVE_BUTTON_RELEASE,
    payload: {
      pin,
    },
  };
}

/**
 * buttonHold
 *
 * @param {number} pin
 *
 * @returns {Object}
 */
export function buttonHold(pin) {
  return {
    type: ActionTypes.JOHNNY_FIVE_BUTTON_HOLD,
    payload: {
      pin,
    },
  };
}
