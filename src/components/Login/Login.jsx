import React, { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("me@gmail.com");
  const [password, setPassword] = useState("1234");
  const {  isAuthenticated,login } = useAuth();
 const navigate= useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) return login(email, password);
  };
  useEffect(()=>{
    if(isAuthenticated) navigate('/',{replace:true})
  },[isAuthenticated])
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
