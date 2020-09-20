import { FormHandles } from '@unform/core';

import React, { useCallback, useRef } from 'react';
import { ScrollView, View } from 'react-native';

import PointItem from '../../components/PointItem';
import { usePoint } from '../../hooks/points';

import { Container, Title, InputGroup } from './styles';

const ListPoint: React.FC = () => {
  // const [points, setPoints] = useState<Point[]>();
  const formRef = useRef<FormHandles>(null);

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

      {pointsFavorite && (
        <View style={{ flex: 1 }}>
          <ScrollView>
            {pointsFavorite.map(point => renderItem(point))}
          </ScrollView>
        </View>
      )}
    </Container>
  );
};

export default ListPoint;
