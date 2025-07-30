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
    /*  #swagger.tags = ['Pengusulan Dokumen']
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
    /*	#swagger.tags = ['Pengusulan Dokumen']
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
    /*	#swagger.tags = ['Pengusulan Dokumen']
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
    /* #swagger.tags = ['Pengusulan Dokumen'] */

    const { accessTokenInternal } = res.locals
    const { id } = req.params

    const data = await Service.delete(id, accessTokenInternal)

    res.json(data)
  })
)

route.get(
  '/serahterima',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Serah Terima'] */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findAllSerahTerima(query, accessTokenInternal)
    res.json(data)
  })
)

route.post(
  '/serahterima',
  AuthMiddleware,
  uploadFile,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Serah Terima']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  SerahTerimaId: {
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
                  status: {
                    type: "number",
                  },
                  type: {
                    type: "string",
                  },
                  file: {
                    type: "file"
                  }
                },
                required: [
                  "SerahTerimaId", 
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

    const data = await Service.createSerahTerima(
      body,
      file,
      accessTokenInternal
    )

    res.json(data)
  })
)

route.put(
  '/serahterima/:id',
  AuthMiddleware,
  uploadFile,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Serah Terima']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  SerahTerimaId: {
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
                  file: {
                    type: "file"
                  }
                },
                required: [
                  "SerahTerimaId", 
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

    const data = await Service.updateSerahTerima(
      id,
      body,
      file,
      accessTokenInternal
    )

    res.json(data)
  })
)

route.get(
  '/serahterima/:ModelId/s3url',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Serah Terima'] */

    const { ModelId } = req.params
    const { accessTokenInternal } = res.locals
    
    const data = await Service.getS3urlSerahTerimaZip(
      ModelId,
      accessTokenInternal
    )

    res.json(data)
  })
)

route.get(
  '/serahterima/:ModelId/download',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Serah Terima'] */

    const { ModelId } = req.params
    const { accessTokenInternal } = res.locals
    return await Service.downloadSerahTerimaZip(
      ModelId,
      accessTokenInternal,
      res
    )
  })
)

route.post(
  '/serahterima/validation',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Serah Terima']
        #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                SerahTerimaId: {
                  type: 'integer',
                  example: 1
                },
                masterDokumenIds: {
                  type: 'array',
                  items: {
                    type: 'integer',
                  }
                },
              },
              required: ['SerahTerimaId', 'masterDokumenIds']
            }
          }
        }
    } */

    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.validateSerahTerima(body, accessTokenInternal)
    res.status(200).json(data)
  })
)

export default route
