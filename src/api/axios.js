import axios from 'axios';
//if i got this right, axios does the talking to backend server, i think 
export default axios.create({
  baseURL: 'https://mover-frontend-qsnb.onrender.com/', 
  withCredentials: true, 
});
