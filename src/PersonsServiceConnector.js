const SERVICE_ENDPOINT = 'http://localhost:8080/persons';

export const PERSON_STATE_LOADING = 'loading', PERSON_STATE_LOADED = 'loaded', PERSON_STATE_ERROR = 'error';
export const PERSON_REDUCER_TOKEN_INIT = 'PERSON_FETCH_INIT', PERSON_REDUCER_TOKEN_FETCHED = 'PERSON_FETCH_SUCCEEDED', PERSON_REDUCER_TOKEN_FAILED = 'PERSON_FETCH_FAILED', PERSON_REDUCER_TOKEN_REMOVED = 'PERSON_REMOVED', PERSON_REDUCER_TOKEN_UPDATED = 'PERSON_UPDATED', PERSON_REDUCER_TOKEN_ADDED = 'PERSON_ADDED';
export const PERSON_INITIAL_STATE = { data: [], loadState: PERSON_STATE_LOADING};

export const personReducer = (state, action) => {
    switch (action.type) {
        case PERSON_REDUCER_TOKEN_INIT:
            return {
                ...state,
                loadState: PERSON_STATE_LOADING
            };
        case PERSON_REDUCER_TOKEN_FETCHED:
            return {
                data: action.payload,
                loadState: PERSON_STATE_LOADED
            };
        case PERSON_REDUCER_TOKEN_FAILED:
            return {
                data: action.payload,
                loadState: PERSON_STATE_ERROR
            };
        case PERSON_REDUCER_TOKEN_REMOVED:
            return {
                data: state.data.filter(pers => pers.id !== action.payload.id),
                loadState: PERSON_STATE_LOADED,
            };
        case PERSON_REDUCER_TOKEN_UPDATED:
            return {
                data: state.data.map(pers => pers.id !== action.payload.id ? pers : action.payload),
                loadState: PERSON_STATE_LOADED,
            };
        case PERSON_REDUCER_TOKEN_ADDED:
            return {
                data: [...state.data, action.payload],
                loadState: PERSON_STATE_LOADED,
            };
        default:
            throw new Error('UNRECOGNIZED TOKEN');
    }
}

export const loadPersonsList = (dispatchPersons, activeFilter) => {
    dispatchPersons({ type: PERSON_REDUCER_TOKEN_INIT });
    getPersonsList(dispatchPersons, activeFilter);
}

export const addPersonToListGenerator = (onSuccessCallback) => {
    return (personToAdd, afterSuccessCallback = undefined, afterFailureCallback = undefined) => {
        const heads = new Headers({ 'Content-Type': 'application/json' });
        const request = new Request(SERVICE_ENDPOINT, { method: 'POST', body: JSON.stringify(personToAdd), headers: heads });

        fetch(request)
            .then(result => {
                if (result.ok) {
                    if (afterSuccessCallback) {
                        afterSuccessCallback();
                    }
                    if (onSuccessCallback) {
                        let locURI = result.headers.get('Location');
                        let id = locURI.substring(locURI.lastIndexOf('/') + 1);
                        onSuccessCallback(id);
                    }
                } else {
                    if (afterFailureCallback) {
                        result.json().then(o => afterFailureCallback(o));
                    }
                }
            }).catch(reason => console.log(reason));
    }
}

export const removePersonFromListGenerator = (onSuccessCallback) => {
    return (personToRemove) => {
        const endpoint = SERVICE_ENDPOINT + '/' + personToRemove.id;
        const request = new Request(endpoint, { method: 'DELETE' });

        fetch(request)
            .then(result => {
                if (result.ok) {
                    if (onSuccessCallback) {
                        onSuccessCallback(personToRemove);
                    }
                } else {
                    console.log(result.status + ' ' + result.statusText);
                }
            }).catch(reason => console.log(reason));
    }
}

export const updatePersonInListGenerator = (onSuccessCallback) => {
    return (personToUpdate) => {
        const endpoint = SERVICE_ENDPOINT + '/' + personToUpdate.id;
        const heads = new Headers({ 'Content-Type': 'application/json' });
        const request = new Request(endpoint, { method: 'PUT', body: JSON.stringify(personToUpdate), headers: heads });

        fetch(request)
            .then(result => {
                if (result.ok) {
                    if (onSuccessCallback) {
                        onSuccessCallback(personToUpdate);
                    }
                } else {
                    console.log(result.status + ' ' + result.statusText);
                }
            }).catch(reason => console.log(reason));
    }
}

export const getPersonsList = (dispatchPerson, activeFilter) => {
    fetch(SERVICE_ENDPOINT + (activeFilter ? '?searchTerm=' + activeFilter : ''))
        .then(response => response.json())
        .then(result => dispatchPerson({ type: PERSON_REDUCER_TOKEN_FETCHED, payload: result }))
        .catch((reason) => dispatchPerson({ type: PERSON_REDUCER_TOKEN_FAILED }));
}

export const getPerson = (uri, callbackOnSuccess) => {
    fetch( new Request(uri, { method: 'GET' }))
        .then(response => response.json())
        .then(result => { 
            if (callbackOnSuccess) {
                callbackOnSuccess(result);
            }
        })
        .catch((reason) => console.log(reason));
}