import axios from 'axios';
//if i got this right, axios does the talking to backend server, i think 
export default axios.create({
  baseURL: '/api', //change up variable within quotes for prior to /api to connect to backend hosting
  withCredentials: true, 
});
