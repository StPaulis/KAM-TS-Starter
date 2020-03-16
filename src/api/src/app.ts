import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaCors from 'koa-cors';
import mongoose from 'mongoose';
import {getEnviromentVariables} from './core/enviroment-variables';
import {httpErrorHandler} from './core/utils/http.utils';

const app = new Koa();
app.use(bodyParser());
app.use(KoaCors());

// #region Mongo
mongoose.connect(getEnviromentVariables().mongoConnection, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const dbConn = mongoose.connection;
dbConn.on('error', () => console.error('[MongoDB]: Connection error:'));
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
