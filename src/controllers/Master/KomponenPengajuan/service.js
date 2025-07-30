import { mkApiMaster } from '../../../helpers/internalApi'

class KomponenPengajuanService {

  static async findAll(params, accessTokenInternal){
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/komponenpengajuan',{
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(`/komponenpengajuan/${id}`)
    return response.data
  }

  static async create(body, accessTokenInternal){
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.post('/komponenpengajuan/', body)
    return response.data
  }

  static async delete(id, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.delete(`/komponenpengajuan/${id}`)
    return response.data
  }

  static async update(id, body, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.put(`/komponenpengajuan/${id}`, body)
    return response.data
  }

}

export default KomponenPengajuanService
