import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from 'prop-types';

import Nav from "./Nav";
import Footer from "./Footer";
import HomeContent from "./HomeContent";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Inscription from "./Inscription";
import Forgotpw from "./Forgotpw";
import Resetpw from "./Resetpw";
import Terms from "./Terms";
import Privacy from "./Privacy";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <HomeContent />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/inscription"
          element={
            <PageWrapper>
              <Inscription />
            </PageWrapper>
          }
        />
        <Route
          path="/forgotpw"
          element={
            <PageWrapper>
              <Forgotpw />
            </PageWrapper>
          }
        />
        <Route
          path="/resetpw"
          element={
            <PageWrapper>
              <Resetpw />
            </PageWrapper>
          }
        />
        <Route
          path="/terms"
          element={
            <PageWrapper>
              <Terms />
            </PageWrapper>
          }
        />
        <Route
          path="/privacy"
          element={
            <PageWrapper>
              <Privacy />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="h-screen"
    >
      {children}
    </motion.div>
  );
}

function Home() {
  return (
    <>
      {/* Wrap the entire app with a router */}
      <Router>
        {/* Include the navigation bar at the top */}
        <Nav />

        {/* Render the routes with animations */}
        <AnimatedRoutes />

        {/* Include the footer at the bottom */}
        <Footer />
      </Router>
    </>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Home;
