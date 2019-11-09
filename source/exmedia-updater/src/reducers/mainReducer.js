import update from 'immutability-helper';
import _ from 'lodash';
import { DEFAULT_TIMER } from '../constants';

const initialState = {
  time: DEFAULT_TIMER,
  startTime: true,
  currentMatpel: 'bhsindo',
  userLessonData: {},
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

    case 'SET_LESSON_DATA':
      return update(state, {
        userLessonData: {
          $set: {
            [action.payload.matpel]: {
              to: action.payload.to,
              dataQuestion: action.payload.dataQuestion,
              answers: {},
            },
          },
        },
        currentMatpel: { $set: action.payload.matpel },
      });

    case 'SET_TRYOUT':
      return update(state, {
        userLessonData: {
          [state.currentMatpel]: {
            to: {
              $set: action.payload,
            },
          },
        },
      });

    case 'SET_ANSWER':
      return update(state, {
        userLessonData: {
          [state.currentMatpel]: {
            answers: {
              $apply: (answers) => {
                const cloneAnswers = _.clone(answers);
                const prevCurrentAnswer = cloneAnswers[action.payload.no] || {};
                const isDoubt =
                  typeof action.payload.isDoubt === 'undefined' ?
                    prevCurrentAnswer.isDoubt :
                    action.payload.isDoubt;

                return {
                  ...cloneAnswers,
                  [action.payload.no]: {
                    answer: action.payload.answer,
                    isDoubt,
                  },
                };
              },
            },
          },
        },
      });

    case 'RESET_ANSWER':
      return update(state, {
        userLessonData: {
          [state.currentMatpel]: {
            answers: { $set: {} },
          },
        },
      });

    default:
      return state;
  }
};
