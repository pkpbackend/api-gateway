import { mkApiPengusulan } from '../../../helpers/internalApi'

class KonregPoolService {
  static async getList(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get('/konregpool', {
      params,
    })
    return response.data
  }

  static async getDetail(id, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(`/konregpool/${id}`)
    return response.data
  }

  static async syncSikonreg(id, params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      `konregpool/sync-usulan/${id}`,
      { params }
    )
    return response.data
  }

  static async exportExcel(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/konregpool/export/excel',
      {
        params,
      }
    )
    return response.data
  }
}

export default KonregPoolService
