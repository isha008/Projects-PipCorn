import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Link} from  'react-router-dom'
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

function HomeScreen() {
  const navigate = useNavigate();
    const [products, setProducts] = useState([])
    useEffect (() => {
      const fetchData = async() => {
        const result = await axios.get('http://localhost:5000/api/products')

        // console.log(typeof(result))
        // console.log(result.data)
        // console.log(result)
        setProducts(result.data)
  
      }
      fetchData()
    }, [])


    const checkAccount = () => {
      const yet = Cookies.get('Email')
      if(yet) {
        const parsed = JSON.parse(yet)
      //  console.log("This is from yet block",parsed)
       const token = parsed.token
        const decoded = jwt_decode(token);
      //   console.log("This is decoded token" , decoded.email)
      //  console.log(typeof(yet))
     
       if(decoded.email !== null) {
        navigate("/account")
     }
     else {
        navigate("/login")
     }
     
     } 
     else {
        navigate("/login")
     }
    }
    return ( <div>
            
            <h1 className="plp-header">Featured Products</h1>
            <img className="user-icon" src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt=" " onClick={checkAccount}/>
            {/* <button onClick={() => navigate("/login")} >Login</button>
            <button onClick={() => navigate("/register")}>Register</button> */}
            <div className="products" > 
              {
                products.map((product)=> (
                  <div className="product" key={product.pid} >
                    <Link to ={`/product/${product._id}`} >
                    <img className="plp-image" src={product.image} alt=" " />
                    </Link>
                    <div className='product-info'>
                    <Link to ={`/product/${product._id}`} >
                      <p>{product.name}</p>
                    </Link>
                      <p>${product.price}</p>
                    </div>
                  </div>
                ))
              }
            </div>
    </div> )
}

export default HomeScreen
