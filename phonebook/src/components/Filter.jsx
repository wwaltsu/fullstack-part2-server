import React from 'react'

export default function Filter({ handleFilterPersonChange }) {
  return (
    <div>
      filter shown with:
      <input onChange={handleFilterPersonChange} />
    </div>
  )
}
