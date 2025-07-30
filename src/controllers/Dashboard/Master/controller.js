import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/map',
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard']
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['sampaiTahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['ProvinsiId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['CityId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['KegiatanId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['TypeId'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['statusPeresmian'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['statusPenghunian'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['statusOpor'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['statusSerahTerima'] = {
          in: 'query',
          type: 'string',
        } 
    */

    const data = await Service.findAllMap(req.query)
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/summary',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard']
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['sampaiTahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['statusPeresmian'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['statusPenghunian'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['statusOpor'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['ProvinsiId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['CityId'] = {
          in: 'query',
          type: 'number',
        } 
    */

    const { accessTokenInternal } = res.locals
    const data = await Service.findSummary(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rekap',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard']
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['sampaiTahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['KegiatanId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['ProvinsiId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['CityId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['TgtHunianId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['TypeId'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['statusPeresmian'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['statusPenghunian'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['statusOpor'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['statusSerahTerima'] = {
          in: 'query',
          type: 'number',
        } 
    */

    const { accessTokenInternal } = res.locals
    const data = await Service.findRekap(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rekap/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard']
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['sampaiTahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['KegiatanId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['ProvinsiId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['CityId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['TgtHunianId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['TypeId'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['statusPeresmian'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['statusPenghunian'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['statusOpor'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['statusSerahTerima'] = {
          in: 'query',
          type: 'number',
        } 
    */

    const { accessTokenInternal } = res.locals
    const data = await Service.exportExcelRekap(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rekap-per-tahun/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard']
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['KegiatanId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['ProvinsiId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['CityId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['TgtHunianId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['TypeId'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['statusPeresmian'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['statusPenghunian'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['statusOpor'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['statusSerahTerima'] = {
          in: 'query',
          type: 'number',
        } 
    */

    const { accessTokenInternal } = res.locals
    const data = await Service.exportExcelRekapPerTahun(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rekap/detail',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard']
        #swagger.parameters['TypeIds'] = {
          in: 'query',
          type: 'string',
          description: 'Comma separated value ex. 1,2,3',
        } 
        #swagger.parameters['CityId'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'number',
        } 
    */

    const { accessTokenInternal } = res.locals
    const data = await Service.findRekapDetail(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rekap/per-provinsi-dan-kategori',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard']
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['sampaiTahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['kategori'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['PenerimaManfaatId'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['TematikIds'] = {
          in: 'query',
          type: 'string',
        } 
    */

    const { accessTokenInternal } = res.locals
    const data = await Service.findRekapPerProvinsiDanKategori(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rekap-pengisian-data',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard']
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['sampaiTahun'] = {
          in: 'query',
          type: 'number',
        } 
    */

    const { accessTokenInternal } = res.locals
    const data = await Service.findRekapPengisianData(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rekap-pengisian-data/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard']
        #swagger.parameters['tahun'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['sampaiTahun'] = {
          in: 'query',
          type: 'number',
        } 
    */

    const { accessTokenInternal } = res.locals
    const data = await Service.exportExcelRekapPengisianData(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rekap-keterisian',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.findRekapKeterisian(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rekap-keterisian/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.exportExcelRekapKeterisian(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rekap-keterisian/per-provinsi',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.findRekapKeterisianPerProvinsi(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rekap-keterisian/per-provinsi/export/excel',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.exportExcelRekapKeterisianPerProvinsi(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rekap-peresmian',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard']
        #swagger.parameters['jenis'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['ProvinsiId'] = {
          in: 'query',
          type: 'number',
        } 
    */

    const { accessTokenInternal } = res.locals
    const data = await Service.findRekapPeresmian(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

route.get(
  '/profile/rp3kp',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.findRp3kp(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/profile/pokja-pkp',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.findPokjaPkp(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/profile/forum-pkp',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.findForumPkp(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/profile/rekap-p3ke',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.findRekapP3ke(req.query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/profile/rekap-p3ke-kabkota',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Dashboard'] */
    const { accessTokenInternal } = res.locals
    const data = await Service.findRekapP3keKabKota(
      req.query,
      accessTokenInternal
    )
    res.json(data)
  })
)

export default route
