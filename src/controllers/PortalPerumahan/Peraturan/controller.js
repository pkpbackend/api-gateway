import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import useMulter from '../../../hooks/useMulter'
import { TMP_PATH } from '../../../config/env'
import Service from './service'

const uploadPeraturanAttachments = useMulter({
  dest: `${TMP_PATH}/`,
}).fields([{ name: 'attachments[]', maxCount: 10 }])

const route = express.Router()

route.get(
  '/all',
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Peraturan'] */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findAll(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/',
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Peraturan'] 
        #swagger.parameters['page'] = {
          in: 'query',
          type: 'integer',
          description: 'Page number.' 
        } 
        #swagger.parameters['pageSize'] = {
          in: 'query',
          type: 'integer',
          description: 'Limit per page.' 
        } 
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findAllPaginate(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Peraturan'] */

    const { accessTokenInternal } = res.locals
    const { id } = req.params

    const data = await Service.findById(id, accessTokenInternal)

    res.json(data)
  })
)

route.post(
  '/',
  AuthMiddleware,
  uploadPeraturanAttachments,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Peraturan'] 
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
                    type: {
                      type: "integer"
                    },
                    urgencyScale: {
                      type: "integer"
                    },
                  },
                  required: [
                    "title",
                    "description",
                    "type",
                    "urgencyScale"
                  ]
                }
              }
            } 
          }
      */

    const { body } = req
    const { accessTokenInternal } = res.locals

    const attachments =
      req.files && req.files['attachments[]']
        ? req.files['attachments[]']
        : null

    const data = await Service.create(body, attachments, accessTokenInternal)
    res.status(201).json(data)
  })
)

route.put(
  '/:id',
  AuthMiddleware,
  uploadPeraturanAttachments,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Peraturan'] 
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
                    type: {
                      type: "integer"
                    },
                    urgencyScale: {
                      type: "integer"
                    },
                    deleteAttachments: {
                      type: "array",
                      items: { type: "string" }
                    },
                  },
                }
              }
            } 
          }
      */

    const { id } = req.params
    const { body } = req
    const { accessTokenInternal } = res.locals

    const attachments =
      req.files && req.files['attachments[]']
        ? req.files['attachments[]']
        : null

    const data = await Service.update(
      id,
      body,
      attachments,
      accessTokenInternal
    )
    res.status(201).json(data)
  })
)

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Peraturan'] */

    const { accessTokenInternal } = res.locals
    const { id } = req.params

    const data = await Service.deleteById(id, accessTokenInternal)

    res.json(data)
  })
)

export default route
