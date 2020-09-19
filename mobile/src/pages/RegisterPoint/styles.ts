import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  align-items: center;
  /* justify-content: center; */
  padding-top: 15px;
  padding: 15px 10px;
  /* padding: 0 30px ${Platform.OS === 'android' ? 30 : 40}px; */
`;

export const Title = styled.Text`
  color: #364159;
  font-size: 24px;

  margin-bottom: 15px;
`;

export const SubTitle = styled.Text`
  background: #fff;

  color: #364159;
  font-size: 18px;

  position: absolute;
  top: -15px;
  z-index: 1001;
  /* width: 100%; */
  align-self: center;
`;

export const FieldSet = styled.View`
  border-width: 2px;
  border-radius: 5px;
  border-color: #364159;
  position: relative;

  margin-top: 15px;
  padding: 20px 10px;
  /* padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px; */
`;
