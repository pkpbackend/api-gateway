import { mkApiMaster } from '../../../helpers/internalApi'

class PengembangService {
  static async findAll(params) {
    const apiMaster = mkApiMaster()
    const response = await apiMaster.get('/pengembang/all', {
      params,
    })
    return response.data
  }

  static async findAllPaginate(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/pengembang', {
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(`/pengembang/${id}`)
    return response.data
  }

  static async update(id, body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.put(`/pengembang/${id}`, body)
    return response.data
  }

  static async delete(id, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.delete(`/pengembang/${id}`)
    return response.data
  }

  static async create(body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.post('/pengembang', body)
    return response.data
  }
}

export default PengembangService
