import express from 'express'
import AsyncHandler from '../../../helpers/AsyncHandler'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import Service from './service'

const route = express.Router()

route.get(
  '/kro',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Filter']
        #swagger.parameters['kode'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['nama'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['id_kegiatan'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['tipe'] = {
          in: 'query',
          type: 'string',
        } 
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findAllKro(query, accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/ro',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*  #swagger.tags = ['Filter']
        #swagger.parameters['kode'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['nama'] = {
          in: 'query',
          type: 'string',
        } 
        #swagger.parameters['id_output'] = {
          in: 'query',
          type: 'number',
        } 
        #swagger.parameters['tipe'] = {
          in: 'query',
          type: 'string',
        } 
    */

    const { query } = req
    const { accessTokenInternal } = res.locals

    const data = await Service.findAllRo(query, accessTokenInternal)
    res.json(data)
  })
)

export default route
