import React from 'react'

export default function Filter({ handleFilterChange }) {
  return (
    <div>
      filter shown with:
      <input onChange={handleFilterChange} />
    </div>
  )
}
