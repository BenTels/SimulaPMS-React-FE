import './App.css';
import { Header } from './HeaderComponent';
import { PersonSelection } from './PersonSelectionComponent';
import { PersonDisplay } from './PersonDisplayComponent';
import { getPersonsList, removePersonFromListGenerator, personReducer, PERSON_INITIAL_STATE, PERSON_REDUCER_TOKEN_INIT, PERSON_REDUCER_TOKEN_FETCHED, PERSON_REDUCER_TOKEN_FAILED } from './PersonsServiceConnector'
import { useEffect, useReducer, useState } from 'react';

const LOCALSTORAGE_FILTER_KEY = 'activeFilter';

function App() {

  const [loadedPersons, dispatchPersons] = useReducer(personReducer, PERSON_INITIAL_STATE);
  const [activeFilter, setActiveFilter] = useState(localStorage.getItem(LOCALSTORAGE_FILTER_KEY) || '');
  const [selectedPerson, setSelectedPerson] = useState();

  const persons = loadedPersons.data.filter(pers => pers.lastname.toLocaleLowerCase().includes(activeFilter.trim().toLowerCase()));
  const loadState = loadedPersons.loadState;

  const selectPersonClickHandler = (evt) => {
    evt.preventDefault();
    let personId = evt.target.attributes.href.value;
    let person = persons.filter(pers => pers.id === personId).pop();
    setSelectedPerson(person);
  }

  const filterChangedHandler = (evt) => setActiveFilter(evt.target.value);

  const removePersonHandler = removePersonFromListGenerator(dispatchPersons, setSelectedPerson);

  useEffect(() => localStorage.setItem(LOCALSTORAGE_FILTER_KEY, activeFilter), [activeFilter]);
  useEffect(() => {
    dispatchPersons({ type: PERSON_REDUCER_TOKEN_INIT });
    getPersonsList().then(result => {
      dispatchPersons({
        type: PERSON_REDUCER_TOKEN_FETCHED,
        payload: result.data.persons
      });
    }).catch(() => dispatchPersons({ type: PERSON_REDUCER_TOKEN_FAILED }));
  }, []);

  return (
    <div>
      <Header filterText={activeFilter} filterChangedHandler={filterChangedHandler} />
      <PersonSelection personData={{ persons, loadState, selectPersonClickHandler }} />
      <PersonDisplay person={selectedPerson} removeHandler={removePersonHandler} />
    </div>
  );
}

export default App;
