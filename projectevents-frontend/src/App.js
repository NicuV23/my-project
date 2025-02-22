import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<AuthLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
