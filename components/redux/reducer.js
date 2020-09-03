'use_strict';

import {
    FETCH_CONTACT,
    RECEIVE_CONTACT,
    FETCH_ERROR
} from './constant'

const initialState = {
    fetching: false,
    error: false,
    status: false,
    detail: null,
    data: null
  };
  
  const items = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTACT: {
            return {
              ...state,
              fetching: true,
              status: false,
            };
          }
        case RECEIVE_CONTACT: {
            return {
              ...state,
              fetching: false,
              data: action.payload,
              status: action.status,
              detail: action.payload.detail,
              error: false,
            };
          }
          case FETCH_ERROR: {
            return {
              ...state,
              fetching: false,
              error: true,
              status: false,
              data: action.payload.hasOwnProperty('bodyString')
                ? JSON.parse(action.payload.bodyString)
                : {detail: action.payload},
            };
          }
        }
    }
export default items;