import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/:type',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Prioritas'] */

    const { type } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.findPrioritasByType(type, accessTokenInternal)
    res.json(data)
  })
)

route.post(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Prioritas']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  usulanId: {
                    type: "integer"
                  },
                  prioritasJenis: {
                    type: "array",
                    items: { type: "integer" }
                  },
                  prioritasRangkaianPemrograman: {
                    type: "array",
                    items: { type: "integer" }
                  },
                },
                required: [
                  "usulanId"
                ]
              }
            }
          } 
        }
    */

    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.update(body, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Prioritas'] */
    const { query } = req
    const { accessTokenInternal } = res.locals
    const data = await Service.exportExcel(query, accessTokenInternal)
    res.json(data)
  })
)

export default route
