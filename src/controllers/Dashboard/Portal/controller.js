import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/flpp/summary',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard']
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['sampaiTahun'] = {
          in: 'query',
          type: 'number',
        } 
    */

    const { accessTokenInternal } = res.locals
    const data = await Service.findFlppSummary(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/backlog/summary',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard']
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['sampaiTahun'] = {
          in: 'query',
          type: 'number',
        } 
    */

    const { accessTokenInternal } = res.locals
    const data = await Service.findBacklogSummary(req.query, accessTokenInternal)
    res.json(data)
  })
)

export default route
