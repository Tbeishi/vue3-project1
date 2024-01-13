import quest from "../utils/http";

export const Register = ({username,email,password}) =>{
     return quest.post('/api/register',{username,email,password})
 }