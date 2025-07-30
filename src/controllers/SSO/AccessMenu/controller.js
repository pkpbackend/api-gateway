import express from 'express'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import AsyncHandler from '../../../helpers/AsyncHandler'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['SSO Access Menu'] */

    const { accessTokenInternal } = res.locals

    const data = await Service.findAll(req.query, accessTokenInternal)
    res.json(data)
  })
)

export default route
