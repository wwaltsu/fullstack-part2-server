import React from 'react'

export default function Persons({ personsToFilter, removePerson }) {
  return (
    <div>
      {personsToFilter.map((person) => (
        <p key={person.name}>
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
