'use_strict';

import {
    FETCH_CONTACT,
    RECEIVE_CONTACT,
    FETCH_ERROR,
    RestConstant
} from './constant';

let mystatus = '';

export const postContact = (firstname, lastname, age, photo) => {
    return async function(dispatch) {
      dispatch({type: FETCH_CONTACT});
      await fetch(encodeURI(`${RestConstant}`), {
        method: 'POST',
        timeoutInterval: 60000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstname,
          lastName: lastname,
          age: age,
          photo: photo
        }),
      })
        .then(response => response.json())
        .then(response =>
          dispatch({
            type: RECEIVE_CONTACT,
            payload: response,
          }),
        )
        .catch(response =>
          dispatch({
            type: FETCH_ERROR,
            payload: response,
          }),
        );
    };
  };


  export const getContact = () => {
    return async function(dispatch) {
      dispatch({type: FETCH_CONTACT});
      await fetch(
        encodeURI(
          `${RestConstant}`
        ),
        {
          method: 'GET',
          timeoutInterval: 60000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
        .then(response => (
            mystatus = response.status,
            response.json()
        ))
        .then(response =>
          dispatch({
            type: RECEIVE_CONTACT,
            payload: response,
            status: mystatus
          }),
        )
        .catch(response =>
          dispatch({
            type: FETCH_ERROR,
            payload: response,
          }),
        );
    };
  };

  export const deleteContact = (id) => {
    return async function(dispatch) {
      dispatch({type: FETCH_CONTACT});
      await fetch(encodeURI(`${RestConstant}` +
      '/' + id ), {
        method: 'DELETE',
        timeoutInterval: 60000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response =>
          dispatch({
            type: RECEIVE_CONTACT,
            payload: response,
          }),
        )
        .catch(response =>
          dispatch({
            type: FETCH_ERROR,
            payload: response,
          }),
        );
    };
  };

  export const getContactById = (id) => {
    return async function(dispatch) {
      dispatch({type: FETCH_CONTACT});
      await fetch(
        encodeURI(`${RestConstant}` +
      '/' + id ),
        {
          method: 'GET',
          timeoutInterval: 60000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
        .then(response => response.json())
        .then(response =>
          dispatch({
            type: RECEIVE_CONTACT,
            payload: response,
          }),
        )
        .catch(response =>
          dispatch({
            type: FETCH_ERROR,
            payload: response,
          }),
        );
    };
  };

  export const editContact = (id, firstname, lastname, age, photo) => {
    return async function(dispatch) {
      dispatch({type: FETCH_CONTACT});
      await fetch(encodeURI(`${RestConstant}` +
      '/' + id ), {
        method: 'PUT',
        timeoutInterval: 60000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          age: age,
          photo: photo
        }),
      })
        .then(response => response.json())
        .then(response =>
          dispatch({
            type: RECEIVE_CONTACT,
            payload: response,
          }),
        )
        .catch(response =>
          dispatch({
            type: FETCH_ERROR,
            payload: response,
          }),
        );
    };
  };