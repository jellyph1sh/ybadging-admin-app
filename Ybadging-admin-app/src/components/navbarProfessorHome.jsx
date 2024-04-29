import React, { useState, useEffect } from "react";
import {Link, Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const NavbarProfessorHome = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(["idLesson"]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    useEffect(() => {
        setFirstname(cookies.firstname)
        setLastname(cookies.lastname)
    }, []);

    const handlesubmit = () => {
        document.cookie = "firstname" + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = "lastname" + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = "permission" + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = "idUser" + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate("/")
    };

    return (
        <header className="navbar">
            <div className="navbarLeft">

            </div>
            <div className="navbarRight">
                <h2>{lastname} {firstname}</h2>
                <button  className="DisconnectButton" onClick={handlesubmit}>Disconnect</button>
            </div>
        </header>
    );
};

export default NavbarProfessorHome;