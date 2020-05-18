import { constantCase } from 'constant-case';

export const getRequestTypes = (method, endpoint) => {
  const constantEndpoint = constantCase(endpoint);
  return {
    REQUEST: `${method}_${constantEndpoint}_REQUEST`,
    SUCCESS: `${method}_${constantEndpoint}_SUCCESS`,
    FAILURE: `${method}_${constantEndpoint}_FAILURE`,
  };
};

export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
export const AUTH_SIGN_IN = 'AUTH_SIGN_IN';

export const SET_GENERAL_ERROR = 'SET_GENERAL_ERROR';
export const REMOVE_GENERAL_ERROR = 'REMOVE_GENERAL_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';
export const REMOVE_SUCCESS = 'REMOVE_SUCCES';

export const SET_ENDPOINT_LOADING = 'SET_ENDPOINT_LOADING';
export const REMOVE_ENDPOINT_LOADING = 'REMOVE_ENDPOINT_LOADING';
export const ADD_APOINTMENT = 'ADD_APOINTMENT';
