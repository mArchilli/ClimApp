"use client"

import { useState } from "react"

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim())
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center sm:justify-end w-full"
    >
      <div className="flex items-center bg-white rounded-full shadow-md w-full sm:w-auto">
        <input
          type="text"
          placeholder="Buscar ciudad..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-6 py-3 text-lg rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white placeholder-gray-400 w-full sm:w-auto"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors mt-4 sm:mt-0 sm:ml-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.65 10.35a6.3 6.3 0 11-12.6 0 6.3 6.3 0 0112.6 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchBar