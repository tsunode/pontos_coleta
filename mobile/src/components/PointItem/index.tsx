import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  Container,
  Title,
  Address,
  Label,
  Footer,
  Button,
  SubTitle,
  TextButton,
} from './styles';

export interface PointProps {
  id: string;
  name: string;
  address: {
    id: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    latitude: string;
    longitude: string;
    complement: string;
  };
}

interface PointItemProps {
  point: PointProps;
}

const PointItem: React.FC<PointItemProps> = ({ point }) => {
  return (
    <Container>
      <Title>{point.name}</Title>

      <Address>
        <Label>
          <SubTitle>Logradouro: </SubTitle>
          {point.address.street}
        </Label>
        <Label>
          <SubTitle>Bairro: </SubTitle>
          {point.address.neighborhood}
        </Label>
        <Label>
          <SubTitle>Númuero: </SubTitle>
          {point.address.number}
        </Label>

        {point.address.complement !== null && (
          <Label>
            <SubTitle>Complemento: </SubTitle>
            {point.address.complement}
          </Label>
        )}

        <Label>
          <SubTitle>Cidade: </SubTitle>
          {point.address.city}
        </Label>
        <Label>
          <SubTitle>Estado: </SubTitle>
          {point.address.state}
        </Label>
        <Label>
          <SubTitle>CEP: </SubTitle>
          {point.address.zipcode}
        </Label>
        <Label>
          <SubTitle>Latitude: </SubTitle>
          {point.address.latitude}
        </Label>
        <Label>
          <SubTitle>Longitude: </SubTitle>
          {point.address.latitude}
        </Label>
      </Address>

      <Footer>
        <Button onPress={() => console.log('Tetse')} activeOpacity={0.4}>
          <Icon name="pen" size={20} solid color="#fff" />
          <TextButton>Alterar</TextButton>
        </Button>
        <Button
          onPress={() => console.log('Tetse')}
          activeOpacity={0.4}
          style={{
            backgroundColor: '#c53030',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 12,
            borderTopLeftRadius: 50,
            width: '40%',
          }}
        >
          <Icon name="heart" size={20} solid color="#fff" />
          <TextButton>Favoritar</TextButton>
        </Button>
      </Footer>
    </Container>
  );
};

export default PointItem;
