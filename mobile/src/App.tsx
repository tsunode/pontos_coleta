import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';
import AppContainer from './hooks';
// import { Container } from './styles';

const src: React.FC = () => {
  return (
    <AppContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Routes />
    </AppContainer>
  );
};

export default src;
