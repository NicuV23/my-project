import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import EventHub from "./components/eventhub/EventHub";
import MyEvents from "./components/eventhub/MyEvents";
import MyEventDetails from "./components/eventhub/MyEventDetails";
import { EventDetails } from "./components/eventhub/EventsDetailList";
import { AuthLayout } from "./layouts/AuthLayout";
import MyEventEdit from "./components/eventhub/MyEventEdit";

const PrivateRoute = ({ element }) => {
  return localStorage.getItem("jwt") ? element : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthLayout />} />
        <Route path="/home" element={<PrivateRoute element={<EventHub />} />} />
        <Route
          path="/my-events"
          element={<PrivateRoute element={<MyEvents />} />}
        />
        <Route
          path="/my-events/:id"
          element={<PrivateRoute element={<MyEventDetails />} />}
        />
        <Route
          path="/my-events/edit/:id"
          element={<PrivateRoute element={<MyEventEdit />} />}
        />
        <Route
          path="/events/:id"
          element={<PrivateRoute element={<EventDetails />} />}
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
