import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Konreg Pool']
        #swagger.tags = ['Pengusulan']
        #swagger.parameters['page'] = {
          in: 'query',
          type: 'integer',
          description: 'Page number.' 
        } 
        #swagger.parameters['pageSize'] = {
          in: 'query',
          type: 'integer',
          description: 'Limit per page.' 
        } 
    */
    const { query } = req
    const { accessTokenInternal } = res.locals
    const data = await Service.getList(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Konreg Pool'] */
    const { id } = req.params
    const { accessTokenInternal } = res.locals
    const data = await Service.getDetail(id, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/sync-usulan/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Konreg Pool'] */
    const { id } = req.params
    const { query } = req
    const { accessTokenInternal } = res.locals
    const data = await Service.syncSikonreg(id, query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	 #swagger.tags = ['Konreg Pool'] */
    const { query } = req
    const { accessTokenInternal } = res.locals
    const data = await Service.exportExcel(query, accessTokenInternal)
    res.json(data)
  })
)

export default route
