import styled, { css } from "styled-components";
import { buttonVariant, buttonColors } from "../../libs/types";

interface ButtonContainerProps {
  color: buttonColors;
  variant: buttonVariant;
}

const variant = {
  outline: "outline",
};

const color = {
  primary: "#000",
  secondary: "#0069ed",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  ${(props) =>
    variant[props.variant] === "outline"
      ? css`
          border: 1px solid ${color[props.color]};
          background-color: transparent;
          border-radius: 4px;
          &:hover,
          text-decoration: none;
          text-align: center;
          padding: 1rem;
          margin: 0;
          font-size: 1rem;
          color: ${color[props.color]};

          &:hover,
          &:focus {
            color: white;
            border: none;
            background-color: ${color[props.color]};
          }
        `
      : css`
          font-family: "grotesque-basis";
          display: inline-block;
          cursor: pointer;
          color: white;
          border-radius: 4px;
          background-color: ${color[props.color]};
          text-decoration: none;
          text-align: center;
          padding: 1rem;
          margin: 0;
          font-size: 1rem;

          &:hover,
          &:focus {
            color: ${color[props.color]};
            border: none;
            background-color: transparent;
        };
          }
        `}
`;
