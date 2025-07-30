import express from 'express'
import { TMP_PATH } from '../../../config/env'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import useMulter from '../../../hooks/useMulter'
import Service from './service'

const route = express.Router()

const uploadDokumenSbu = useMulter({
  dest: `${TMP_PATH}/`,
}).fields([{ name: 'dokumenSbu', maxCount: 1 }])

route.get(
  '/:id/vermin',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Aspirasi'] */

    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.findVerminByUsulanId(id, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id/sasaran',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Aspirasi'] */

    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.findAllSasaranByUsulanId(id, accessTokenInternal)

    res.json(data)
  })
)

route.get(
  '/:id/dokumen',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Aspirasi'] */

    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.findAllDokumenByUsulanId(id, accessTokenInternal)

    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Aspirasi'] */

    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.findById(id, accessTokenInternal)

    res.json(data)
  })
)

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Aspirasi']
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

    const data = await Service.findAll(query, accessTokenInternal)
    res.json(data)
  })
)

route.post(
  '/:id/comment',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	
      #swagger.tags = ['Aspirasi']
      #swagger.requestBody = {
        required: true,
        "@content": {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
              required: [
                "message",
              ]
            }
          }
        } 
      }
    */

    const { id } = req.params
    const { message } = req.body
    const { accessTokenInternal } = res.locals

    const data = await Service.createComment(
      id,
      { message },
      accessTokenInternal
    )
    res.status(201).json(data)
  })
)

route.post(
  '/rusun',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nik: {
                    type: "string",
                    example: "1122334455"
                  },
                  jenisData: {
                    type: "integer",
                    example: "2"
                  },
                  namaPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  jabatanPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  emailPicPengusul: {
                    type: "string",
                    example: "tester@mail.com"
                  },
                  telpPicPengusul: {
                    type: "string",
                    example: "08312389"
                  },
                  instansi: {
                    type: "string",
                    example: "Pengembangan SIBARU"
                  },
                  alamatInstansi: {
                    type: "string",
                    example: "Kementerian PUPR"
                  },
                  noSurat: {
                    type: "string",
                    example: "test2"
                  },
                  tanggalSurat: {
                    type: "string",
                    example: "2023-05-25"
                  },
                  tahunUsulan: {
                    type: "integer",
                    example: "2022"
                  },
                  PenerimaManfaatId: {
                    type: "integer",
                    example: "15"
                  },
                  jumlahUnit: {
                    type: "integer",
                    example: "10"
                  },
                  jumlahTower: {
                    type: "integer",
                    example: "1"
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
                  latitude: {
                    type: "string",
                    example: "-0.492559"
                  },
                  longitude: {
                    type: "string",
                    example: "102.248466"
                  }
                },
                required: [
                  "jenisData",
                  "namaPicPengusul",
                  "telpPicPengusul",
                  "instansi",
                  "alamatInstansi",
                  "noSurat",
                  "tanggalSurat",
                  "tahunUsulan",
                  "PenerimaManfaatId",
                  "jumlahUnit",
                  "jumlahTower",
                  "ProvinsiId",
                  "CityId",
                  "KecamatanId"
                ]
              }
            }
          } 
        }
    */

    const { body } = req
    const { accessTokenInternal } = res.locals

    const DirektoratId = 1

    const data = await Service.create(
      {
        ...body,
        DirektoratId,
      },
      accessTokenInternal
    )
    res.status(201).json(data)
  })
)

