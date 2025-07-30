import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Penetapan'] 
        #swagger.parameters['filtered'] = {
          in: 'query',
          type: 'string', 
          description: 'Filter data.'
        }
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'string', 
          description: 'Custom filter.'
        } 
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.exportExcel(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Penetapan'] */
    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.findById(id, accessTokenInternal)

    res.json(data)
  })
)

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Penetapan']  
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
        #swagger.parameters['filtered'] = {
          in: 'query',
          type: 'string', 
          description: 'Filter data.'
        }
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'string', 
          description: 'Custom filter.'
        } 
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findAll(query, accessTokenInternal)
    res.json(data)
  })
)

route.post(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Penetapan']
        #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                DirektoratId: {
                  type: 'integer',
                  example: 1
                },
                noSk: {
                  type: 'string',
                  example: 'SK123'
                },
                tanggalSk: {
                  type: 'string',
                  format: 'date',
                  example: '2023-07-12'
                },
                totalUnit: {
                  type: 'integer',
                  example: 10
                },
                keterangan: {
                  type: 'string',
                  example: 'keterangan'
                },
                skPenetapan: {
                  type: 'string',
                  example: 'SK Penetapan'
                },
                usulans: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      UsulanId: {
                        type: 'integer',
                        example: 7
                      },
                      CityId: {
                        type: 'integer',
                        example: 1108
                      },
                      ProvinsiId: {
                        type: 'integer',
                        example: 19
                      }
                    },
                    required: ['UsulanId', 'CityId', 'ProvinsiId']
                  }
                }
              },
              required: ['DirektoratId', 'noSk', 'tanggalSk']
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

route.put(
  '/:PenetapanId/usulan/:UsulanId',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Penetapan']
        #swagger.requestBody = {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  KecamatanId: {
                    type: 'integer',
                    example: 1
                  },
                  DesaId: {
                    type: 'integer',
                    example: 1
                  },
                  KdUsulanId: {
                    type: 'integer',
                    example: 1
                  },
                },
                required: ['KecamatanId', 'DesaId', 'KdUsulanId']
              }
            }
          }
    } */

    const { PenetapanId, UsulanId } = req.params
    const { body } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.updateUsulan(
      PenetapanId,
      UsulanId,
      body,
      accessTokenInternal
    )

    res.json(data)
  })
)

route.put(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Penetapan']
        #swagger.requestBody = {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  DirektoratId: {
                    type: 'integer',
                    example: 1
                  },
                  noSk: {
                    type: 'string',
                    example: 'SK123'
                  },
                  tanggalSk: {
                    type: 'string',
                    format: 'date',
                    example: '2023-07-12'
                  },
                  totalUnit: {
                    type: 'integer',
                    example: 10
                  },
                  keterangan: {
                    type: 'string',
                    example: 'keterangan'
                  },
                  skPenetapan: {
                    type: 'string',
                    example: 'SK Penetapan'
                  },
                  usulans: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        UsulanId: {
                          type: 'integer',
                          example: 7
                        },
                        CityId: {
                          type: 'integer',
                          example: 1108
                        },
                        ProvinsiId: {
                          type: 'integer',
                          example: 19
                        }
                      },
                    }
                  }
                },
                required: ['DirektoratId', 'noSk', 'tanggalSk']
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

route.delete(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Penetapan'] */
    const { id } = req.params
    const { accessTokenInternal } = res.locals

    const data = await Service.delete(id, accessTokenInternal)
    res.json(data)
  })
)

export default route
