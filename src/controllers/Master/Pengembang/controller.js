import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/all',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Master Pengembang']
        #swagger.parameters['isValid'] = {
          in: 'query',
          type: 'boolean',
          description: 'Filter by isValid.' 
        } 
    */

    const data = await Service.findAll(req.query)
    res.json(data)
  })
)

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Master Pengembang'] 
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
          description: 'filter by nama, example = Rendi'  
        } 
        #swagger.parameters['namaPerusahaan'] = {
          in: 'query',
          type: 'string',
          description: 'filter by namaPerusahaan, example = PT. Nusantara'  
        } 
        #swagger.parameters['telpPenanggungJawab'] = {
          in: 'query',
          type: 'number',
          description: 'filter by telpPenanggungJawab, example = 0811'  
        } 
        #swagger.parameters['email'] = {
          in: 'query',
          type: 'string',
          description: 'filter by email, example = sibarupu@gmail.go.pu'  
        } 
        #swagger.parameters['npwp'] = {
          in: 'query',
          type: 'number',
          description: 'filter by npwp, example = 5321'  
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
    /* #swagger.tags = ['Master Pengembang'] */

    const { params } = req
    const { accessTokenInternal } = res.locals
    const data = await Service.findById(params.id, accessTokenInternal)

    res.json(data)
  })
)

route.put(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Master Pengembang'] 
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nama: {
                    type: "string",
                  },
                  namaPerusahaan: {
                    type: "string",
                  },
                  telpPenanggungJawab: {
                    type: "number",
                    example: "02154",
                  },
                  email: {
                    type: "string",
                    example: "sibarupu@go.pu",
                  },
                  npwp: {
                    type: "number",
                    example: "4.604935",
                  },
                  isValid: {
                    type: "boolean",
                    example: "1 atau 2",
                  },
                },
                required: [
                  "nama", 
                  "namaPerusahaan", 
                  "isValid"
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
    res.status(201).json(data)
  })
)

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Pengembang']  */

    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.delete(id, accessTokenInternal)

    res.json(data)
  })
)

route.post(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Master Pengembang'] 
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nama: {
                    type: "string",
                  },
                  namaPerusahaan: {
                    type: "string",
                  },
                  telpPenanggungJawab: {
                    type: "number",
                    example: "02154",
                  },
                  email: {
                    type: "string",
                    example: "sibarupu@go.pu",
                  },
                  npwp: {
                    type: "number",
                    example: "4.604935",
                  },
                  isValid: {
                    type: "boolean",
                    example: "1 atau 2",
                  },
                },
                required: [
                  "nama", 
                  "namaPerusahaan", 
                  "isValid"
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
