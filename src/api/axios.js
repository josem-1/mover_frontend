import axios from 'axios';
//if i got this right, axios does the talking to backend server, i think 
export default axios.create({
  baseURL: '/api', 
  withCredentials: true, 
});
