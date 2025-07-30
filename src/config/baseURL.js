import chalk from 'chalk'

export const BASE_URL_CLIENT = process.env.BASE_URL_CLIENT ?? 'http://localhost:3000'
export const BASE_URL_SERVER = process.env.BASE_URL_SERVER ?? 'http://localhost:8000'

export const LOG_SERVER = chalk.green('[server]')