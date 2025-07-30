import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Pro Program'] */
    
    const { accessTokenInternal } = res.locals
    const data = await Service.findAll(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Pro Program'] */
    
    const { params } = req
    const data = await Service.findById(params.id, accessTokenInternal)

    res.json(data)
  })
)

export default route
