import { Link} from 'react-router-dom'
import styles from './styles.module.css'
import { useState } from 'react'
import axios from 'axios'


const login=()=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState({ email: "", password: "" });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errorMessage, setErrorMessage] = useState({ fn: "", ln: "" ,msg:""});
    const handleChange=({ currentTarget: input})=>{
        setData({...data,[input.name]:input.value})
    }

    const handlesubmit=async(e)=>{
        e.preventDefault()
        // setErrorMessage(null);
        try {
            const url="http://localhost:5000/users/log"
            const {data:res}=await axios.post(url,data)
            localStorage.setItem("token",res.data)
            // setData(res.data);
            setErrorMessage({fn:res.firstname,ln:res.lastname,msg:res.mssg});
            console.log(res.mssg)
            if(res.mssg==="Succesfully logged") {
                setTimeout(function(){
                    window.location='/'
                }, 1000);
            }

            else{
                setTimeout(function(){
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
           
            setErrorMessage(error.message);
            console.log({mssg:"Some error"})
        }
    }

     
    return(
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handlesubmit}>
                         <h1>Login to ur Account</h1> 
                        <input type="email" placeholder='Email' onChange={handleChange}
                                name='email' value={data.email}
                                required className={styles.input}/>

                                <input type="password" placeholder='password' onChange={handleChange}
                                name='password' value={data.password}
                                required className={styles.input}/>

                        {/* {errorMessage.fn && (<p className="error"> {errorMessage.fn} </p>)} */}

                        {errorMessage.msg && (<p className={styles.error_msg}> {errorMessage.msg} </p>)}

                        {/* {errorMessage.ln && (<p className="error"> {errorMessage.ln} </p>)} */}

                        <button type='submit' className={styles.green_btn}>SignIn</button>
                    </form> 
                </div>
                <div className={styles.right}>
                    <h1>New Here?</h1>
                        <Link to='/signup'>
                            <button type='button' className={styles.white_btn}>
                                SignUp
                            </button>
                        </Link>
                    
                </div>
            </div>
        </div>
        
    )
}

export default login