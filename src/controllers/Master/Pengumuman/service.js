import { mkApiMaster } from '../../../helpers/internalApi'
import FormData from 'form-data'
import fs from 'fs'

class PengumumanService {
  static async createPengumuman(body, accessTokenInternal) {
    const apiPengumumanWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiPengumumanWithAuth.post('/pengumuman', body)
    return response.data
  }

  static async findAllPengumuman(params, accessTokenInternal) {
    const apiPengumumanWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiPengumumanWithAuth.get('/pengumuman', {
      params,
    })
    return response.data
  }

  static async findPengumumanById(id, accessTokenInternal) {
    const apiPengumumanWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiPengumumanWithAuth.get(`/pengumuman/${id}`)
    return response.data
  }

  static async uploadPengumumanFiles(id, attachments, accessTokenInternal) {
    const apiPengumumanWithAuth = mkApiMaster(accessTokenInternal)

    const form = new FormData()

    if (attachments) {
      attachments.forEach(({ filename, path }) => {
        const newattachments = fs.readFileSync(path)
        form.append('attachments', newattachments, filename)

        fs.unlinkSync(path)
      })
    }

    const response = await apiPengumumanWithAuth.put(
      `/pengumuman/${id}/pengumuman-files`,
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

  static async updatePengumuman(id, body, accessTokenInternal) {
    const apiPengumumanWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiPengumumanWithAuth.put(`/pengumuman/${id}`, body)
    return response.data
  }

  static async deletePengumuman(id, accessTokenInternal) {
    const apiPengumumanWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiPengumumanWithAuth.delete(`/pengumuman/${id}`)
    return response.data
  }
}

export default PengumumanService