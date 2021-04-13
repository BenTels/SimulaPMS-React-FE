import { Person } from "./Person/Domain/Person";
import { ActionType, PersonsService, PERSON_REDUCER_TOKEN_ADDED, PERSON_REDUCER_TOKEN_REMOVED, PERSON_REDUCER_TOKEN_UPDATED } from "./Person/Service/PersonsService"

const PERSON_TOPIC_ENDPOINT = 'ws://localhost:8080/topics/person';

export const subscribeToPersonTopic = (dispatchPersons:(a: ActionType) => void) => {

    const topic:WebSocket = new WebSocket(PERSON_TOPIC_ENDPOINT);

    setTopicLifecycle(topic, dispatchPersons);

};

const setTopicLifecycle = (topic:WebSocket, dispatchPersons:(a: ActionType) => void) => {

    let timeout: number = 250;
    let connectInterval:NodeJS.Timeout;

    topic.onopen = () => { 
        console.log('CONNECTED');
        timeout = 250;
        clearTimeout(connectInterval);
    }

    topic.onmessage = (evt: MessageEvent) => {
        const eventData = JSON.parse(evt.data);
        switch (eventData.changeType) {
            case 'ADDED':
                PersonsService.getPerson(eventData.resource, (person:Person) => dispatchPersons({ type: PERSON_REDUCER_TOKEN_ADDED, payload: person }));
                break;
            case 'UPDATED':
                PersonsService.getPerson(eventData.resource, (person:Person) => dispatchPersons({ type: PERSON_REDUCER_TOKEN_UPDATED, payload: person }));
                break;
            case 'REMOVED':
                const idx = eventData.resource.lastIndexOf('/');
                const id = eventData.resource.substring(idx + 1);
                dispatchPersons({ type: PERSON_REDUCER_TOKEN_REMOVED, payload: { id } });
                break;
            default: throw new Error('Unexpected change type' + eventData.changeType);
        }
    };

    topic.onclose = (err:CloseEvent): void => {
        console.log('DISCONNECTED -- will attempt reconnect');
        console.log(err.reason);
        timeout = 2 * timeout;
        connectInterval = setTimeout(check, Math.min(10000, timeout));
    }

    topic.onerror = (err:Event): void => {
        console.log('ERROR');
        console.log(err);
        topic.close();
    }

    const check = () => {
        if (topic.readyState === WebSocket.CLOSED) {
            subscribeToPersonTopic(dispatchPersons);
        }
    }

};