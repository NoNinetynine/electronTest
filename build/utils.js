import fs from 'fs'
import path from 'path'

// 移除未使用的导入
/**
 * 是否是 dev 环境
 * @export
 * @param {string} mode
 * @return {boolean}
 */
export function isDevFn(mode) {
    return mode === 'development';
}

/**
 * 是否是 prod 环境
 * @export
 * @param {string} mode
 * @return {boolean}
 */
export function isProdFn(mode) {
    return mode === 'production';
}

/**
 * Read all environment variable configuration files to process.env
 */
export function wrapperEnv(envConf) {
    const ret = {};

    for (const envName of Object.keys(envConf)) {
        let realName = envConf[envName].replace(/\\n/g, '\n');
        realName = realName === 'true' ? true : realName === 'false' ? false : realName;

        ret[envName] = realName;
        if (typeof realName === 'string') {
            process.env[envName] = realName;
        } else if (typeof realName === 'object') {
            process.env[envName] = JSON.stringify(realName);
        }
    }
    return ret;
}
