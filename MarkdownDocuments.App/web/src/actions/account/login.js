import { SubmissionError } from "redux-form";
import fetch from "../../shared/helpers/fetch";

export function error(error) {
    return {type: 'ACCOUNT_LOGIN_ERROR', error};
}

export function loading(loading) {
    return {type: 'ACCOUNT_LOGIN_LOADING', loading};
}

export function success(loggedIn) {
    return {type: 'ACCOUNT_LOGIN_SUCCESS', loggedIn};
}

export function login(values) {
    return (dispatch) => {
        dispatch(loading(true));

        return fetch('/account/login', {method: 'POST', body: JSON.stringify(values)})
            .then(response => {
                dispatch(loading(false));
                localStorage.setItem("credentials", JSON.stringify(response));
                return response; // todo .json()
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