import { getPerson, PERSON_REDUCER_TOKEN_ADDED, PERSON_REDUCER_TOKEN_REMOVED, PERSON_REDUCER_TOKEN_UPDATED } from "./PersonsServiceConnector";

const PERSON_TOPIC_ENDPOINT = 'ws://localhost:8080/topics/person';

export const subscribeToPersonTopic = (dispatchPersons, setSelectedPerson) => {

    const topic = new WebSocket(PERSON_TOPIC_ENDPOINT);

    setTopicLifecycle(topic, dispatchPersons, setSelectedPerson);

};

const setTopicLifecycle = (topic, dispatchPersons, setSelectedPerson) => {

    let timeout = 250;
    let connectInterval;

    topic.onopen = () => { 
        console.log('CONNECTED');
        timeout = 250;
        clearTimeout(connectInterval);
    }

    topic.onmessage = (evt) => {
        const eventData = JSON.parse(evt.data);
        switch (eventData.changeType) {
            case 'ADDED':
                getPerson(eventData.resource, (person) => dispatchPersons({ type: PERSON_REDUCER_TOKEN_ADDED, payload: person }));
                break;
            case 'UPDATED':
                getPerson(eventData.resource, (person) => dispatchPersons({ type: PERSON_REDUCER_TOKEN_UPDATED, payload: person }));
                break;
            case 'REMOVED':
                const idx = eventData.resource.lastIndexOf('/');
                const id = eventData.resource.substring(idx + 1);
                dispatchPersons({ type: PERSON_REDUCER_TOKEN_REMOVED, payload: { id } });
                break;
            default: throw new Error('Unexpected change type' + eventData.changeType);
        }
    };

    topic.onclose = (err) => {
        console.log('DISCONNECTED -- will attempt reconnect');
        console.log(err.reason);
        timeout = 2 * timeout;
        connectInterval = setTimeout(check, Math.min(10000, timeout));
    }

    topic.onerror = (err) => {
        console.log('ERROR');
        console.log(err.reason);
        topic.close();
    }

    const check = () => {
        if (topic.readyState === WebSocket.CLOSED) {
            subscribeToPersonTopic(dispatchPersons, setSelectedPerson);
        }
    }

};