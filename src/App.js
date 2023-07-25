import { useState } from 'react';
import './App.css';
import Posts from './components/posts/Posts';
import Search from './components/search/Search';

function App() {

  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="App">
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <Posts searchValue={searchValue} />
    </div>
  );
}

export default App;
