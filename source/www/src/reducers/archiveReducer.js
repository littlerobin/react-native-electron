import update from 'immutability-helper';
import _ from 'lodash';

const initialState = {
  createArchiveRule: {
    name: '',
    evaluationId: 0,
    totalPackages: 0,
    questionType: 0,
    totalQuestions: 0,
    minimumScore: 0,
    packages: {},
  },
  currentPackage: 1,
  currentChapter: '',
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'ARCHIVE_RULE_ACTION':
      return update(state, {
        createArchiveRule: {
          name: { $set: action.payload.name },
          evaluationId: { $set: action.payload.evaluationId },
          totalPackages: { $set: action.payload.totalPackages },
          questionType: { $set: action.payload.questionType },
          totalQuestions: { $set: action.payload.totalQuestions },
          minimumScore: { $set: action.payload.minimumScore },
          packages: {
            $apply: () => {
              const pack = {};

              Array(action.payload.totalPackages).fill().forEach((_, index) => {
                pack[index + 1] = {};
              });

              return pack;
            },
          },
        },
      });

    case 'SET_CHAPTER_ARCHIVE':
      return update(state, {
        createArchiveRule: {
          packages: {
            [state.currentPackage]: {
              $apply: (pack) => {
                if (pack && pack[action.payload.chapter]) {
                  return {
                    ...pack,
                    [action.payload.chapter]: pack[action.payload.chapter],
                  };
                }

                return {
                  ...pack,
                  [action.payload.chapter]: {},
                };
              },
            },
          },
        },
        currentChapter: { $set: action.payload.chapter },
      });

    case 'CLICK_TO_SELECT_QUESTION':
      return update(state, {
        createArchiveRule: {
          packages: {
            [state.currentPackage]: {
              [state.currentChapter]: {
                $apply: (selectedQuestion) => {
                  const cloneSelectedQuestion = _.clone(selectedQuestion);

                  if (cloneSelectedQuestion && cloneSelectedQuestion[action.payload.id]) {
                    cloneSelectedQuestion[action.payload.id].selected = !cloneSelectedQuestion[action.payload.id].selected;
                  } else {
                    cloneSelectedQuestion[action.payload.id] = {
                      ...action.payload.question,
                      selected: true,
                    };
                  }

                  return cloneSelectedQuestion;
                },
              },
            },
          },
        },
      });

    case 'CHANGE_SELECTION_QUESTION':
      return update(state, {
        createArchiveRule: {
          packages: {
            [state.currentPackage]: {
              [action.payload.chapter]: {
                [action.payload.id]: {
                  $apply: (question) => {
                    if (question.selected) {
                      return {
                        ...question,
                        selected: false,
                      };
                    }

                    return question;
                  },
                },
              },
            },
          },
        },
      });

    case 'NEXT_ARCHIVE_PACKAGE':
      return update(state, {
        currentPackage: {
          $apply: (prev) => prev + 1,
        },
      });

    case 'PREV_ARCHIVE_PACKAGE':
      return update(state, {
        currentPackage: {
          $apply: (prev) => prev - 1,
        },
      });

    default:
      return state;
  }
};
