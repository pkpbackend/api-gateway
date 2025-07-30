import { mkApiMaster } from '../../../helpers/internalApi'

class MasterKondisiBangunanService {

  static async findAll(params, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/masterkondisibangunan/all', {
      params,
    })
    return response.data
  }

  static async findAllPaginate(params, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/masterkondisibangunan', {
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(`/masterkondisibangunan/${id}`)
    return response.data
  }

}

export default MasterKondisiBangunanService