route.post(
  '/rusus',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nik: {
                    type: "string",
                    example: "1122334455"
                  },
                  jenisData: {
                    type: "integer",
                    example: "2"
                  },
                  namaPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  jabatanPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  emailPicPengusul: {
                    type: "string",
                    example: "tester@mail.com"
                  },
                  telpPicPengusul: {
                    type: "string",
                    example: "08312389"
                  },
                  instansi: {
                    type: "string",
                    example: "Pengembangan SIBARU"
                  },
                  alamatInstansi: {
                    type: "string",
                    example: "Kementerian PUPR"
                  },
                  noSurat: {
                    type: "string",
                    example: "test2"
                  },
                  tanggalSurat: {
                    type: "string",
                    example: "2023-05-25"
                  },
                  PenerimaManfaatId: {
                    type: "integer",
                    example: "15"
                  },
                  ProvinsiId: {
                    type: "integer",
                    example: "14"
                  },
                  CityId: {
                    type: "integer",
                    example: "1402"
                  },
                  keterangan: {
                    type: "string"
                  },
                  jumlahUnit: {
                    type: "integer",
                    example: "10"
                  }
                },
                required: [
                  "jenisData",
                  "namaPicPengusul",
                  "telpPicPengusul",
                  "instansi",
                  "alamatInstansi",
                  "noSurat",
                  "tanggalSurat",
                  "PenerimaManfaatId",
                  "ProvinsiId",
                  "CityId"
                ]
              }
            }
          } 
        }
    */

    const { body } = req
    const { accessTokenInternal } = res.locals

    const DirektoratId = 2

    const data = await Service.create(
      {
        ...body,
        DirektoratId,
      },
      accessTokenInternal
    )

    res.status(201).json(data)
  })
)

route.post(
  '/swadaya',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nik: {
                    type: "string",
                    example: "1122334455"
                  },
                  jenisData: {
                    type: "integer",
                    example: "2"
                  },
                  namaPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  jabatanPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  emailPicPengusul: {
                    type: "string",
                    example: "tester@mail.com"
                  },
                  telpPicPengusul: {
                    type: "string",
                    example: "08312389"
                  },
                  instansi: {
                    type: "string",
                    example: "Pengembangan SIBARU"
                  },
                  alamatInstansi: {
                    type: "string",
                    example: "Kementerian PUPR"
                  },
                  noSurat: {
                    type: "string",
                    example: "test2"
                  },
                  tanggalSurat: {
                    type: "string",
                    example: "2023-05-25"
                  },
                  tahunUsulan: {
                    type: "string",
                    example: "2022"
                  },
                  PenerimaManfaatId: {
                    type: "integer",
                    example: "15"
                  },
                  ProvinsiId: {
                    type: "integer",
                    example: "14"
                  },
                  CityId: {
                    type: "integer",
                    example: "1402"
                  },
                  jumlahUnitPk: {
                    type: "integer",
                    example: "10"
                  },
                  jumlahUnitPb: {
                    type: "integer",
                    example: "10"
                  }
                },
                required: [
                  "jenisData",
                  "namaPicPengusul",
                  "telpPicPengusul",
                  "instansi",
                  "alamatInstansi",
                  "noSurat",
                  "tanggalSurat",
                  "PenerimaManfaatId",
                  "ProvinsiId",
                  "CityId"
                ]
              }
            }
          } 
        }
    */

    const { body } = req
    const { accessTokenInternal } = res.locals

    const DirektoratId = 3

    const data = await Service.create(
      {
        ...body,
        DirektoratId,
      },
      accessTokenInternal
    )

    res.status(201).json(data)
  })
)

