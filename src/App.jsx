import { useState } from 'react';
import './App.scss';
import ProductFilter from './product-filter/ProductFilter';
import TableDisplay from './table-display/TableDisplay';

import icon from './assets/ecoplant.png'
import photo from './assets/delivery.png'

function App() {
  const [freeTextSearch, setFreeTextSearch] = useState('')
  const [dateRange, setDateRange] = useState([null, null])

  return (
    <div className="App">
      <header className="App-header">
        <span>Sultan Khalaily <a href='tel:0502570160'>050-2570-160</a></span>
        <span>
          <img src={icon} alt='icon' width={300} />
        </span>
      </header>
      <h1>Home Assignment</h1>
      <div className='first-to-see'>
        <img src={photo} alt='picture' width={300} />
        <div className='testemonial'>
          <span className='title'>Sultan Khalaily</span>
          <span className='subtitle'>Full Stack Engineer</span>
          <p>Implementing the EcoPlant control system allows us to recognize problems before they cause damage, optimize our energy consumption, and improve our sustainability strategy</p>
        </div>

      </div>
      <div className='wrapper'>

        <div className='filter-section'>
          <ProductFilter setFreeTextSearch={setFreeTextSearch} setDateRange={setDateRange} dateRange={dateRange} />
        </div>
        <div className='table-display'>
          <TableDisplay searchText={freeTextSearch} dateRange={dateRange} />
        </div>


      </div>

      <footer>
        <p>&copy; 2023 SultanZ. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
