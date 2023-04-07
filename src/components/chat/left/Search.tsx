import {Input} from "@chakra-ui/react";
import React from "react";
import {sassClasses} from "@utils";
import styles from "./Search.module.scss";

const cl = sassClasses(styles);

export const Search = () => {
  return (
    <div className={cl("Search")}>
      <Input placeholder='Search' variant='filled' width='100%' />
    </div>
  );
};