route.post(
  '/psu-pp',
  AuthMiddleware,
  uploadDokumenSbu,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  nik: {
                    type: "string",
                    example: "1122334455"
                  },
                  type: {
                    type: "integer",
                    example: "8"
                  },
                  jenisData: {
                    type: "integer",
                    example: "2"
                  },
                  noSurat: {
                    type: "string",
                    example: "SURAT-1122334455"
                  },
                  tanggalSurat: {
                    type: "string",
                    example: "2023-1-1"
                  },
                  tahunBantuanPsu: {
                    type: "integer",
                    example: "2022"
                  },
                  PengembangId: {
                    type: "integer",
                    example: "1"
                  },
                  namaPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  telpPicPengusul: {
                    type: "string",
                    example: "08312389"
                  },
                  perusahaanPengusul: {
                    type: "string",
                    example: "PT. PENGUSUL"
                  },
                  asosiasiPengusul: {
                    type: "string",
                    example: "Real Estate Indonesia"
                  },
                  namaDirekturPengusul: {
                    type: "string",
                    example: "Liam Galagher"
                  },
                  telpDirekturPengusul: {
                    type: "string",
                    example: "0721 670 629"
                  },
                  emailPengusul: {
                    type: "string",
                    example: "liam@galagher.com"
                  },
                  alamatPengusul: {
                    type: "string",
                    example: "Jl. Ompong No. 100"
                  },
                  ProvinsiIdPengusul: {
                    type: "integer",
                    example: "14"
                  },
                  CityIdPengusul: {
                    type: "integer",
                    example: "1402"
                  },
                  KecamatanIdPengusul: {
                    type: "integer",
                    example: "140202"
                  },
                  DesaIdPengusul: {
                    type: "integer",
                    example: "1402022001"
                  },
                  namaPerumahan: {
                    type: "string"
                  },
                  alamatLokasi: {
                    type: "string"
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
                  latitude: {
                    type: "string",
                    example: "-0.492559"
                  },
                  longitude: {
                    type: "string",
                    example: "102.248466"
                  },
                  dayaTampung: {
                    type: "integer"
                  },
                  proporsiJml: {
                    type: "object",
                    properties: {
                      jmlRumahUmum: {
                        type: "number"
                      },
                      jmlRumahMenengah: {
                        type: "number"
                      },
                      jmlRumahMewah: {
                        type: "number"
                      }
                    }
                  },
                  rumahTerbangun: {
                    type: "object",
                    properties: {
                      jmlRumahUmum: {
                        type: "number"
                      },
                      jmlRumahMenengah: {
                        type: "number"
                      },
                      jmlRumahMewah: {
                        type: "number"
                      }
                    }
                  },
                  jumlahUsulan: {
                    type: "integer"
                  },
                  bentukBantuan: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        prioritas: {
                          type: "number"
                        },
                        bentukBantuan: {
                          type: "string"
                        },
                        besertaDrainase: {
                          type: "boolean"
                        }
                      }
                    }
                  },
                  dokumenSbu: {
                    type: "file"
                  }
                },
                required: [
                  "type",
                  "jenisData",
                  "noSurat",
                  "tanggalSurat",
                  "tahunBantuanPsu",
                  "namaPicPengusul",
                  "telpPicPengusul",
                  "perusahaanPengusul",
                  "asosiasiPengusul",
                  "namaDirekturPengusul",
                  "telpDirekturPengusul",
                  "emailPengusul",
                  "alamatPengusul",
                  "ProvinsiIdPengusul",
                  "CityIdPengusul",
                  "KecamatanIdPengusul",
                  "namaPerumahan",
                  "alamatLokasi",
                  "ProvinsiId",
                  "CityId",
                  "KecamatanId",
                  "latitude",
                  "longitude",
                  "dayaTampung",
                  "jumlahUsulan"
                ]
              }
            }
          } 
        }
    */

    const { body } = req
    const { accessTokenInternal } = res.locals

    const DirektoratId = 4
    const dokumenSbu =
      req.files && req.files.dokumenSbu ? req.files.dokumenSbu[0] : null

    const data = await Service.createRUK(
      {
        ...body,
        DirektoratId,
      },
      dokumenSbu,
      accessTokenInternal
    )

    res.status(201).json(data)
  })
)

