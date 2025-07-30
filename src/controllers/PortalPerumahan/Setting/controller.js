import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/group',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Setting'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.findAllSettingGroups(accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:key',
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Setting'] */
    const { key } = req.params
    const data = await Service.findSettingByKey(key)
    res.json(data)
  })
)

route.put(
  '/:key',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Setting']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  value: {
                    type: "string"
                  },
                },
              },
            },
          }
        }
    */
    const { accessTokenInternal } = res.locals
    const { key } = req.params
    const { value } = req.body
    const data = await Service.updateSettingByKey(key, value, accessTokenInternal)
    res.json(data)
  })
)

export default route
