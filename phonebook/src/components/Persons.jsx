import React from 'react'

export default function Persons({ filteredPersons, removePerson }) {
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{' '}
          {
            <button onClick={() => removePerson(person.id, person.name)}>
              delete
            </button>
          }
        </p>
      ))}
    </div>
  )
}
