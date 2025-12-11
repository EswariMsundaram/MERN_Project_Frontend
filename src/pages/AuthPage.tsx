import { useState,useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function AuthPage() {

  const [showRegister, setShowRegister] = useState(true); //useState for Show register or login form

  //States for input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const auth=useContext(AuthContext) //access auth context - authenctication
const navigate=useNavigate() //to redirect to another login/register

  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault()
    if(!auth) return;
    try {
      
      setLoading(true);
      setError("");
  
        await auth.logIn(email, password); //calls login function from AuthProvider

      navigate("/projects") //redirects user to project page
      
    } catch (error: any) {
      setError(error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e:React.FormEvent) => {
    e.preventDefault()
    if(!auth) return;
    try {
      
      setLoading(true);
      setError("");
      console.log(username, email,password)
      await auth.register(username, email, password) //calls register function from Authprovider
      
      navigate("/projects") //redirects after successful register
    } catch (error: any) {
      console.log(error)
      setError(error.message ||"Register Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mt-10 text-center">
        Start managing your projects.
      </h1>

      {/* ERROR  */}
      {error && <div className="text-red-500 mt-2">{error}</div>}

      {/* FORM  */}
    
        <form
        onSubmit={showRegister ? handleRegister : handleLogin}
        className="border mt-10 p-4 flex flex-col gap-2 rounded w-80 bg-zinc-800"
      >
        {showRegister && (
          <input
            className="p-2 text-white"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
          
            <input
               placeholder="Email"
              className="p-2 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
  

          
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 text-white"
            />
       

          <button className="bg-blue-600 py-2 mt-2 rounded" type="submit">
          {showRegister ? "Register" : "Login"}
        </button>
        {loading && <div className="animate-pulse mt-2">Loading...</div>}
      </form>

      <div className="mt-4">
        {showRegister ? (
          <span>
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => setShowRegister(false)}>Sign in</span>
          </span>
        ) : (
          <span>
            Don't have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => setShowRegister(true)}>Sign up</span>
          </span>
        )}
      </div>
    </div>
  );
}
export default AuthPage