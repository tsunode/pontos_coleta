import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
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
import * as hereGeocodeService from '../../services/hereGeocode';

interface Params {
  point_id: string;
}

const RegisterPoint: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const formRef = useRef<FormHandles>(null);
  const streetInputRef = useRef<TextInput>(null);
  const neighborhoodInputRef = useRef<TextInput>(null);
  const numberInputRef = useRef<TextInput>(null);
  const complementInputRef = useRef<TextInput>(null);
  const cityInputRef = useRef<TextInput>(null);

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

    // verifico se é uma rota de Atualizar, e atualizo os inputs com dados do banco
    if (route.name === 'Atualizar') {
      const { point_id: paramsPointId } = route.params as Params;

      setPointId(paramsPointId);

      getPoint();
    }
  }, [route, pointId]);

  const handleSearchGeoCode = useCallback(async () => {
    const { address } = formRef.current?.getData() as Point;

    try {
      const response = await hereGeocodeService.getGeocode(address);

      const { MatchLevel } = response.data.Response.View[0].Result[0];

      // verifica se a geolocalização encontrada é no nível mais preciso
      if (MatchLevel === 'houseNumber') {
        const {
          Latitude,
          Longitude,
        } = response.data.Response.View[0].Result[0].Location.MapView.TopLeft;

        const {
          State,
          PostalCode,
        } = response.data.Response.View[0].Result[0].Location.Address;

        formRef.current?.setFieldValue('address.latitude', String(Latitude));
        formRef.current?.setFieldValue('address.longitude', String(Longitude));
        formRef.current?.setFieldValue('address.state', State);
        formRef.current?.setFieldValue('address.zipcode', PostalCode);

        Alert.alert('Sucesso', 'Geolocalização Atualizada');
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível encontrar sua geolocalização com os dados informados',
        );
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível encontrar sua geolocalização, por favor digite manualmente',
      );
    }
  }, []);

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

        formRef.current?.setErrors({});
        formRef.current?.reset();

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
    [navigation, pointId, addPoint],
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
                onSubmitEditing={() => streetInputRef.current?.focus()}
              />

              <FieldSet>
                <SubTitle>Endereço</SubTitle>

                <Scope path="address">
                  <Input
                    ref={streetInputRef}
                    label="Rua"
                    autoCapitalize="words"
                    name="street"
                    placeholder="Rua"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      neighborhoodInputRef.current?.focus()}
                  />

                  <InputGroup>
                    <Input
                      ref={neighborhoodInputRef}
                      label="Bairro"
                      autoCapitalize="words"
                      name="neighborhood"
                      placeholder="Bairro"
                      returnKeyType="next"
                      width={60}
                      onSubmitEditing={() => numberInputRef.current?.focus()}
                    />

                    <Input
                      ref={numberInputRef}
                      label="Número"
                      keyboardType="number-pad"
                      autoCapitalize="words"
                      name="number"
                      placeholder="Número"
                      returnKeyType="next"
                      width={35}
                      onSubmitEditing={() =>
                        complementInputRef.current?.focus()}
                    />
                  </InputGroup>

                  <Input
                    ref={complementInputRef}
                    label="Complemento (opcional)"
                    autoCapitalize="words"
                    name="complement"
                    placeholder="Complemento"
                    returnKeyType="next"
                    onSubmitEditing={() => cityInputRef.current?.focus()}
                  />

                  <InputGroup>
                    <Input
                      ref={cityInputRef}
                      label="Cidade"
                      autoCapitalize="words"
                      name="city"
                      placeholder="Cidade"
                      returnKeyType="next"
                      width={65}
                      onSubmitEditing={handleSearchGeoCode}
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
                  <Button activeOpacity={0.9} onPress={handleSearchGeoCode}>
                    Procurar Geolocalização
                  </Button>
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
