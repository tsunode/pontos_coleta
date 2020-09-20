import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import Message from '../../components/Message';

import PointItem from '../../components/PointItem';
import { usePoint } from '../../hooks/points';

import { Container, Title } from './styles';

const ListPoint: React.FC = () => {
  const { pointsFavorite } = usePoint();

  const renderItem = useCallback(
    item => (
      <PointItem
        key={item.id}
        point={item}
        isFavorite={!!pointsFavorite.find(point => point.id === item.id)}
      />
    ),
    [pointsFavorite],
  );

  return (
    <Container>
      <Title>Pontos de Coleta Favoritados</Title>

      {pointsFavorite.length > 0 && (
        <View style={{ flex: 1 }}>
          <ScrollView>
            {pointsFavorite.map(point => renderItem(point))}
          </ScrollView>
        </View>
      )}

      {pointsFavorite.length === 0 && (
        <Message>Nenhum Ponto de Coleta favoritado</Message>
      )}
    </Container>
  );
};

export default ListPoint;
