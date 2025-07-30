import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Master Komponen Pengajuan']
        #swagger.parameters['page'] = {
          in: 'query',
          type: 'integer',
          description: 'Page number..' 
        } 
        #swagger.parameters['pageSize'] = {
          in: 'query',
          type: 'integer',
          description: 'Limit per page.' 
        } 
        #swagger.parameters['name'] = {
          in: 'query',
          type: 'string',
          description: 'filter by name, example = Komponen pengajuan'  
        } 
        #swagger.parameters['UsulanTypeId'] = {
          in: 'query',
          type: 'integer',
          description: 'filter by UsulanTypeId, example = 1'  
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
    /* #swagger.tags = ['Master Komponen Pengajuan'] */

    const { id } = req.params
    const data = await Service.findById(id)

    res.json(data)
  })
)

route.post(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Master Komponen Pengajuan']
        #swagger.requestBody = {
        required: true,
        "@content": {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name:{
                  type: "string"
                },
                UsulanTypeId:{
                  type:"integer"
                },
            },
            required: ['name']
          }
        }
      }
    } */

    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.create(body, accessTokenInternal)
    res.status(201).json(data)
  })
)

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Komponen Pengajuan'] */
    
    const { id } = req.params
    const data = await Service.delete(id, res.locals.accessTokenInternal)

    res.json(data)
  })
)

route.put(
  '/:id',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Master Komponen Pengajuan']
        #swagger.requestBody = {
        required: true,
        "@content": {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name:{
                  type: "string"
                },
                UsulanTypeId:{
                  type:"integer"
                },
            },
            required: ['name']
          }
        }
      }
    } */

    const { id } = req.params
    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.update(id, body, accessTokenInternal)
    res.json(data)
  })
)

export default route
