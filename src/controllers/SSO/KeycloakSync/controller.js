import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import Service from './service'
import SyncMiddleware from '../../../middlewares/SyncMiddleware'

const route = express.Router()

route.get(
  '/imported-users',
  SyncMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['SSO Sync']
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
    */

    const data = await Service.findAll(req.query)
    res.json(data)
  })
)

route.post(
  '/import-users',
  SyncMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['SSO Sync'] */

    const data = await Service.store()

    res.json(data)
  })
)

route.post(
  '/update-users',
  SyncMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['SSO Sync'] */

    const data = await Service.update()

    res.json(data)
  })
)

route.delete(
  '/delete-all-users',
  SyncMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['SSO Sync'] */
    
    const data = await Service.delete(req.query)
    res.json(data)
  })
)

export default route
