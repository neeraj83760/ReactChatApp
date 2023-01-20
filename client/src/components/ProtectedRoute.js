import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {GetCurrentUser} from '../apicalls/users'
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { HideLoader, ShowLoader } from '../redux/loaderSlice'
import { SetUser } from '../redux/userSlice'

// Just commit check kar raha hu

function ProtectedRoute({children}){
 
  // const [user, setUser] = React.useState(null);

  const {user} = useSelector(state => state.userReducer);

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  
  const getCurrentUser = async() =>{
  
  try {
   dispatch(ShowLoader()); 
   const response = await GetCurrentUser();
   dispatch(HideLoader());
   if(response.success){
    dispatch(SetUser(response.data))
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
    <div className='h-screen w-screen bg-gray-100 p-2'>
    {/* <h1>{user?.name}</h1>
    <h1>{user?.email}</h1>   */}

    {/* Header */}
    <div className='flex justify-between p-5'>
    <div className='flex items-center gap-1'>
      <i className ="ri-message-3-line text-2xl"></i>
      <h1 className='text-primary text-2xl uppercase font-bold'>Chatty</h1>
    </div>
    <div className='flex gap-1 text-md'>
      <i class="ri-shield-user-line"></i>
      <h1 className='underline'>{user?.name}</h1>
    </div>
    </div>

    {/* Content - it's nothing but multiple web pages */}
    <div className='p-5'>
    {children}
    </div>
    
    </div>
  )
}

export default ProtectedRoute;
