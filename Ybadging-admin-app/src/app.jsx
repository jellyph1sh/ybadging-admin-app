// import React from 'react';
// import ReactDOM from 'react-dom';

// ReactDOM.render(<h2>Hello from React in Electron!</h2>, document.body);

import React from "react";
import ReactDOM from "react-dom/client";
import Ways from "./ways.jsx";

// ReactDOM.render(<React.StrictMode><Ways /></React.StrictMode>, document.body);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Ways />
  </React.StrictMode>
);