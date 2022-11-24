import { ReactNode } from "react";

export type buttonVariant = "outline" | "loading" | "danger";
export type buttonColors = "primary" | "secondary" | "tertiary";

export interface ButtonProps {
  children: ReactNode;
  variant?: buttonVariant;
  color?: buttonColors;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}
