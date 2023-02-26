import jwt from 'jsonwebtoken';
import Config from './config.util';

const tokenMinutesExpiration = Config.getTokenMinutesExpiration();
const tokenSecret = Config.getTokenSecret();
const tokenType = Config.getTokenType();

class JWTUtil {
  async generateToken(user) {
    const token = {};
    token.access_token = jwt.sign(
      {
        idRole: user.idRole,
        idUserRegister: user.id,
      },
      tokenSecret,
      { expiresIn: 60 * tokenMinutesExpiration }
    );

    token.token_type = tokenType;
    token.expires_in = 60 * tokenMinutesExpiration;
    token.date_time_expiration = new Date(
      +new Date() + 60 * tokenMinutesExpiration
    );

    return token;
  }
}

export default new JWTUtil();
