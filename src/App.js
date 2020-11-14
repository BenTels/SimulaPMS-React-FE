import './App.css';
import { Header } from './HeaderComponent';
import { PersonSelection } from './PersonSelectionComponent';
import { PersonDisplay } from './PersonDisplayComponent';
import { loadPersonsList, addPersonToListGenerator, removePersonFromListGenerator, updatePersonInListGenerator, personReducer, PERSON_INITIAL_STATE } from './PersonsServiceConnector'
import { useEffect, useReducer, useState } from 'react';
import { usePersistableState } from './UsePersistableState';
import { subscribeToPersonTopic } from './PersonUpdateListener';

const LOCALSTORAGE_FILTER_KEY = 'activeFilter';

function App() {

  const [loadedPersons, dispatchPersons] = useReducer(personReducer, PERSON_INITIAL_STATE);
  const [activeFilter, setActiveFilter] = usePersistableState(LOCALSTORAGE_FILTER_KEY, '');
  const [selectedPersonCode, setSelectedPersonCode] = useState();

  const loadState = loadedPersons.loadState;
  const persons = loadedPersons.data;
  const selectedPerson = persons.find(pers => pers.id === selectedPersonCode);

  const selectPersonClickHandler = (evt) => {
    evt.preventDefault();
    let personId = evt.target.attributes.href.value;
    let person = loadedPersons.data.filter(pers => pers.id === personId).pop();
    setSelectedPersonCode(person.id);
  }

  const filterChangedHandler = (evt) => {
    setSelectedPersonCode('');
    setActiveFilter(evt.target.value);
  }

  const setSelectedPerson = (person) => setSelectedPersonCode(person.id);

  const addPersonHandler = addPersonToListGenerator((newId) => setSelectedPersonCode(newId));
  const removePersonHandler = removePersonFromListGenerator(() => setSelectedPersonCode());
  const updatePersonHandler = updatePersonInListGenerator((pers) => setSelectedPerson(pers));

  useEffect(() => localStorage.setItem(LOCALSTORAGE_FILTER_KEY, activeFilter), [activeFilter]);
  useEffect(() => loadPersonsList(dispatchPersons, activeFilter), [activeFilter]);
  useEffect(() => subscribeToPersonTopic(dispatchPersons), []);

  return (
    <div>
      <Header filterText={activeFilter} filterChangedHandler={filterChangedHandler} addPersonServiceFunction={addPersonHandler} />
      <PersonSelection personData={{ persons, loadState, selectPersonClickHandler }} />
      <PersonDisplay person={selectedPerson} removeHandler={removePersonHandler} updateHandler={updatePersonHandler} />
    </div>
  );
}

export default App;
