import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #829fd9;
  margin: 10px 0;
  border-radius: 15px;
  border-width: 3px;
  border-color: #230a59;
`;

export const Address = styled.View`
  padding: 10px 5px;
`;

export const Title = styled.Text`
  width: 100%;
  background-color: #230a59;

  color: #fff;
  text-align: center;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';

  padding: 10px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  margin: 0;
`;

export const Label = styled.Text`
  background-color: #9faed8;

  padding: 5px;
  margin-bottom: 5px;
  color: #005;
  border-radius: 5px;
`;

export const SubTitle = styled.Text`
  color: #000;
`;

export const Footer = styled.View`
  flex-direction: row;
  background-color: #757aa8;
  justify-content: space-between;

  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const Button = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  width: 50%;
  height: 100%;
  align-items: center;
  padding: 10px 0;
`;

export const TextButton = styled.Text`
  margin-left: 10px;
  color: #fff;
`;
