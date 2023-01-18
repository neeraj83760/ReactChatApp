import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {GetCurrentUser} from '../apicalls/users'
import toast from "react-hot-toast"
import { useDispatch } from 'react-redux'
import { HideLoader, ShowLoader } from '../redux/loaderSlice'

// Just commit check kar raha hu

function ProtectedRoute({children}){
 
  // const [user, setUser] = React.useState(null);

  const {user} = userSelect

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  
  const getCurrentUser = async() =>{
  
  try {
   dispatch(ShowLoader()); 
   const response = await GetCurrentUser();
   dispatch(HideLoader());
   if(response.success){
    setUser(response.data)
    // return true;

   }else{
    toast.error(response.message);
    navigate('/login') 
    // return false; 
 
   } 
   } catch (error) {
     dispatch(HideLoader());
     toast.error(error.message);
     navigate('/login') 
   }

  };
  useEffect(()=>{
  if(localStorage.getItem('token')){

    getCurrentUser();

  }else{

    navigate('/login')
  }

  },[]); 

  return (
    <div>
    <h1>{user?.name}</h1>
    <h1>{user?.email}</h1>  
    {children}
    </div>
  )
}

export default ProtectedRoute;
