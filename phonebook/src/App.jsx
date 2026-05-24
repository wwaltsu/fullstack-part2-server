import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterPersonChange = (event) => {
    setPersonFilter(event.target.value)
  }

  const personsToFilter = persons.filter((person) =>
    person.name.toLowerCase().includes(personFilter.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    event.preventDefault()
    persons.find(
      (person) =>
        person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    )
      ? alert(`${newName} is already added to phonebook`)
      : axios
          .post('http://localhost:3001/persons', personObject)
          .then((response) => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
          })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterPersonChange={handleFilterPersonChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToFilter={personsToFilter} />
    </div>
  )
}

export default App
