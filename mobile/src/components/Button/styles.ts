import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isInputGroup: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  height: 60px;
  background: #230a59;
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;

  ${props =>
    props.isInputGroup &&
    css`
      margin: 0;
      flex-grow: 1;
      margin-left: 5px;
    `}
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #fff;
  font-size: 18px;
`;
