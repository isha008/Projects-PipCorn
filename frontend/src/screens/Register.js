import { useNavigate } from "react-router-dom";
import { useState  } from "react"
import axios from "axios";



function Register() {

    const navigate = useNavigate();

    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    
  

    async function submit(e){
        e.preventDefault()

        try{
            await axios.post("http://localhost:5000/register",{
            name,    
            email,
            username,
            password
            })
            .then(res => {
                if(res.data==="exist"){
                    alert("User already exist")
                    

                }
                else if(res.data==="Not exist") {
                    navigate("/" )
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
            <h1>New user registration page</h1>
            <form action="POST">

                <input type="text" placeholder="Enter Name.."  className="login-input"  onChange={(e) => {setName(e.target.value)}}/>
                <input type="email" placeholder="Enter Email.."  className="login-input" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="text" placeholder="Enter Username.."  className="login-input" onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="password" placeholder="Enter Password.."  className="login-input" onChange={(e) => {setPassword(e.target.value)}}/>
                <button className="login-submit-button" onClick={submit}>Submit</button>

            </form>
            <button onClick={() => navigate("/")} className="login-home-button">Home</button>
        </div>
        
    )
}


export default Register