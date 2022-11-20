import { ReactNode } from "react";

export type buttonVariant = "outline";
export type buttonColors = "primary" | "secondary";

export interface ButtonProps {
  children: ReactNode;
  variant?: buttonVariant;
  color?: buttonColors;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}
