import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react"

function ProductScreen() {

    const navigate = useNavigate();
    const params= useParams()
    const [products, setProducts] = useState([])
    const pid = params.pid
    console.log(pid)

    useEffect (() => {
        const fetchData = async() => {
            try {
                const result = await axios.get(`http://localhost:5000/api/products/${pid}`)
                setProducts(result.data)
                console.log(typeof(result.data))
                
            }
            catch(e) {
                console.log(e)
            }
          
        }
        fetchData()
      }, [])


    return (
        <div>
            <button onClick={() => navigate("/") } className="login-home-button">Home</button>
            
            <div className='pdp-outer-container'>
                <img className='pdp-image' src = {products.image} alt = " " />
                <div className='pdp-details' >
                    <p className='product-name'>{products.name}</p>
                    <p className='pdp-product-info'><strong>$ {products.price}</strong></p>
                    <p className='pdp-product-info'>{products.description}</p>
                </div>
            </div>
            
        </div>
    )
}


export default ProductScreen