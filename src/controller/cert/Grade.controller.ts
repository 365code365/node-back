import {Controller, Get, Inject} from "@midwayjs/core";
import {UserService} from "../../service/user.service";


@Controller('/grade')
export default class GradeController {

  @Inject()
  userService: UserService;
  @Get("/gradelist")
  async getGradeList() {
    return this.userService.gradelist();
  }
}