route.post(
  '/psu-pd',
  AuthMiddleware,
  uploadDokumenSbu,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nik: {
                    type: "string",
                    example: "1122334455"
                  },
                  type: {
                    type: "integer",
                    example: "8"
                  },
                  jenisData: {
                    type: "integer",
                    example: "2"
                  },
                  jenisPerumahaan: {
                    type: "integer",
                    example: "2"
                  },
                  noSurat: {
                    type: "string",
                    example: "SURAT-1122334455"
                  },
                  tanggalSurat: {
                    type: "string",
                    example: "2023-1-1"
                  },
                  tahunBantuanPsu: {
                    type: "integer",
                    example: "2022"
                  },
                  namaPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  jabatanPicPengusul: {
                    type: "string",
                    example: "Direktur"
                  },
                  emailPicPengusul: {
                    type: "string",
                    example: "tester@mail.com"
                  },
                  telpPicPengusul: {
                    type: "string",
                    example: "08312389"
                  },
                  instansi: {
                    type: "string",
                    example: "Pengembangan SIBARU"
                  },
                  alamatInstansi: {
                    type: "string",
                    example: "Kementerian PUPR"
                  },
                  namaPerumahan: {
                    type: "string"
                  },
                  alamatLokasi: {
                    type: "string"
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
                  latitude: {
                    type: "string",
                    example: "-0.492559"
                  },
                  longitude: {
                    type: "string",
                    example: "102.248466"
                  },
                  dayaTampung: {
                    type: "integer"
                  },
                  jumlahUsulan: {
                    type: "integer"
                  },
                  bentukBantuan: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        prioritas: {
                          type: "number"
                        },
                        bentukBantuan: {
                          type: "string"
                        },
                        besertaDrainase: {
                          type: "boolean"
                        }
                      }
                    }
                  }
                },
                required: [
                  "type",
                  "jenisData",
                  "noSurat",
                  "tanggalSurat",
                  "tahunBantuanPsu",
                  "namaPicPengusul",
                  "jabatanPicPengusul",
                  "emailPicPengusul",
                  "telpPicPengusul",
                  "namaPerumahan",
                  "alamatLokasi",
                  "ProvinsiId",
                  "CityId",
                  "KecamatanId",
                  "latitude",
                  "longitude",
                  "dayaTampung",
                  "jumlahUsulan"
                ]
              }
            }
          } 
        }
    */

    const { body } = req
    const { accessTokenInternal } = res.locals

    const DirektoratId = 4
    const dokumenSbu =
      req.files && req.files.dokumenSbu ? req.files.dokumenSbu[0] : null

    const data = await Service.createRUK(
      {
        ...body,
        DirektoratId,
      },
      dokumenSbu,
      accessTokenInternal
    )

    res.status(201).json(data)
  })
)

// route.post(
//   '/',
//   AuthMiddleware,
//   AsyncHandler(async function handler(req, res) {
//     /*	#swagger.requestBody = {
//           required: true,
//           "@content": {
//             "application/json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   nik: {
//                     type: "string",
//                     example: "1122334455"
//                   },
//                   DirektoratId: {
//                     type: "integer",
//                     example: "1"
//                   },
//                   jenisData: {
//                     type: "integer",
//                     example: "2"
//                   },
//                   namaPicPengusul: {
//                     type: "string",
//                     example: "tester"
//                   },
//                   jabatanPicPengusul: {
//                     type: "string",
//                     example: "tester"
//                   },
//                   emailPicPengusul: {
//                     type: "string",
//                     example: "tester@mail.com"
//                   },
//                   telpPicPengusul: {
//                     type: "string",
//                     example: "08312389"
//                   },
//                   instansi: {
//                     type: "string",
//                     example: "Pengembangan SIBARU"
//                   },
//                   alamatInstansi: {
//                     type: "string",
//                     example: "Kementerian PUPR"
//                   },
//                   noSurat: {
//                     type: "string",
//                     example: "test2"
//                   },
//                   tanggalSurat: {
//                     type: "string",
//                     example: "2023-05-25"
//                   },
//                   tahunUsulan: {
//                     type: "integer",
//                     example: "2022"
//                   },
//                   PenerimaManfaatId: {
//                     type: "integer",
//                     example: "15"
//                   },
//                   jumlahUnit: {
//                     type: "integer",
//                     example: "10"
//                   },
//                   jumlahTower: {
//                     type: "integer",
//                     example: "1"
//                   },
//                   ProvinsiId: {
//                     type: "integer",
//                     example: "14"
//                   },
//                   CityId: {
//                     type: "integer",
//                     example: "1402"
//                   },
//                   KecamatanId: {
//                     type: "integer",
//                     example: "140202"
//                   },
//                   DesaId: {
//                     type: "integer",
//                     example: "1402022001"
//                   },
//                   latitude: {
//                     type: "string",
//                     example: "-0.492559"
//                   },
//                   longitude: {
//                     type: "string",
//                     example: "102.248466"
//                   }
//                 },
//                 required: [
//                   "jenisData",
//                   "namaPicPengusul",
//                   "telpPicPengusul",
//                   "instansi",
//                   "alamatInstansi",
//                   "noSurat",
//                   "tanggalSurat",
//                   "tahunUsulan",
//                   "PenerimaManfaatId",
//                   "jumlahUnit",
//                   "jumlahTower",
//                   "ProvinsiId",
//                   "CityId",
//                   "KecamatanId"
//                 ]
//               }
//             }
//           }
//         }
//     */

