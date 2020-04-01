import { SET_ACTIVITIES } from '../store/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVITIES: {
      return [...action.payload];
    }

    default:
      return state;
  }
};
