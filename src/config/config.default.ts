import {MidwayConfig} from '@midwayjs/core';

export default {
    // use for cookie sign key, should change to your own and keep security
    keys: '1711032485753_732',
    koa: {
        port: 7001,
    },
    cors: {
        credentials: true,
        origin: '*',
        allowHeaders: '*',
        allowMethods: '*',
    },
    typeorm: {
        dataSource: {
            default: {
                type: 'mysql',
                host: '192.168.31.153',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'whole_plat',
                synchronize: false,
                logging: false,
                entities: [
                    '**/entity/*.entity{.ts,.js}',
                    '**/entity/**/*.entity{.ts,.js}'
                ]
            }
        }
    },
    middleware:['errorHandler'],
  staticFile: {
    dirs: {
      default: {
        prefix: '/public',
        alias: {
          '/': '/public/index.html',
        },
      },
    },
    // ...
  },
} as MidwayConfig;
