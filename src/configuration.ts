import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as orm from '@midwayjs/typeorm';
import {ResultMiddleware} from "./aware/ResultMiddleware";
import {SystemErrorFilter} from "./filter/systemError.filter";
import * as swagger from '@midwayjs/swagger';
import * as staticFile from '@midwayjs/static-file';

@Configuration({
  imports: [
    koa,
    validate,
    swagger,
    staticFile,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    orm,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware,ResultMiddleware]);
    // add filter
    this.app.useFilter([SystemErrorFilter]);
    this.app.useMiddleware(require('@koa/cors')())

  }
}
