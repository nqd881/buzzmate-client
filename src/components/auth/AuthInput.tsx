import {ChakraInputProps, CustomInput} from "@components/custom";
import {FieldHookConfig, useField} from "formik";
import React from "react";

type AuthInputProps<V = any> = ChakraInputProps & FieldHookConfig<V>;

export const AuthInput: React.FC<AuthInputProps> = (props) => {
  const [field, meta] = useField(props);
  const {touched, error} = meta;

  return <CustomInput {...field} {...(props as ChakraInputProps)} />;
};
