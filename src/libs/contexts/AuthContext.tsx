import { useRouter } from "next/router";
import { createContext, FormEvent, ReactNode, useState } from "react";
import { api } from "../../services/api";
import {
  AuthContextData,
  Destiny,
  RegisterCredentials,
  SignInCredentials,
  User,
} from "../types";

type props = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: props) {
  const [user, setUser] = useState<User | any>();
  let isAuthenticated = !!user;
  const router = useRouter();

  async function attUser() {
    try {
      const { data } = await api.get(`/usuarios/cpf/${user?.cpf}`);
      setUser({ ...data });
    } catch (err) {
      console.log(err);
    }
  }

  async function signIn({ cpf, senha }: SignInCredentials) {
    try {
      const { data } = await api.post("/usuarios/logar/", {
        cpf: cpf,
        senha: senha,
      });

      if (data) {
        setUser({
          ...data,
        });

        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function registerAccount(account: RegisterCredentials) {
    try {
      const user = await api.post("/usuarios/cadastrar", {
        ...account,
      });

      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleTransaction(e: FormEvent, destiny: Destiny) {
    e.preventDefault();

    if (user?.saldo >= destiny.amount) {
      const transfer = {
        chave: destiny.cpf,
        valor: parseFloat(destiny.amount),
        usuario: {
          id: destiny.usuario.id,
        },
      };

      await api
        .post(`/pix/transferir`, transfer)
        .then((res) => alert("pix enviado"))
        .catch((err) => console.log(err));

      attUser();
    } else {
      alert("Saldo insuficiente");
    }
  }

  async function handleGeneratePix(type: string) {
    try {
      if (type === "cpf") {
        await api
          .post("pix/cadastrar", {
            chave: user?.cpf,
            tipo: "cpf",
            usuarios: {
              id: user?.id,
            },
          })
          .then((res) => attUser());
      } else if (type === "telefone") {
        await api
          .post("pix/cadastrar", {
            chave: user?.telefone,
            tipo: "telefone",
            usuarios: {
              id: user?.id,
            },
          })
          .then((res) => attUser());
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteAccount() {
    try {
      router.push("/");
      setUser(null)
      api.delete(`usuarios/delete/${user?.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  async function deletePix(p: number) {
    try {
      await api.delete(`pix/delete/${p}`);
      attUser();
    } catch (err) {
      console.log(err);
    }
  }

  async function logOut() {
    try {
      router.push("/");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        handleTransaction,
        registerAccount,
        handleGeneratePix,
        deleteAccount,
        deletePix,
        attUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
