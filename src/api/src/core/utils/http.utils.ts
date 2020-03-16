import {Context, Next} from 'koa';

export function httpErrorHandler(error: Error, ctx: Context) {
    ctx.status = 500;
    ctx.body = error.message;
    ctx.app.emit('error', error, ctx);
}
