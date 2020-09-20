import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  useCallback,
  forwardRef,
} from 'react';
import { TextInputProps, View } from 'react-native';
import { useField } from '@unform/core';

import { Container, InputContainer, TextInput, Icon, Label } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  label?: string;
  icon?: string;
  width?: number;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, label, width, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(refSet: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container width={width}>
      {label && <Label>{label}</Label>}
      <InputContainer isFocused={isFocused} isErrored={!!error}>
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={isFocused || isFilled ? '#230A59' : '#E3D9CA'}
          />
        )}

        <TextInput
          ref={inputElementRef}
          placeholderTextColor="#E3D9CA"
          keyboardAppearance="dark"
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />
      </InputContainer>
    </Container>
  );
};

export default forwardRef(Input);
