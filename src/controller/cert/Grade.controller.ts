import {Controller, Get, Inject} from "@midwayjs/core";
import {UserService} from "../../service/user.service";


@Controller('/grade')
export default class GradeController {

  @Inject()
  userService: UserService;
  @Get("/gradeList")
  async getGradeList() {
    return this.userService.gradeList();
  }
}
