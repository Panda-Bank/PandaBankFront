import { useContext } from "react";
import { EButton } from "../../../components/Button";
import { DashBoardLayout } from "../../../layouts";
import { AuthContext } from "../../../libs/contexts/AuthContext";
import { api } from "../../../services/api";

export default function Config() {
  const { user } = useContext(AuthContext);

  const pixteste = {
    chave: user?.cpf,
    tipo: "cpf",
    usuarios: {
      id: user?.id,
    },
  };

  //pix.usuarios.id = user?.id as number;
  //pix.chave = `${user?.cpf}`;
  //pix.tipo = "cpf";

  function handleGenerate() {
    api.post("pix/cadastrar", pixteste);
    console.log(pixteste);
  }

  return (
    <div className="index">
      <DashBoardLayout variant="settings" nome={user?.nome}>
        <EButton onClick={() => handleGenerate()}>Gerar Chave Aleatória</EButton>
      </DashBoardLayout>
    </div>
  );
}
