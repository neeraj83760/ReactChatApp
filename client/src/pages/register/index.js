import React,{useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {RegisterUser} from '../../apicalls/users'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { HideLoader, ShowLoader } from '../../redux/loaderSlice'

function Register() {
const dispatch = useDispatch();  
const navigate = useNavigate();   
const [user, setUser] = React.useState({

    name:"",
    email:"",
    password:"",

})

const register = async () =>{

  // console.log(user)

  try {
    dispatch(ShowLoader());
    const response = await RegisterUser(user);
    dispatch(HideLoader());
    if(response.success){

      // alert(response.message);
      toast.success(response.message);

    }else{

      // alert(response.message);
      toast.error(response.message);

    }
    
  } catch (error) {
     dispatch(HideLoader());
    // alert(error.message);
    toast.error(error.message);
    
  }

}


useEffect(()=>{

  if(localStorage.getItem("token")){
  
    navigate("/");
  }
  
  }, [])

  return (
    <div className='h-screen bg-primary flex items-center justify-center'>
        <div className='bg-white shadow-md p-5 flex flex-col gap-5 w-96'>
            <h1 className='text-2xl uppercase font-semibold text-primary'>Chaty Register{" "}</h1>
            <hr />
            <input type="text" 
            value={user.name}
            onChange ={(e)=> setUser({...user, name:e.target.value})}
            placeholder="Enter Your Name"
            />
            <input type="text" 
            value={user.email}
            onChange ={(e)=> setUser({...user, email:e.target.value})}
            placeholder="Enter Your Email"
            />
             <input type="password" 
            value={user.password}
            onChange ={(e)=> setUser({...user, password:e.target.value})}
            placeholder="Enter Your Password"
            />

        <button className='contained-btn'
        onClick={register}
        >Register</button> 
        <Link to= "/login" className='underline'>
        Already have an account? Login
        </Link>   
        </div>
    </div>
  )
}

export default Register
 