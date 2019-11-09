import update from 'immutability-helper';

const initialState = {
  curriculum: '',
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'SET_CURRICULUM_ACTION':
      return update(state, {
        curriculum: { $set: action.payload },
      });

    default:
      return state;
  }
};
