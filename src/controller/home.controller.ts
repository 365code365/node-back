import {Controller, Get} from '@midwayjs/core';
import {BaseController} from "./base.controller";

@Controller('/')
export class HomeController extends BaseController {
    @Get('/')
    async home(): Promise<string> {
        return 'Hello Midwayjs!';
    }
}
