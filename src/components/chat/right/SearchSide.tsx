import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import React from "react";
import {IoSearch} from "react-icons/io5";
import {sassClasses} from "@utils";
import styles from "./SearchSide.module.scss";

const cl = sassClasses(styles);

export const SearchSide = () => {
  return (
    <div className={cl("SearchSide")}>
      <InputGroup>
        <InputLeftElement>
          <IoSearch />
        </InputLeftElement>
        <Input placeholder='Search' className={cl("search_field")} />
      </InputGroup>
    </div>
  );
};
