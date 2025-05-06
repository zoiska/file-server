import React, { useState } from "react";
import './Login.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleClicked() {
    try {
      const res = await fetch("/login", {
        method: "POST",
        credentials: "include", // something something cookies
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      console.log("Login response:", data);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div className="frag">
      <input
        className="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClicked}>Login</button>
    </div>
  );
}

export default Login;
