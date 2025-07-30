import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Penerima Manfaat']
        #swagger.parameters['DirektoratId'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Direktorat ID.' 
        } 
    */

    const data = await Service.findAll(req.query)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Penerima Manfaat'] */

    const { params } = req
    const data = await Service.findById(params.id)

    res.json(data)
  })
)

export default route
