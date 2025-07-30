import { mkApiMaster } from '../../../helpers/internalApi'

const apiMaster = mkApiMaster('/master')

class PerusahaanService {

  static async findAll(params) {
    const response = await apiMaster.get('/perusahaan', {
      params,
    })
    return response.data
  }

  static async findById(id) {
    const response = await apiMaster.get(`/perusahaan/${id}`)
    return response.data
  }

  static async create(body, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.post('/perusahaan', body)
    return response.data
  }

}

export default PerusahaanService
