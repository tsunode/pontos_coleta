import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  align-items: center;
  padding-top: 15px;
  padding: 15px 10px;
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
  align-self: center;
`;

export const FieldSet = styled.View`
  border-width: 2px;
  border-radius: 5px;
  border-color: #364159;
  position: relative;

  margin-top: 15px;
  padding: 20px 10px;
`;

export const InputGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;

  /* flex-wrap: wrap; */
`;
