import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "./navbarAdmin.jsx";

const CreateProfessor = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorForm, setErrorForm] = useState("");
    const [validForm, setValidForm] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault();
        if (firstname=="" || lastname=="" || email=="" || password==""){
            setErrorForm(true);
            setValidForm(false)
        } else {
            createProfessor(firstname,lastname,email,password)
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
            e.firstname = "";
            e.lastname = "";
            e.email = "";
            e.password = "";
        }
      };

    const createProfessor = async (firstname,lastname,email,password) => {
        await axios
        .post(
            "http://localhost:3001/api/user/add",{firstname: firstname, lastname: lastname, email: email, password: password})
        .then((response) => {
            if (!response.data.status) {
                console.log(response.data.error);
                setValidForm(false)
                setErrorForm(true);
                return;
            }
            setValidForm(true)
            setErrorForm(false);
        })
        .catch(function (error) {
            console.log(error);
            setValidForm(false)
            setErrorForm(true);
            return;
        });
    };

    return (
        <body >
             <NavbarAdmin/>
        <div>
            <h1>CREATE A PROFESSOR</h1>
        </div>
        <main>
            <form>
                <div>
                <label>
                    Firstname
                    <input type="text" name="firstname" 
                    value={firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                    required/>
                </label>
                <label>
                    Lastname
                    <input type="text" name="lastname" 
                    value={lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                    required/>
                </label>
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

                {errorForm==true ? 
                    <div>one field is empty</div>
                    : 
                    <></>
                }
                {validForm==true ? 
                    <div>The professor account is created</div>
                    : 
                    <></>
                }
                <button onClick={handlesubmit}>create</button>
                
                </div>
            </form>
        </main>
        </body>
    );
};

export default CreateProfessor;