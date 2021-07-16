import React, { useState, useEffect } from "react";


import firebaseAuth from '../Components/Config/config'

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onhandleClick= async()=>{
    let response = await firebaseAuth.signInWithEmailAndPassword(username, password);
    console.log(response);
  };

  return (
    <div>
      <h1>Firebase Login</h1>
      <div>
        <div>
          UserName{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          Password{" "}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      </div>
      <button onClick= {onhandleClick}>Login</button>
    </div>
  );
};

export default Login;