import { SubmissionError } from "redux-form";
import fetch from "../../shared/helpers/fetch";

export function error(error) {
    return {type: 'DOCUMENT_CREATE_ERROR', error};
}

export function loading(loading) {
    return {type: 'DOCUMENT_CREATE_LOADING', loading};
}

export function success(created) {
    return {type: 'DOCUMENT_CREATE_SUCCESS', created};
}

export function create(values) {
    return (dispatch) => {
        dispatch(loading(true));

        return fetch('/document', {method: 'POST', body: JSON.stringify(values)})
            .then(response => {
                dispatch(loading(false));

                //
                // We do not expect a result.
                // If the creation fails, it will throw a http 500.
                return response.json();
            })
            .then(data => dispatch(success(data)))
            .catch(e => {
                dispatch(loading(false));

                if (e instanceof SubmissionError) {
                    dispatch(error(e.errors._error));
                    throw e;
                }

                dispatch(error(e.message));
            });
    };
}
