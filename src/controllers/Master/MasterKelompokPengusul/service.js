import { mkApiMaster } from '../../../helpers/internalApi'

class MasterKelompokPengusulService {

  static async findAll(params, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/masterkelompokpengusul/all', {
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(`/masterkelompokpengusul/${id}`)
    return response.data
  }

}

export default MasterKelompokPengusulService
