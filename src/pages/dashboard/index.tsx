import { useContext, useState } from "react";
import { EButton } from "../../components/Button";
import { ExpiredSessionComponent } from "../../components/ExpiredSessionComponent";
import { DashBoardLayout } from "../../layouts/DashBoardLayout";
import { AuthContext } from "../../libs/contexts/AuthContext";

export default function DashBoard() {
  const { user, isAuthenticated, handleTransaction } = useContext(AuthContext);
  const [cpf, setCPF] = useState("");
  const [amount, setAmount] = useState("");

  return isAuthenticated ? (
    <div className="index">
      <DashBoardLayout nome={`${user?.nome}`}>
        <div className="flex justify-between gap-16">
          <div className="flex justify-between items-center gap-16 div pl-40 pr-8 py-8 bg-zinc-900 rounded-md bg-gradient-to-r from-zinc-900 to-zinc-600">
            <h1 className="text-2xl text-white">
              Saldo:{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(user?.saldo || 0)}
            </h1>
            <div className=" flex items-center w-max p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form
                onSubmit={(e) =>
                  handleTransaction(e, {
                    cpf: cpf,
                    amount: amount,
                    usuario: {
                      id: user?.id,
                    },
                  })
                }
                className="space-y-4"
                action="#"
              >
                <div>
                  <p className="pb-4">Transferência Pix</p>
                  <label
                    htmlFor="cpf"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Chave do outro usuário
                  </label>
                  <input
                    type="cpf"
                    name="cpf"
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCPF(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="1324424122"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="quantidade"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantidade
                  </label>
                  <input
                    type="text"
                    name="quantidade"
                    id="quantidade"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="321"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
          <div className="flex items-center gap-2 div text-2xl text-white px-4">
            <div className="text-zinc-900">
              <p>Histórico</p>
              <div
                style={{
                  overflow: "auto",
                }}
                className="h-80 w-full bg-green-400 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 py-4 px-8"
              >
                {user?.transferencia ? (
                  user?.transferencia.map((trans: any) => (
                    <div
                      key={trans.id}
                      className="flex justify-between gap-4 bg-zinc-100 rounded py-4 place-items-center mt-4 px-8 mx-8"
                    >
                      <div>
                        <p className="py-4 text-zinc-900 text-sm">
                          valor:{" "}
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(trans.valor || 0)}
                        </p>
                        <p className="pb-4 text-zinc-900 text-sm">
                          id: {trans.id}
                        </p>
                        <div>
                          <p className="text-zinc-900 text-sm">
                            CHAVE: {trans.chave}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
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
