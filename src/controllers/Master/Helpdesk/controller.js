import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import OptMiddleware from '../../../middlewares/OptMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Helpdesk']
        #swagger.description = 'Endpoint untuk mengambil data Helpdesk'
        #swagger.parameters['page'] = {
          in: 'query',
          type: 'integer',
          description: 'Filter by page.'
        }
        #swagger.parameters['pageSize'] = {
          in: 'query',
          type: 'integer',
          description: 'Filter by pageSize.'
        }
        #swagger.parameters['filtered'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by filtered.'
        }
        #swagger.parameters['sorted'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by sorted.'
        }
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findAll(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/topik-diskusi',
  // AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Helpdesk']
        #swagger.description = 'Endpoint untuk mengambil data chat Helpdesk'
        #swagger.parameters['page'] = {
          in: 'query',
          type: 'integer',
          description: 'Filter by page.'
        }
        #swagger.parameters['pageSize'] = {
          in: 'query',
          type: 'integer',
          description: 'Filter by pageSize.'
        }
        #swagger.parameters['filtered'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by filtered.'
        }
        #swagger.parameters['sorted'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by sorted.'
        }
    */

    const { query } = req
    // const { accessTokenInternal } = res.locals

    const data = await Service.findAllTopdis(query)
    res.json(data)
  })
)

route.get(
  '/chats',
  // AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Helpdesk']
        #swagger.description = 'Endpoint untuk mengambil data chat Helpdesk'
        #swagger.parameters['page'] = {
          in: 'query',
          type: 'integer',
          description: 'Filter by page.'
        }
        #swagger.parameters['pageSize'] = {
          in: 'query',
          type: 'integer',
          description: 'Filter by pageSize.'
        }
        #swagger.parameters['filtered'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by filtered.'
        }
        #swagger.parameters['sorted'] = {
          in: 'query',
          type: 'string',
          description: 'Filter by sorted.'
        }
    */

    const { query } = req

    const data = await Service.findAllChat(
      query,
      res?.locals?.accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/my-profile',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Helpdesk']
        #swagger.description = 'Endpoint untuk mengambil cek akun Helpdesk'
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findProfile(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  // AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Helpdesk']
        #swagger.description = 'Endpoint untuk mengambil data Helpdesk berdasarkan ID'
    */
    const { id } = req.params

    const data = await Service.findById(id, res?.locals?.accessTokenInternal)

    res.json(data)
  })
)

route.post(
  '/',
  // AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Helpdesk']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  Helpdesk: {
                    type: "object",
                    properties: {
                      HelpdeskTopikDiskusiId : {
                        type: "integer",
                        description: "HelpdeskTopikDiskusiId"
                      },
                      isAdmin : {
                        type: "boolean",
                        description: "isAdmin"
                      },
                      DirektoratId : {
                        type: "integer",
                        description: "DirektoratId"
                      },
                      title : {
                        type: "string",
                        description: "title"
                      },
                      HelpdeskUserId : {
                        type: "integer",
                        description: "HelpdeskUserId"
                      },
                    }
                  },
                  HelpdeskUser : {
                    type: "object",
                    properties: {
                      name : {
                        type: "string",
                        description: "name"
                      },
                      gender : {
                        type: "string",
                      },
                      email : {
                        type: "string",
                      },
                      phone : {
                        type: "string",
                      },
                      pekerjaan : {
                        type: "string",
                      },
                      instansi : {
                        type: "string",
                      },
                      pendidikan : {
                        type: "string",
                      },
                      internalUserId : {
                        type: "integer",
                        description: "internalUserId (optional) -> value didapatkan dari decode access token"
                      },
                      internalUserDetail: {
                        type: "string",
                        description: "internalUserDetail (optional) -> value didapatkan dari decode access token"
                      },
                      ProvinsiId : {
                        type: "integer",
                      },
                    }
                  }
                },
                required: [
                  "Helpdesk.topikDiskusiId",
                  "Helpdesk.DirektoratId",
                  "Helpdesk.title",
                ]
              }
            }
          } 
        }
    */

    const { body } = req
    // const { accessTokenInternal } = res.locals

    const data = await Service.create(body)
    res.status(201).json(data)
  })
)

route.post(
  '/:HelpdeskId/chat',
  OptMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Helpdesk']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  HelpdeskUserId : {
                    type: "integer",
                    description: "untuk user, value didapatkan dari api create helpdesk. Untuk admin, apabila pertamakali membalas/mengrim chat, maka hit api ini dengan access token admin"
                  },
                  chat : {
                    type: "string",
                  },
                },
                required: [
                  "HelpdeskUserId",
                  "chat",
                ]
              }
            }
          } 
        }
    */

    const { body } = req
    const { HelpdeskId } = req.params

    const data = await Service.createChat(
      HelpdeskId,
      body,
      res.locals?.accessTokenInternal
    )
    res.status(201).json(data)
  })
)

route.put(
  '/:id/rating',
  OptMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Helpdesk']
        #swagger.description = 'Endpoint untuk mengubah rating Helpdesk oleh User Publik'
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  rating : {
                    type: "integer",
                    description: "rating",
                    default: 0
                  },
                  HelpdeskUserId : {
                    type: "integer",
                    description: "untuk user, value didapatkan dari api create helpdesk. Untuk admin, maka hit api ini dengan access token admin & HelpdeskUserId tidak perlu dikirim"
                  },
                },
                required: [
                  "rating",
                ]
              }
            }
          } 
        }
    */

    const { body } = req
    const { id } = req.params

    const data = await Service.update(
      id,
      body,
      res?.locals?.accessTokenInternal
    )
    res.status(201).json(data)
  })
)

route.put(
  '/:id/status',
  OptMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Helpdesk']
        #swagger.description = 'Endpoint untuk mengubah status Helpdesk oleh User Publik'
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status : {
                    type: "boolean",
                    description: "status",
                    default: false
                  },
                  HelpdeskUserId : {
                    type: "integer",
                    description: "untuk user, value didapatkan dari api create helpdesk. Untuk admin, maka hit api ini dengan access token admin & HelpdeskUserId tidak perlu dikirim"
                  },
                },
                required: [
                  "status",
                ]
              }
            }
          } 
        }
    */

    const { body } = req
    const { id } = req.params

    const data = await Service.update(
      id,
      body,
      res?.locals?.accessTokenInternal
    )
    res.status(201).json(data)
  })
)

route.put(
  '/:id',
  OptMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Helpdesk']
        #swagger.description = 'Endpoint untuk mengubah data Helpdesk oleh admin'
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status : {
                    type: "boolean",
                    description: "status",
                    default: false
                  },
                  rating : {
                    type: "integer",
                    description: "rating",
                    default: 0
                  },
                  HelpdeskUserId : {
                    type: "integer",
                    description: "untuk user, value didapatkan dari api create helpdesk. Untuk admin, maka hit api ini dengan access token admin & HelpdeskUserId tidak perlu dikirim"
                  },
                },
              }
            }
          } 
        }
    */

    const { body } = req
    const { id } = req.params

    const data = await Service.update(
      id,
      body,
      res?.locals?.accessTokenInternal
    )
    res.status(201).json(data)
  })
)

route.post(
  '/reset-topdis',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Helpdesk'] */

    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.resetTopdis(body, accessTokenInternal)
    res.status(201).json(data)
  })
)

export default route
