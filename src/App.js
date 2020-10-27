import logo from './logo.svg';
import './App.css';
import { Header } from './HeaderComponent';
import { PersonSelection } from './PersonSelectionComponent';
import { PersonDisplay } from './PersonDisplayComponent';
import { persons as basepersons } from './TEMPORARY_PERSONS';
import { useState } from 'react';

function App() {

  let [selectedPerson, setSelectedPerson] = useState();
  let [persons, setActivePersons] = useState(basepersons);

  let selectPersonClickHandler = (evt) => {
    evt.preventDefault();

    let personId = evt.target.attributes.href.value;
    let person = persons.filter(pers => pers.id === personId).pop();
    setSelectedPerson(person);
  }

  let filterChangedHandler = (evt) => {
    let filtertext = evt.target.value;
    console.log(filtertext);
    console.log(filtertext && filtertext.trim() ? true: false);
    if (filtertext && filtertext.trim()) {
      let trimmedFilter = filtertext.trim().toLowerCase();
      let filteredPersons = basepersons.filter(pers => pers.lastname.toLocaleLowerCase().includes(trimmedFilter));
      setActivePersons(filteredPersons);
    } else {
      setActivePersons(basepersons);
    }
    setSelectedPerson(null);
  }

  return (
    <div>
      <Header filterChangedHandler={filterChangedHandler} />
      <PersonSelection personData={{persons, selectPersonClickHandler}} />
      <PersonDisplay person={selectedPerson}/>
    </div>
  );
}

export default App;
