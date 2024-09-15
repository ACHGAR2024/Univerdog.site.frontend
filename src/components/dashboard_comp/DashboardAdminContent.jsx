import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import SidebarAdmin from "./SidebarAdmin";
import Header from "./pageadmin/Header";
import Signalement from "./pageadmin/Signalement";
import ListePlacesAdmin from "./pageadmin/ListePlacesAdmin";
import ListeCategories from "./pageadmin/ListeCategories";
import ListeCategoriesProducts from "./pageadmin/ListeCategoriesProducts";
import ListeReservationsAdmin from "./pageadmin/ListeReservationsAdmin";
import ListEvents from "./pageadmin/ListEvents";
import AdminDashboard from "./pageadmin/AdminDashboard";
import UtilisateursAdmin from "../auth/UtilisateursAdmin";
import ProductList from "./pageadmin/ProductList";

const DashboardAdminContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [currentSection, setCurrentSection] = useState("AdminDashboard");

  const { token } = useContext(AuthContext);
  const user = useContext(UserContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {}, [token, user?.id]);

  useEffect(() => {}, [token]);

  const renderContent = () => {
    switch (currentSection) {
      case "AdminDashboard":
        return <AdminDashboard />;
      case "ListeCategories":
        return <ListeCategories />;
      case "Signalement":
        return <Signalement />;
      case "ListePlacesAdmin":
        return <ListePlacesAdmin />;
      case "UtilisateursAdmin":
        return <UtilisateursAdmin />;

      case "ListeReservationsAdmin":
        return <ListeReservationsAdmin />;
      case "ListEvents":
        return <ListEvents />;
        case "ListeCategoriesProducts":
          return <ListeCategoriesProducts />;
      case "ProductList":
        return <ProductList />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <React.Fragment>
        {/* Sidebar */}
        <SidebarAdmin
          isSidebarOpen={isSidebarOpen} // Pass correct prop name
          toggleSidebar={toggleSidebar} // Optionally add if used
          setCurrentSection={setCurrentSection}
          currentSection={currentSection}
        />

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col overflow-hidden h-auto ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          {/* Header */}
          <Header toggleSidebar={toggleSidebar} />

          {/* Main Dashboard Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-black p-4 pl-10">
            {/* Section Rendering */}
            <section>{renderContent()}</section>
          </main>
        </div>
      </React.Fragment>
    </div>
  );
};

export default DashboardAdminContent;
