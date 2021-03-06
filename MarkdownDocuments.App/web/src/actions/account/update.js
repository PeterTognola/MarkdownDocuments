import { SubmissionError } from "redux-form";
import fetch from "../../shared/helpers/fetch";
import { success as createSuccess } from "./create";

export function retrieveError(retrieveError) {
    return {type: "ACCOUNT_UPDATE_RETRIEVE_ERROR", retrieveError};
}

export function retrieveLoading(retrieveLoading) {
    return {type: "ACCOUNT_UPDATE_RETRIEVE_LOADING", retrieveLoading};
}

export function retrieveSuccess(retrieved) {
    return {type: "ACCOUNT_UPDATE_RETRIEVE_SUCCESS", retrieved};
}

export function retrieve() {
    return (dispatch) => {
        dispatch(retrieveLoading(true));

        return fetch("/account/currentUser")
            .then(response => response.json())
            .then(data => {
                dispatch(retrieveLoading(false));
                dispatch(retrieveSuccess(data));
            })
            .catch(e => {
                dispatch(retrieveLoading(false));
                dispatch(retrieveError(e.message));
            });
    };
}

export function updateError(updateError) {
    return {type: "ACCOUNT_UPDATE_UPDATE_ERROR", updateError};
}

export function updateLoading(updateLoading) {
    return {type: "ACCOUNT_UPDATE_UPDATE_LOADING", updateLoading};
}

export function updateSuccess(updated) {
    return {type: "ACCOUNT_UPDATE_UPDATE_SUCCESS", updated};
}

export function update(values) {
    return (dispatch) => {
        dispatch(updateError(null));
        dispatch(createSuccess(null));
        dispatch(updateLoading(true));

        return fetch("/account/", {
                method: "PUT",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify(values)
            })
            .then(response => response.json())
            .then(data => {
                dispatch(updateLoading(false));
                dispatch(updateSuccess(data));
            })
            .catch(e => {
                dispatch(updateLoading(false));

                if (e instanceof SubmissionError) {
                    dispatch(updateError(e.errors._error));
                    throw e;
                }

                dispatch(updateError(e.message));
            });
    };
}

export function reset() {
    return {type: "ACCOUNT_UPDATE_RESET"};
}