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
    try {
      setError("");
      setLoading(true);
      if (!auth) return;
        await auth.logIn(email, password); //calls login function from AuthProvider

      navigate("/projects") //redirects user to project page
      
    } catch (error: any) {
      console.error(error.message);
      setError(error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
      setError("");
      setLoading(true);
      if(!auth) return;
      await auth.register(username, email, password) //calls register function from Authprovider
      
      navigate("/projects") //redirects after successful register
    } catch (error: any) {
      console.error(error.message);
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
      {error && <div>{error}</div>}

      {/* FORM  */}
      {showRegister ? (
        <form
          onSubmit={handleRegister}
          className="border mt-10 p-2 h-60 w-150 flex flex-col justify-around items-center rounded"
        >
          <div className="text-xl font-bold">Register</div>

          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              id=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ml-2 border rounded"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              id=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-10 border rounded"
              required
            />
          </label>

          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-3 border rounded"
            />
          </label>

          <input
            type="submit"
            value="Register"
            className="border py-2 px-4 rounded"
          />

          {/* LOADING  */}
          {loading && <div className="animate-pulse">...</div>}
        </form>
      ) : (
        //Login Form
        <form
          onSubmit={handleLogin}
          className="border mt-10 p-2 h-60 w-150 flex flex-col justify-around items-center rounded"
        >
          <div className="text-xl font-bold">Login</div>
          {/*Email */}
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              id=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-10 border rounded"
            />
          </label>

           {/*Password */}
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-3 border rounded"
            />
          </label>

          <input
            type="submit"
            value="Login"
            className="border py-2 px-4 rounded"
          />

          {/* LOADING  */}
          {loading && <div className="animate-pulse">...</div>}
        </form>
      )}

      {/* TOGGLE FORM between Login/Register  */}
      {showRegister ? (
        <div>
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:cursor-pointer"
            onClick={() => setShowRegister(false)}
          >
            Sign in
          </span>{" "}
        </div>
      ) : (
        <div>
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:cursor-pointer"
            onClick={() => setShowRegister(true)}
          >
            Sign up
          </span>{" "}
        </div>
      )}
    </div>
  );
}

export default AuthPage;