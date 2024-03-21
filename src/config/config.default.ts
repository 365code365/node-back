import {MidwayConfig} from '@midwayjs/core';

export default {
    // use for cookie sign key, should change to your own and keep security
    keys: '1711032485753_732',
    koa: {
        port: 7001,
    },
    typeorm: {
        dataSource: {
            default: {
                /**
                 * 单数据库实例
                 */
                type: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'whole_plat',
                synchronize: false,     // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
                logging: false,
                // 或者扫描形式
                entities: [
                    '**/entity/*.entity{.ts,.js}'
                ]
            }
        }
    }
} as MidwayConfig;
