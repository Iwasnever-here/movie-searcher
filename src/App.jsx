import { useState} from 'react'
import './App.css'
import Search from './components/Search'
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

import DiscoverPage from './pages/DiscoverPage'
import SearchPage from './pages/SearchPage'


function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate();

 const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setSearchQuery(searchTerm.trim()); // update search query only on submit
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
      />


        <Routes>
          <Route path='/' element={<Navigate to='discover'/>} />
          <Route path="/discover" element={<DiscoverPage />} />
         <Route path="/search" element={<SearchPage searchTerm={searchQuery} setSearchTerm={setSearchTerm} />} />


        </Routes>
      </div>
    
  )
}
export default App
