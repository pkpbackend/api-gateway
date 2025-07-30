import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/all',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Kondisi Bangunan'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.findAll(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Kondisi Bangunan'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.findAllPaginate(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Kondisi Bangunan'] */
    const { params } = req
    const { accessTokenInternal } = res.locals
    const data = await Service.findById(params.id, accessTokenInternal)

    res.json(data)
  })
)

export default route
