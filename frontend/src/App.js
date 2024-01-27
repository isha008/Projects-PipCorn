
import './App.css';
import {BrowserRouter , Route , Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Account from './screens/UserScreen'
// import { CookiesProvider, useCookies } from "react-cookie";

function App() {

  return (
   
      <BrowserRouter>
        <div >
          <header>
          <h1 className="pipcorn">PIPCORN</h1>
            <main>
              <Routes>
                <Route path="/" element={<HomeScreen />} ></Route>
                <Route path="/product/:pid" element={< ProductScreen />} > </Route>
                <Route path ="/login" element ={ <Login /> } ></Route>
                <Route path ="/register" element ={ <Register /> } ></Route>
                <Route path='/account' element={ < Account /> } ></Route>
              </Routes>
              
            </main>
          
            
          </header>
        </div>
        </BrowserRouter>
    
  );
}

export default App;
