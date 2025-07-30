import { mkApiSSO } from '../../../helpers/internalApi'

class AccessMenuService {
  static async findAll(params, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.get('/accessmenu', {
      params,
    })
    return response.data
  }
}

export default AccessMenuService
