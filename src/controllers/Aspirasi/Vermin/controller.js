import express from 'express'
import { TMP_PATH } from '../../../config/env'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import useMulter from '../../../hooks/useMulter'
import Service from './service'

const route = express.Router()

const uploadFilePdf = useMulter({
  dest: `${TMP_PATH}/`,
}).fields([{ name: 'filePdf', maxCount: 1 }])

route.put(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi Vermin']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  UsulanId: {
                    type: "integer",
                    example: 1,
                  },
                  status: {
                    type: "integer"
                  },
                  keterangan: {
                    type: "string"
                  },
                  suratPermohonan: {
                    type: "boolean"
                  },
                  proposal: {
                    type: "boolean"
                  },
                  fcSertifikatTanah: {
                    type: "boolean"
                  },
                  statusTanah: {
                    type: "string"
                  },
                  statusTanahKet: {
                    type: "string"
                  },
                  luasTanah: {
                    type: "string"
                  },
                  catatan: {
                    type: "string"
                  },
                  KroId: {
                    type: "integer"
                  },
                  RoId: {
                    type: "integer"
                  },
                  anggaran: {
                    type: "integer"
                  },
                  uraian: {
                    type: "string"
                  },
                  TematikIds: {
                    type: "array",
                    items: { type: "integer" }
                  }
                },
                required: [
                  "UsulanId"
                ]
              }
            }
          } 
        }
    */

    const { id } = req.params
    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.update(id, body, accessTokenInternal)
    res.json(data)
  })
)

route.post(
  '/notification-email',
  AuthMiddleware,
  uploadFilePdf,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi Vermin']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  VerminId: {
                    type: "integer"
                  },
                  ditRususVerminId: {
                    type: "integer"
                  },
                  filePdf: {
                    type: "file"
                  },
                },
              }
            }
          } 
        }
    */

    const { VerminId, ditRususVerminId } = req.body
    const { accessTokenInternal } = res.locals

    const filePdf = req.files && req.files.filePdf ? req.files.filePdf[0] : null

    const data = await Service.notificationEmail(
      { VerminId, ditRususVerminId },
      filePdf,
      accessTokenInternal
    )

    res.json(data)
  })
)

export default route
