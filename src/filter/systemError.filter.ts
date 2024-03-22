import {Catch, MidwayError} from '@midwayjs/core';
import {Context} from '@midwayjs/koa';
import {CustomError} from "../exception/CustomError";

@Catch(CustomError)
export class SystemErrorFilter {
    async catch(err: MidwayError, ctx: Context) {

        return {
            success: false,
            message: err.message,
            code: err.code
        };
    }
}
