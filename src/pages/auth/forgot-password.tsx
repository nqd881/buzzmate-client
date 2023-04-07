import {AuthForgotPasswordContent} from "@components/auth/AuthForgotPasswordContent/AuthForgotPasswordContent";
import {AuthPage} from "@components/auth/AuthPage";
import {NextPage} from "next";

const AuthForgotPasswordPage: NextPage = () => {
  return (
    <AuthPage title='Forgot Password' content={<AuthForgotPasswordContent />} />
  );
};

export default AuthForgotPasswordPage;
