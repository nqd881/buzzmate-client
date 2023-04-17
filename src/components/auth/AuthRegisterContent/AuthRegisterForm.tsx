import { registerApi, RegisterApiPayload } from "@apis/auth/register";
import { Box, Input, Select, Text } from "@chakra-ui/react";
import { sassClasses } from "@utils";
import { capitalize } from "@utils/capitalize";
import { Field, Formik, FormikConfig } from "formik";
import React from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { FormikCustomInput } from "../../custom/FormikCustomInput";
import AuthLink from "../AuthLink";
import { AuthSubmitButton } from "../AuthSubmitButton";
import { useMutation } from "@tanstack/react-query";
import { RegisterSides } from "./AuthRegisterContent";
import styles from "../Content.module.scss";

import "react-datepicker/dist/react-datepicker.css";

const cl = sassClasses(styles);

type RegisterForm = RegisterApiPayload;

type AuthRegisterFormProps = {
  changeSide: (state: RegisterSides) => any;
};

const CustomCalendarContainer = ({ className, children }) => {
  return (
    <Box>
      <CalendarContainer className={className}>{children}</CalendarContainer>
    </Box>
  );
};

export const AuthRegisterForm: React.FC<AuthRegisterFormProps> = ({
  changeSide,
}) => {
  const register = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      changeSide(RegisterSides.NOTIFICATION);
    },
  });

  const genderOptions = ["male", "female"];

  const formConfig: FormikConfig<RegisterForm> = {
    initialValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      gender: null,
      birthDate: null,
    },
    onSubmit: (values) => {
      register.mutate(values);
    },
  };

  return (
    <Formik {...formConfig}>
      {(form) => (
        <form className={cl("root")} onSubmit={form.handleSubmit}>
          <FormikCustomInput
            placeholder="First name"
            name="firstName"
            required
          />
          <FormikCustomInput placeholder="Last name" name="lastName" required />
          <FormikCustomInput placeholder="Username" name="username" required />
          <FormikCustomInput
            placeholder="Password"
            type="password"
            name="password"
            required
          />
          <FormikCustomInput
            placeholder="Email address"
            type="email"
            name="emailAddress"
            required
          />

          <Field name="birthDate">
            {({ field, form }) => (
              <ReactDatePicker
                placeholderText="Birth date"
                selected={field.value}
                onChange={(date) => form.setFieldValue(field.name, date)}
                dateFormat="dd/MM/yyyy"
                customInput={<Input width="100%" />}
                calendarContainer={CustomCalendarContainer}
              />
            )}
          </Field>

          <Field name="gender">
            {({ field }) => (
              <Select
                name={field.name}
                onChange={field.onChange}
                onBlur={field.onBlur}
                id="gender"
                placeholder="Gender"
              >
                {genderOptions.map((genderOption) => (
                  <option key={genderOption} value={genderOption}>
                    {capitalize(genderOption)}
                  </option>
                ))}
              </Select>
            )}
          </Field>

          <Text fontSize="sm" m={2}>
            {`By signing up, you confirm that you've read and accepted our User
            Notice and Privacy Policy.`}
          </Text>

          <AuthSubmitButton isLoading={false}>Register</AuthSubmitButton>

          <AuthLink
            href="/auth/signin"
            content="Already have an account? Signin now"
          />
        </form>
      )}
    </Formik>
  );
};
