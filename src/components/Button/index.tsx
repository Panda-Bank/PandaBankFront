import { useClassState } from "@twocatmoon/react-use-class-state";
import { ButtonProps } from "../../libs/types";

export function EButton({
  children,
  variant,
  color,
  onClick,
  type,
}: ButtonProps) {
  const classState = {
    button: {
      "--outline": variant === "outline",
      "--secondary": color === "secondary",
      "": color,
    },
  };

  const className = useClassState(classState);

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`${className} shadow-md`}
    >
      {children}
    </button>
  );
}
