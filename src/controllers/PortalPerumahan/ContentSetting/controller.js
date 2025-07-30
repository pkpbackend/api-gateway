import express from 'express'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import AsyncHandler from '../../../helpers/AsyncHandler'
import Service from './service'
import useMulter from '../../../hooks/useMulter'
import { TMP_PATH } from '../../../config/env'

const route = express.Router()

const uploadDoc = useMulter({
  dest: `${TMP_PATH}/`,
}).fields([{ name: 'document', maxCount: 1 }])

route.get(
  '/',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pengaturan']
        #swagger.description = 'Endpoint untuk mengambil data Pengaturan'
        #swagger.parameters['page'] = {
          in: 'query',
          type: 'integer',
          description: 'Filter by page.'
        }
        #swagger.parameters['pageSize'] = {
          in: 'query',
          type: 'integer',
          description: 'Filter by pageSize.'
        }
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
    const data = await Service.findAll(req)
    res.json(data)
  })
)

route.get(
  '/',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pengaturan']
        #swagger.description = 'Endpoint untuk mengambil data detail Pengaturan berdasarkan id atau key'
    */
    const data = await Service.findOne(req)
    res.json(data)
  })
)

route.post(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pengaturan']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string"
                  },
                  description: {
                    type: "string"
                  },
                  status: {
                    type: "boolean"
                  },
                  position: {
                    type: "integer"
                  },
                },
                required: [
                  "title",
                  "description",
                ]
              }
            },
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  document: {
                    type: "string",
                    format: "binary"
                  },
                },
                required: [
                  "document"
                ]
              }
            }
          } 
        }
    */
    const data = await Service.create(res.locals.accessTokenInternal, req.body)
    res.json(data)
  })
)

route.put(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pengaturan']	
      #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: {
                type: "string"
              },
              description: {
                type: "string"
              },
              status: {
                type: "boolean"
              },
              position: {
                type: "integer"
              },
            },
            required: [
              "title",
              "description",
            ]
          }
        },
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              document: {
                type: "string",
                format: "binary"
              },
            },
            required: []
          }
        }
      }
    }
    */

    const data = await Service.update(
      res.locals.accessTokenInternal,
      req.body,
      req.params.id
    )
    res.json(data)
  })
)

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pengaturan'] */
    const data = await Service.delete(
      res.locals.accessTokenInternal,
      req.params.id
    )
    res.json(data)
  })
)

route.post(
  '/upload',
  AuthMiddleware,
  uploadDoc,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pengaturan']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  document: {
                    type: "file"
                  }
                },
                required: [
                  "document"
                ]
              }
            }
          } 
        }
    */

    const { accessTokenInternal } = res.locals
    const doc = req.files && req.files.document ? req.files.document[0] : null

    const data = await Service.uploadDoc(doc, accessTokenInternal)

    res.json(data)
  })
)

export default route
