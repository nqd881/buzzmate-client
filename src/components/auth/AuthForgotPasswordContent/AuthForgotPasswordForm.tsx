import {
  forgotPasswordApi,
  ForgotPasswordPayload,
} from "@apis/auth/forgot-password";
import {useMutation} from "@tanstack/react-query";
import {sassClasses} from "@utils";
import base64url from "base64url";
import {Formik, FormikConfig} from "formik";
import {useRouter} from "next/router";
import {AuthInput} from "../AuthInput";
import {AuthSubmitButton} from "../AuthSubmitButton";
import styles from "../Content.module.scss";
import {ForgotPasswordSide} from "./AuthForgotPasswordContent";

const cl = sassClasses(styles);

interface ForgotPasswordForm extends ForgotPasswordPayload {}

interface AuthForgotPasswordFormProps {
  changeSide: (state: ForgotPasswordSide) => any;
}

export const AuthForgotPasswordForm: React.FC<AuthForgotPasswordFormProps> = ({
  changeSide,
}) => {
  const router = useRouter();

  const forgotPassword = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data, vars) => {
      const encodedEmail = base64url(vars.emailAddress);

      router.push(`/auth/reset-password?email=${encodedEmail}`);
    },
  });

  const formConfig: FormikConfig<ForgotPasswordForm> = {
    initialValues: {
      emailAddress: "",
    },
    onSubmit: (values) => {
      forgotPassword.mutate(values);
    },
  };

  return (
    <Formik {...formConfig}>
      {(form) => (
        <form className={cl("root")} onSubmit={form.handleSubmit}>
          <AuthInput
            placeholder='Email'
            type='email'
            name='emailAddress'
            required
          />
          <AuthSubmitButton isLoading={false}>Next</AuthSubmitButton>
        </form>
      )}
    </Formik>
  );
};
