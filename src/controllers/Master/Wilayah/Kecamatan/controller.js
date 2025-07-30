import express from 'express'
import AsyncHandler from '../../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Wilayah']
        #swagger.parameters['CityId'] = {
          in: 'query',
          type: 'integer',
          description: 'Filter by City ID.' 
        } 
    */

    const data = await Service.findAll(req.query)
    res.json(data)
  })
)

route.get(
  '/:id',
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Wilayah'] */
    
    const { params } = req
    const data = await Service.findById(params.id)

    res.json(data)
  })
)

export default route
