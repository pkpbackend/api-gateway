import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/all',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Kelompok Pengusul'] */

    const { accessTokenInternal } = res.locals
    const { query } = req

    const data = await Service.findAll(query, accessTokenInternal)

    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Kelompok Pengusul'] */
    
    const { accessTokenInternal } = res.locals
    const { id } = req.params

    const data = await Service.findById(id, accessTokenInternal)

    res.json(data)
  })
)

export default route
