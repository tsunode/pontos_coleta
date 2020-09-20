import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Alert, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Message from '../../components/Message';
import PointItem from '../../components/PointItem';
import { Point, usePoint } from '../../hooks/points';
import api from '../../services/api';

import { Container, Title, InputGroup } from './styles';

const ListPoint: React.FC = () => {
  // const [points, setPoints] = useState<Point[]>();
  const formRef = useRef<FormHandles>(null);

  const { addAnyPoints, points, pointsFavorite } = usePoint();

  useEffect(() => {
    console.log('aqui');
    async function loadPoints(): Promise<void> {
      const response = await api.get<Point[]>('pontos-coleta');

      addAnyPoints(response.data);
    }

    loadPoints();
  }, [addAnyPoints]);

  const handleSearch = useCallback(
    async (data: { name: string }) => {
      try {
        const response = await api.get('/pontos-coleta', {
          params: {
            name: data.name,
          },
        });

        addAnyPoints([...response.data]);
      } catch (error) {
        Alert.alert(
          'Ocorreu um erro na busca',
          'Ocorreu um erro ao realizar a busca, contate nosso suporte',
        );
      }
    },
    [addAnyPoints],
  );

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
      <Title>Pontos de Coleta</Title>

      <Form ref={formRef} onSubmit={handleSearch}>
        <InputGroup>
          <Input
            autoCapitalize="words"
            name="name"
            icon="compass"
            placeholder="Nome"
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
            width={70}
          />

          <Button
            activeOpacity={0.9}
            onPress={() => {
              formRef.current?.submitForm();
            }}
            isInputGroup
          >
            Buscar
          </Button>
        </InputGroup>
      </Form>

      {points.length > 0 && (
        <View style={{ flex: 1 }}>
          <ScrollView>{points.map(point => renderItem(point))}</ScrollView>
        </View>
      )}

      {points.length === 0 && (
        <Message>Nenhum ponto de coleta Cadastrado</Message>
      )}
    </Container>
  );
};

export default ListPoint;
