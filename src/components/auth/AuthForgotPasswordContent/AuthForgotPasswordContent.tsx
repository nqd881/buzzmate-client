import {useState} from "react";
import {AuthNotification} from "../AuthNotification";
import {AuthForgotPasswordForm} from "./AuthForgotPasswordForm";

export enum ForgotPasswordSide {
  FORM,
  NOTIFICATION,
}

export const AuthForgotPasswordContent = () => {
  const [side, changeSide] = useState(ForgotPasswordSide.FORM);

  switch (side) {
    case ForgotPasswordSide.FORM:
      return <AuthForgotPasswordForm changeSide={changeSide} />;
    case ForgotPasswordSide.NOTIFICATION:
      return (
        <AuthNotification message='We have sent an email to your mail. Please check it.' />
      );
  }
};
