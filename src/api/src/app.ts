import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaCors from 'koa-cors';
import { getEnviromentVariables } from './core/enviroment-variables';
import { httpErrorHandler } from './core/utils/http.utils';

const app = new Koa();
app.use(bodyParser());
app.use(KoaCors());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    httpErrorHandler(err, ctx);
  }
});

app.use(async ctx => {
  ctx.body = 'Server is up';
});

console.log('Server is listening in: ' + getEnviromentVariables().apiPort);
app.listen(getEnviromentVariables().apiPort);
