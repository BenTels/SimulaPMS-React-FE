const SERVICE_ENDPOINT = 'http://localhost:8080/persons';

export const PERSON_STATE_LOADING = 'loading', PERSON_STATE_LOADED = 'loaded', PERSON_STATE_ERROR = 'error';
export const PERSON_REDUCER_TOKEN_INIT = 'PERSON_FETCH_INIT', PERSON_REDUCER_TOKEN_FETCHED = 'PERSON_FETCH_SUCCEEDED', PERSON_REDUCER_TOKEN_FAILED = 'PERSON_FETCH_FAILED', PERSON_REDUCER_TOKEN_REMOVED = 'PERSON_REMOVED';
export const PERSON_INITIAL_STATE = { data: [], loadState: PERSON_STATE_LOADING };

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
                loadState: PERSON_STATE_LOADED
            };
        default:
            throw new Error('UNRECOGNIZED TOKEN');
    }
}

export const loadPersonsList = (dispatchPersons, activeFilter) => {
    dispatchPersons({ type: PERSON_REDUCER_TOKEN_INIT });
    getPersonsList(dispatchPersons, activeFilter);
}

export const removePersonFromListGenerator = (dispatchPerson, selectedPersonUpdater) => {
    /* Later: add service calls */
    return (personToRemove) => {
        dispatchPerson({ type: PERSON_REDUCER_TOKEN_REMOVED, payload: personToRemove });
        selectedPersonUpdater();
    }
}

export const getPersonsList = (dispatchPerson, activeFilter) => {
    fetch(SERVICE_ENDPOINT + (activeFilter ? '?searchTerm=' + activeFilter : ''))
        .then(response => response.json())
        .then(result => dispatchPerson({ type: PERSON_REDUCER_TOKEN_FETCHED, payload: result }))
        .catch((reason) => dispatchPerson({ type: PERSON_REDUCER_TOKEN_FAILED }));
}