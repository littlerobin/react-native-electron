const setCurriculumAction = (curriculum) => dispatch =>
  dispatch({
    type: 'SET_CURRICULUM_ACTION',
    payload: curriculum,
  });

export default {
  setCurriculumAction,
}
