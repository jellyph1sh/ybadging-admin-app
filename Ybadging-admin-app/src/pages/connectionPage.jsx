import React, { useState } from "react";
import {Link} from "react-router-dom";

const Connection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    
    console.log(email)
    console.log(password)
  };

  return (
    <body >
      <form>
        <label>
          E-mail
          <input type="text" name="email" 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required/>
        </label>
        <label>
          Password
          <input type="text" name="password" 
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required/>
        </label>
        <button onClick={handlesubmit}>Create</button>
      </form>
      <button><Link to="/Admin" >Go to admin</Link></button>
      <button><Link to="/Professor" >Go to professor</Link></button>
    </body>
  );
};

export default Connection;
