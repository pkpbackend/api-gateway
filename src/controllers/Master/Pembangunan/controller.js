import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'
import useMulter from '../../../hooks/useMulter'
import { TMP_PATH } from '../../../config/env'

const route = express.Router()

const uploadDokumen = useMulter({
  dest: `${TMP_PATH}/`,
}).fields([{ name: 'dokumen', maxCount: 1 }])

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Pembangunan'] */

    const data = await Service.getPaginate(req.query)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Pembangunan'] */

    const { params } = req
    const data = await Service.getDetail(params.id)

    res.json(data)
  })
)

route.put(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Pembangunan'] 
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  deviasiPresentaseFisik: {
                    type: "string",
                  },
                  deviasiPresentaseKeuangan: {
                    type: "string",
                  },
                  jenisKontrak: {
                    type: "string",
                  },
                  metodePemilihan: {
                    type: "string",
                  },
                  prognosisKeuangan: {
                    type: "string",
                  },
                  prognosisPresentaseFisik: {
                    type: "string",
                  },
                  prognosisPresentaseKeuangan: {
                    type: "string",
                  },
                  rencanaTindakLanjut: {
                    type: "string",
                  }, 
                },
                required: []
              }
            }
          }
        }
    */

    const { id } = req.params
    const { body } = req
    const data = await Service.update(id, body)
    res.json(data)
  })
)

route.get(
  '/filter/list',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Pembangunan'] */
    const data = await Service.getFilter()
    res.json(data)
  })
)

route.get(
  '/lokasi/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Pembangunan'] */

    const { id } = req.params
    const data = await Service.getLokasiDetail(id)
    res.json(data)
  })
)

route.post(
  '/lokasi',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Pembangunan'] 
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  EmonTableId: {
                    type: "number",
                  },
                  TematikId: {
                    type: "string",
                  },
                  alamat: {
                    type: "string",
                  },
                  kontraktor: {
                    type: "string",
                  },
                  koordX: {
                    type: "string",
                  },
                  koordY: {
                    type: "string",
                  },
                  mk: {
                    type: "string",
                  },
                  nilaiKontrakKontraktor: {
                    type: "string",
                  },
                  nilaiKontrakMk: {
                    type: "string",
                  },
                  pekerjaaanSaatIni: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  permasalahan: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  sisahWaktuPelaksanaan: {
                    type: "number",
                  },
                  tanggalKontrakKontraktor: {
                    type: "string",
                  },
                  tanggalKontrakMk: {
                    type: "string",
                  },
                  tindakLanjut: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  tipe: {
                    type: "string",
                  },
                  totalWaktuPelaksanaan: {
                    type: "number",
                  },
                  tower: {
                    type: "number",
                  },
                  unit: {
                    type: "number"
                  },
                  waktuBerjalanPelaksanaan: {
                    type: "number",
                  }
                },
                required: [
                  "EmonTableId",
                ]
              }
            }
          }
        }
    */

    const { body } = req
    const data = await Service.createLokasi(body)
    res.json(data)
  })
)

route.put(
  '/lokasi/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Pembangunan'] 
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  EmonTableId: {
                    type: "number",
                  },
                  TematikId: {
                    type: "string",
                  },
                  alamat: {
                    type: "string",
                  },
                  kontraktor: {
                    type: "string",
                  },
                  koordX: {
                    type: "string",
                  },
                  koordY: {
                    type: "string",
                  },
                  mk: {
                    type: "string",
                  },
                  nilaiKontrakKontraktor: {
                    type: "string",
                  },
                  nilaiKontrakMk: {
                    type: "string",
                  },
                  pekerjaaanSaatIni: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  permasalahan: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  sisahWaktuPelaksanaan: {
                    type: "number",
                  },
                  tanggalKontrakKontraktor: {
                    type: "string",
                  },
                  tanggalKontrakMk: {
                    type: "string",
                  },
                  tindakLanjut: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  tipe: {
                    type: "string",
                  },
                  totalWaktuPelaksanaan: {
                    type: "number",
                  },
                  tower: {
                    type: "number",
                  },
                  unit: {
                    type: "number"
                  },
                  waktuBerjalanPelaksanaan: {
                    type: "number",
                  }
                },
                required: [
                  "EmonTableId",
                ]
              }
            }
          }
        }
    */

    const { id } = req.params
    const { body } = req
    const data = await Service.updateLokasi(id, body)
    res.json(data)
  })
)

route.delete(
  '/lokasi/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Pembangunan'] */

    const { id } = req.params
    const data = await Service.deleteLokasi(id)
    res.json(data)
  })
)

route.post(
  '/lokasi/:id/dokumen',
  AuthMiddleware,
  uploadDokumen,
  AsyncHandler(async function handler(req, res) {
    /*	
        #swagger.tags = ['Pembangunan']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  type: {
                    type: "string"
                  },
                  dokumen: {
                    type: "file"
                  },
                },
                required: [
                  "type",
                  "dokumen",
                ]
              }
            }
          } 
        }
    */

    const { id } = req.params
    const { type } = req.body
    const dokumen = req.files && req.files.dokumen ? req.files.dokumen[0] : null

    const data = await Service.uploadDokumen(id, {
      type,
      dokumen,
    })

    res.json(data)
  })
)

route.get(
  '/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	 #swagger.tags = ['Pembangunan'] */
    const { query } = req
    const data = await Service.exportExcel(query)
    res.json(data)
  })
)

route.get(
  '/:id/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	 #swagger.tags = ['Pembangunan'] */
    const { id } = req.params
    const data = await Service.exportExcelDetail(id)
    res.json(data)
  })
)

export default route
