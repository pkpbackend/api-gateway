import express from 'express'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import AsyncHandler from '../../../helpers/AsyncHandler'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['FAQ']
        #swagger.description = 'Endpoint untuk mengambil data FAQ'
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
  '/:id',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['FAQ'] */
    const data = await Service.findOne(
      req.params.id,
      res.locals.accessTokenInternal
    )
    res.json(data)
  })
)

route.post(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['FAQ']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  question: {
                    type: "string"
                  },
                  answer: {
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
                  "question",
                  "answer",
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
    /*	#swagger.tags = ['FAQ']	
      #swagger.requestBody = {
      required: true,
      "@content": {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              question: {
                type: "string"
              },
              answer: {
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
              "question",
              "answer",
            ]
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
    /*	#swagger.tags = ['FAQ'] */
    const data = await Service.delete(
      res.locals.accessTokenInternal,
      req.params.id
    )
    res.json(data)
  })
)

export default route
