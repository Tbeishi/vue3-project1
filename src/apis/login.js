import quest from "../utils/http";


export function Login({username, password}) {
    return quest.post('/api/login',{username,password})
}