import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/rekapitulasi/direktorat',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const data = await Service.rekapitulasiDirektorat(
      req.query,
      res.locals.accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/rekapitulasi/provinsi',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const data = await Service.rekapitulasiProvinsi(
      req.query,
      res.locals.accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/rekapitulasi/kabupaten/:id',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const data = await Service.rekapitulasiKabupaten(
      req.params.id,
      req.query,
      res.locals.accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/rekapitulasi/penerima-manfaat',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const data = await Service.rekapitulasiPenerimaManfaat(
      req.query,
      res.locals.accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/rekapitulasi/jenis-usulan',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const data = await Service.rekapitulasiJenisUsulan(
      req.query,
      res.locals.accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/rekapitulasi/usulan',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const data = await Service.rekapitulasiUsulan(
      req.query,
      res.locals.accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/rekapitulasi/usulan/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const data = await Service.exportRekapitulasiUsulanExcel(
      req.query,
      res.locals.accessTokenInternal
    )
    res.json(data)
  })
)

export default route
