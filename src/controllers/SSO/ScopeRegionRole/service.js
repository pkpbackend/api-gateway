import { mkApiSSO } from '../../../helpers/internalApi'

class SSOScopeRegionRoleService {
  static async findAll(params, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.get('/scoperegionrole', {
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.get(`/scoperegionrole/${id}`)
    return response.data
  }
}

export default SSOScopeRegionRoleService
