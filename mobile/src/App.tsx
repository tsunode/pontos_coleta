import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RegisterPoint from './pages/RegisterPoint';

// import { Container } from './styles';

const src: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <RegisterPoint />
    </NavigationContainer>
  );
};

export default src;
