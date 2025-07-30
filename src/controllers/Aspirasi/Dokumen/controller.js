import express from 'express'
import { TMP_PATH } from '../../../config/env'
import AsyncHandler from '../../../helpers/AsyncHandler'
import useMulter from '../../../hooks/useMulter'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const uploadFile = useMulter({
  dest: `${TMP_PATH}/`,
}).fields([{ name: 'file', maxCount: 1 }])

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Aspirasi Dokumen']
        #swagger.parameters['model'] = {
          in: 'query',
          type: 'string',
          required: true,
          description: 'Filter by model.'
        } 
        #swagger.parameters['ModelId'] = {
          in: 'query',
          type: 'integer',
          required: true,
          description: 'Filter by ModelId.' 
        } 
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findAll(query, accessTokenInternal)
    res.json(data)
  })
)

route.post(
  '/',
  AuthMiddleware,
  uploadFile,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi Dokumen']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  model: {
                    type: "string",
                    example: "Vermin",
                    description: "Ex. Vermin, SerahTerima",
                  },
                  ModelId: {
                    type: "number",
                    example: 1,
                  },
                  UsulanId: {
                    type: "number",
                    example: 1,
                  },
                  MasterDokumenId: {
                    type: "number",
                    example: 1,
                  },
                  keterangan: {
                    type: "string",
                  },
                  lengkap: {
                    type: "number",
                  },
                  status: {
                    type: "number",
                  },
                  file: {
                    type: "file"
                  }
                },
                required: [
                  "UsulanId", 
                  "MasterDokumenId"
                ]
              }
            }
          } 
        }
    */

    const { accessTokenInternal } = res.locals
    const { body } = req
    const file = req.files && req.files.file ? req.files.file[0] : null

    const data = await Service.create(body, file, accessTokenInternal)

    res.json(data)
  })
)

route.put(
  '/:id',
  AuthMiddleware,
  uploadFile,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi Dokumen']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  model: {
                    type: "string",
                    example: "Vermin",
                    description: "Ex. Vermin, SerahTerima",
                  },
                  ModelId: {
                    type: "number",
                    example: 1,
                  },
                  UsulanId: {
                    type: "number",
                    example: 1,
                  },
                  MasterDokumenId: {
                    type: "number",
                    example: 1,
                  },
                  keterangan: {
                    type: "string",
                  },
                  lengkap: {
                    type: "number",
                  },
                  status: {
                    type: "number",
                  },
                  file: {
                    type: "file"
                  }
                },
                required: [
                  "model",
                  "ModelId",
                  "UsulanId", 
                  "MasterDokumenId"
                ]
              }
            }
          } 
        }
    */

    const { id } = req.params

    const { accessTokenInternal } = res.locals
    const { body } = req
    const file = req.files && req.files.file ? req.files.file[0] : null

    const data = await Service.update(id, body, file, accessTokenInternal)

    res.json(data)
  })
)

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Aspirasi Dokumen'] */
    
    const { accessTokenInternal } = res.locals
    const { id } = req.params

    const data = await Service.delete(id, accessTokenInternal)

    res.json(data)
  })
)

export default route
