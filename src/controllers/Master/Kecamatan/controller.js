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
    /* #swagger.tags = ['Master Kecamatan'] */

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
    /*  #swagger.tags = ['Master Kecamatan']
        #swagger.parameters['page'] = {
          in: 'query',
          type: 'number',
          description: 'Page number.' 
        } 
        #swagger.parameters['pageSize'] = {
          in: 'query',
          type: 'number',
          description: 'Limit per page.' 
        } 
        #swagger.parameters['nama'] = {
          in: 'query',
          type: 'string',
          description: 'filter by nama, example = Jakarta'  
        } 
        #swagger.parameters['CityId'] = {
          in: 'query',
          type: 'number',
          description: 'filter by CityId, example = 1'  
        } 
        #swagger.parameters['latitude'] = {
          in: 'query',
          type: 'string',
          description: 'filter by latitude'  
        } 
        #swagger.parameters['longitude'] = {
          in: 'query',
          type: 'string',
          description: 'filter by longitude'  
        } 
        #swagger.parameters['zoom'] = {
          in: 'query',
          type: 'string',
          description: 'filter by zoom'  
        } 
        #swagger.parameters['kode_dagri'] = {
          in: 'query',
          type: 'string',
          description: 'filter by kode_dagri'  
        } 
        #swagger.parameters['kode_bps'] = {
          in: 'query',
          type: 'string',
          description: 'filter by kode_bps'  
        } 
        #swagger.parameters['kode_rkakl'] = {
          in: 'query',
          type: 'string',
          description: 'filter by kode_rkakl'  
        } 
    */
    const { accessTokenInternal } = res.locals
    const data = await Service.findAllPaginate(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Kecamatan'] */

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
    /*	#swagger.tags = ['Master Kecamatan']
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
                CityId:{
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
              'CityId',
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
    /*	#swagger.tags = ['Master Kecamatan']
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
                CityId:{
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
              'CityId',
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
    /* #swagger.tags = ['Master Kecamatan'] */

    const { id } = req.params
    const { accessTokenInternal } = res.locals
    const data = await Service.delete(id, accessTokenInternal)
    res.json(data)
  })
)

export default route
