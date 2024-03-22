
import {MidwayError} from "@midwayjs/core";

export class CustomError extends MidwayError {

    constructor(msg: string, code: string) {
        super(msg, code);
    }

}
