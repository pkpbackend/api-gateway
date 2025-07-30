import { mkApiPengusulan } from '../../../helpers/internalApi'

class PrioritasService {
  static async findPrioritasByType(type, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(`/prioritas/${type}`)
    return response.data
  }

  static async update(body, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.post('/prioritas', body)
    return response.data
  }

  static async exportExcel(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/prioritas/export/excel',
      {
        params,
      }
    )
    return response.data
  }
}

export default PrioritasService
