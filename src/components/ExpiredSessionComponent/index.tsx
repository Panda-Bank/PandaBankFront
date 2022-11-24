import { handleChangePage } from "../../libs/tools";
import { EButton } from "../Button";

export function ExpiredSessionComponent() {
  return (
    <div>
      <h1 className="pb-4 text-2xl text-red-500"> Sua sessão expirou.</h1>
      <EButton onClick={() => handleChangePage("login")}>
        Volte para tela de login
      </EButton>
    </div>
  );
}
