import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'
import { TMP_PATH } from '../../../config/env'
import useMulter from '../../../hooks/useMulter'

const route = express.Router()

const uploadBatasWilayah = useMulter({
  dest: `${TMP_PATH}/`,
}).fields([{ name: 'batasWilayah', maxCount: 1 }])

route.get(
  '/all',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Desa'] */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findAll(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Master Desa']
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
        #swagger.parameters['nama'] = {
          in: 'query',
          type: 'string',
          description: 'filter by nama, example = Buninagara'  
        } 
        #swagger.parameters['kode_dagri'] = {
          in: 'query',
          type: 'string',
          description: 'filter by kode_dagri, example = 11.03.13.2007'  
        } 
        #swagger.parameters['KecamatanId'] = {
          in: 'query',
          type: 'integer',
          description: 'filter by KecamatanId, example = 1'  
        } 
        #swagger.parameters['CityId'] = {
          in: 'query',
          type: 'integer',
          description: 'filter by CityId, example = 1'  
        } 
        #swagger.parameters['ProvinsiId'] = {
          in: 'query',
          type: 'integer',
          description: 'filter by ProvinsiId, example = 1'  
        } 
        #swagger.parameters['kode_bps'] = {
          in: 'query',
          type: 'string',
          description: 'filter by kode_bps, example = 1115020021'  
        } 
        #swagger.parameters['kode_rkakl'] = {
          in: 'query',
          type: 'string',
          description: 'filter by kode_rkakl, example = 11'  
        } 
        #swagger.parameters['kecamatan'] = {
          in: 'query',
          type: 'string',
          description: 'filter by kecamatan, example = Kutawaringin'  
        } 
        #swagger.parameters['kota'] = {
          in: 'query',
          type: 'string',
          description: 'filter by kota, example = Bandung'  
        } 
        #swagger.parameters['provinsi'] = {
          in: 'query',
          type: 'string',
          description: 'filter by provinsi, example = JAWA BARAT'  
        } 
        #swagger.parameters['kecamatanId'] = {
          in: 'query',
          type: 'integer',
          description: 'filter by kecamatanId, example = 1'  
        } 
        #swagger.parameters['kotaId'] = {
          in: 'query',
          type: 'integer',
          description: 'filter by kotaId, example = 1'  
        } 
        #swagger.parameters['provinsiId'] = {
          in: 'query',
          type: 'integer',
          description: 'filter by provinsiId, example = 1'  
        } 
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findAllPaginate(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Desa'] */

    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.findById(id, accessTokenInternal)

    res.json(data)
  })
)

route.post(
  '/',
  AuthMiddleware,
  uploadBatasWilayah,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Master Desa']
        #swagger.requestBody = {
        required: true,
        "@content": {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                nama:{
                  type: "string"
                },
                KecamatanId:{
                  type:"integer"
                },
                latitude:{
                  type:"string"
                },
                longitude:{
                  type:"string"
                },
                zoom:{
                  type:"string"
                },
                kode_dagri:{
                  type:"string",
                  description: "Kode dagri tidak dapat di update"
                },
                kode_bps:{
                  type:"string"
                },
                kode_rkakl:{
                  type:"string"
                },
                batasWilayah: {
                  type: "file"
                },
            },
              required: [
              'nama',
              'KecamatanId',
              'kode_dagri',
            ]
          }
        }
      }
    } */

    const { body } = req
    const { accessTokenInternal } = res.locals
    const batasWilayah =
      req.files && req.files.batasWilayah ? req.files.batasWilayah[0] : null

    const data = await Service.create(body, batasWilayah, accessTokenInternal)
    res.status(201).json(data)
  })
)

route.put(
  '/:id',
  AuthMiddleware,
  uploadBatasWilayah,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Master Desa']
        #swagger.requestBody = {
        required: true,
        "@content": {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                nama:{
                  type: "string"
                },
                KecamatanId:{
                  type:"integer"
                },
                latitude:{
                  type:"string"
                },
                longitude:{
                  type:"string"
                },
                zoom:{
                  type:"string"
                },
                kode_bps:{
                  type:"string"
                },
                kode_rkakl:{
                  type:"string"
                },
                batasWilayah: {
                  type: "file"
                },
            },
              required: [
              'nama',
              'KecamatanId',
            ]
          }
        }
      }
    } */

    const { id } = req.params
    const { body } = req
    const { accessTokenInternal } = res.locals
    const batasWilayah =
      req.files && req.files.batasWilayah ? req.files.batasWilayah[0] : null

    const data = await Service.update(
      id,
      body,
      batasWilayah,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Desa'] */

    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.delete(id, accessTokenInternal)

    res.json(data)
  })
)

export default route
