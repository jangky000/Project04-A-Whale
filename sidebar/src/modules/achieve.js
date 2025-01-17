import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api';
import createRequestThunk from '../lib/createRequestThunk';

// action types
const RESET = 'achieves/RESET';
const CHANGE_INPUT = 'achieves/CHANGE_INPUT';
const SET_ACHIEVE = 'achieves/SET_ACHIEVE';
const SET_ACHIEVE_SUCCESS = 'achieves/SET_ACHIEVE_SUCCESS';
const UPDATE_ACHIEVE = 'achieves/UPDATE_ACHIEVE';
const UPDATE_ACHIEVE_SUCCESS = 'achieves/UPDATE_ACHIEVE_SUCCESS';

// action funcs
export const reset = createAction(RESET);
export const changeInput = createAction(CHANGE_INPUT, (input) => input);
export const setAchieve = createRequestThunk(SET_ACHIEVE, api.setAchieves);
export const updateAchieve = createRequestThunk(UPDATE_ACHIEVE, api.updateAchieves);

const initialState = {
  input: '',
};

const achieveReducer = handleActions(
  {
    [RESET]: () => ({ input: '' }),
    [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
    [SET_ACHIEVE_SUCCESS]: (state, { payload: { achieveNo } }) => ({
      ...state,
      success: true,
      achieveNo,
    }),
    [UPDATE_ACHIEVE_SUCCESS]: (state, { payload }) => ({
      ...state,
      success: true,
    }),
  },
  initialState
);

export default achieveReducer;
