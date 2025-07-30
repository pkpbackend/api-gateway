import express from 'express'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import AsyncHandler from '../../../helpers/AsyncHandler'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['SSO Role']
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
        #swagger.parameters['nama'] = {
          in: 'query',
          type: 'string',
          description: 'filter by nama'  
        } 
        #swagger.parameters['DirektoratId'] = {
          in: 'query',
          type: 'number',
          description: 'filter by DirektoratId'  
        } 
        #swagger.parameters['ScopeRegionRoleId'] = {
          in: 'query',
          type: 'number',
          description: 'filter by ScopeRegionRoleId'  
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
    /* #swagger.tags = ['SSO Role'] */

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
    /*	#swagger.tags = ['SSO Role']
        #swagger.requestBody = {
        required: true,
        "@content": {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nama:{
                  type: "string"
                },
                privilege:{
                  type: "object"
                },
                ScopeRegionRoleId:{
                  type: "integer"
                },
                pengembang:{
                  type: "boolean"
                },
                level:{
                  type: "integer"
                },
                DirektoratId:{
                  type: "integer"
                },
                direktif:{
                  type: "integer"
                },
                pengusul:{
                  type: "integer"
                },
                admin:{
                  type: "boolean"
                },
                scopeCrud:{
                  type: "object"
                },
                dashboard:{
                  type: "integer"
                },
                defaultLogin:{
                  type: "integer"
                },
                accessMenu:{
                  type: "array",
                },
            },
            required: [
              "nama",
              "privilege",
              "ScopeRegionRoleId",
              "pengembang",
              "level",
              "DirektoratId",
              "direktif",
              "pengusul",
              "admin",
              "scopeCrud",
              "dashboard",
              "defaultLogin",
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
    /* #swagger.tags = ['SSO Role'] */

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
    /*	#swagger.tags = ['SSO Role']
        #swagger.requestBody = {
        required: true,
        "@content": {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nama:{
                  type: "string"
                },
                privilege:{
                  type: "object"
                },
                ScopeRegionRoleId:{
                  type: "integer"
                },
                pengembang:{
                  type: "boolean"
                },
                level:{
                  type: "integer"
                },
                DirektoratId:{
                  type: "integer"
                },
                direktif:{
                  type: "integer"
                },
                pengusul:{
                  type: "integer"
                },
                admin:{
                  type: "boolean"
                },
                scopeCrud:{
                  type: "object"
                },
                dashboard:{
                  type: "integer"
                },
                defaultLogin:{
                  type: "integer"
                },
                accessMenu:{
                  type: "array",
                },
            },
            required: [
              "nama",
              "privilege",
              "ScopeRegionRoleId",
              "pengembang",
              "level",
              "DirektoratId",
              "direktif",
              "pengusul",
              "admin",
              "scopeCrud",
              "dashboard",
              "defaultLogin",
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
