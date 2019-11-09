import update from 'immutability-helper';
import { DEFAULT_TIMER } from '../constants';

const initialState = {
  time: DEFAULT_TIMER,
  startTime: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOOGLE_TIMER':
      return update(state, {
        startTime: {
          $apply: (startTime) => action.payload !== undefined ? action.payload : !startTime,
        },
      });

    case 'UPDATE_TIMER':
      return update(state, {
        time: { $set: action.payload },
      });

    case 'RESET_TIMER':
      return update(state, {
        time: { $set: DEFAULT_TIMER },
      });

    default:
      return state;
  }
};
