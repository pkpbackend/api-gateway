import { mkApiMaster } from '../../../helpers/internalApi'

class MasterKategoriService {

  static async findAll(params, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/masterkategoridokumen/all', {
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(`/masterkategoridokumen/${id}`)
    return response.data
  }

  static async findAllPaginate(params, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/masterkategoridokumen', {
      params,
    })
    return response.data
  }

  static async create(body, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.post(`/masterkategoridokumen`, body)
    return response.data
  }

  static async update(id, body, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.put(`/masterkategoridokumen/${id}`, body)
    return response.data
  }

  static async delete(id, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.delete(`/masterkategoridokumen/${id}`)
    return response.data
  }

}

export default MasterKategoriService
