import express from 'express'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import AsyncHandler from '../../../helpers/AsyncHandler'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['SSO User']
        #swagger.parameters['page'] = {
          in: 'query',
          type: 'number',
          description: 'Page number..' 
        } 
        #swagger.parameters['pageSize'] = {
          in: 'query',
          type: 'number',
          description: 'Limit per page.' 
        } 
        #swagger.parameters['RoleId'] = {
          in: 'query',
          type: 'number',
          description: 'filter by RoleId'  
        } 
        #swagger.parameters['ProvinsiId'] = {
          in: 'query',
          type: 'number',
          description: 'filter by ProvinsiId'  
        } 
        #swagger.parameters['CityId'] = {
          in: 'query',
          type: 'number',
          description: 'filter by CityId'  
        } 
        #swagger.parameters['username'] = {
          in: 'query',
          type: 'string',
          description: 'filter by username, example = 1'  
        } 
        #swagger.parameters['nama'] = {
          in: 'query',
          type: 'string',
          description: 'filter by nama, example = 1'  
        } 
        #swagger.parameters['email'] = {
          in: 'query',
          type: 'string',
          description: 'filter by email, example = 1'  
        } 
        #swagger.parameters['instansi'] = {
          in: 'query',
          type: 'string',
          description: 'filter by instansi, example = 1'  
        } 
        #swagger.parameters['DirektoratId'] = {
          in: 'query',
          type: 'number',
          description: 'filter by DirektoratId, example = 1'  
        }
        #swagger.parameters['pengembangId'] = {
          in: 'query',
          type: 'number',
          description: 'filter by pengembangId, example = 1'  
        }
        #swagger.parameters['region'] = {
          in: 'query',
          type: 'string',
          description: 'filter by region, example = 1'  
        }
        #swagger.parameters['alamatInstansi'] = {
          in: 'query',
          type: 'string',
          description: 'filter by alamatInstansi, example = 1'  
        }
    */

    const { accessTokenInternal } = res.locals

    const data = await Service.findAll(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['SSO User'] */
    const { id } = req.params
    const { accessTokenInternal } = res.locals
    const data = await Service.findById(id, accessTokenInternal)
    res.json(data)
  })
)

route.post(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO User']
        #swagger.requestBody = {
        required: true,
        "@content": {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                RoleId:{
                  type: "number"
                },
                ProvinsiId:{
                  type: "number"
                },
                CityId:{
                  type: "number"
                },
                nama:{
                  type: "string"
                },
                username:{
                  type: "string"
                },
                email:{
                  type: "string"
                },
                instansi:{
                  type: "string"
                },
                DirektoratId:{
                  type: "number"
                },
                pengembangId:{
                  type: "number"
                },
                region:{
                  type: "string"
                },
                alamatInstansi:{
                  type: "string"
                },
                password:{
                  type: "string"
                },
                confirmPassword:{
                  type: "string"
                },
            },
            required: [
              "ProvinsiId",
              "RoleId",
              "CityId",
              "username",
              "nama",
              "email",
              "instansi",
              "DirektoratId",
              "pengembangId",
              "region",
              "alamatInstansi",
              "password",
              "confirmPassword",
            ]
          }
        }
      }
    } */

    const { accessTokenInternal } = res.locals
    const { body } = req

    const data = await Service.create(body, accessTokenInternal)
    res.status(201).json(data)
  })
)

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['SSO User'] */

    const { id } = req.params
    const { accessTokenInternal } = res.locals
    const data = await Service.delete(id, accessTokenInternal)

    res.json(data)
  })
)

route.put(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO User']
        #swagger.requestBody = {
        required: true,
        "@content": {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                RoleId:{
                  type: "number"
                },
                ProvinsiId:{
                  type: "number"
                },
                CityId:{
                  type: "number"
                },
                nama:{
                  type: "string"
                },
                username:{
                  type: "string"
                },
                email:{
                  type: "string"
                },
                instansi:{
                  type: "string"
                },
                DirektoratId:{
                  type: "integer"
                },
                pengembangId:{
                  type: "integer"
                },
                region:{
                  type: "string"
                },
                alamatInstansi:{
                  type: "string"
                },
                password:{
                  type: "string"
                },
                confirmPassword:{
                  type: "string"
                },
            },
            required: [
              "ProvinsiId",
              "RoleId",
              "CityId",
              "username",
              "nama",
              "email",
              "instansi",
              "DirektoratId",
              "pengembangId",
              "region",
              "alamatInstansi",
              "password",
              "confirmPassword",
            ]
          }
        }
      }
    } */

    const { accessTokenInternal } = res.locals
    const { id } = req.params
    const { body } = req

    const data = await Service.update(id, body, accessTokenInternal)
    res.json(data)
  })
)

export default route
