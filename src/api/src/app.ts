import * as awilix from 'awilix';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaCors from 'koa-cors';
import mongoose from 'mongoose';
import { getEnviromentVariables } from './core/enviroment-variables';
import { containerRegistries } from './core/utils';
import { httpErrorHandler } from './core/utils/http.utils';
import { categoriesRouter, companiesRouter } from './web/routers';

const app = new Koa();
app.use(bodyParser());
app.use(KoaCors());

// #region Awilix
const container = awilix.createContainer();
container.register(containerRegistries);
// //#endregion

// #region Mongo
mongoose.connect(getEnviromentVariables().mongoConnection, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const dbConn = mongoose.connection;
dbConn.on('error', () => new Error('[MongoDB]: Connection error'));
dbConn.once('open', () => {
  console.log('[MongoDB]: Connected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('[MongoDB]: Disconnected due to application termination');
    process.exit(0);
  });
});
// #endregion

// #region Middleware To Inject Services To Scoped Context & Handle Errors
app.use(async (ctx, next) => {
  try {
    ctx.scope = container.createScope();
    await next();
  } catch (err) {
    httpErrorHandler(err, ctx);
  }
});
// #endregion

// #region Routers
app.use(categoriesRouter.routes());
app.use(companiesRouter.routes());
// //#endregion

export default app;
