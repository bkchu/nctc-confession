import clsx from "clsx";
import { HTMLAttributes } from "react";
type Props = {
  variant: "primary" | "secondary";
} & HTMLAttributes<HTMLButtonElement>;

const Button = ({ variant = "primary", className, ...props }: Props) => {
  const variantStyles = {
    primary: "bg-violet-500 border-violet-500 text-purple-50 sans shadow-md",
    secondary: "bg-transparent",
  };

  const buttonStyles = clsx(
    "px-6 h-12 flex justify-center items-center rounded-lg border-[1px] font-bold tracking-widest uppercase",
    variantStyles[variant],
    className
  );

  return <button className={buttonStyles} {...props} />;
};

export default Button;
