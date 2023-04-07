import {AuthPage} from "@components/auth/AuthPage";
import {AuthResetPasswordContent} from "@components/auth/AuthResetPasswordContent/AuthResetPasswordContent";
import {NextPage} from "next";

const AuthResetPasswordPage: NextPage = () => {
  return (
    <AuthPage title='Reset Password' content={<AuthResetPasswordContent />} />
  );
};

export default AuthResetPasswordPage;
