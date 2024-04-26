import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const CreateStudent = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [RFID, setRFID] = useState("");
    const [idPromo, setIdPromo] = useState("");
    const [errorForm, setErrorForm] = useState("");
    const [validForm, setValidForm] = useState("");

    const [promos, setPromos] = useState([]);

    useEffect(() => {
        getPromo();
      }, []);

    const getPromo = async () => {
        await axios
          .get(
            "http://localhost:3001/api/promos/",{})
          .then((response) => {
            if (!response.data.status) {
              console.log(response.data.error);
              return;
            }
            setPromos(response.data.promos)
          })
          .catch(function (error) {
            console.log(error);
            return;
          });
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        if (firstname=="" || lastname=="" || email=="" || RFID=="" || idPromo==""){
            setErrorForm(true);
            setValidForm(false)
        } else {
            createStudent(firstname,lastname,email,RFID,idPromo)
            setFirstname("");
            setLastname("");
            setEmail("");
            setRFID("");
            setIdPromo("");
            e.firstname = "";
            e.lastname = "";
            e.email = "";
            e.idPromo = "";
            e.RFID = "";
        }
    };

    const createStudent = async (firstname,lastname,email,RFID,idPromo) => {
        await axios
        .post(
            "http://localhost:3001/api/students/add",{firstname: firstname, lastname: lastname, email: email, RFID:RFID, idPromo:idPromo})
        .then((response) => {
            if (!response.data.status) {
                console.log(response.data.error);
                setErrorForm(true)
                setValidForm(false)
                return;
            }
            setErrorForm(false)
            setValidForm(true)
        })
        .catch(function (error) {
            setErrorForm(true)
            setValidForm(false)
            console.log(error);
            return;
        });
    };

    return (
        <body >
            <Link to="/Admin">Home</Link>
        <div>
            <h1>CREATE A STUDENT</h1>
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
                    Promo 
                    <select name="idPromo" 
                    value={idPromo}
                    onChange={(e) => {
                        setIdPromo(e.target.value);
                    }}
                    required>
                        <option value="">Choose a promo</option>
                        {promos.map((promo) => (
                            <option key={promo.id} value={promo.id}>
                                {promo.name} {promo.grade}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    RFID
                    <input type="text" name="RFID" 
                    value={RFID}
                    onChange={(e) => {
                      setRFID(e.target.value);
                    }}
                    required/>
                </label>
                {errorForm==true ? 
                    <div>one field is empty</div>
                    : 
                    <></>
                }
                {validForm==true ? 
                    <div>The student is created</div>
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

export default CreateStudent;