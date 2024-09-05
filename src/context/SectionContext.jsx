import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const SectionContext = createContext();

const SectionProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState('userdashboard'); // Valeur initiale 'userdashboard'

  return (
    <SectionContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </SectionContext.Provider>
  );
};

SectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SectionProvider, SectionContext };