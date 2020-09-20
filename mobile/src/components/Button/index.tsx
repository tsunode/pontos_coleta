import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  isInputGroup?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, isInputGroup, ...rest }) => {
  return (
    <Container isInputGroup={isInputGroup} {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
