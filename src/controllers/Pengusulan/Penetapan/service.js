import fs from 'fs'
import FormData from 'form-data'
import { mkApiPengusulan } from "../../../helpers/internalApi"

const apiPengusulan = mkApiPengusulan()

class PenetapanService {

  static async exportExcel(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get('/penetapan/export/excel', {
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(`/penetapan/${id}`)
    return response.data
  }

  static async findAll(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get('/penetapan', {
      params,
    })
    return response.data
  }

  static async create(body, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.post('/penetapan', body)
    return response.data
  }

  static async updateUsulan(PenetapanId, UsulanId, body, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.put(
      `/penetapan/${PenetapanId}/usulan/${UsulanId}`, 
      body
    )
    return response.data
  }

  static async update(id, body, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.put(`/penetapan/${id}`, body)
    return response.data
  }

  static async delete(id, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.delete(`/penetapan/${id}`)
    return response.data
  }

}

export default PenetapanService
