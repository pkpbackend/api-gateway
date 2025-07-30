import express from 'express'
import AsyncHandler from '../../helpers/AsyncHandler'
import Service from './service'

const route = express.Router()

// Module ExBanper

route.get(
  '/check-otp/:token',
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Pengusulan'] */
    const { token } = req.params

    const data = await Service.checkOTP(token)
    res.json(data)
  })
)

route.post(
  '/create-usulan/:token_otp',
  AsyncHandler(async function handler(req, res) {
    /*	
        #swagger.tags = ['Pengusulan']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  DirektoratId: {
                    type: "integer",
                    example: "1"
                  },
                  jenisData: {
                    type: "integer",
                    example: "2"
                  },
                  tahunUsulan: {
                    type: "integer",
                    example: "2022"
                  },
                  noSurat: {
                    type: "string",
                    example: "test2"
                  },
                  tanggalSurat: {
                    type: "string",
                    example: "2023-05-25"
                  },
                  telpPicPengusul: {
                    type: "string",
                    example: "08312389"
                  },
                  emailPicPengusul: {
                    type: "string",
                    example: "tester@mail.com"
                  },
                  jabatanPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  namaPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  instansi: {
                    type: "string",
                    example: "Pengembangan SIBARU"
                  },
                  alamatInstansi: {
                    type: "string",
                    example: "Kementerian PUPR"
                  },
                  latitude: {
                    type: "string",
                    example: "-0.492559"
                  },
                  longitude: {
                    type: "string",
                    example: "102.248466"
                  },
                  ProvinsiId: {
                    type: "integer",
                    example: "14"
                  },
                  CityId: {
                    type: "integer",
                    example: "1402"
                  },
                  KecamatanId: {
                    type: "integer",
                    example: "140202"
                  },
                  DesaId: {
                    type: "integer",
                    example: "1402022001"
                  },
                  jumlahUnit: {
                    type: "integer",
                    example: "10"
                  },
                  jumlahTower: {
                    type: "integer",
                    example: "1"
                  },
                  PenerimaManfaatId: {
                    type: "integer",
                    example: "15"
                  }
                },
                required: [
                  "DirektoratId"
                ]
              }
            }
          } 
        }
    */

    const { token_otp } = req.params
    const { body } = req

    const data = await Service.createUsulanWithOTP(body, token_otp)
    res.status(201).json(data)
  })
)

export default route
