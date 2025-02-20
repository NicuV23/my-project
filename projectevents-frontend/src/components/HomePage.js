import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container mt-5">
      <h1>Welcome to Event Manager!</h1>
      <p>This is the home page where you can see all available events.</p>
      <div className="my-4">
        <Link to="/create" className="btn btn-primary">
          Create Event
        </Link>
        <Link to="/events" className="btn btn-secondary ms-2">
          View Events
        </Link>
        <Link to="/login" className="btn btn-success ms-2">
          Login
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
