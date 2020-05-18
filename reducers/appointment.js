import { ADD_APOINTMENT } from '../store/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_APOINTMENT: {
      return { ...action.payload };
    }

    default:
      return state;
  }
};
