import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles, Scope } from '@unform/core';
import * as Yup from 'yup';

import { ScrollView } from 'react-native-gesture-handler';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, FieldSet, SubTitle } from './styles';
import getValidationErrors from '../../utils/getValidationErros';

const RegisterPoint: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSavePoint = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatório'),
        address: Yup.object({
          street: Yup.string().required('Rua Obrigatório'),
          neighborhood: Yup.string().required('Bairro Obrigatório'),
          city: Yup.string().required('Cidade Obrigatório'),
          state: Yup.string().required('Estado Obrigatório'),
          zipcode: Yup.string().required('Cep Obrigatório'),
          longitude: Yup.string().required('Longitude Obrigatório'),
          latitude: Yup.string().required('Latitude Obrigatório'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      console.log(error);

      if (error instanceof Yup.ValidationError) {
        const erros = getValidationErrors(error);

        formRef.current?.setErrors(erros);

        return;
      }

      Alert.alert(
        'Erro no  cadastro',
        'Ocorreu um erro ao fazer cadastro, tente novamente',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView>
          <Container>
            <Title>Cadastro de Ponto de Coleta</Title>

            <Form ref={formRef} onSubmit={handleSavePoint}>
              <Input
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
                    autoCapitalize="words"
                    name="street"
                    placeholder="Rua"
                    returnKeyType="next"
                  />

                  <Input
                    autoCapitalize="words"
                    name="neighborhood"
                    placeholder="Bairro"
                    returnKeyType="next"
                  />

                  <Input
                    autoCapitalize="words"
                    name="number"
                    placeholder="Número"
                    returnKeyType="next"
                  />

                  <Input
                    autoCapitalize="words"
                    name="complement"
                    placeholder="Complemento"
                    returnKeyType="next"
                  />

                  <Input
                    autoCapitalize="words"
                    name="city"
                    placeholder="Cidade"
                    returnKeyType="next"
                  />

                  <Input
                    autoCapitalize="words"
                    name="state"
                    placeholder="Estado"
                    returnKeyType="next"
                  />

                  <Input
                    autoCapitalize="words"
                    name="zipcode"
                    placeholder="Cep"
                    returnKeyType="next"
                  />

                  <Input
                    autoCapitalize="words"
                    name="latitude"
                    placeholder="Latitude"
                    returnKeyType="next"
                  />

                  <Input
                    autoCapitalize="words"
                    name="longitude"
                    placeholder="Longitude"
                    returnKeyType="next"
                  />
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
