import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Chart } from "chart.js";

const DashboardCard = ({ title, value, icon, change }) => (
  <div className="dashboard-card">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-full ${icon.bg}`}>
        <svg
          className={`w-7 h-7 ${icon.color}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={icon.path}
          />
        </svg>
      </div>
      <span className={`text-sm font-medium ${change.color}`}>
        {change.text}
      </span>
    </div>
    <h3 className="text-2xl font-bold mb-1">{value}</h3>
    <p className="text-gray-600 text-sm">{title}</p>
  </div>
);

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.shape({
    bg: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  change: PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

const MyChart = ({ id, type, data, options }) => {
  useEffect(() => {
    const ctx = document.getElementById(id).getContext("2d");
    new Chart(ctx, { type, data, options });
  }, [id, type, data, options]);

  return <canvas id={id}></canvas>;
};

MyChart.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

const Sidebar = ({ isOpen }) => (
  <aside
    className={`sidebar ${isOpen ? "" : "sidebar-hidden"} md:translate-x-0`}
  >
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Material Dashboard 2</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center text-white bg-blue-600 px-4 py-2 rounded-lg"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </a>
          </li>
          {["Tables", "Billing", "RTL", "Notifications", "Profile"].map(
            (item) => (
              <li key={item} className="mb-4">
                <a
                  href="#"
                  className="flex items-center text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-200"
                >
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
    <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white w-full py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition duration-300 mt-6">
      UPGRADE TO PRO
    </button>
  </aside>
);

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

const DashDog = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-6 md:ml-64">
        <header className="flex justify-between items-center mb-8">
          <button className="md:hidden" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search here"
              className="border border-gray-300 p-2 rounded-lg mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="text-gray-600 hover:text-gray-800 transition duration-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Bookings"
            value="281"
            icon={{
              bg: "bg-gray-800",
              color: "text-white",
              path: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
            }}
            change={{
              text: "+55% than last week",
              color: "text-green-500",
            }}
          />
          <DashboardCard
            title="Today's Users"
            value="2,300"
            icon={{
              bg: "bg-blue-500",
              color: "text-white",
              path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            }}
            change={{
              text: "+3% than last month",
              color: "text-green-500",
            }}
          />
          <DashboardCard
            title="Revenue"
            value="34k"
            icon={{
              bg: "bg-green-500",
              color: "text-white",
              path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            }}
            change={{
              text: "+1% than yesterday",
              color: "text-green-500",
            }}
          />
          <DashboardCard
            title="Followers"
            value="+91"
            icon={{
              bg: "bg-pink-500",
              color: "text-white",
              path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
            }}
            change={{
              text: "Just updated",
              color: "text-gray-500",
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="dashboard-card">
            <h3 className="text-xl font-bold mb-4">Website Views</h3>
            <MyChart
              id="websiteViews"
              type="bar"
              data={{
                labels: ["M", "T", "W", "T", "F", "S", "S"],
                datasets: [
                  {
                    label: "Views",
                    data: [50, 20, 10, 22, 50, 10, 40],
                    backgroundColor: "rgba(59, 130, 246, 0.5)",
                    borderColor: "rgb(59, 130, 246)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
            <p className="text-sm text-gray-600 mt-4">
              Last Campaign Performance
            </p>
          </div>
          <div className="dashboard-card">
            <h3 className="text-xl font-bold mb-4">Daily Sales</h3>
            <MyChart
              id="dailySales"
              type="line"
              data={{
                labels: [
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                datasets: [
                  {
                    label: "Sales",
                    data: [50, 100, 300, 220, 500, 250, 400, 230, 500],
                    borderColor: "rgb(34, 197, 94)",
                    tension: 0.4,
                    fill: false,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
            <p className="text-sm text-gray-600 mt-4">
              <span className="text-green-500 font-medium">+15%</span> increase
              in today sales
            </p>
          </div>
          <div className="dashboard-card">
            <h3 className="text-xl font-bold mb-4">Completed Tasks</h3>
            <MyChart
              id="completedTasks"
              type="line"
              data={{
                labels: [
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                datasets: [
                  {
                    label: "Tasks",
                    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    borderColor: "rgb(59, 130, 246)",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    tension: 0.4,
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
            <p className="text-sm text-gray-600 mt-4">
              Last Campaign Performance
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashDog;
