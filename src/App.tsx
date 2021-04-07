import './App.css';
import { Header } from './HeaderComponent';
import { PersonSelection } from './PersonSelectionComponent';
import { PersonDisplay } from './PersonDisplayComponent';
import { personReducer, PersonsService, PERSON_INITIAL_STATE } from './Person/Service/PersonsService'
import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { usePersistableState } from './UsePersistableState';
import { subscribeToPersonTopic } from './PersonUpdateListener';
import React from 'react';
import { Person } from './Person/Domain/Person';

const LOCALSTORAGE_FILTER_KEY: string = 'activeFilter';

function App() {

  const [loadedPersons, dispatchPersons] = useReducer(personReducer, PERSON_INITIAL_STATE);
  const [activeFilter, setActiveFilter] = usePersistableState(LOCALSTORAGE_FILTER_KEY, '');
  const [selectedPersonCode, setSelectedPersonCode] = useState<string>();

  const loadState:string = loadedPersons.loadState;
  const persons: Person[] = loadedPersons.data;
  //const selectedPerson = persons.find(pers:Person => pers.id === selectedPersonCode);

  const selectPersonClickHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    let personId = (evt.target as HTMLLinkElement).attributes.getNamedItem('href')?.value;
    let person = loadedPersons.data.filter(pers => pers.id === personId).pop();
    setSelectedPersonCode(person? person.id: undefined);
  }

  const filterChangedHandler = (evt:ChangeEvent) => {
    setSelectedPersonCode('');
    setActiveFilter((evt.target as HTMLInputElement).value);
  }

  const setSelectedPerson = (person: Person) => setSelectedPersonCode(person.id);

  const addPersonHandler = PersonsService.addPersonToListGenerator((newId) => setSelectedPersonCode(newId));
  /* const removePersonHandler = removePersonFromListGenerator(() => setSelectedPersonCode());
  const updatePersonHandler = updatePersonInListGenerator((pers) => setSelectedPerson(pers)); */

  useEffect(() => localStorage.setItem(LOCALSTORAGE_FILTER_KEY, activeFilter), [activeFilter]);
  useEffect(() => PersonsService.loadPersonsList(dispatchPersons, activeFilter), [activeFilter]);
/*   useEffect(() => subscribeToPersonTopic(dispatchPersons), []); */
  

  return (
    <div>
      <Header filterText={activeFilter} filterChangedHandler={filterChangedHandler} addPersonServiceFunction={addPersonHandler} /> 
      <PersonSelection personData={{ persons, loadState, selectPersonClickHandler }} />
      { // <PersonDisplay person={selectedPerson} removeHandler={removePersonHandler} updateHandler={updatePersonHandler} /> 
      }
    </div>
  );
}

export default App;
