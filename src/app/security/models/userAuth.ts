export class UserAuth {
  // tslint:disable-next-line: no-inferrable-types
  _id: number = 0;
  email: string;
  nome: string;
  tipo_user: string;
  password: string;
  salt: string;
  isAdmin: boolean;
  isGestor: boolean;
  isFuncionario: boolean;
}
