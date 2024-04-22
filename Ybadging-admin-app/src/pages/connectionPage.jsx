import React from "react";
import {Link} from "react-router-dom";

const Connection = () => {

  return (
    <body >
      <form>
        <label>
          E-mail
          <input type="text" name="email" required/>
        </label>
        <label>
          Password
          <input type="text" name="password" required/>
        </label>
        <input type="submit" value="Send" />
        <button><Link to="/Admin" >Go to admin</Link></button>
        <button><Link to="/Professor" >Go to professor</Link></button>
      </form>
    </body>
  );
};

export default Connection;
