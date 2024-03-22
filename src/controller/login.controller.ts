import {Controller, Inject, Post} from "@midwayjs/core";
import {Body} from "@midwayjs/core/dist/decorator/web/paramMapping";
import {UserEntity} from "../entity/plat/User.entity";
import {UserService} from "../service/user.service";


@Controller('/auth')
export class LoginController {


    @Inject()
    userService: UserService;

    @Post('/login')
    async login(@Body() body: UserEntity) {
        let res = this.userService.login(body)
        return res
    }

}
