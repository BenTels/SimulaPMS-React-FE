import { Person } from "../Domain/Person";

export const PERSON_STATE_LOADING = 'loading', PERSON_STATE_LOADED = 'loaded', PERSON_STATE_ERROR = 'error';
export const PERSON_REDUCER_TOKEN_INIT = 'PERSON_FETCH_INIT', PERSON_REDUCER_TOKEN_FETCHED = 'PERSON_FETCH_SUCCEEDED', PERSON_REDUCER_TOKEN_FAILED = 'PERSON_FETCH_FAILED', PERSON_REDUCER_TOKEN_REMOVED = 'PERSON_REMOVED', PERSON_REDUCER_TOKEN_UPDATED = 'PERSON_UPDATED', PERSON_REDUCER_TOKEN_ADDED = 'PERSON_ADDED';
export const PERSON_INITIAL_STATE = { data: [], loadState: PERSON_STATE_LOADING };

export type StateType = { data: Person[], loadState: string };
export type ActionType = { type: string, payload?: any };

export const personReducer = (state: StateType, action: ActionType): StateType => {
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


export class PersonsService { 
    static SERVICE_ENDPOINT: string = 'http://localhost:8080/persons';

    private constructor() {}

    static loadPersonsList = (dispatchPersons: (a:ActionType) => void, activeFilter? : string) => {
        dispatchPersons({ type: PERSON_REDUCER_TOKEN_INIT });
        PersonsService.getPersonsList(dispatchPersons, activeFilter);
    }

   static getPersonsList = (dispatchPerson: (a:ActionType) => void, activeFilter?: string): void => {
        fetch(PersonsService.SERVICE_ENDPOINT + (activeFilter ? '?searchTerm=' + activeFilter : ''))
            .then(response => response.json())
            .then((obs: any[]) => obs.map(o => Person.fromObject(o)))
            .then((persons: Person[]) => { persons.forEach(p => console.log(p)); return persons;})
            .then(result => dispatchPerson({ type: PERSON_REDUCER_TOKEN_FETCHED, payload: result }))
            .catch((reason) => { console.log(reason); dispatchPerson({ type: PERSON_REDUCER_TOKEN_FAILED }) });
    }
    
    static getPerson = (uri: string, callbackOnSuccess: (p: Person) => void): void => {
        fetch(new Request(uri, { method: 'GET' }))
            .then((response: Response) => response.json())
            .then((json: string) => Person.fromJSON(json))
            .then((result: Person) => {
                if (callbackOnSuccess) {
                    callbackOnSuccess(result);
                }
            })
            .catch((reason) => console.log(reason));
    }

    static addPersonToListGenerator = (onSuccessCallback: ((a:any)=>void) | undefined) => {
        return (personToAdd: Person, 
            afterSuccessCallback: (()=>void) | undefined = undefined, 
            afterFailureCallback: ((a:any)=> void) | undefined = undefined) => {
            const heads = new Headers({ 'Content-Type': 'application/json' });
            const request = new Request(PersonsService.SERVICE_ENDPOINT, { method: 'POST', body: personToAdd.toJSONString(), headers: heads });
    
            fetch(request)
                .then(result => {
                    if (result.ok) {
                        if (afterSuccessCallback) {
                            afterSuccessCallback();
                        }
                        if (onSuccessCallback) {
                            let locURI = result.headers.get('Location');
                            let id = locURI?.substring(locURI.lastIndexOf('/') + 1);
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

    static removePersonFromListGenerator = (onSuccessCallback: (p:Person) => void): ((p:Person)=>void) => {
        return (personToRemove: Person) => {
            const endpoint: string = PersonsService.SERVICE_ENDPOINT + '/' + personToRemove.id;
            const request: Request = new Request(endpoint, { method: 'DELETE' });
    
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
    
    static updatePersonInListGenerator = (onSuccessCallback: (p:Person) => void) : ((p:Person) => void) => {
        return (personToUpdate: Person) => {
            const endpoint: string = PersonsService.SERVICE_ENDPOINT + '/' + personToUpdate.id;
            const heads: Headers = new Headers({ 'Content-Type': 'application/json' });
            const request: Request = new Request(endpoint, { method: 'PUT', body: personToUpdate.toJSONString(), headers: heads });
    
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
}







