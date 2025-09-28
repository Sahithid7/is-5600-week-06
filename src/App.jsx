// src/App.jsx
import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import { Routes, Route } from 'react-router-dom';
import productData from './data/full-products';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Route for product list */}
        <Route path="/" element={<CardList data={productData} />} />

        {/* Route for single product view */}
        <Route path="/product/:id" element={<SingleView data={productData} />} />
      </Routes>
    </div>
  );
}

export default App;


