import { FormEvent } from "react";

export type SignInCredentials = {
  cpf: string ;
  senha: string;
};

export interface RegisterCredentials {
  nome: string;
  cpf: string;
  data_nascimento: string;
  email: string;
  senha: string;
  telefone: string;
  logradouro: string;
  cep: string;
  numero_endereco: string;
  complemento: string;
  saldo: number;
  agencia: string;
  conta: string;
}

export interface User extends RegisterCredentials {
  id: number;
  cpf: string;
  senha: string;
  pix: [{ id: number; tipo: string; chave: string }];
  transferencia: [{ id: number; valor: number; chave: string }];
}

export type Destiny = {
  cpf: string;
  amount: string;
  usuario: {
    id: number | undefined;
  };
};

export type AuthContextData = {
  signIn(credentialsLogin: SignInCredentials): Promise<void>;
  user?: User;
  registerAccount(credentialsRegister: RegisterCredentials): Promise<void>;
  handleTransaction(e: FormEvent, destinyUser: Destiny): Promise<void>;
  handleGeneratePix(type: string): Promise<void>;
  deleteAccount(): Promise<void>;
  deletePix(p: number): Promise<void>;
  attUser(): Promise<void>;
  logOut(): Promise<void>;
  isAuthenticated: boolean;
};
