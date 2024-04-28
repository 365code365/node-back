import {Controller, Fields, Files, Inject, Post} from "@midwayjs/core";
import {Context} from "@midwayjs/koa";
import * as path from "path";

const fs = require('fs').promises;

@Controller("/file")
export class FileController {

  @Inject()
  ctx: Context;


  @Post("/api/upload")
  async uploadFile(@Files() files, @Fields() fields) {

    //upload file save dir
    let filePath = path.dirname( path.dirname(__dirname))+"\\public";
    console.log('filePath',filePath)

    let file = files[0].data;
    let filename = file.split("\\")[file.split("\\").length-1];

    fs.copyFile(file, filePath+"\\"+filename)
    return {
      filename
    }
  }

}
