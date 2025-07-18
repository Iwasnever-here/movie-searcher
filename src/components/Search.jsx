

import React from 'react'
import { FaSearch } from "react-icons/fa";

const filters = [
  { label: 'All', value: '' },
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'tv' },
  
];

const Search = ({ searchTerm, setSearchTerm, handleSearch, filter, setFilter, showFilters }) => {
  return (
     <div className='mt-10 '>

      <div className='flex justify-center items-center gap-4'>
        <input
          className='p-3 w-100 bg-red-500 rounded-xl border border-solid border-black'
          type='text'
          placeholder='search here . . .'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <FaSearch className='text-3xl cursor-pointer' onClick={handleSearch} />
      </div>

      {showFilters && (
        <div className="flex gap-2 mt-4 justify-center flex-wrap">
          {filters.map(({ label, value }) => (
            <button
             key={value}
            className={`px-4 py-2 rounded-full border text-sm font-semibold 
              ${filter === value
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-400'}
                hover:bg-black hover:text-white transition`}
                onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      </div>
  )
}

export default Search;
