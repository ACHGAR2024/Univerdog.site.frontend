// Dashboard.jsx
import React from "react";
import UserProfile from "../components/dashboard_comp/UserProfile";

const Dashboard = () => {
  return (
    <React.Fragment>
      <main className="min-h-screen mb-16">
        <UserProfile />
      </main>
    </React.Fragment>
  );
};

export default Dashboard;
