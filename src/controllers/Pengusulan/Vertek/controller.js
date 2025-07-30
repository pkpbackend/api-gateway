import express from 'express'
import { TMP_PATH } from '../../../config/env'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import useMulter from '../../../hooks/useMulter'
import Service from './service'

const uploadDataLapangan22 = useMulter({
  dest: `${TMP_PATH}/`,
}).fields([
  { name: 'fileFoto', maxCount: 1 },
  { name: 'fileVertek', maxCount: 1 },
  { name: 'dataLapangan22', maxCount: 1 },
])

const route = express.Router()

route.put(
  '/:id',
  AuthMiddleware,
  uploadDataLapangan22,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Pengusulan Vertek']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  UsulanId: {
                    type: "integer",
                    example: 1,
                  },
                  SasaranId: {
                    type: "integer",
                    example: 1,
                  },
                  type: {
                    type: "string",
                    example: "vertekrusun"
                  },
                  keterangan: {
                    type: "string",
                  },
                  namaPupr: {
                    type: "string",
                  },
                  jabatanPupr: {
                    type: "string",
                  },
                  nipPupr: {
                    type: "string",
                  },
                  telponPupr: {
                    type: "string",
                  },
                  namaSnvt: {
                    type: "string",
                  },
                  jabatanSnvt: {
                    type: "string",
                  },
                  nipSnvt: {
                    type: "string",
                  },
                  telponSnvt: {
                    type: "string",
                  },
                  namaPejKabKota: {
                    type: "string",
                  },
                  jabatanPejKabKota: {
                    type: "string",
                  },
                  nipPejKabKota: {
                    type: "string",
                  },
                  telponPejKabKota: {
                    type: "string",
                  },
                  tglSurvei: {
                    type: "string",
                    example: "2023-1-1",
                  },
                  surveyor: {
                    type: "string",
                  },
                  proposalAsli: {
                    type: "boolean",
                    example: true,
                  },
                  legalitasLahan: {
                    type: "boolean",
                    example: true,
                  },
                  sesuaiRTRW: {
                    type: "boolean",
                    example: true,
                  },
                  sesuaiMasterPlan: {
                    type: "boolean",
                    example: true,
                  },
                  kondisi: {
                    type: "string",
                  },
                  perkerasanJalan: {
                    type: "string",
                  },
                  sumberListrik: {
                    type: "string",
                  },
                  sumberAir: {
                    type: "string",
                  },
                  jarakKepusatKegiatan: {
                    type: "string",
                  },
                  kondisiTanah: {
                    type: "string",
                  },
                  kelayakanTeknis: {
                    type: "boolean",
                    example: true,
                  },
                  namaLokasiDetail: {
                    type: "string",
                  },
                  titikKoordinat: {
                    type: "string",
                  },
                  peruntukan: {
                    type: "string",
                  },
                  tglVertek: {
                    type: "string",
                    example: "2023-1-1",
                  },
                  statusLahan: {
                    type: "string",
                  },
                  rtrw: {
                    type: "string",
                  },
                  luasLahan: {
                    type: "string",
                  },
                  luasLahan: {
                    type: "string",
                  },
                  kondisiLahan: {
                    type: "string",
                  },
                  jauhLahanDariJalanUtama: {
                    type: "string",
                  },
                  sumberAirBersih: {
                    type: "string",
                  },
                  sumberPenerbanganDanJarakGardu: {
                    type: "string",
                  },
                  aksesSaluranPembuangan: {
                    type: "string",
                  },
                  groundJarak: {
                    type: "string",
                  },
                  sitePlant: {
                    type: "string",
                  },
                  jenisTanah: {
                    type: "string",
                  },
                  tipologiPermukaanTanah: {
                    type: "string",
                  },
                  rawanBencana: {
                    type: "string",
                  },
                  catatan: {
                    type: "string",
                  },
                  fileFoto: {
                    type: "file"
                  },
                  fileVertek: {
                    type: "file"
                  },
                  dataLapangan22: {
                    type: "file"
                  },
                  status: {
                    type: "integer",
                    example: 1,
                  },
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

    const fileFoto =
      req.files && req.files.fileFoto ? req.files.fileFoto[0] : null
    const fileVertek =
      req.files && req.files.fileVertek ? req.files.fileVertek[0] : null
    const dataLapangan22 =
      req.files && req.files.dataLapangan22 ? req.files.dataLapangan22[0] : null

    const data = await Service.update(
      id,
      body,
      fileFoto,
      fileVertek,
      dataLapangan22,
      accessTokenInternal
    )

    res.json(data)
  })
)

export default route