//     const { body } = req
//     const { accessTokenInternal } = res.locals

//     const data = await Service.create(body, accessTokenInternal)
//     res.status(201).json(data)
//   })
// )

route.put(
  '/rusun/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nik: {
                    type: "string",
                    example: "1122334455"
                  },
                  jenisData: {
                    type: "integer",
                    example: "2"
                  },
                  namaPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  jabatanPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  emailPicPengusul: {
                    type: "string",
                    example: "tester@mail.com"
                  },
                  telpPicPengusul: {
                    type: "string",
                    example: "08312389"
                  },
                  instansi: {
                    type: "string",
                    example: "Pengembangan SIBARU"
                  },
                  alamatInstansi: {
                    type: "string",
                    example: "Kementerian PUPR"
                  },
                  noSurat: {
                    type: "string",
                    example: "test2"
                  },
                  tanggalSurat: {
                    type: "string",
                    example: "2023-05-25"
                  },
                  tahunUsulan: {
                    type: "integer",
                    example: "2022"
                  },
                  PenerimaManfaatId: {
                    type: "integer",
                    example: "15"
                  },
                  jumlahUnit: {
                    type: "integer",
                    example: "10"
                  },
                  jumlahTower: {
                    type: "integer",
                    example: "1"
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
                  latitude: {
                    type: "string",
                    example: "-0.492559"
                  },
                  longitude: {
                    type: "string",
                    example: "102.248466"
                  }
                },
                required: [
                  "jenisData",
                  "namaPicPengusul",
                  "telpPicPengusul",
                  "instansi",
                  "alamatInstansi",
                  "noSurat",
                  "tanggalSurat",
                  "tahunUsulan",
                  "PenerimaManfaatId",
                  "jumlahUnit",
                  "jumlahTower",
                  "ProvinsiId",
                  "CityId",
                  "KecamatanId"
                ]
              }
            }
          } 
        }
    */

    const { id } = req.params

    const { body } = req
    const { accessTokenInternal } = res.locals

    const DirektoratId = 1

    const data = await Service.update(
      id,
      {
        ...body,
        DirektoratId,
      },
      accessTokenInternal
    )

    res.json(data)
  })
)

