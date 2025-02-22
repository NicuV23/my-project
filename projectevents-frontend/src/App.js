import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import EventHub from "./components/eventhub/EventHub";
import { AuthLayout } from "./layouts/AuthLayout";

const PrivateRoute = ({ element }) => {
  return localStorage.getItem("jwt") ? element : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthLayout />} />
        <Route path="/home" element={<PrivateRoute element={<EventHub />} />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
