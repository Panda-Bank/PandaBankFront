export type SignInCredentials = {
  cpf: string;
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

export interface User extends RegisterCredentials   {
  id: number,
  cpf: string;
  senha: string;
};

export type AuthContextData = {
  signIn(credentialsLogin: SignInCredentials): Promise<void>;
  user?: User;
  registerAccount(credentialsRegister: RegisterCredentials): Promise<void>;
  isAuthenticated: boolean;
};
