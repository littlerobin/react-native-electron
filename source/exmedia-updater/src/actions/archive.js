const setArchiveRuleAction = (data) => dispatch =>
  dispatch({
    type: 'ARCHIVE_RULE_ACTION',
    payload: data,
  });

const setChapterArchiveAction = (data) => dispatch =>
  dispatch({
    type: 'SET_CHAPTER_ARCHIVE',
    payload: data,
  });

const clickToSelectQuestion = (data) => dispatch =>
  dispatch({
    type: 'CLICK_TO_SELECT_QUESTION',
    payload: data,
  });

const changeSelectionQuestion = (data) => dispatch =>
  dispatch({
    type: 'CHANGE_SELECTION_QUESTION',
    payload: data,
  })

const goToNextPackage = () => dispatch => dispatch({ type: 'NEXT_ARCHIVE_PACKAGE' });
const goToPrevPackage = () => dispatch => dispatch({ type: 'PREV_ARCHIVE_PACKAGE' });

export default {
  setArchiveRuleAction,
  setChapterArchiveAction,
  clickToSelectQuestion,
  goToNextPackage,
  goToPrevPackage,
  changeSelectionQuestion,
}
