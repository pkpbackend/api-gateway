import { mkApiSSO, mkExApiSSO } from '../../../helpers/internalApi'

const apiSSO = mkApiSSO()
const exapiSSO = mkExApiSSO()

class SSOService {
  static async findAccount(accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.get('/account')
    return response.data
  }

  static async loginSireng(body) {
    const response = await apiSSO.post('/account/login/sireng', body)
    return response.data
  }

  static async login(body) {
    const response = await apiSSO.post('/account/login', body)
    return response.data
  }

  static async loginByOTP(body) {
    const response = await exapiSSO.post('/banper/account/login-by-otp', body)
    return response.data
  }

  static async refreshToken(body) {
    const response = await apiSSO.post('/account/refresh-token', body)
    return response.data
  }

  static async logout(body) {
    const response = await apiSSO.post('/account/logout', body)
    return response.data
  }

  static async updatePassword(body, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.put('/account/update-password', body)
    return response.data
  }

  static async updateProfile(body, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.put('/account/update-profile', body)
    return response.data
  }

  static async generateResetToken(body) {
    const response = await apiSSO.post('/account/generate-reset-token', body)
    return response.data
  }

  static async resetPassword(body) {
    const response = await apiSSO.put('/account/reset-password', body)
    return response.data
  }

  static async generatePengembangOTP(body) {
    const response = await apiSSO.post('/account/pengembang-otp', body)
    return response.data
  }

  static async verifyPengembangOTP(body) {
    const response = await apiSSO.post('/account/pengembang-otp/verify', body)
    return response.data
  }

  static async forgotPassword(body) {
    const response = await apiSSO.post('/account/forgot-password', body)
    return response.data
  }

  static async verifyForgotPassword(body) {
    const response = await apiSSO.post('/account/forgot-password/verify', body)
    return response.data
  }
}

export default SSOService
