// ** React and React Router DOM Imports **
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";



import { GoogleOAuthProvider } from "@react-oauth/google";

// ** CSS Imports **
import "./index.css";


// Authentication Components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import SignIn from "./pages/auth/SignIn";
import PrivateRoute from "./components/auth/PrivateRoute";
import UserProfileUpdate from "./components/auth/UserProfileUpdate";
import ProProfileUpdate from "./components/auth/ProProfileUpdate";
import ProfilGoogle from "./components/ProfilGoogle";

// Place Management Components
import EditPlace from "./components/EditPlace";
import DeletePlace from "./components/DeletePlace";
import EditCategorie from "./components/EditCategorie";
import DeleteCategorie from "./components/DeleteCategorie";
import PhotoManager from "./components/PhotoManager";
import ReservationForm from "./components/ReservationForm";
import EventForm from "./components/EventForm";
import EditEvent from "./components/EditEvent";

// Pages Components

import RechercherPlace from "./pages/RechercherPlace";
import DeposerPlace from "./pages/DeposerPlace";
import DeposerCategorie from "./pages/DeposerCategorie";
import DeposerSpecialty from "./pages/DeposerSpecialty";
import DeposerProfessional from "./pages/DeposerProfessional";
import MessagesManagement from "./pages/MessagesManagement";

import Aide from "./pages/Aide";
import Aide_pro from "./pages/Aide_pro";

import LieuPlacesRecherche from "./pages/LieuPlacesRecherche";
import PlacesReservations from "./pages/PlacesReservations";
import Evenements from "./pages/Evenements";
import AddPhotosPlace from "./pages/AddPhotosPlace";

import Dashboard from "./pages/Dashboard";
import Dash from "./pages/Dash";
import DashDog from "./pages/DashDog";

import Inscription from "./pages/Inscription";
import Forgotpw from "./pages/Forgotpw";
import Resetpw from "./pages/Resetpw";
import RegisterForm from "./pages/RegisterForm";
import GoogleCallback from "./pages/GoogleCallback";

//  Admin Components
import ListeReservationsAdmin from "./components/dashboard_comp/pageadmin/ListeReservationsAdmin";
import ListEvents from "./components/dashboard_comp/pageadmin/ListEvents";


//  Context Imports 
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { DarkModeProvider } from "./context/DarkModeContext";

//  Public pages
import HomeContent from "./pages/public/HomeContent";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import MentionsLegales from "./pages/public/MentionsLegales";
import CGPVfile from "./pages/public/CGPVfile";
import Terms from "./pages/public/Terms";
import Privacy from "./pages/public/Privacy";

import  CookiePreferences from "./pages/public/CookiePreferences";

//  User pages

import DogDetails from "./components/dashboard_comp/pagesuser/DogDetails";
import ProfilsDogs from "./components/dashboard_comp/pagesuser/ProfilsDogs";
import CartePlaces from "./components/dashboard_comp/pagesuser/CartePlaces";
import FichePlaceDogPro from "./components/dashboard_comp/pagesuser/FichePlaceDogPro";
import Carte from "./components/dashboard_comp/pagesuser/Carte";


//  Professional pages
import DeposerLieuPro from "./components/dashboard_comp/pagespro/DeposerLieuPro";
import EditProfessional from "./components/EditProfessional";

