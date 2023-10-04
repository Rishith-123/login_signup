import { Link,useNavigate} from 'react-router-dom'
import styles from './styles.module.css'
import { useState } from 'react'
import axios from 'axios'

const Signup=()=>{
    const [data,setData]=useState({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    })

    const navigate=useNavigate();
    // const [error, setError] = useState("");

    const [message,setmessage] =useState({msg:""})

    const handleChange=({ currentTarget: input})=>{
        setData({...data,[input.name]:input.value})
    }

    const handlesubmit=async(e)=>{
        e.preventDefault()
        try {
            const url="http://localhost:5000/users/up"
            const {data:res}=await axios.post(url,data)
            console.log(res);

            setmessage({msg:res.mssg})

            if(res.mssg==="User created Succesfully"){
                setTimeout(function(){
                    navigate('/login')
                    }, 1000);
            }

            else {
                setTimeout(function(){
                window.location.reload();
                }, 1000);
            }

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500){
				// setError(error.response.data.message);
                console.log(error)
			}
        }
    }

     
    return(
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                        <Link to='/login'>
                            <button type='button' className={styles.white_btn}>
                                SignIn
                            </button>
                        </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handlesubmit}>
                         <h1>Create Account</h1> 
                         <input type="text" placeholder='FirstName' onChange={handleChange}
                                name='firstname' value={data.firstname}
                                required className={styles.input}/>

                        <input type="text" placeholder='LastName' onChange={handleChange}
                                name='lastname' value={data.lastname}
                                required className={styles.input}/>

                        <input type="email" placeholder='Email' onChange={handleChange}
                                name='email' value={data.email}
                                required className={styles.input}/>

                                <input type="password" placeholder='password' onChange={handleChange}
                                name='password' value={data.password}
                                required className={styles.input}/>

                        {message.msg && (<p className={styles.error_msg}>{message.msg}</p>)}

                        <button type='submit' className={styles.green_btn}>SignUp</button>
                    </form>  
                </div>
            </div>
        </div>
    )
}

export default Signup