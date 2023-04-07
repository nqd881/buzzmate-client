import {AuthPage} from "@components/auth/AuthPage";
import {AuthRegisterContent} from "@components/auth/AuthRegisterContent/AuthRegisterContent";
import {NextPage} from "next";

const AuthRegisterPage: NextPage = () => {
  return <AuthPage title='Register' content={<AuthRegisterContent />} />;
};

export default AuthRegisterPage;
