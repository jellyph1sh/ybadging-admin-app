import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Portfolio />} />
        <Route path="*" element={<Portfolio />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
