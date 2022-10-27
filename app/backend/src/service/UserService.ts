import * as bcrypt from 'bcryptjs';
import users from '../database/models/sequelizUsers';
import tokenManager from '../helpers/tokenManager';
import StructuredError from '../errors/StructuredError';
import IUser from '../entities/Iuser.interface';

export default class UserService {
  makelogin = async (emailPassword: IUser): Promise<string> => {
    // valida se todos os campos estão preenchidos
    const { email, password } = emailPassword;
    if (!email || !password) throw new StructuredError('All fields must be filled', 400);
    // encripta senha recebida e compara com a senha do banco
    const userExists: IUser | any = await users.findOne({ where: { email } });
    if (!userExists) throw new StructuredError('Incorrect email or password', 401);
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) throw new StructuredError('Incorrect email or password', 401);
    // caso esteja tudo certo, gera token
    const { role } = userExists;
    const token = tokenManager.generateToken({ email, role });
    return token;
  };

  validateLogin = async (token: string): Promise<IUser> => {
    // verifica se o token é válido
    // const tokenCheck = token;
    // if (!tokenCheck) throw new StructuredError('Token not found', 401);
    const user = tokenManager.verifyToken(token);
    return user;
  };
}
