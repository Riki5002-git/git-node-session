import './App.css';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import AddProduct from './features/product/AddProduct';
import { Routes, Route } from 'react-router-dom';
import UpdateProduct from './features/product/UpdateProduct';
import VeiwAll from './features/product/VeiwAll';
import Layout from './Layout';
import Basket from './features/basket/Basket';
import HomePage from './features/product/HomrPage';
import BigProduct from './features/product/BigProduct';
import Order from './features/basket/Order';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="updateProduct/:barCode" element={<UpdateProduct />} />
          <Route path="veiwAll" element={<VeiwAll />} />
          <Route path="veiwAll/:category" element={<VeiwAll />} />
          <Route path="basket" element={<Basket />} />
          <Route path="bigProduct/:barCode" element={<BigProduct />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;