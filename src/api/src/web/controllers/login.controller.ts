import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';

export const loginController = async (ctx: Context, next: Next) => {
  ctx.body = {
    token: jwt.sign(
      {
        /* USER EXPOSED DATA */
      },
      'jwtSecret',
      { expiresIn: '1h' },
    ),
  };
  await next();
};
