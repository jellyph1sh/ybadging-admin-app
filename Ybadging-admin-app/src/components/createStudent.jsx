import React, { useState } from "react";

const CreateStudent = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [RFID, setRFID] = useState("");
    const [errorForm, setErrorForm] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault();
        if (firstname=="" || lastname=="" || email=="" || RFID==""){
            setErrorForm(true);
        } else {
            
        }
      };

    return (
        <body >
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
                <button onClick={handlesubmit}>create</button>
                
                </div>
            </form>
        </main>
        </body>
    );
};

export default CreateStudent;