function PageWrapper({ children }) {
  return (
    <main className="w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </main>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

// ** Main Application Component **
const Home = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  {
    /*, logout*/
     
  }

  return (
    <>
      <Router>
       
        <PageWrapper>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/registerform" element={<RegisterForm />} />

            <Route path="/inscription" element={<Inscription />} />
            <Route path="/forgotpw" element={<Forgotpw />} />
            <Route path="/resetpw" element={<Resetpw />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/mentions_legales" element={<MentionsLegales />} />
            <Route path="/cgpv" element={<CGPVfile />} />

            <Route path="/cookie_preferences" element={<CookiePreferences />} />

            {/* Public Routes */}
            <Route path="/" element={<HomeContent />} />
            <Route path="/dashdog " element={<DashDog />} />
            <Route path="/google_profil" element={<ProfilGoogle />} />
            <Route path="/aide" element={<Aide />} />
            <Route path="/aide_pro" element={<Aide_pro />} />
            <Route path="/carte-places" element={<CartePlaces />} />
            <Route path="/lieux-places" element={<LieuPlacesRecherche />} />
            <Route path="/carte" element={<Carte />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/dog/:dogIdcrypted" element={<DogDetails />} />

            <Route
              path="/places-reservations"
              element={<PlacesReservations />}
            />

            {/* Protected Routes */}
            <Route path="/rechercher-place" element={<RechercherPlace />} />
            <Route path="/fiche-place/:id" element={<FichePlaceDogPro />} />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/dash" element={<Dash />} />
            <Route path="/auth/google" element={<GoogleCallback />} />

            {/* Authentication Routes */}
            {!isAuthenticated && (
              <Route path="/register" element={<Register />} />
            )}
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login onLogin={login} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route path="/Logout" element={<Navigate to="/" />} />

            {/* Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                !isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <PrivateRoute element={Dashboard} />
                )
              }
            />
            <Route
              path="/deposer_place"
              element={
                !isAuthenticated ? (
                  <Navigate to="/deposer_place" />
                ) : (
                  <PrivateRoute element={DeposerPlace} />
                )
              }
            />
            <Route
              path="/deposer_lieu_pro"
              element={
                !isAuthenticated ? (
                  <Navigate to="/deposer_lieu_pro" />
                ) : (
                  <PrivateRoute element={DeposerLieuPro} />
                )
              }
            />
            <Route
              path="/deposer_categorie"
              element={
                !isAuthenticated ? (
                  <Navigate to="/deposer_categorie" />
                ) : (
                  <PrivateRoute element={DeposerCategorie} />
                )
              }
            />
            <Route
              path="/deposer_professional"
              element={
                !isAuthenticated ? (
                  <Navigate to="/deposer_professional" />
                ) : (
                  <PrivateRoute element={DeposerProfessional} />
                )
              }
            />
            

            <Route
              path="/deposer_specialite"
              element={
                !isAuthenticated ? (
                  <Navigate to="/deposer_specialite" />
                ) : (
                  <PrivateRoute element={DeposerSpecialty} />
                )
              }
            />
            <Route
              path="/messages-management"
              element={
                !isAuthenticated ? (
                  <Navigate to="/messages-management" />
                ) : (
                  <PrivateRoute element={MessagesManagement} />
                )
              }
            />
            <Route
              path="/profil-user-update"
              element={
                !isAuthenticated ? (
                  <Navigate to="/profil-user-update" />
                ) : (
                  <PrivateRoute element={UserProfileUpdate} />
                )
              }
            />
            <Route
              path="/profil-pro-update"
              element={
                !isAuthenticated ? (
                  <Navigate to="/profil-pro-update" />
                ) : (
                  <PrivateRoute element={ProProfileUpdate} />
                )
              }
            />

            {/* Place Management Routes */}
            {isAuthenticated && (
              <Route path="/edit-place/:id" element={<EditPlace />} />
            )}
            {isAuthenticated && (
              <Route path="/edit-professional/:id" element={<EditProfessional />} />
            )}
            {isAuthenticated && (
              <Route path="/delete-place/:id" element={<DeletePlace />} />
            )}
            {isAuthenticated && (
              <Route path="/edit-categorie/:id" element={<EditCategorie />} />
            )}
            {isAuthenticated && (
              <Route
                path="/delete-categorie/:id"
                element={<DeleteCategorie />}
              />
            )}
            {isAuthenticated && (
              <Route
                path="/ajout-photos-place/:id"
                element={<AddPhotosPlace />}
              />
            )}
            {isAuthenticated && (
              <Route path="/places/:id/photos" element={<PhotoManager />} />
            )}
<Route path="/places/:id/photos" element={<PhotoManager />} />
            {isAuthenticated && (
              <Route
                path="/reservations"
                element={<ListeReservationsAdmin />}
              />
            )}
            {isAuthenticated && (
              <Route
                path="/reservations-new"
                element={<ReservationForm isEditing={false} />}
              />
            )}
            {isAuthenticated && (
              <Route
                path="/edit-reservation/:id"
                element={<ReservationForm isEditing={true} />}
              />
            )}

            {isAuthenticated && (
              <Route path="/events" element={<ListEvents />} />
            )}
            {isAuthenticated && (
              <Route path="/event-new" element={<EventForm />} />
            )}
            {isAuthenticated && (
              <Route path="/edit-event/:id" element={<EditEvent />} />
            )}
            {isAuthenticated && (
              <Route path="/dogs" element={<ProfilsDogs />} />
            )}
          </Routes>
        </PageWrapper>
        
      </Router>
    </>
  );
};
// ** Main App Component **
const App = () => (
  <GoogleOAuthProvider clientId="720527565787-806qrtlaf0pq23u566dcc9benjmulkdt.apps.googleusercontent.com">
    <AuthProvider>
      <UserProvider>
        <DarkModeProvider>
          <Home />
        </DarkModeProvider>
      </UserProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);

export default App;
