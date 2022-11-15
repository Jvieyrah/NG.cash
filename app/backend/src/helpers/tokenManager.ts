import * as JWT from 'jsonwebtoken';
import 'dotenv/config';
import IUser from '../entities/Iuser.interface';

const secret = process.env.JWT_SECRET as JWT.Secret;

export default class TokenManager {
  private static expiresIn = '24h';

  public static generateToken(payload: unknown): string {
    const jwtConfig: JWT.SignOptions = {
      expiresIn: TokenManager.expiresIn,
      algorithm: 'HS256',
    };
    return JWT.sign({ data: payload }, secret, jwtConfig);
  }

  public static verifyToken(token: string): IUser {
    if (!token) throw new Error('Token not found');
    const decoded = JWT.verify(token, secret);
    const { data } = decoded as { data: IUser };
    return data as IUser;
  }
}
