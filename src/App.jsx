import { useState} from 'react'
import './App.css'
import Search from './components/Search'
import { useNavigate, Routes, Route, Navigate,useLocation } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

import DiscoverPage from './pages/DiscoverPage'
import SearchPage from './pages/SearchPage'


function App() {

  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setSearchQuery(searchTerm.trim()); 
      navigate('/search');
    }
  };

  
  const handleFilterChange = (newFilter) => {
  setFilter(newFilter);
  if (searchTerm.trim()) {
    setSearchQuery(searchTerm.trim());
    navigate('/search');
  }
};


  const goBack = () => {
    setSearchTerm('')
    setSearchQuery('')
    navigate('/discover')
  }


  return (
    
      <div className='App'>
        <FaHome  className='text-3xl' onClick={goBack}/>
        <h1 className='text-8xl mt-50'>MOVIE LIBRARY</h1>
      
      
     <Search
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleSearch={handleSearch}
      filter={filter}
      setFilter={handleFilterChange}
      showFilters={location.pathname === '/search'} 
    />



        <Routes>
          <Route path='/' element={<Navigate to='discover'/>} />
          <Route path="/discover" element={<DiscoverPage />} />
         <Route path="/search" element={<SearchPage searchTerm={searchQuery} filter = {filter}/>} />


        </Routes>
      </div>
    
  )
}
export default App
