import express from 'express'
import request from 'request'
import AsyncHandler from '../../helpers/AsyncHandler'
import ResponseError from '../../modules/Error'
import Service from './service'

import { BASE_URL, S3_DIRECT_URL } from '../../config/env'

const route = express.Router()

route.get(
  '/:filename/s3url',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['File'] */

    const { filename } = req.params
    const data = await Service.findFile(filename)

    if (S3_DIRECT_URL === 'no') {
      return res.json({ s3url: `${BASE_URL}/file/${filename}` })
    }

    res.json({ s3url: data })
  })
)

route.get(
  '/:dirlv1/:filename/s3url',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['File'] */

    const { dirlv1, filename } = req.params
    const s3key = `${dirlv1}/${filename}`
    const data = await Service.findFile(s3key)

    if (S3_DIRECT_URL === 'no') {
      return res.json({ s3url: `${BASE_URL}/file/${s3key}` })
    }

    res.json({ s3url: data })
  })
)

route.get(
  '/:dirlv1/:dirlv2/:filename/s3url',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['File'] */

    const { dirlv1, dirlv2, filename } = req.params
    const s3key = `${dirlv1}/${dirlv2}/${filename}`
    const data = await Service.findFile(s3key)

    if (S3_DIRECT_URL === 'no') {
      return res.json({ s3url: `${BASE_URL}/file/${s3key}` })
    }

    res.json({ s3url: data })
  })
)

route.get(
  '/:dirlv1/:dirlv2/:dirlv3/:filename/s3url',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['File'] */

    const { dirlv1, dirlv2, dirlv3, filename } = req.params
    const s3key = `${dirlv1}/${dirlv2}/${dirlv3}/${filename}`
    const data = await Service.findFile(s3key)

    if (S3_DIRECT_URL === 'no') {
      return res.json({ s3url: `${BASE_URL}/file/${s3key}` })
    }

    res.json({ s3url: data })
  })
)

route.get(
  '/:dirlv1/:dirlv2/:dirlv3/:filename',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['File'] */

    const { dirlv1, dirlv2, dirlv3, filename } = req.params
    const s3key = `${dirlv1}/${dirlv2}/${dirlv3}/${filename}`

    const data = await Service.findFile(s3key)

    request(
      {
        url: data,
        encoding: null,
      },
      (err, response, buffer) => {
        if (!err && response.statusCode === 200) {
          // res.set("Content-Type", "image/png")
          res.send(response.body)
        } else {
          throw new ResponseError.BadRequest('Gagal mendapatkan file')
        }
      }
    )
  })
)

route.get(
  '/:dirlv1/:dirlv2/:filename',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['File'] */

    const { dirlv1, dirlv2, filename } = req.params
    const s3key = `${dirlv1}/${dirlv2}/${filename}`

    const data = await Service.findFile(s3key)

    request(
      {
        url: data,
        encoding: null,
      },
      (err, response, buffer) => {
        if (!err && response.statusCode === 200) {
          // res.set("Content-Type", "image/png")
          res.send(response.body)
        } else {
          throw new ResponseError.BadRequest('Gagal mendapatkan file')
        }
      }
    )
  })
)

route.get(
  '/:dirlv1/:filename',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['File'] */

    const { dirlv1, filename } = req.params
    const s3key = `${dirlv1}/${filename}`

    const data = await Service.findFile(s3key)

    request(
      {
        url: data,
        encoding: null,
      },
      (err, response, buffer) => {
        if (!err && response.statusCode === 200) {
          // res.set("Content-Type", "image/png")
          res.send(response.body)
        } else {
          throw new ResponseError.BadRequest('Gagal mendapatkan file')
        }
      }
    )
  })
)

route.get(
  '/:filename',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['File'] */

    const { filename } = req.params

    const data = await Service.findFile(filename)

    request(
      {
        url: data,
        encoding: null,
      },
      (err, response, buffer) => {
        if (!err && response.statusCode === 200) {
          // res.set("Content-Type", "image/png")
          res.send(response.body)
        } else {
          throw new ResponseError.BadRequest('Gagal mendapatkan file')
        }
      }
    )
  })
)

export default route
