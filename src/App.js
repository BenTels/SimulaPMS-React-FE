import './App.css';
import { Header } from './HeaderComponent';
import { PersonSelection } from './PersonSelectionComponent';
import { PersonDisplay } from './PersonDisplayComponent';
import { persons as basepersons } from './TEMPORARY_PERSONS';
import { useEffect, useState } from 'react';

const LOCALSTORAGE_FILTER_KEY = 'activeFilter';

function App() {

  const [activeFilter, setActiveFilter] = useState(localStorage.getItem(LOCALSTORAGE_FILTER_KEY) || '');
  const [selectedPerson, setSelectedPerson] = useState();

  const persons = basepersons.filter(pers => pers.lastname.toLocaleLowerCase().includes(activeFilter.trim().toLowerCase()));

  const selectPersonClickHandler = (evt) => {
    evt.preventDefault();
    let personId = evt.target.attributes.href.value;
    let person = persons.filter(pers => pers.id === personId).pop();
    setSelectedPerson(person);
  }

  const filterChangedHandler = (evt) => setActiveFilter(evt.target.value);

  useEffect(() => localStorage.setItem(LOCALSTORAGE_FILTER_KEY, activeFilter), [activeFilter]);

  return (
    <div>
      <Header filterText={activeFilter} filterChangedHandler={filterChangedHandler} />
      <PersonSelection personData={{persons, selectPersonClickHandler}} />
      <PersonDisplay person={selectedPerson}/>
    </div>
  );
}

export default App;
