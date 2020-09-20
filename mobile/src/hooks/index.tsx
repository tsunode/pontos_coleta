import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PointsProvider } from './points';

const AppProvider: React.FC = ({ children }) => {
  return (
    <PointsProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </PointsProvider>
  );
};

export default AppProvider;
