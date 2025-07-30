import { mkApiMaster } from '../../../helpers/internalApi'

class MasterTematikPemanfaatanService {

  static async findAll(params, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/mastertematikpemanfaatan/all', {
      params,
    })
    return response.data
  }

  static async findAllPaginate(params, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/mastertematikpemanfaatan', {
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(`/mastertematikpemanfaatan/${id}`)
    return response.data
  }

}

export default MasterTematikPemanfaatanService
