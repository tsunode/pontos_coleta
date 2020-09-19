import styled, { css } from 'styled-components/native';
import { TextInput as TextInputReact } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #829fd9;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #829fd9;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #230a59;
    `}
`;

export const TextInput = styled(TextInputReact)`
  flex: 1px;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
