import './App.css';
import { Header } from './HeaderComponent';
import { PersonSelection } from './PersonSelectionComponent';
import { PersonDisplay } from './PersonDisplayComponent';
import { loadPersonsList, removePersonFromListGenerator, personReducer, PERSON_INITIAL_STATE} from './PersonsServiceConnector'
import { useEffect, useReducer, useState } from 'react';
import { usePersistableState } from './UsePersistableState';

const LOCALSTORAGE_FILTER_KEY = 'activeFilter';

function App() {

  const [loadedPersons, dispatchPersons] = useReducer(personReducer, PERSON_INITIAL_STATE);
  const [activeFilter, setActiveFilter] = usePersistableState(LOCALSTORAGE_FILTER_KEY, '');
  const [selectedPerson, setSelectedPerson] = useState();

  const loadState = loadedPersons.loadState;
  const persons = loadedPersons.data;

  const selectPersonClickHandler = (evt) => {
    evt.preventDefault();
    let personId = evt.target.attributes.href.value;
    let person = loadedPersons.data.filter(pers => pers.id === personId).pop();
    setSelectedPerson(person);
  }

  const filterChangedHandler = (evt) => {
    setSelectedPerson();
    setActiveFilter(evt.target.value);
  }

  const removePersonHandler = removePersonFromListGenerator(dispatchPersons, setSelectedPerson);

  useEffect(() => localStorage.setItem(LOCALSTORAGE_FILTER_KEY, activeFilter), [activeFilter]);
  useEffect(() => loadPersonsList(dispatchPersons, activeFilter), [activeFilter]);

  return (
    <div>
      <Header filterText={activeFilter} filterChangedHandler={filterChangedHandler} />
      <PersonSelection personData={{ persons, loadState, selectPersonClickHandler }} />
      <PersonDisplay person={selectedPerson} removeHandler={removePersonHandler} />
    </div>
  );
}

export default App;
