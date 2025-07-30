import { mkApiPengusulan } from "../../helpers/internalApi"

const apiPengusulan = mkApiPengusulan()

class PengusulanService {

  static async checkOTP(token) {
    const response = await apiPengusulan.get(`/usulan/check-otp/${token}`)
    return response.data
  }

  static async createUsulanWithOTP(body, tokenOTP) {
    const response = await apiPengusulan.post(`/usulan/create-usulan/${tokenOTP}`, body)
    return response.data
  }

  static async getPrioritasByType(type, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(`/prioritas/${type}`)
    return response.data
  }

  static async updatePrioritas(body, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.post('/prioritas', body)
    return response.data
  }

}

export default PengusulanService
