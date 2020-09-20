import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Point, usePoint } from '../../hooks/points';

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

interface PointItemProps {
  point: Point;
  isFavorite: boolean;
}

const PointItem: React.FC<PointItemProps> = ({ point, isFavorite }) => {
  const navigation = useNavigation();
  const { addPointToFavorite, removePointToFavorite } = usePoint();

  const handleEditPoint = useCallback(() => {
    navigation.navigate('Atualizar', {
      point_id: point.id,
    });
  }, [navigation, point]);

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      console.log('aqui');
      removePointToFavorite(point);
    } else {
      addPointToFavorite(point);
    }
  }, [addPointToFavorite, removePointToFavorite, isFavorite, point]);

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
        <Button onPress={handleEditPoint} activeOpacity={0.4}>
          <Icon name="pen" size={20} solid color="#fff" />
          <TextButton>Alterar</TextButton>
        </Button>
        <Button
          onPress={handleToggleFavorite}
          activeOpacity={0.4}
          style={{
            backgroundColor: '#c53030',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 12,
            borderTopLeftRadius: 50,
            width: '40%',
          }}
        >
          <Icon name="heart" size={20} solid={isFavorite} color="#fff" />
          <TextButton>{isFavorite ? 'Desfavoritar' : 'Favoritar'}</TextButton>
        </Button>
      </Footer>
    </Container>
  );
};

export default PointItem;
