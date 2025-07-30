import { mkApiMaster } from '../../../helpers/internalApi'

class DesaService {
  static async findAllKro(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/filter/kro', {
      params,
    })
    return response.data
  }

  static async findAllRo(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/filter/ro', {
      params,
    })
    return response.data
  }
}

export default DesaService
