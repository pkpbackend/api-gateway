import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/summary',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Survey'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.findSummary(accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/responden',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Survey']  
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
    */
    const { query } = req
    const { accessTokenInternal } = res.locals
    const data = await Service.findPaginateResponden(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/responden/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Survey'] */
    const { id } = req.params
    const { accessTokenInternal } = res.locals
    const data = await Service.findRespondenById(id, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/question/all',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Survey']
        #swagger.parameters['filtered'] = {
          in: 'query',
          type: 'string', 
          description: 'Filter data.'
        }
    */
    const { query } = req
    const data = await Service.findAllQuestion(query)
    res.json(data)
  })
)

route.post(
  '/responden',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Survey']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  },
                  gender: {
                    type: "number"
                  },
                  instansi: {
                    type: "string"
                  },
                  pendidikanTerakhir: {
                    type: "string"
                  },
                  pekerjaan: {
                    type: "string"
                  },
                  ProvinsiId: {
                    type: "number"
                  },
                  phoneNumber: {
                    type: "string"
                  },
                  DirektoratId: {
                    type: "number"
                  },
                },
                required: [
                  "name",
                  "gender",
                  "instansi",
                  "pendidikanTerakhir",
                  "pekerjaan",
                  "ProvinsiId",
                  "phoneNumber",
                  "DirektoratId",
                ]
              }
            },
          }
        }
    */
    const data = await Service.createResponden(req.body)
    res.json(data)
  })
)

route.put(
  '/responden/:id',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Survey']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  },
                  gender: {
                    type: "number"
                  },
                  instansi: {
                    type: "string"
                  },
                  pendidikanTerakhir: {
                    type: "string"
                  },
                  pekerjaan: {
                    type: "string"
                  },
                  ProvinsiId: {
                    type: "number"
                  },
                  phoneNumber: {
                    type: "string"
                  },
                  DirektoratId: {
                    type: "number"
                  },
                },
                required: [
                  "name",
                  "gender",
                  "instansi",
                  "pendidikanTerakhir",
                  "pekerjaan",
                  "ProvinsiId",
                  "phoneNumber",
                  "DirektoratId",
                ]
              }
            },
          }
        }
    */
    const { id } = req.params
    const data = await Service.updateResponden(id, req.body)
    res.json(data)
  })
)

route.post(
  '/answer',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['Survey']	
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  SurveyRespondenId: {
                    type: "number"
                  },
                  SurveyQuestionId: {
                    type: "number"
                  },
                  answer: {
                    type: "string"
                  },
                },
                required: [
                  "SurveyRespondenId",
                  "SurveyQuestionId",
                  "answer",
                ]
              }
            },
          }
        }
    */
    const body = { req }
    const data = await Service.createAnswer(req.body)
    res.json(data)
  })
)

export default route