route.put(
  '/rusus/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nik: {
                    type: "string",
                    example: "1122334455"
                  },
                  jenisData: {
                    type: "integer",
                    example: "2"
                  },
                  namaPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  jabatanPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  emailPicPengusul: {
                    type: "string",
                    example: "tester@mail.com"
                  },
                  telpPicPengusul: {
                    type: "string",
                    example: "08312389"
                  },
                  instansi: {
                    type: "string",
                    example: "Pengembangan SIBARU"
                  },
                  alamatInstansi: {
                    type: "string",
                    example: "Kementerian PUPR"
                  },
                  noSurat: {
                    type: "string",
                    example: "test2"
                  },
                  tanggalSurat: {
                    type: "string",
                    example: "2023-05-25"
                  },
                  PenerimaManfaatId: {
                    type: "integer",
                    example: "15"
                  },
                  ProvinsiId: {
                    type: "integer",
                    example: "14"
                  },
                  CityId: {
                    type: "integer",
                    example: "1402"
                  },
                  keterangan: {
                    type: "string"
                  },
                  jumlahUnit: {
                    type: "integer",
                    example: "10"
                  }
                },
                required: [
                  "jenisData",
                  "namaPicPengusul",
                  "telpPicPengusul",
                  "instansi",
                  "alamatInstansi",
                  "noSurat",
                  "tanggalSurat",
                  "PenerimaManfaatId",
                  "ProvinsiId",
                  "CityId"
                ]
              }
            }
          } 
        }
    */

    const { id } = req.params

    const { body } = req
    const { accessTokenInternal } = res.locals

    const DirektoratId = 2

    const data = await Service.update(
      id,
      {
        ...body,
        DirektoratId,
      },
      accessTokenInternal
    )

    res.json(data)
  })
)

route.put(
  '/swadaya/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nik: {
                    type: "string",
                    example: "1122334455"
                  },
                  jenisData: {
                    type: "integer",
                    example: "2"
                  },
                  namaPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  jabatanPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  emailPicPengusul: {
                    type: "string",
                    example: "tester@mail.com"
                  },
                  telpPicPengusul: {
                    type: "string",
                    example: "08312389"
                  },
                  instansi: {
                    type: "string",
                    example: "Pengembangan SIBARU"
                  },
                  alamatInstansi: {
                    type: "string",
                    example: "Kementerian PUPR"
                  },
                  noSurat: {
                    type: "string",
                    example: "test2"
                  },
                  tanggalSurat: {
                    type: "string",
                    example: "2023-05-25"
                  },
                  tahunUsulan: {
                    type: "string",
                    example: "2022"
                  },
                  PenerimaManfaatId: {
                    type: "integer",
                    example: "15"
                  },
                  ProvinsiId: {
                    type: "integer",
                    example: "14"
                  },
                  CityId: {
                    type: "integer",
                    example: "1402"
                  },
                  jumlahUnitPk: {
                    type: "integer",
                    example: "10"
                  },
                  jumlahUnitPb: {
                    type: "integer",
                    example: "10"
                  }
                },
                required: [
                  "jenisData",
                  "namaPicPengusul",
                  "telpPicPengusul",
                  "instansi",
                  "alamatInstansi",
                  "noSurat",
                  "tanggalSurat",
                  "PenerimaManfaatId",
                  "ProvinsiId",
                  "CityId"
                ]
              }
            }
          } 
        }
    */

    const { id } = req.params

    const { body } = req
    const { accessTokenInternal } = res.locals

    const DirektoratId = 3

    const data = await Service.update(
      id,
      {
        ...body,
        DirektoratId,
      },
      accessTokenInternal
    )

    res.json(data)
  })
)

