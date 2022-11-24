import { FormEvent, useContext, useState } from "react";
import { EButton } from "../../../components/Button";
import { ExpiredSessionComponent } from "../../../components/ExpiredSessionComponent";
import { DashBoardLayout } from "../../../layouts";
import { AuthContext } from "../../../libs/contexts/AuthContext";
import { maskPhoneWithDDD } from "../../../libs/tools/regex";
import { api } from "../../../services/api";

export default function Config() {
  const {
    user,
    isAuthenticated,
    handleGeneratePix,
    deleteAccount,
    deletePix,
    logOut,
    attUser,
  } = useContext(AuthContext);

  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  async function handleChangeInfo(e: FormEvent) {
    e.preventDefault();

    const data = {
      nome: user?.nome,
      cpf: user?.cpf,
      data_nascimento: user?.data_nascimento,
      logradouro: user?.logradouro,
      cep: user?.cep,
      numero_endereco: user?.numero_endereco,
      complemento: user?.complemento,
      telefone: `${telefone === "" ? user?.telefone : telefone}`,
      senha: `${senha === "" ? user?.senha : senha}`,
      email: `${email === "" ? user?.email : email}`,
    };
    
    await api
      .put("usuarios/atualizar", data)
      .catch((err) => alert(err));

      await attUser()
      console.log(user?.telefone)
  }

  return isAuthenticated ? (
    <div className="index">
      <DashBoardLayout variant="settings" nome={user?.nome}>
        <div className="w-1/3  shadow-lg bg-zinc-200 p-8 rounded-md">
          <div className="grid grid-cols-2 px-12 gap-4 mb-4">
            <EButton variant="danger" onClick={() => deleteAccount()}>
              Deletar conta
            </EButton>
            <EButton variant="danger" onClick={() => logOut()}>
              Log-out
            </EButton>
            <EButton onClick={() => handleGeneratePix("cpf")}>
              Gerar Chave CPF
            </EButton>
            <EButton onClick={() => handleGeneratePix("telefone")}>
              Gerar Chave Telefone
            </EButton>
          </div>
          <form className="w-full mx-4" onSubmit={(e) => handleChangeInfo(e)}>
            <div className="grid grid-cols-2 gap-4 bg-zinc-100 p-4 rounded shadow-md place-items-center">
              <div>
                <p className="pb-4">Alterar senha</p>
                <input
                  type="password"
                  placeholder="*****"
                  onChange={(e) => setSenha(e.target.value)}
                  className="rounded"
                />
              </div>
              <div>
                <p className="pb-4">Alterar e-mail</p>
                <input
                  type="email"
                  placeholder={`atual: ${user?.email}`}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded"
                />
              </div>
              <div>
                <p className="pb-4">Telefone</p>
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) =>
                    setTelefone(maskPhoneWithDDD(e.target.value))
                  }
                  placeholder={`atual: ${user?.telefone}`}
                  className="rounded"
                />
              </div>
            </div>
            <div className="pt-4">
              <EButton type="submit">Enviar</EButton>
            </div>
          </form>
          <div>
            <h1 className="text-xl text-bold py-4 mt-8">Minhas chaves</h1>
            {user?.cpf ? (
              user?.pix.map((chave: any) => (
                <div
                  key={chave.id}
                  className="flex justify-between gap-4 bg-zinc-100 rounded py-8 place-items-center mt-4 px-4"
                >
                  <div>
                    <p className="py-4">TIPO: {chave.tipo}</p>
                    <p className="pb-4">ID: {chave.id}</p>
                  </div>
                  <div>
                    <p>CHAVE: {chave.chave}</p>
                  </div>
                  <EButton variant="danger" onClick={() => deletePix(chave.id)}>
                    deletar chave
                  </EButton>
                </div>
              ))
            ) : (
              <ExpiredSessionComponent />
            )}
          </div>
        </div>
      </DashBoardLayout>
    </div>
  ) : (
    <div className="default-main">
      <ExpiredSessionComponent />
    </div>
  );
}
