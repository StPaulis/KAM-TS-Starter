import Router = require('koa-router');
import {
  loginController,
} from '../controllers/login.controller';

export const authRouter = new Router({
  prefix: '/api/auth',
});

/**
 * @api {post} /api/auth/login
 * @apiName Simple login
 * @apiDescription Mock login without any credentials or userState
 * @apiGroup Auth
 * @apiParamExample {json} Request-Example:
 * {}
 * @apiSuccessExample {json} Success-Response:
 * {
 *   token: string;
 * }
 */
authRouter.post('/login', loginController);
