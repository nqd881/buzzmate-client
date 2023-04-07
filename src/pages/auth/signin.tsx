import {AuthPage} from "@components/auth/AuthPage";
import {AuthSigninContent} from "@components/auth/AuthSigninContent/AuthSigninContent";
import {NextPage} from "next";

const AuthSigninPage: NextPage = () => {
  return <AuthPage title='Signin' content={<AuthSigninContent />} />;
};

export default AuthSigninPage;
