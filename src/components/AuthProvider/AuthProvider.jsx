import { useContext, useReducer } from "react";
import { createContext } from "react";
function authReducer(state,action){
    switch(action.type){
        case 'login':{
            return {user:action.payload,isAuthenticated:true}
        }
        case 'logOut':{
            return {user:null,isAuthenticated:false}
        }
        default: throw new Error ('unknown action')
    }
}
const initialState = {
  user: null,
  isAuthenticated: false,
};
const AuthContext = createContext();
const Fake_user={
    name:'mahnoosh',
    email:'me@gmail.com',
    password:'1234'
}
export default function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
      authReducer,
      initialState
    );
    function login(email,password) {
    if(email==Fake_user.email && password==Fake_user.password){
        dispatch({type:'login',payload:Fake_user})
    }
  }
  function logOut(){
    dispatch({type:'logOut'})
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login,logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth(){
    return useContext(AuthContext)
}