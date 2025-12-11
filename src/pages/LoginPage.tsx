// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// // Login screen where user enters username + password
// export default function LoginPage() {
//   // Local form state
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   // Get login function from AuthContext
//   const auth = useContext(AuthContext);

//   // When user clicks Login button
//   const handleLogin = () => {
//     if (auth) {
//       auth.logIn(username, password);
//     }
//   };

//   return (
//     <div className="p-6 text-white">
//       <h1 className="text-2xl font-bold">Login</h1>

//       {/* Username input */}
//       <input
//         className="block mt-4 p-2 text-black"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       {/* Password input */}
//       <input
//         className="block mt-4 p-2 text-black"
//         placeholder="Password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       {/* Submit button */}
//       <button
//         onClick={handleLogin}
//         className="bg-blue-600 px-4 py-2 mt-4 rounded"
//       >
//         Log In
//       </button>
//     </div>
//   );
// }