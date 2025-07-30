import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'
import { TMP_PATH } from '../../../config/env'
import useMulter from '../../../hooks/useMulter'

const route = express.Router()

const uploadDokumen = useMulter({
  dest: `${TMP_PATH}/`,
}).fields([{ name: 'dokumen', maxCount: 1 }])

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
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

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findAllPaginate(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
        #swagger.description = 'Endpoint untuk export excel data pemanfaatan'
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

    const data = await Service.exportExcel(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/export/excel/kegiatan',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
        #swagger.description = 'Endpoint untuk export excel data kegiatan pemanfaatan'
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['sampaiTahun'] = {
          in: 'query',
          type: 'number',
        }
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.exportExcelKegiatan(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/getfiltertahun',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
        #swagger.description = 'Endpoint untuk getfiltertahun'
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.getFilterTahun(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/getfilterkuning',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
        #swagger.description = 'Endpoint untuk getfilterkuning'
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.getFilterKuning(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/getfilter',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
        #swagger.description = 'Endpoint untuk getfilterMaster'
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.getFilter(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/masterinput',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan'] */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.getMasterInput(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
        #swagger.description = 'Endpoint untuk mengambil detail Profile Pemanfaatan'
    */

    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.findById(id, req.query, accessTokenInternal)
    res.json(data)
  })
)

route.post(
  '/swadaya',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
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

    const data = await Service.createSwadaya(body, accessTokenInternal)
    res.status(201).json(data)
  })
)

route.post(
  '/rusus',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
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

    const data = await Service.createRusus(body, accessTokenInternal)
    res.status(201).json(data)
  })
)

route.post(
  '/rusun',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
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

    const data = await Service.createRusun(body, accessTokenInternal)
    res.status(201).json(data)
  })
)

route.post(
  '/ruk',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
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

    const data = await Service.createRuk(body, accessTokenInternal)
    res.status(201).json(data)
  })
)

route.put(
  '/swadaya/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
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

    const data = await Service.updateSwadaya(id, body, accessTokenInternal)
    res.json(data)
  })
)

route.put(
  '/rusus/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
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

    const data = await Service.updateRusus(id, body, accessTokenInternal)
    res.json(data)
  })
)

route.put(
  '/rusun/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
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

    const data = await Service.updateRusun(id, body, accessTokenInternal)
    res.json(data)
  })
)

route.put(
  '/ruk/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
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

    const data = await Service.updateRuk(id, body, accessTokenInternal)
    res.json(data)
  })
)

route.put(
  '/:id/dokumen',
  AuthMiddleware,
  uploadDokumen,
  AsyncHandler(async function handler(req, res) {
    /*	
        #swagger.tags = ['Pemanfaatan']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  nama: {
                    type: "string"
                  },
                  type: {
                    type: "string"
                  },
                  dokumen: {
                    type: "file"
                  },
                  keterangan: {
                    type: "string"
                  },
                },
                required: [
                  "nama",
                  "type",
                  "dokumen",
                ]
              }
            }
          } 
        }
    */

    const { accessTokenInternal } = res.locals

    const { id } = req.params
    const { nama, type, keterangan } = req.body
    const dokumen = req.files && req.files.dokumen ? req.files.dokumen[0] : null

    const data = await Service.uploadDokumen(
      id,
      {
        nama,
        type,
        dokumen,
        keterangan,
      },
      accessTokenInternal
    )

    res.json(data)
  })
)

route.put(
  '/:id/dokumen/info',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	
        #swagger.tags = ['Pemanfaatan']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nama: {
                    type: "string"
                  },
                  type: {
                    type: "string"
                  },
                  keterangan: {
                    type: "string"
                  },
                },
                required: [
                  "nama",
                  "type",
                  "keterangan",
                ]
              }
            }
          } 
        }
    */

    const { accessTokenInternal } = res.locals

    const { id } = req.params
    const { nama, type, keterangan } = req.body

    const data = await Service.updateDokumenInfo(
      id,
      {
        nama,
        type,
        keterangan,
      },
      accessTokenInternal
    )

    res.json(data)
  })
)

route.put(
  '/:id/status',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	
        #swagger.tags = ['Pemanfaatan']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "number"
                  },
                },
                required: [
                  "status",
                ]
              }
            }
          } 
        }
    */

    const { accessTokenInternal } = res.locals

    const { id } = req.params
    const { status } = req.body

    const data = await Service.updateStatus(
      id,
      {
        status,
      },
      accessTokenInternal
    )

    res.json(data)
  })
)

route.delete(
  '/:id/dokumen',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	
        #swagger.tags = ['Pemanfaatan']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  nama: {
                    type: "string"
                  },
                  type: {
                    type: "string"
                  },
                },
                required: [
                  "nama",
                  "type",
                ]
              }
            }
          } 
        }
    */

    const { accessTokenInternal } = res.locals

    const { id } = req.params
    const { nama, type } = req.body

    const data = await Service.deleteDokumen(
      id,
      {
        nama,
        type,
      },
      accessTokenInternal
    )

    res.json(data)
  })
)

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pemanfaatan']
        #swagger.description = 'Endpoint untuk menghapus data Pemanfaatan berdasarkan ID'
    */
    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.delete(id, accessTokenInternal)

    res.json(data)
  })
)

export default route
