import classNames from "classnames";
import React from "react";
import styles from "./style.module.scss";
import classnames from "classnames";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  dice?: boolean;
  icon?: JSX.Element;
}

export function Button({
  children,
  dice,
  icon,
  className,
  ...props
}: ButtonProps) {
  const dynamicClass = { [styles.dice]: dice };

  return (
    <button className={classNames(className, dynamicClass)} {...props}>
      {icon}
      {children}
    </button>
  );
}
