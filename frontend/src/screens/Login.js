import { useState} from 'react'
import { useNavigate  , Link } from "react-router-dom";
// import Register from './Register';
import axios from 'axios';
import { useCookies } from "react-cookie";



function Login() {
    const navigate = useNavigate();

    // const history = useNavigate()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [cookies, setCookies] = useCookies('');
    
    
    async function submit(e){
        e.preventDefault()

        try{
            await axios.post("http://localhost:5000/login",{
                email,
                password
            })
            .then(res => {
                if(res.data[0]==="exist"){
                    navigate("/" )
                    console.log("inside then")
                    
                   console.log(res.data[1])
                   const token = res.data[1].token
                   const updateCookie = JSON.stringify({ 
                    email:email,
                    token:token
                   })
                   

                setCookies("Email",updateCookie);

                }
                else if(res.data==="Invalid Credentials") {
                    alert(res.data)
                }
            }).catch(e=>{
                alert("Wrong details")
                console.log(e)
            })
        }
        catch(e){
            console.log(e)
        }
       
    }

        return(
            <div className="Login-container">
                <h1>This is login page</h1>
                <form action="POST">
                    <input type="text" placeholder="Enter Email" className="login-input" onChange={(e) => {setEmail(e.target.value)}}/>
                    <input type="password" placeholder="Enter Password" className="login-input" onChange={(e) => {setPassword(e.target.value)
                    // setCookies('Email', email, { path: '/' })
                    // setCookies('Password', password , { path: '/' })
                    }}/>
                    <button className="login-submit-button" onClick={submit}>Submit</button>
                </form>
                <button onClick={() => {navigate("/");}} className="login-home-button">Home</button>

                <br/>
                <br/>

                <p>OR</p>

                <br/><br/>
                <Link to="/register" >Register</Link>


            </div>
        )

}

export default Login