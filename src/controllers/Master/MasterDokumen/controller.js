import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/all',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Master Dokumen']
        #swagger.parameters['nama'] = {
          in: "query",
          type: "string",
        } 
        #swagger.parameters["model"] = {
          in: "query",
          type: "string",
          description: "Ex. Vermin" 
        }
        #swagger.parameters["DirektoratId"] = {
          in: "query",
          type: "integer",
        }
    */

    const { accessTokenInternal } = res.locals
    const { query } = req

    const data = await Service.findAll(query, accessTokenInternal)

    res.json(data)
  })
)

route.get(
  '/serahterima/:type',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Dokumen'] */

    const { type } = req.params
    const { accessTokenInternal } = res.locals
    const { query } = req

    const data = await Service.findAllSerahTerimaDokumen(
      query,
      accessTokenInternal,
      type
    )

    res.json(data)
  })
)

route.get(
  '/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['Master Dokumen'] */

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
    /*  #swagger.tags = ['Master Dokumen']
        #swagger.parameters['page'] = {
          in: "query",
          type: "integer",
          description: "Page number." 
        } 
        #swagger.parameters["pageSize"] = {
          in: "query",
          type: "integer",
          description: "Limit per page." 
        } 
        #swagger.parameters['nama'] = {
          in: "query",
          type: "string",
        } 
        #swagger.parameters["model"] = {
          in: "query",
          type: "string",
          description: "Ex. Vermin" 
        }
        #swagger.parameters["DirektoratId"] = {
          in: "query",
          type: "integer",
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
    /*	#swagger.tags = ['Master Dokumen']
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
                  model: {
                    type: "string",
                    example: "Vermin",
                    description: "Ex. Vermin, SerahTerima",
                  },
                  jenisData: {
                    type: "string",
                    example: "[0,1]",
                  },
                  jenisDirektif: {
                    type: "string",
                    example: "[0]",
                  },
                  required: {
                    type: "string",
                    example: "[\"all\"]",
                  },
                  type: {
                    type: "number",
                    example: "7",
                  },
                  MasterKategoriDokumenId: {
                    type: "number",
                    example: "1",
                  },
                  maxSize: {
                    type: "number",
                    example: "100",
                  },
                  typeFile: {
                    type: "string",
                    example: "pdf",
                  },
                  ditRusunField: {
                    type: "string",
                  },
                  jenisBantuan: {
                    type: "string",
                    example: "{\"umum\":1,\"sekalaBesar\":1,\"bantuanPsuKomunitas\":1,\"swadaya\":0}",
                  },
                  sort: {
                    type: "number",
                  },
                  formatDokumen: {
                    type: "string",
                  },
                },
                required: [
                  "nama", 
                  "model"
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
    /*	#swagger.tags = ['Master Dokumen']
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
                  model: {
                    type: "string",
                    example: "Vermin",
                    description: "Ex. Vermin, SerahTerima",
                  },
                  jenisData: {
                    type: "string",
                    example: "[0,1]",
                  },
                  jenisDirektif: {
                    type: "string",
                    example: "[0]",
                  },
                  required: {
                    type: "string",
                    example: "[\"all\"]",
                  },
                  type: {
                    type: "number",
                    example: "7",
                  },
                  MasterKategoriDokumenId: {
                    type: "number",
                    example: "1",
                  },
                  maxSize: {
                    type: "number",
                    example: "100",
                  },
                  typeFile: {
                    type: "string",
                    example: "pdf",
                  },
                  ditRusunField: {
                    type: "string",
                  },
                  jenisBantuan: {
                    type: "string",
                    example: "{\"umum\":1,\"sekalaBesar\":1,\"bantuanPsuKomunitas\":1,\"swadaya\":0}",
                  },
                  sort: {
                    type: "number",
                  },
                  formatDokumen: {
                    type: "string",
                  },
                },
                required: [
                  "nama", 
                  "model"
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
    /* #swagger.tags = ['Master Dokumen'] */

    const { accessTokenInternal } = res.locals
    const { id } = req.params

    const data = await Service.delete(id, accessTokenInternal)

    res.json(data)
  })
)

export default route
