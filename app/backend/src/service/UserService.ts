import * as bcrypt from 'bcryptjs';
import users from '../database/models/sequelizeUsers';
import tokenManager from '../helpers/tokenManager';
import StructuredError from '../errors/StructuredError';
import IUser from '../entities/Iuser.interface';
import AcocountService from './AccountService';

export default class UserService {
  makelogin = async (userPassword: IUser): Promise<string> => {
    // valida se todos os campos estão preenchidos
    const { username , password } = userPassword;
    if (!username || !password) throw new StructuredError('All fields must be filled', 400);
    // encripta senha recebida e compara com a senha do banco
    const userExists: IUser | any = await users.findOne({ where: { username } });
    if (!userExists) throw new StructuredError('Incorrect email or password', 401);
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) throw new StructuredError('Incorrect email or password', 401);
    // caso esteja tudo certo, gera token
    const { role } = userExists;
    const token = tokenManager.generateToken({ username});
    return token;
  };

  validateLogin = async (token: string): Promise<IUser> => {
    const { username } = tokenManager.verifyToken(token);
    const user = await users.findOne({ where: { username
    } });
    if (!user) throw new StructuredError('User not found', 404);   
    return user as unknown as IUser;
  };

  createUsers = async (user: IUser | any): Promise<string> => {  
    const { username , password  } = user; 
    // encripta senha recebida
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // verifica se o usuário já existe
    const userExists = await users.findOne({ where: { username } });
    if (userExists) throw new StructuredError('User already registered', 409);
    // caso esteja tudo certo, cria a conta com balance de 100
    const newAccount = await new AcocountService().createAccount({ balance: 100 });
    const { id } = newAccount;
    // caso esteja tudo certo, cria o usuário já vinclulado a conta
    await users.create({ username, password: hash, accountID: id });
    // gera token
    const token = tokenManager.generateToken({ username });
    return token;
  };



    
    



}
function userCheck(username: any, password: any) {
  if (!username || !password)
    throw new StructuredError('All fields must be filled', 400);
  if (username.length < 3)
    throw new StructuredError('Username must have at least 3 characters', 400);
  if (password.length < 8)
    throw new StructuredError('Password must have at least 8 characters', 400);
  //  a senha deve ter pelo menos um número e uma letra maiúscula
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password))
    throw new StructuredError('Password must have at least one uppercase letter and one number', 400);
}

