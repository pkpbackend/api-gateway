import express from 'express'
import WilayahService from './service'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'

const route = express.Router()

route.get(
    '/sync',
    AuthMiddleware,
    AsyncHandler(async function handler(req, res) {
        /* #swagger.tags = ['Wilayah'] */
        const { accessTokenInternal } = res.locals
        const data = await WilayahService.syncWilayah(accessTokenInternal)
        res.json(data)
    })
)

export default route