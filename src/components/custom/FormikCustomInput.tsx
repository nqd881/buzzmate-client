import { ChakraInputProps, CustomInput } from "@components/custom";
import { FieldHookConfig, useField } from "formik";
import React from "react";

type FormikCustomInputProps<V = any> = ChakraInputProps & FieldHookConfig<V>;

export const FormikCustomInput: React.FC<FormikCustomInputProps> = (props) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;

  return <CustomInput {...field} {...(props as ChakraInputProps)} />;
};
