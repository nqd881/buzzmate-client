import React, { ForwardedRef, HTMLProps, PropsWithChildren } from "react";
import { sassClasses } from "@utils";
import styles from "./VerticalScrollableView.module.scss";

const cl = sassClasses(styles);

export type VerticalScrollableViewProps = HTMLProps<HTMLDivElement> & {
  hidden?: boolean;
};

export const VerticalScrollableView = React.forwardRef(
  (
    props: PropsWithChildren<VerticalScrollableViewProps>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={cl([
          "VerticalScrollableView",
          props?.hidden ? "hidden" : "",
        ])}
        {...props}
      >
        {props?.children}
      </div>
    );
  }
);

VerticalScrollableView.displayName = "";

// ({children, hidden}) => {
//   return (
//     <div className={cl(["VerticalScrollableView", hidden ? "hidden" : ""])}>
//       {children}
//     </div>
//   );
// };
