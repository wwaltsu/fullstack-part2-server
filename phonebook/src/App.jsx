import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebookService'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll('http://localhost:3001/persons')
      .then((response) => {
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

  const removePerson = (id, name) => {
    window.confirm(`Delete ${name}?`)
      ? phonebookService.remove(id).then(() => {
          setPersons((prev) => prev.filter((person) => person.id !== id))
        })
      : false
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const alreadyAddedPerson = persons.find(
      (person) =>
        person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    )
    if (alreadyAddedPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        phonebookService
          .update(alreadyAddedPerson.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== alreadyAddedPerson.id ? person : updatedPerson
              )
            )
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            setErrorMessage(
              `Person '${alreadyAddedPerson.name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons((prev) =>
              prev.filter((n) => n.id !== alreadyAddedPerson.id)
            )
          })
      }
      return
    }

    phonebookService.create(personObject).then((response) => {
      setPersons(persons.concat(response.data))
      setSuccessMessage(`Added ${personObject.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} style={'error'} />
      <Notification message={successMessage} style={'success'} />
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
      <Persons personsToFilter={personsToFilter} removePerson={removePerson} />
    </div>
  )
}

export default App
