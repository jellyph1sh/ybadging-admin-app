import React, { useState } from "react";

const CreateStudent = () => {

    const [name, setName] = useState(""); 
    const [errorForm, setErrorForm] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault();
        if (name==""){
            setErrorForm(true);
        } else {
            
        }
      };

    return (
        <body >
        <div>
            <h1>CREATE A CLASSROOM</h1>
        </div>
        <main>
            <form>
                <div>
                <label>
                    Name
                    <input type="text" name="name" 
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
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