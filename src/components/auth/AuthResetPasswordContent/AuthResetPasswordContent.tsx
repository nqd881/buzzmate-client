import {useState} from "react";
import {AuthNotification} from "../AuthNotification";
import {AuthResetPasswordForm} from "./AuthResetPasswordForm";

export enum ResetPasswordSides {
  FORM,
  NOTIFICATION,
}

export const AuthResetPasswordContent = () => {
  const [side, changeSide] = useState(ResetPasswordSides.FORM);

  switch (side) {
    case ResetPasswordSides.FORM:
      return <AuthResetPasswordForm changeSide={changeSide} />;
    case ResetPasswordSides.NOTIFICATION:
      return <AuthNotification message='Password reset successful' />;
  }
};
