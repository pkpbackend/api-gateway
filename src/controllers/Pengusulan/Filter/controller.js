import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/tahunusulan',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Filter'] */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findAllTahunUsulan(query, accessTokenInternal)
    res.json(data)
  })
)

export default route
