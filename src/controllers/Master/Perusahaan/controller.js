import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Master Perusahaan'] 
        #swagger.parameters['name'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Name.' 
        } 
        #swagger.parameters['name'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Name.' 
        } 
        #swagger.parameters['asosiasi'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Asosiasi.' 
        } 
        #swagger.parameters['alamat'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Alamat.' 
        } 
        #swagger.parameters['kodePos'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Kode Pos.' 
        } 
        #swagger.parameters['rtRw'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by RT/RW.' 
        } 
        #swagger.parameters['namaDirektur'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Nama Direktur.' 
        } 
        #swagger.parameters['telpKantor'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Telp Kantor.' 
        } 
        #swagger.parameters['telpDirektur'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Telp Direktur.' 
        } 
        #swagger.parameters['telpPenanggungJawab'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Telp Penanggung Jawab.' 
        } 
        #swagger.parameters['email'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Email.' 
        } 
        #swagger.parameters['website'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Website.' 
        } 
        #swagger.parameters['npwp'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by NPWP.' 
        } 
        #swagger.parameters['ProvinsiId'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Provinsi.' 
        } 
        #swagger.parameters['CityId'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by City.' 
        } 
        #swagger.parameters['KecamatanId'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Kecamatan.' 
        } 
        #swagger.parameters['DesaId'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by Desa.' 
        } 
    */

    const data = await Service.findAll(req.query)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Perusahaan'] */

    const { params } = req
    const data = await Service.findById(params.id)

    res.json(data)
  })
)

route.post(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Master Perusahaan'] 
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  },
                  asosiasi: {
                    type: "string"
                  },
                  alamat: {
                    type: "string"
                  },
                  kodePos: {
                    type: "string"
                  },
                  rtRw: {
                    type: "string"
                  },
                  namaDirektur: {
                    type: "string"
                  },
                  telpKantor: {
                    type: "string"
                  },
                  telpDirektur: {
                    type: "string"
                  },
                  telpPenanggungJawab: {
                    type: "string"
                  },
                  email: {
                    type: "string"
                  },
                  website: {
                    type: "string"
                  },
                  npwp: {
                    type: "string"
                  },
                  ProvinsiId: {
                    type: "integer"
                  },
                  CityId: {
                    type: "integer"
                  },
                  DesaId: {
                    type: "integer"
                  },
                  KecamatanId: {
                    type: "integer"
                  }
                },
                required: [
                  "name",
                  "asosiasi",
                  "namaDirektur",
                  "telpDirektur",
                  "telpPenanggungJawab",
                  "email",
                  "ProvinsiId",
                  "CityId",
                  "DesaId",
                  "KecamatanId"
                ]
              }
            }
          } 
        }
    */

    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.create(body, accessTokenInternal)
    res.status(201).json(data)
  })
)

export default route
