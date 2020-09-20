import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { usePoint, Point } from '../../hooks/points';

import {
  Container,
  Title,
  FieldSet,
  SubTitle,
  InputGroup,
  Header,
} from './styles';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';

interface Params {
  point_id: string;
}

const RegisterPoint: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const route = useRoute();
  const [pointId, setPointId] = useState('');
  const { addPoint } = usePoint();

  useEffect(() => {
    formRef.current?.setErrors({});
    formRef.current?.reset();

    async function getPoint(): Promise<void> {
      try {
        const response = await api.get(`pontos-coleta/${pointId}`);

        formRef.current?.setData(response.data);
      } catch (error) {
        Alert.alert(
          'Ocorreu um erro na busca',
          'Ocorreu um erro ao realizar a busca, contate nosso suporte',
        );
      }
    }
    if (route.name === 'Atualizar') {
      const { point_id: paramsPointId } = route.params as Params;

      setPointId(paramsPointId);

      getPoint();
    }
  }, [route, pointId]);

  const handleSavePoint = useCallback(
    async (data: object) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          address: Yup.object({
            street: Yup.string().required('Rua Obrigatório'),
            neighborhood: Yup.string().required('Bairro Obrigatório'),
            city: Yup.string().required('Cidade Obrigatório'),
            state: Yup.string().required('Estado Obrigatório').max(2),
            zipcode: Yup.string().required('Cep Obrigatório'),
            longitude: Yup.string().required('Longitude Obrigatório'),
            latitude: Yup.string().required('Latitude Obrigatório'),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        let response;

        if (pointId !== '') {
          response = await api.put<Point>(`pontos-coleta/${pointId}`, data);

          Alert.alert(
            'Atualização realizado com sucesso!',
            'O ponto de coleta foi atualizado',
          );
        } else {
          response = await api.post<Point>('pontos-coleta', data);

          Alert.alert(
            'Cadastro realizado com sucesso!',
            'Você já pode verificar o ponto, na tela de listagem.',
          );
        }
        addPoint(response.data);
        navigation.navigate('Cadastrados');
      } catch (error) {
        console.log(error);

        if (error instanceof Yup.ValidationError) {
          const erros = getValidationErrors(error);

          formRef.current?.setErrors(erros);

          return;
        }

        if (error.response) {
          Alert.alert('Erro no  cadastro', error.response.data.message);
        } else {
          Alert.alert(
            'Erro no  cadastro',
            'Ocorreu um erro ao realizar o cadastro, contate nosso suporte',
          );
        }
      }
    },
    [navigation, pointId],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView>
          <Container>
            <Header>
              {pointId === '' ? (
                <Title>Cadastro de Ponto de Coleta</Title>
              ) : (
                <>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={25} solid color="#364159" />
                  </TouchableOpacity>
                  <Title>Atualizar Ponto de Coleta</Title>
                </>
              )}
            </Header>

            <Form ref={formRef} onSubmit={handleSavePoint}>
              <Input
                label="Nome"
                autoCapitalize="words"
                name="name"
                icon="compass"
                placeholder="Nome"
                returnKeyType="next"
              />

              <FieldSet>
                <SubTitle>Endereço</SubTitle>

                <Scope path="address">
                  <Input
                    label="Rua"
                    autoCapitalize="words"
                    name="street"
                    placeholder="Rua"
                    returnKeyType="next"
                  />

                  <InputGroup>
                    <Input
                      label="Bairro"
                      autoCapitalize="words"
                      name="neighborhood"
                      placeholder="Bairro"
                      returnKeyType="next"
                      width={60}
                    />

                    <Input
                      label="Número"
                      autoCapitalize="words"
                      name="number"
                      placeholder="Número"
                      returnKeyType="next"
                      width={35}
                    />
                  </InputGroup>

                  <Input
                    label="Complemento (opcional)"
                    autoCapitalize="words"
                    name="complement"
                    placeholder="Complemento"
                    returnKeyType="next"
                  />

                  <InputGroup>
                    <Input
                      label="Cidade"
                      autoCapitalize="words"
                      name="city"
                      placeholder="Cidade"
                      returnKeyType="next"
                      width={65}
                    />

                    <Input
                      label="Estado"
                      autoCapitalize="words"
                      name="state"
                      placeholder="Estado"
                      returnKeyType="next"
                      width={30}
                      maxLength={2}
                    />
                  </InputGroup>

                  <Input
                    label="Cep"
                    autoCapitalize="words"
                    name="zipcode"
                    placeholder="Cep"
                    returnKeyType="next"
                  />
                  <InputGroup>
                    <Input
                      label="Latitude"
                      autoCapitalize="words"
                      name="latitude"
                      placeholder="Latitude"
                      returnKeyType="next"
                      width={48}
                    />

                    <Input
                      label="Longitude"
                      autoCapitalize="words"
                      name="longitude"
                      placeholder="Longitude"
                      returnKeyType="next"
                      width={48}
                    />
                  </InputGroup>
                </Scope>
              </FieldSet>

              <Button
                activeOpacity={0.9}
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Salvar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterPoint;
