import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "../assets/connection.css";

const Connection = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([""]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [permission, setPermission] = useState(-1);

  const handlesubmit = (e) => {
    e.preventDefault();
    login(email,password);
  };

  const login = async (email,password) => {
    await axios
    .post(
        "http://localhost:3001/api/user/login",{email: email, password: password})
    .then((response) => {
        if (!response.data.status) {
          console.log("test")
            setError(true)
            console.log(response.data.error);
            return;
        }

        const now = new Date();
        // Définir la date d'expiration à 60 minutes à partir de maintenant
        now.setTime(now.getTime() + 60 * 60 * 1000);

        setCookie("idUser", response.data.user.id, { path: "/",expires: now })
        setCookie("permission", parseInt(response.data.user.permission), { path: "/",expires: now })
        setCookie("firstname", response.data.user.firstname, { path: "/",expires: now })
        setCookie("lastname", response.data.user.lastname, { path: "/",expires: now })
        if (parseInt(response.data.user.permission)==0){
          navigate("/Admin");
        } else if (parseInt(response.data.user.permission)==1) {
          navigate("/Professor");
        }
    })
    .catch(function (error) {
        setError(true);
        console.log(error);
        return;
    });
};

  return (
    <body >
      <form className="form">
          <label>
            E-mail
            <input type="mail" name="email" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required/>
          </label>
          <label>
            Password
            <input type="password" name="password" 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required/>
          </label>
          {error==true ? 
              <div>User or Password incorrect</div>
              : 
              <></>
          }
        <button onClick={handlesubmit}>Create</button>
      </form>
      <button><Link to="/Admin" >Go to admin</Link></button>
      <button><Link to="/Professor" >Go to professor</Link></button>
    </body>
  );
};

export default Connection;
