import { mkApiMaster } from '../../../helpers/internalApi'

class MasterDokumenService {
  static async findAll(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/masterdokumen/all', {
      params,
    })
    return response.data
  }

  static async findAllSerahTerimaDokumen(params, accessTokenInternal, type) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      `/masterdokumen/serahterima/${type}`,
      {
        params,
      }
    )
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(`/masterdokumen/${id}`)
    return response.data
  }

  static async findAllPaginate(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/masterdokumen', {
      params,
    })
    return response.data
  }

  static async create(body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.post(`/masterdokumen`, body)
    return response.data
  }

  static async update(id, body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.put(`/masterdokumen/${id}`, body)
    return response.data
  }

  static async delete(id, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.delete(`/masterdokumen/${id}`)
    return response.data
  }
}

export default MasterDokumenService
