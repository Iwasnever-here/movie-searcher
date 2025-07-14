import React from 'react'
import { FaSearch } from "react-icons/fa";

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className=''>
      <input 
      className='p-3 mt-10 w-100 bg-red-500 rounded-xl border border-solid border-black'
      type = 'text'
      placeholder='search here . . .'
      value = {searchTerm}
      onChange = {(event) => setSearchTerm(event.target.value)}
      />
      
      <FaSearch className='inline ml-4 text-3xl' onClick={() => console.log(searchTerm)}
/>
    </div>
  )
  console.log(searchTerm)
}

export default Search
