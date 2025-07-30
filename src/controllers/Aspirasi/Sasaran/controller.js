import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/:id/vertek',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Aspirasi Sasaran'] */

    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.findVertekBySasaranId(id, accessTokenInternal)
    res.json(data)
  })
)

route.post(
  '/:id/vertek',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi Sasaran']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  UsulanId: {
                    type: "integer"
                  },
                  type: {
                    type: "string",
                    example: "vertekrusun"
                  }
                },
                required: [
                  "UsulanId"
                ]
              }
            }
          } 
        }
    */

    const { id } = req.params
    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.updateVertekBySasaranId(
      id,
      body,
      accessTokenInternal
    )
    res.status(201).json(data)
  })
)

export default route
