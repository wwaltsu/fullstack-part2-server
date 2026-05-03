import React from 'react'

export default function Persons({ personsToFilter }) {
    
  return (
    <div>
      {personsToFilter.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}
