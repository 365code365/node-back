import {Controller, Post} from "@midwayjs/core";
import {Body} from "@midwayjs/core/dist/decorator/web/paramMapping";
import {UserEntity} from "../entity/User.entity";


@Controller('/auth')
export class LoginController {


  @Post('/login')
  async login(@Body() body: UserEntity) {
    console.log('body', body)
    return body
  }

}
