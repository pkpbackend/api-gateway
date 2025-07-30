import express from 'express'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import AsyncHandler from '../../../helpers/AsyncHandler'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Banner'] */
    const data = await Service.findAll()
    res.json(data)
  })
)

route.get(
  '/published',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Banner'] */
    const data = await Service.findAllPublished(res.locals.accessTokenInternal)
    res.json(data)
  })
)

export default route
