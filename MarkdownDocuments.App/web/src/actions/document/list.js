import fetch from '../../shared/helpers/fetch';

export function error(error) {
  return {type: 'DOCUMENT_LIST_ERROR', error};
}

export function loading(loading) {
  return {type: 'DOCUMENT_LIST_LOADING', loading};
}

export function success(data) {
  return {type: 'DOCUMENT_LIST_SUCCESS', data};
}

export function list(page = '/document') {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(error(''));

    fetch(page)
      .then(response => response.json())
      .then(data => {
        dispatch(loading(false));
        dispatch(success(data));
      })
      .catch(e => {
        dispatch(loading(false));
        dispatch(error(e.message))
      });
  };
}

export function reset() {
  return {type: 'DOCUMENT_LIST_RESET'};
}