route.put(
  '/psu-pp/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nik: {
                    type: "string",
                    example: "1122334455"
                  },
                  type: {
                    type: "integer",
                    example: "8"
                  },
                  jenisData: {
                    type: "integer",
                    example: "2"
                  },
                  jenisPerumahaan: {
                    type: "integer",
                    example: "2"
                  },
                  noSurat: {
                    type: "string",
                    example: "SURAT-1122334455"
                  },
                  tanggalSurat: {
                    type: "string",
                    example: "2023-1-1"
                  },
                  tahunBantuanPsu: {
                    type: "integer",
                    example: "2022"
                  },
                  PengembangId: {
                    type: "integer",
                    example: "1"
                  },
                  namaPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  telpPicPengusul: {
                    type: "string",
                    example: "08312389"
                  },
                  perusahaanPengusul: {
                    type: "string",
                    example: "PT. PENGUSUL"
                  },
                  asosiasiPengusul: {
                    type: "string",
                    example: "Real Estate Indonesia"
                  },
                  namaDirekturPengusul: {
                    type: "string",
                    example: "Liam Galagher"
                  },
                  telpDirekturPengusul: {
                    type: "string",
                    example: "0721 670 629"
                  },
                  emailPengusul: {
                    type: "string",
                    example: "liam@galagher.com"
                  },
                  alamatPengusul: {
                    type: "string",
                    example: "Jl. Ompong No. 100"
                  },
                  ProvinsiIdPengusul: {
                    type: "integer",
                    example: "14"
                  },
                  CityIdPengusul: {
                    type: "integer",
                    example: "1402"
                  },
                  KecamatanIdPengusul: {
                    type: "integer",
                    example: "140202"
                  },
                  DesaIdPengusul: {
                    type: "integer",
                    example: "1402022001"
                  },
                  namaPerumahan: {
                    type: "string"
                  },
                  alamatLokasi: {
                    type: "string"
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
                  latitude: {
                    type: "string",
                    example: "-0.492559"
                  },
                  longitude: {
                    type: "string",
                    example: "102.248466"
                  },
                  dayaTampung: {
                    type: "integer"
                  },
                  proporsiJml: {
                    type: "object",
                    properties: {
                      jmlRumahUmum: {
                        type: "number"
                      },
                      jmlRumahMenengah: {
                        type: "number"
                      },
                      jmlRumahMewah: {
                        type: "number"
                      }
                    }
                  },
                  rumahTerbangun: {
                    type: "object",
                    properties: {
                      jmlRumahUmum: {
                        type: "number"
                      },
                      jmlRumahMenengah: {
                        type: "number"
                      },
                      jmlRumahMewah: {
                        type: "number"
                      }
                    }
                  },
                  jumlahUsulan: {
                    type: "integer"
                  },
                  bentukBantuan: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        prioritas: {
                          type: "number"
                        },
                        bentukBantuan: {
                          type: "string"
                        },
                        besertaDrainase: {
                          type: "boolean"
                        }
                      }
                    }
                  }
                },
                required: [
                  "type",
                  "jenisData",
                  "noSurat",
                  "tanggalSurat",
                  "tahunBantuanPsu",
                  "namaPicPengusul",
                  "telpPicPengusul",
                  "perusahaanPengusul",
                  "asosiasiPengusul",
                  "namaDirekturPengusul",
                  "telpDirekturPengusul",
                  "emailPengusul",
                  "alamatPengusul",
                  "ProvinsiIdPengusul",
                  "CityIdPengusul",
                  "KecamatanIdPengusul",
                  "namaPerumahan",
                  "alamatLokasi",
                  "ProvinsiId",
                  "CityId",
                  "KecamatanId",
                  "latitude",
                  "longitude",
                  "dayaTampung",
                  "jumlahUsulan"
                ]
              }
            }
          } 
        }
    */

    const { id } = req.params

    const { body } = req
    const { accessTokenInternal } = res.locals

    const DirektoratId = 4

    const data = await Service.update(
      id,
      {
        ...body,
        DirektoratId,
      },
      accessTokenInternal
    )

    res.json(data)
  })
)

