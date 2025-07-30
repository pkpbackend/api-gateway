import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/all',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Master Kategori Dokumen']
        #swagger.parameters["name"] = {
          in: "query",
          type: "string",
        } 
        #swagger.parameters["description"] = {
          in: "query",
          type: "string",
        } 
        #swagger.parameters["DirektoratId"] = {
          in: "query",
          type: "number",
        } 
    */

    const { accessTokenInternal } = res.locals
    const { query } = req

    const data = await Service.findAll(query, accessTokenInternal)

    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Master Kategori Dokumen'] */

    const { accessTokenInternal } = res.locals
    const { id } = req.params

    const data = await Service.findById(id, accessTokenInternal)

    res.json(data)
  })
)

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Master Kategori Dokumen']
        #swagger.parameters['page'] = {
          in: "query",
          type: "number",
          description: "Page number" 
        } 
        #swagger.parameters["pageSize"] = {
          in: "query",
          type: "number",
          description: "Limit per page" 
        } 
        #swagger.parameters["name"] = {
          in: "query",
          type: "string",
        } 
        #swagger.parameters["description"] = {
          in: "query",
          type: "string",
        } 
        #swagger.parameters["DirektoratId"] = {
          in: "query",
          type: "number",
        } 
    */

    const { accessTokenInternal } = res.locals
    const { query } = req

    const data = await Service.findAllPaginate(query, accessTokenInternal)

    res.json(data)
  })
)

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*   #swagger.tags = ['Master Kategori Dokumen']
        #swagger.parameters['page'] = {
          in: "query",
          type: "number",
          description: "Page number." 
        } 
        #swagger.parameters["pageSize"] = {
          in: "query",
          type: "number",
          description: "Limit per page." 
        } 
        #swagger.parameters["name"] = {
          in: "query",
          type: "string",
        } 
        #swagger.parameters["description"] = {
          in: "query",
          type: "string",
        } 
        #swagger.parameters["DirektoratId"] = {
          in: "query",
          type: "number",
        } 
    */

    const { accessTokenInternal } = res.locals
    const { query } = req

    const data = await Service.findAllPaginate(query, accessTokenInternal)

    res.json(data)
  })
)

route.post(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Master Kategori Dokumen']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  DirektoratId: {
                    type: "number",
                    example: 1,
                  },
                },
                required: [
                  "name", 
                  "DirektoratId"
                ]
              }
            }
          } 
        }
    */

    const { accessTokenInternal } = res.locals
    const { body } = req

    const data = await Service.create(body, accessTokenInternal)

    res.json(data)
  })
)

route.put(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	 #swagger.tags = ['Master Kategori Dokumen']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  DirektoratId: {
                    type: "number",
                    example: 1,
                  },
                },
                required: [
                  "name", 
                  "DirektoratId"
                ]
              }
            }
          } 
        }
    */

    const { accessTokenInternal } = res.locals
    const { id } = req.params
    const { body } = req

    const data = await Service.update(id, body, accessTokenInternal)
    res.json(data)
  })
)

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Master Kategori Dokumen'] */
    
    const { accessTokenInternal } = res.locals
    const { id } = req.params

    const data = await Service.delete(id, accessTokenInternal)

    res.json(data)
  })
)

export default route
