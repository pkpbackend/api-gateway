import express from 'express'
import { APP_NAME } from '../../config/env'
import AsyncHandler from '../../helpers/AsyncHandler'

const route = express.Router()

route.get(
  '/',
  AsyncHandler(async function findAll(req, res) {
    /* #swagger.tags = ['Home'] */

    const SWAGGER_UI = '/v3/api-docs/'
    const API_DOCS_JSON = '/docs/swagger-output.json'
    return res.json({
      APP_NAME,
      SWAGGER_UI,
      API_DOCS_JSON,
    })
  })
)

export default route