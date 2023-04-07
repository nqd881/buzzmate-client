import {useState} from "react";
import {AuthNotification} from "../AuthNotification";
import {AuthRegisterForm} from "./AuthRegisterForm";

export enum RegisterSides {
  FORM,
  NOTIFICATION,
}

export const AuthRegisterContent = () => {
  const [side, changeSide] = useState(RegisterSides.FORM);

  switch (side) {
    case RegisterSides.FORM:
      return <AuthRegisterForm changeSide={changeSide} />;
    case RegisterSides.NOTIFICATION:
      return (
        <AuthNotification message='We have sent an email to your mail. Please check it.' />
      );
  }
};
