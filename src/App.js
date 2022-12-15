import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {MainCart, Home, SingleProduct,Error} from './pages/index'
import Navbar from './components/Navbar';



function App() {
  return (
  <BrowserRouter>
    <Navbar />
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<MainCart />} />
      <Route path='/singleProduct/:id' element={<SingleProduct />} />
      <Route path='*' element={<Error/>}/>
    </Routes>

  </BrowserRouter>
  );
}

export default App;
