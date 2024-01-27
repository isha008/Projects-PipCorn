import {useCookies } from "react-cookie";

import Cookies from 'js-cookie';

import { useNavigate } from "react-router-dom";
import { useEffect ,useState } from "react";
import axios from "axios";
// import { withCookies, Cookiesookies } from 'react-cookie';
import jwt_decode from "jwt-decode";
// import Login from "./Login";


function Account() {

   const navigate = useNavigate();
  
  const [cookies,setCookies] = useCookies('')
  const [file,setFile] = useState('')
  let [image,setImage] = useState('')
  let [email,setEmail] = useState('')

  const yet = Cookies.get('Email')

useEffect(() => {
   if(yet) {
      const parsed = JSON.parse(yet)
   //   console.log("This is from yet block",parsed)
     const token = parsed.token
     const checkEmail = parsed.email
     setEmail(checkEmail)
     const request = {
      params: {
        email:parsed.email,
        token:parsed.token
      }
    }
     
     const check = async() => {
      const result = await axios.get('http://localhost:5000/userDetail' , request)
     
   //   console.log("Now required",result.data[0].token)
     const decodedServer = jwt_decode(result.data[0].token)
   //   console.log("From decoded server" , decodedServer.email)
   //   const decodedServerEmail =  
   //   const decodedClientEmail = jwt_decode(token);
      const token = parsed.token
      const decoded = jwt_decode(token);
      // console.log("Is image result okay" , result.data[0].image)
      setImage(result.data[0].image)
   //   console.log("This is decoded token" , decoded.email)
     if(decoded.email === decodedServer.email) {
         navigate("/account")
      }
      else {
         alert("JWT token auth failed")
         navigate("/register")
      }
     }
     check()
 
   
   }
   else {
      navigate("/login")
   }

} , [])

  
//  }, []);


   const logout = () => {
      setCookies("Email", '');
      navigate("/")

   }

   const handleUpload = (e) => {
      const formdata = new FormData()
      formdata.append('file' ,file)
      // const dataForm = formdata.getAll('file')
      // console.log("formdata" , dataForm[0].name)
      // const params = {
      //    params:{
      //       formdata:formdata,
      //       email:email
      //    }
      // }
      axios.post('http://localhost:5000/upload' , formdata )
      .then(res =>setImage(res.data[0].image) )
      .catch(err => console.log(err))
   }


  
   const imageCheck = async() => {
     const parsed = JSON.parse(yet)
     const checkEmail = parsed.email
     const request = {
      params: {
        email:parsed.email,
        token:parsed.token
      }
    }
    const result = await axios.get('http://localhost:5000/getImage' , request)
    setImage(result.data)

   }

   imageCheck()


   return (
      <div>
         <input type="file" onChange={e => setFile(e.target.files[0]) }/>
         <button onClick={handleUpload}>Upload</button>
         <img  className="avatar" src = {`http://localhost:5000/Images/${image}`}  alt=" " />
         <button onClick={logout}>Logout</button>
         <button onClick={() => navigate("/") } className="login-home-button">Home</button>
      </div>
   )
}

export default Account