import axios from 'axios';

// Sometimes after the login we have to send authrization token everytime in our headers
// so instead of sending authrization token in every API call we have it in the global
// object which is nothing but the axios instance .... we basically we will store the 
// token in the local storage 

export const axiosInstance = axios.create({

    headers: {

        authorization: `Bearer ${localStorage.getItem('token')}`
    }
})