route.put(
  '/psu-pd/:id',
  AuthMiddleware,
  uploadDokumenSbu,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nik: {
                    type: "string",
                    example: "1122334455"
                  },
                  type: {
                    type: "integer",
                    example: "8"
                  },
                  jenisData: {
                    type: "integer",
                    example: "2"
                  },
                  noSurat: {
                    type: "string",
                    example: "SURAT-1122334455"
                  },
                  tanggalSurat: {
                    type: "string",
                    example: "2023-1-1"
                  },
                  tahunBantuanPsu: {
                    type: "integer",
                    example: "2022"
                  },
                  namaPicPengusul: {
                    type: "string",
                    example: "tester"
                  },
                  jabatanPicPengusul: {
                    type: "string",
                    example: "Direktur"
                  },
                  emailPicPengusul: {
                    type: "string",
                    example: "tester@mail.com"
                  },
                  telpPicPengusul: {
                    type: "string",
                    example: "08312389"
                  },
                  instansi: {
                    type: "string",
                    example: "Pengembangan SIBARU"
                  },
                  alamatInstansi: {
                    type: "string",
                    example: "Kementerian PUPR"
                  },
                  namaPerumahan: {
                    type: "string"
                  },
                  alamatLokasi: {
                    type: "string"
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
                  latitude: {
                    type: "string",
                    example: "-0.492559"
                  },
                  longitude: {
                    type: "string",
                    example: "102.248466"
                  },
                  dayaTampung: {
                    type: "integer"
                  },
                  jumlahUsulan: {
                    type: "integer"
                  },
                  bentukBantuan: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        prioritas: {
                          type: "number"
                        },
                        bentukBantuan: {
                          type: "string"
                        },
                        besertaDrainase: {
                          type: "boolean"
                        }
                      }
                    }
                  }
                },
                required: [
                  "type",
                  "jenisData",
                  "noSurat",
                  "tanggalSurat",
                  "tahunBantuanPsu",
                  "namaPicPengusul",
                  "jabatanPicPengusul",
                  "emailPicPengusul",
                  "telpPicPengusul",
                  "namaPerumahan",
                  "alamatLokasi",
                  "ProvinsiId",
                  "CityId",
                  "KecamatanId",
                  "latitude",
                  "longitude",
                  "dayaTampung",
                  "jumlahUsulan"
                ]
              }
            }
          } 
        }
    */

    const { id } = req.params

    const { body } = req
    const { accessTokenInternal } = res.locals

    const DirektoratId = 4

    const data = await Service.update(
      id,
      {
        ...body,
        DirektoratId,
      },
      accessTokenInternal
    )

    res.json(data)
  })
)

route.put(
  '/:id/dokumen-sbu',
  AuthMiddleware,
  uploadDokumenSbu,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  dokumenSbu: {
                    type: "file"
                  }
                },
                required: [
                  "dokumenSbu"
                ]
              }
            }
          } 
        }
    */

    const { id } = req.params
    const { accessTokenInternal } = res.locals
    const dokumenSbu =
      req.files && req.files.dokumenSbu ? req.files.dokumenSbu[0] : null

    const data = await Service.updateDokumenSBU(
      id,
      dokumenSbu,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.put(
  '/:id/verlok',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Aspirasi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  keteranganVertek: {
                    type: "string"
                  },
                  statusVertek: {
                    type: "number",
                    example: 1,
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

    const data = await Service.updateVerlok(id, body, accessTokenInternal)
    res.json(data)
  })
)

// route.put(
//   '/:id',
//   AuthMiddleware,
//   AsyncHandler(async function handler(req, res) {
//     /*	#swagger.requestBody = {
//           required: true,
//           "@content": {
//             "application/json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   status: {
//                     type: "string"
//                   },
//                   keteranganVertek: {
//                     type: "string"
//                   },
//                 },
//                 required: [
//                   "status",
//                   "keteranganVertek"
//                 ]
//               }
//             }
//           }
//         }
//     */

//     const { id } = req.params
//     const { body } = req
//     const { accessTokenInternal } = res.locals

//     const data = await Service.update(id, body, accessTokenInternal)
//     res.json(data)
//   })
// )

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Aspirasi'] */

    const { id } = req.params

    const data = await Service.deleteById(id, res.locals.accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Aspirasi'] 
       #swagger.parameters['filtered'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by filtered.'
        }
    */

    const { query } = req
    const { accessTokenInternal } = res.locals
    const data = await Service.exportExcel(query, accessTokenInternal)
    res.json(data)
  })
)

export default route
