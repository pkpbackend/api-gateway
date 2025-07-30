import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import useMulter from '../../../hooks/useMulter'
import { TMP_PATH } from '../../../config/env'
import SerahTerimaService from './service'

const route = express.Router()

const uploadSpreadsheetFile = useMulter({
  dest: `${TMP_PATH}/`,
}).fields([{ name: 'spreadsheetFile', maxCount: 1 }])

route.post(
  '/import',
  AuthMiddleware,
  uploadSpreadsheetFile,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Serah Terima']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  spreadsheetFile: {
                    type: "file"
                  },
                },
                required: [
                  "spreadsheetFile", 
                ]
              }
            }
          } 
        }
    */
    const { accessTokenInternal } = res.locals
    const spreadsheetFile =
      req.files && req.files.spreadsheetFile ? req.files.spreadsheetFile[0] : null

    const data = await SerahTerimaService.importSpreadsheetFile(spreadsheetFile, accessTokenInternal)
    res.status(201).json(data)
  })
)

route.post(
  '/rusus',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Serah Terima']
          #swagger.requestBody = {
            required: true,
            "@content": {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id_program: {
                      type: "number",
                    },
                    id_kegiatan: {
                      type: "number",
                    },
                    id_type: {
                      type: "number",
                    },
                  },
                  required: [
                    "id_program", 
                    "id_kegiatan",
                    "id_type",
                  ]
                }
              }
            } 
          }
        */
    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await SerahTerimaService.createRusus(body, accessTokenInternal)
    res.status(201).json(data)
  })
)

route.put(
  '/rusus/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Serah Terima']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id_program: {
                    type: "number",
                  },
                  id_kegiatan: {
                    type: "number",
                  },
                  id_type: {
                    type: "number",
                  },
                },
                required: [
                  "id_program", 
                  "id_kegiatan",
                  "id_type",
                ]
              }
            }
          } 
        }
    */

    const { id } = req.params
    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await SerahTerimaService.updateRusus(
      id,
      body,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.post(
  '/:id/comment',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Serah Terima']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                  },
                },
                required: [
                  "message",
                ]
              }
            }
          } 
        }
    */

    const { id } = req.params
    const { message } = req.body
    const { accessTokenInternal } = res.locals

    const data = await SerahTerimaService.createComment(
      id,
      { message },
      accessTokenInternal
    )
    res.status(201).json(data)
  })
)

route.get(
  '/:id/download-pdf',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Serah Terima'] */

    const { id } = req.params
    const { accessTokenInternal } = res.locals
    return await SerahTerimaService.downloadSerahTerimaPdf(
      id,
      accessTokenInternal,
      res
    )
  })
)

route.get(
  '/dashboard',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Serah Terima'] */

    const { accessTokenInternal } = res.locals
    const data = await SerahTerimaService.getSerahTerimaDashboard(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/dashboard/list',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Serah Terima'] */

    const { accessTokenInternal } = res.locals
    const data = await SerahTerimaService.getSerahTerimaListDashboard(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/dashboard/map',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Serah Terima'] */

    const { accessTokenInternal } = res.locals
    const data = await SerahTerimaService.getDashboardMap(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Serah Terima']
        #swagger.description = 'Endpoint untuk export excel data serah terima'
        #swagger.parameters['filtered'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by filtered.'
        }
        #swagger.parameters['sorted'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by sorted.'
        }
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await SerahTerimaService.exportExcel(
      query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.post(
  '/notification',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Serah Terima']
          #swagger.requestBody = {
            required: true,
            "@content": {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    serahTerimaId: {
                      type: "number",
                    },
                    value: {
                      type: "string",
                    },
                  },
                  required: [
                    "serahTerimaId", 
                    "value",
                  ]
                }
              }
            } 
          }
        */
    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await SerahTerimaService.sendNotification(
      body,
      accessTokenInternal
    )
    res.json(data)
  })
)

export default route
