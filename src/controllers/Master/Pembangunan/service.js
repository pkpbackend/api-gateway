import { mkApiMaster } from '../../../helpers/internalApi'
import fs from 'fs'
import FormData from 'form-data'

const apiMaster = mkApiMaster('/master')

class PembangunanService {
  static async getPaginate(params) {
    const response = await apiMaster.get('/pembangunan', {
      params,
    })
    return response.data
  }

  static async getDetail(id) {
    const response = await apiMaster.get(`/pembangunan/${id}`)
    return response.data
  }

  static async update(id, body) {
    const response = await apiMaster.put(`/pembangunan/${id}`, body)
    return response.data
  }

  static async getFilter() {
    const response = await apiMaster.get('/pembangunan/filter/list')
    return response.data
  }

  static async getLokasiDetail(id) {
    const response = await apiMaster.get(`/pembangunan/lokasi/${id}`)
    return response.data
  }

  static async createLokasi(body) {
    const response = await apiMaster.post('/pembangunan/lokasi', body)
    return response.data
  }

  static async updateLokasi(id, body) {
    const response = await apiMaster.put(`/pembangunan/lokasi/${id}`, body)
    return response.data
  }

  static async deleteLokasi(id) {
    const response = await apiMaster.delete(`/pembangunan/lokasi/${id}`)
    return response.data
  }

  static async uploadDokumen(id, { type, dokumen }) {
    const form = new FormData()

    form.append('type', type)

    if (dokumen) {
      const dokumenName = dokumen.filename
      const dokumenSource = `${dokumen.destination}${dokumenName}`
      const newDokumen = fs.readFileSync(dokumenSource)

      form.append('dokumen', newDokumen, dokumenName)

      fs.unlinkSync(dokumenSource)
    }

    const response = await apiMaster.post(
      `/pembangunan/lokasi/${id}/dokumen`,
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

  static async exportExcel(params) {
    const response = await apiMaster.get('/pembangunan/export/excel', {
      params,
    })
    return response.data
  }

  static async exportExcelDetail(id) {
    const response = await apiMaster.get(`/pembangunan/${id}/export/excel`)
    return response.data
  }
}

export default PembangunanService
