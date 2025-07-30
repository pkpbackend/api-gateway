import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'
import useMulter from '../../../hooks/useMulter'
import { TMP_PATH } from '../../../config/env'

const uploadPengumumanFiles = useMulter({
  dest: `${TMP_PATH}/`,
}).fields([{ name: 'attachments', maxCount: 5 }])

const route = express.Router()

route.post(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pengumuman'] 
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
                    }
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

    const data = await Service.createPengumuman(body, accessTokenInternal)
    res.status(201).json(data)
  })
)

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Pengumuman'] 
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

    const data = await Service.findAllPengumuman(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Pengumuman'] */

    const { accessTokenInternal } = res.locals
    const { id } = req.params

    const data = await Service.findPengumumanById(id, accessTokenInternal)

    res.json(data)
  })
)

route.put(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pengumuman'] 
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
                    }
                  },
                }
              }
            } 
          }
      */

    const { id } = req.params
    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.updatePengumuman(id, body, accessTokenInternal)
    res.status(201).json(data)
  })
)

route.put(
  '/:id/pengumuman-files',
  AuthMiddleware,
  uploadPengumumanFiles,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pengumuman'] 
        #swagger.requestBody = {
            required: true,
            "@content": {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    attachments: {
                      type: "array",
                      items: {
                        type: "file"
                      }
                    }
                  },
                  required: [
                    "attachments"
                  ]
                }
              }
            } 
          }
      */

    const { id } = req.params
    const { accessTokenInternal } = res.locals
    let listFiles = []

    if (
      req.files &&
      req.files.attachments &&
      req.files.attachments.length > 0
    ) {
      listFiles = req.files.attachments.map(({ path, filename }) => ({
        path,
        filename,
      }))
    }

    const attachments = listFiles.length > 0 ? listFiles : null

    const data = await Service.uploadPengumumanFiles(
      id,
      attachments,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Pengumuman'] */
    
    const { accessTokenInternal } = res.locals
    const { id } = req.params

    const data = await Service.deletePengumuman(id, accessTokenInternal)

    res.json(data)
  })
)

export default route