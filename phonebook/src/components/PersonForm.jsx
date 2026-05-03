import React from 'react'

export default function PersonForm({
  addPerson,
  newName,
  handleNewNameChange,
  newNumber,
  handleNewNumberChange
}) {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}
