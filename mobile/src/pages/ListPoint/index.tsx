import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PointItem, { PointProps } from '../../components/PointItem';
import api from '../../services/api';

import { Container, Title, InputGroup } from './styles';

const ListPoint: React.FC = () => {
  const [points, setPoints] = useState<PointProps[]>();
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    async function loadPoints() {
      const response = await api.get<PointProps[]>('pontos-coleta');

      setPoints(response.data);
    }

    loadPoints();
  }, []);

  const handleSearch = useCallback(async (data: { name: string }) => {
    setPoints([]);

    try {
      const response = await api.get('/pontos-coleta', {
        params: {
          name: data.name,
        },
      });

      setPoints([...response.data]);
    } catch (error) {
      Alert.alert(
        'Ocorreu um erro na busca',
        'Ocorreu um erro ao realizar a busca, contate nosso suporte',
      );
    }
  }, []);

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

      <FlatList
        data={points}
        extraData={formRef}
        contentContainerStyle={{
          paddingBottom: 16,
        }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PointItem
            key={item.id}
            point={item}
            // favorited={favorites.includes(item.id)}
          />
        )}
      />
    </Container>
  );
};

export default ListPoint;
