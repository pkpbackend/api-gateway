import express from 'express'
import AsyncHandler from '../../helpers/AsyncHandler'
import { AuthExApi, EnsureAccess } from '../../middlewares/AuthExApiMiddleware'
import Service from './service'

const route = express.Router()

route.post(
  '/banper/account/login',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['External API']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string"
                  },
                  password: {
                    type: "string"
                  }
                },
                required: ["username", "password"]
              }
            }
          } 
        }
    */

    const { username, password } = req.body

    const data = await Service.banperLogin({
      username,
      password,
    })

    res.json(data)
  })
)

route.post(
  '/banper/account',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['External API']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  token_uid: {
                    type: "string"
                  }
                },
                required: ["token_uid"]
              }
            }
          } 
        }
    */

    const { token_uid } = req.body

    const data = await Service.findBanperAccount({
      token_uid,
    })

    res.json(data)
  })
)

route.post(
  '/banper/request-otp',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['External API']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  token_uid: {
                    type: "string"
                  }
                },
                required: ["token_uid"]
              }
            }
          } 
        }
    */

    const { token_uid } = req.body

    const data = await Service.requestBanperOtp({
      token_uid,
    })

    res.json(data)
  })
)

route.get(
  '/banper/monitor',
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['External API'] */

    const data = await Service.findBanperMonitor(req.query)
    res.json(data)
  })
)

/* ----------------------------------------------------
********************** NEW EXAPI **********************
---------------------------------------------------- */

route.post(
  '/login',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['External API']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string"
                  },
                  password: {
                    type: "string"
                  }
                },
                required: ["username", "password"]
              }
            }
          } 
        }
    */

    const { username, password } = req.body

    const data = await Service.login({
      username,
      password,
    })

    if (data.access_token) {
      res.cookie('tokenExApi', data.access_token)
    }

    res.json(data)
  })
)

route.get(
  '/usulan',
  AuthExApi,
  (req, res, next) => EnsureAccess(req, res, next, ['admin']),
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['External API'] */

    const data = await Service.findUsulan(req.query)
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/master',
  AuthExApi,
  (req, res, next) => EnsureAccess(req, res, next, ['admin', 'pusdatin']),
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['External API'] */

    const data = await Service.findPemanfaatanMaster(req.query)
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rusunawa',
  AuthExApi,
  (req, res, next) => EnsureAccess(req, res, next, ['admin', 'pusdatin']),
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['External API'] */

    const data = await Service.findPemanfaatanRusunawa(req.query)
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/rusus',
  AuthExApi,
  (req, res, next) => EnsureAccess(req, res, next, ['admin', 'pusdatin']),
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['External API'] */

    const data = await Service.findPemanfaatanRusus(req.query)
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/bsps',
  AuthExApi,
  (req, res, next) => EnsureAccess(req, res, next, ['admin', 'pusdatin']),
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['External API'] */

    const data = await Service.findPemanfaatanBSPS(req.query)
    res.json(data)
  })
)

route.get(
  '/pemanfaatan/psu',
  AuthExApi,
  (req, res, next) => EnsureAccess(req, res, next, ['admin', 'pusdatin']),
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['External API'] */

    const data = await Service.findPemanfaatanPSU(req.query)
    res.json(data)
  })
)

route.get(
  '/rtlh/data-rtlh',
  AuthExApi,
  (req, res, next) => EnsureAccess(req, res, next, ['admin', 'pusdatin']),
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['External API'] */

    const data = await Service.findDataRTLH(req.query)
    res.json(data)
  })
)

route.get(
  '/proxy/sulteng/data-rtlh',
  AuthExApi,
  (req, res, next) => EnsureAccess(req, res, next, ['admin', 'provinsi']),
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['External API'] */

    const data = await Service.findDataRTLHSulteng(req.query)
    res.json(data)
  })
)

// route.post(
//   '/proxy/sulteng/input-rtlh',
//   AuthExApi,
//   (req, res, next) => EnsureAccess(req, res, next, ['admin', 'provinsi']),
//   AsyncHandler(async function handler(req, res) {
//     /* #swagger.tags = ['External API'] */

//     const data = await Service.inputRTLHSulteng(req.body)
//     res.json(data)
//   })
// )

route.get(
  '/proxy/e-rtlh/data-rtlh',
  AuthExApi,
  (req, res, next) => EnsureAccess(req, res, next, ['admin', 'provinsi']),
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['External API'] */

    const data = await Service.findERTLH(req.query)
    res.json(data)
  })
)

// route.post(
//   '/proxy/e-rtlh/data-rtlh',
//   AuthExApi,
//   (req, res, next) => EnsureAccess(req, res, next, ['admin', 'provinsi']),
//   AsyncHandler(async function handler(req, res) {
//     /* #swagger.tags = ['External API'] */

//     const data = await Service.inputERTLH(req.body)
//     res.json(data)
//   })
// )

route.get(
  '/apidir/usulan',
  AuthExApi,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['External API'] */

    const data = await Service.findDirektoratUsulan(req)
    res.json(data)
  })
)

route.get(
  '/apidir/usulan/:id',
  AuthExApi,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['External API'] */
    const data = await Service.findDirektoratDetailUsulan(req)
    res.json(data)
  })
)

export default route
