import express from 'express'
import AuthMiddleware from '../../../middlewares/AuthMiddleware'
import AsyncHandler from '../../../helpers/AsyncHandler'
import Service from './service'

const route = express.Router()

route.get(
  '/',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /* #swagger.tags = ['SSO Account'] */

    const data = await Service.findAccount(res.locals.accessTokenInternal)
    res.json(data)
  })
)

route.get(
  '/login/sireng',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  code: {
                    type: "string"
                  },
                },
                required: ["code"]
              }
            }
          } 
        }
    */

    const { code } = req.query

    const data = await Service.loginSireng({
      code,
    })

    res.cookie('pp-cookie', JSON.stringify(data))
    res.redirect(data.redirect)
  })
)

route.post(
  '/login',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
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

    // if (data.isLoggedIn) {
    //   res.cookie('accessTokenInternal', data.accessTokenInternal)
    //   res.cookie('refreshTokenInternal', data.refreshTokenInternal)
    // }

    res.json(data)
  })
)

route.post(
  '/test',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
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

    if (data.isLoggedIn) {
      res.cookie('accessTokenInternal', data.accessTokenInternal)
      res.cookie('refreshTokenInternal', data.refreshTokenInternal)
    }

    res.json(data)
  })
)

route.post(
  '/login-by-otp',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  tokenOTP: {
                    type: "string"
                  },
                },
                required: ["tokenOTP"]
              }
            }
          } 
        }
    */

    const { tokenOTP } = req.body

    const data = await Service.loginByOTP({
      tokenOTP,
    })

    res.json(data)
  })
)

route.post(
  '/refresh-token',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  token: {
                    type: "string"
                  }
                },
                required: ["token"]
              }
            }
          } 
        }
    */
    const { token } = req.body

    const data = await Service.refreshToken({
      token,
    })

    res.json(data)
  })
)

route.post(
  '/logout',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  token: {
                    type: "string"
                  }
                },
                required: ["token"]
              }
            }
          } 
        }
    */
    const { token } = req.body

    const data = await Service.logout({
      token,
    })

    res.json(data)
  })
)

route.put(
  '/update-password',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  oldPassword: {
                    type: "string"
                  },
                  newPassword: {
                    type: "string"
                  },
                  retypePassword: {
                    type: "string"
                  }
                },
                required: ["oldPassword", "newPassword", "retypePassword"]
              }
            }
          } 
        }
    */
    const { oldPassword, newPassword, retypePassword } = req.body

    const { accessTokenInternal } = res.locals

    const data = await Service.updatePassword(
      {
        oldPassword,
        newPassword,
        retypePassword,
      },
      accessTokenInternal
    )

    res.json(data)
  })
)

route.put(
  '/update-profile',
  AuthMiddleware,
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  nama: {
                    type: "string"
                  },
                  email: {
                    type: "string"
                  },
                  instansi: {
                    type: "string"
                  },
                  alamatInstansi: {
                    type: "string"
                  }
                },
                required: ["nama", "email", "instansi", "alamatInstansi"]
              }
            }
          } 
        }
    */
    const { nama, email, instansi, alamatInstansi } = req.body

    const { accessTokenInternal } = res.locals

    const data = await Service.updateProfile(
      {
        nama,
        email,
        instansi,
        alamatInstansi,
      },
      accessTokenInternal
    )

    res.json(data)
  })
)

route.post(
  '/generate-reset-token',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  usernameOrEmail: {
                    type: "string"
                  },
                  password: {
                    type: "string"
                  }
                },
                required: ["usernameOrEmail", "password"]
              }
            }
          } 
        }
    */
    const { usernameOrEmail, password } = req.body

    const data = await Service.generateResetToken({
      usernameOrEmail,
      password,
    })

    res.json(data)
  })
)

route.put(
  '/reset-password',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  resetToken: {
                    type: "string"
                  },
                  newPassword: {
                    type: "string"
                  },
                  confirmPassword: {
                    type: "string"
                  }
                },
                required: ["resetToken", "newPassword", "confirmPassword"]
              }
            }
          } 
        }
    */
    const { resetToken, newPassword, confirmPassword } = req.body

    const data = await Service.resetPassword({
      resetToken,
      newPassword,
      confirmPassword,
    })

    if (data.isLoggedIn) {
      res.cookie('accessTokenInternal', data.accessTokenInternal)
      res.cookie('refreshTokenInternal', data.refreshTokenInternal)
    }

    res.json(data)
  })
)

route.post(
  '/pengembang-otp',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string"
                  }
                },
                required: ["email"]
              }
            }
          } 
        }
    */
    const data = await Service.generatePengembangOTP(req.body)
    res.json(data)
  })
)

route.post(
  '/pengembang-otp/verify',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string"
                  },
                  otp: {
                    type: "string"
                  }
                },
                required: ["otp"]
              }
            }
          } 
        }
    */
    const data = await Service.verifyPengembangOTP(req.body)
    res.json(data)
  })
)

route.post(
  '/forgot-password',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string"
                  },
                },
                required: ["email"]
              }
            }
          } 
        }
    */
    const data = await Service.forgotPassword(req.body)
    res.json(data)
  })
)

route.post(
  '/forgot-password/verify',
  AsyncHandler(async function handler(req, res) {
    /*	#swagger.tags = ['SSO Account']
        #swagger.requestBody = {
          required: true,
          "@content": {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: {
                    type: "string"
                  },
                  newPassword: {
                    type: "string"
                  },
                  confirmPassword: {
                    type: "string"
                  },
                },
                required: ["token", "newPassword", "confirmPassword"]
              }
            }
          } 
        }
    */
    const data = await Service.verifyForgotPassword(req.body)
    res.json(data)
  })
)

export default route
