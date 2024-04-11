import {Controller, Get, Inject, Post} from "@midwayjs/core";
import {Body} from "@midwayjs/core/dist/decorator/web/paramMapping";
import {UserEntity} from "../entity/User.entity";
import {UserService} from "../service/user.service";
import {BaseController} from "./base.controller";


@Controller('/auth')
export class LoginController extends BaseController {


    @Inject()
    userService: UserService;

    @Post('/login')
    async login(@Body() body: UserEntity) {
        let res = this.userService.login(body)
        return res
    }

    @Post('/register')
    async register(@Body() body: UserEntity) {
        let res = this.userService.register(body)
        return res
    }

    @Post('/batchCreateUser')
    async batchUser(@Body() body: UserEntity[]) {
        let res = this.userService.batchInsertUser(body)
        return res
    }


    @Get('/getAllUser')
    async getAllUser() {
      return this.userService.getAllUser()
    }

    @Post('/addRole')
    async addRole(@Body() user:UserEntity) {
      return this.userService.addRole(user)
    }

}
