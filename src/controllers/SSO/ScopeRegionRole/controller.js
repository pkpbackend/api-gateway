import express from 'express'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import AsyncHandler from '../../../helpers/AsyncHandler'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['SSO Scope Region Role']
        #swagger.parameters['page'] = {
          in: 'query',
          type: 'number',
          description: 'Page number..' 
        } 
        #swagger.parameters['pageSize'] = {
          in: 'query',
          type: 'number',
          description: 'Limit per page.' 
        } 
        #swagger.parameters['name'] = {
          in: 'query',
          type: 'string',
          description: 'filter by name'  
        }
    */

    const { accessTokenInternal } = res.locals

    const data = await Service.findAll(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['SSO Scope Region Role'] */
    
    const { id } = req.params
    const { accessTokenInternal } = res.locals
    const data = await Service.findById(id, accessTokenInternal)
    res.json(data)
  })
)

export default route
