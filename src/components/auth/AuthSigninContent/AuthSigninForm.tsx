import { signinApi } from "@apis/auth/signin";
import { useMutation } from "@tanstack/react-query";
import { sassClasses } from "@utils";
import { Formik, FormikConfig } from "formik";
import { useRouter } from "next/router";
import { FormikCustomInput } from "../../custom/FormikCustomInput";
import AuthLink from "../AuthLink";
import { AuthSubmitButton } from "../AuthSubmitButton";
import styles from "../Content.module.scss";
const cl = sassClasses(styles);

interface SigninForm {
  usernameOrEmail: string;
  password: string;
}

const ThirdPartySignin = () => {
  return <div></div>;
};

export const AuthSigninForm = () => {
  const router = useRouter();

  const signin = useMutation({
    mutationFn: signinApi,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data?.accessToken);

      router.push("/apps/chat");
    },
  });

  const formConfig: FormikConfig<SigninForm> = {
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    onSubmit: (values) => {
      signin.mutateAsync(values);
    },
  };

  return (
    <Formik {...formConfig}>
      {(form) => (
        <form className={cl("root")} onSubmit={form.handleSubmit}>
          <FormikCustomInput
            placeholder="Username or email"
            name="usernameOrEmail"
            required
          />
          <FormikCustomInput
            placeholder="Password"
            name="password"
            type="password"
            required
          />

          <AuthLink href="/auth/forgot-password" content="Forgot password?" />
          <AuthSubmitButton>Signin</AuthSubmitButton>
          <ThirdPartySignin />
          <AuthLink
            href="/auth/register"
            content="Don't have an account? Register now"
          />
        </form>
      )}
    </Formik>
  );
};
