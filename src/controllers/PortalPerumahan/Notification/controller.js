import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Notification']
        #swagger.description = 'Endpoint untuk mengambil data Notifikasi'
        #swagger.parameters['page'] = {
          in: 'query',
          type: 'integer',
          description: 'Filter by page.'
        }
        #swagger.parameters['pageSize'] = {
          in: 'query',
          type: 'integer',
          description: 'Filter by pageSize.'
        }
        #swagger.parameters['filtered'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by filtered.'
        }
        #swagger.parameters['sorted'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by sorted.'
        }
    */
    const accessTokenInternal = res.locals.accessTokenInternal
    const data = await Service.getByUser(req, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Notification']
        #swagger.description = 'Endpoint untuk mengambil data detail Notifikasi berdasarkan id atau key'
    */
    const accessTokenInternal = res.locals.accessTokenInternal
    const data = await Service.getDetail(req, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/read/all',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Notification']
        #swagger.description = 'Endpoint untuk menandai semua notifikasi telah dibaca'
    */
    const accessTokenInternal = res.locals.accessTokenInternal
    const data = await Service.readAll(accessTokenInternal)
    res.json(data)
  })
)

export default route
