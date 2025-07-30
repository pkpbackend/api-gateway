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
    /* #swagger.tags = ['Master Provinsi'] */

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
    /*  #swagger.tags = ['Master Provinsi']
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
          description: 'filter by nama, example = ACEH'  
        } 
        #swagger.parameters['kode_dagri'] = {
          in: 'query',
          type: 'string',
          description: 'filter by kode_dagri, example = 11'  
        } 
        #swagger.parameters['kode_bps'] = {
          in: 'query',
          type: 'string',
          description: 'filter by kode_bps, example = 11'  
        } 
        #swagger.parameters['kode_rkakl'] = {
          in: 'query',
          type: 'string',
          description: 'filter by kode_rkakl, example = 11'  
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
    /* #swagger.tags = ['Master Provinsi'] */

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
    /*	#swagger.tags = ['Master Provinsi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  nama: {
                    type: "string",
                  },
                  kode_dagri: {
                    type: "string",
                    example: "11",
                    description: "Kode dagri tidak dapat di update"
                  },
                  kode_bps: {
                    type: "string",
                    example: "11",
                  },
                  kode_rkakl: {
                    type: "string",
                    example: "11",
                  },
                  latitude: {
                    type: "string",
                    example: "4.604935",
                  },
                  longitude: {
                    type: "string",
                    example: "96.585883",
                  },
                  zoom: {
                    type: "string",
                    example: "7",
                  },
                  batasWilayah: {
                    type: "file"
                  },
                },
                required: [
                  "nama", 
                  "kode_dagri",
                  "latitude",
                  "longitude",
                ]
              }
            }
          } 
        }
    */

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
    /*	#swagger.tags = ['Master Provinsi']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  nama: {
                    type: "string",
                  },
                  kode_bps: {
                    type: "string",
                    example: "11",
                  },
                  kode_rkakl: {
                    type: "string",
                    example: "11",
                  },
                  latitude: {
                    type: "string",
                    example: "4.604935",
                  },
                  longitude: {
                    type: "string",
                    example: "96.585883",
                  },
                  zoom: {
                    type: "string",
                    example: "7",
                  },
                  batasWilayah: {
                    type: "file"
                  },
                },
                required: [
                  "nama", 
                  "latitude",
                  "longitude"
                ]
              }
            }
          } 
        }
    */

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
    res.status(201).json(data)
  })
)

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Provinsi'] */

    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.delete(id, accessTokenInternal)

    res.json(data)
  })
)

export default route
