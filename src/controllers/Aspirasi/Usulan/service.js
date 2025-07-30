import fs from 'fs'
import FormData from 'form-data'
import { mkApiAspirasi } from '../../../helpers/internalApi'

class UsulanService {
  static async findVerminByUsulanId(id, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.get(`/usulan/${id}/vermin`)
    return response.data
  }

  static async findAllSasaranByUsulanId(id, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.get(`/usulan/${id}/sasaran`)
    return response.data
  }

  static async findAllDokumenByUsulanId(id, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.get(`/usulan/${id}/dokumen`)
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.get(`/usulan/${id}`)
    return response.data
  }

  static async findAll(params, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.get('/usulan', {
      params,
    })
    return response.data
  }

  static async create(body, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.post('/usulan', body)
    return response.data
  }

  static async createRUK(body, dokumenSbu, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)

    const response = await apiAspirasiWithAuth.post('/usulan/ruk', body)

    if (response && response.data && dokumenSbu) {
      const { id } = response.data
      const dokumenSbuName = dokumenSbu.filename
      const dokumenSbuSource = `${dokumenSbu.destination}${dokumenSbuName}`
      const newDokumenSbu = fs.readFileSync(dokumenSbuSource)

      const form = new FormData()
      form.append('dokumenSbu', newDokumenSbu, dokumenSbuName)

      fs.unlinkSync(dokumenSbuSource)

      const resUpload = await apiAspirasiWithAuth.put(
        `/usulan/${id}/dokumen-sbu`,
        form,
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            ...form.getHeaders(),
          },
        }
      )

      return resUpload.data
    }

    return response.data
  }

  static async createComment(id, body, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.post(
      `/usulan/${id}/comment`,
      body
    )
    return response.data
  }

  static async updateDokumenSBU(id, dokumenSbu, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)

    const form = new FormData()

    if (dokumenSbu) {
      const dokumenSbuName = dokumenSbu.filename
      const dokumenSbuSource = `${dokumenSbu.destination}${dokumenSbuName}`
      const newDokumenSbu = fs.readFileSync(dokumenSbuSource)

      form.append('dokumenSbu', newDokumenSbu, dokumenSbuName)

      fs.unlinkSync(dokumenSbuSource)
    }

    const response = await apiAspirasiWithAuth.put(
      `/usulan/${id}/dokumen-sbu`,
      form,
      {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          ...form.getHeaders(),
        },
      }
    )

    return response.data
  }

  static async updateVerlok(id, body, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.put(`/usulan/${id}/verlok`, body)
    return response.data
  }

  static async update(id, body, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.put(`/usulan/${id}`, body)
    return response.data
  }

  static async deleteById(id, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.delete(`/usulan/${id}`)
    return response.data
  }

  static async exportExcel(params, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.get('/usulan/export/excel', {
      params,
    })
    return response.data
  }

}

export default UsulanService
