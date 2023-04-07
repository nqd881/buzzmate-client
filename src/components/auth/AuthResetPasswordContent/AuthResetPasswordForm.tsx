import { sassClasses } from "@utils";
import { Formik, FormikConfig } from "formik";
import { AuthInput } from "../AuthInput";
import { AuthSubmitButton } from "../AuthSubmitButton";
import { ResetPasswordSides } from "./AuthResetPasswordContent";
import styles from "../Content.module.scss";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "@apis/auth/reset-password";
import { useRouter } from "next/router";
import base64url from "base64url";

const cl = sassClasses(styles);

interface ResetPasswordForm {
  emailAddress: string;
  code: string;
  newPassword: string;
}

interface ResetPasswordFormProps {
  changeSide: (state: ResetPasswordSides) => any;
}

export const AuthResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  changeSide,
}) => {
  const router = useRouter();

  const emailAddress = base64url.decode(router.query.email as string);

  const resetPassword = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      changeSide(ResetPasswordSides.NOTIFICATION);
    },
  });

  const formConfig: FormikConfig<ResetPasswordForm> = {
    initialValues: {
      emailAddress,
      code: "",
      newPassword: "",
    },
    onSubmit: (values) => {
      resetPassword.mutate(values);
    },
  };

  return (
    <Formik {...formConfig}>
      {(form) => (
        <form className={cl("root")} onSubmit={form.handleSubmit}>
          <AuthInput placeholder="Reset code" name="code" required />
          <AuthInput
            placeholder="New password"
            name="newPassword"
            type="password"
            required
          />

          <AuthSubmitButton>Send</AuthSubmitButton>
        </form>
      )}
    </Formik>
  );
};
