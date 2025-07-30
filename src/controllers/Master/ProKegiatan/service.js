import { mkApiMaster } from '../../../helpers/internalApi'

class PeraturanService {
  static async findAll(params, token) {
    const apiMaster = mkApiMaster(token)
    const response = await apiMaster.get('/prokegiatan', {
      params,
    })
    return response.data
  }

  static async findById(id, token) {
    const apiMaster = mkApiMaster(token)
    const response = await apiMaster.get(`/prokegiatan/${id}`)
    return response.data
  }
}

export default PeraturanService
