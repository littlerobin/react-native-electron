const updateTimeAction = (time) => dispatch =>
  dispatch({
    type: 'UPDATE_TIMER',
    payload: time,
  });

const toogleStartTimeAction = (isShow) => dispatch =>
  dispatch({
    type: 'TOOGLE_TIMER',
    payload: isShow,
  });

const resetTimeAction = () => dispatch =>
  dispatch({
    type: 'RESET_TIMER',
  });

const setLessonData = ({ matpel, to, dataQuestion }) => dispatch =>
  dispatch({
    type: 'SET_LESSON_DATA',
    payload: { matpel, to, dataQuestion },
  });

const setTryoutAction = (tryout) => dispatch =>
  dispatch({
    type: 'SET_TRYOUT',
    payload: tryout,
  });

const setAnswerAction = (answer) => dispatch =>
  dispatch({
    type: 'SET_ANSWER',
    payload: answer,
  });

const resetAnswerAction = () => dispatch =>
  dispatch({
    type: 'RESET_ANSWER',
  });

export default {
  toogleStartTimeAction,
  updateTimeAction,
  resetTimeAction,
  setTryoutAction,
  setAnswerAction,
  resetAnswerAction,
  setLessonData,
};
