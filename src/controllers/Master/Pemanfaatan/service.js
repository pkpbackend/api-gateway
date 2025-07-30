import { mkApiMaster } from '../../../helpers/internalApi'
import fs from 'fs'
import FormData from 'form-data'

class PemanfaatanService {
  static async findAllPaginate(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/pemanfaatan', {
      params,
    })
    return response.data
  }

  static async exportExcel(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/pemanfaatan/export/excel', {
      params,
    })
    return response.data
  }

  static async exportExcelKegiatan(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/pemanfaatan/export/excel/kegiatan', {
      params,
    })
    return response.data
  }

  static async getFilterTahun(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/pemanfaatan/getfiltertahun',
      {
        params,
      }
    )
    return response.data
  }

  static async getFilterKuning(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/pemanfaatan/getfilterkuning',
      {
        params,
      }
    )
    return response.data
  }

  static async getFilter(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/pemanfaatan/getfilter', {
      params,
    })
    return response.data
  }

  static async getMasterInput(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/pemanfaatan/masterinput', {
      params,
    })
    return response.data
  }

  static async findById(id, params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(`/pemanfaatan/${id}`, {
      params,
    })
    return response.data
  }

  static async createSwadaya(body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.post('/pemanfaatan/swadaya', body)
    return response.data
  }

  static async createRusus(body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.post('/pemanfaatan/rusus', body)
    return response.data
  }

  static async createRusun(body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.post('/pemanfaatan/rusun', body)
    return response.data
  }

  static async createRuk(body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.post('/pemanfaatan/ruk', body)
    return response.data
  }

  static async updateSwadaya(id, body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.put(
      `/pemanfaatan/swadaya/${id}`,
      body
    )
    return response.data
  }

  static async updateRusus(id, body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.put(
      `/pemanfaatan/rusus/${id}`,
      body
    )
    return response.data
  }

  static async updateRusun(id, body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.put(
      `/pemanfaatan/rusun/${id}`,
      body
    )
    return response.data
  }

  static async updateRuk(id, body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.put(`/pemanfaatan/ruk/${id}`, body)
    return response.data
  }

  static async updateDokumenInfo(id, body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.put(
      `/pemanfaatan/${id}/dokumen/info`,
      body
    )
    return response.data
  }

  static async updateStatus(id, body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.put(
      `/pemanfaatan/${id}/status`,
      body
    )
    return response.data
  }

  static async uploadDokumen(
    id,
    { nama, type, dokumen, keterangan },
    accessTokenInternal
  ) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)

    const form = new FormData()

    form.append('nama', nama)
    form.append('type', type)
    form.append('keterangan', keterangan ? keterangan : '')

    if (dokumen) {
      const dokumenName = dokumen.filename
      const dokumenSource = `${dokumen.destination}${dokumenName}`
      const newDokumen = fs.readFileSync(dokumenSource)

      form.append('dokumen', newDokumen, dokumenName)

      fs.unlinkSync(dokumenSource)
    }

    const response = await apiMasterWithAuth.put(
      `/pemanfaatan/${id}/dokumen`,
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

  static async deleteDokumen(id, { nama, type }, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)

    const response = await apiMasterWithAuth.delete(
      `/pemanfaatan/${id}/dokumen`,
      {
        data: {
          nama,
          type,
        },
      }
    )

    return response.data
  }

  static async delete(id, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.delete(`/pemanfaatan/${id}`)
    return response.data
  }
}

export default PemanfaatanService
