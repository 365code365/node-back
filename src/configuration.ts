import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import * as orm from '@midwayjs/typeorm';
// import {ResultMiddleware} from "./aware/ResultMiddleware";
import {SystemErrorFilter} from "./filter/systemError.filter";
import * as swagger from '@midwayjs/swagger';
import * as upload from '@midwayjs/upload';
import * as staticCache from 'koa-static-cache';
import * as path from "path";
import {ResultMiddleware} from "./aware/ResultMiddleware";

@Configuration({
  imports: [
    koa,
    validate,
    swagger,
    staticCache,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    orm,
    upload
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ResultMiddleware]);
    // add filter
    this.app.useFilter([SystemErrorFilter]);
    this.app.useMiddleware(require('@koa/cors')())
    this.app.use(
      staticCache({
        prefix: '/public/',
        dir: path.join(this.app.getAppDir(), 'public'),
        dynamic: true,
        preload: false,
        buffer: true,			// must true
        maxFiles: 1000,
      })
    );
  }
}
