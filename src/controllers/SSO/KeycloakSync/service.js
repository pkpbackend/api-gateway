import { mkApiSSO } from '../../../helpers/internalApi'

const apiSSO = mkApiSSO('/sso')

class KeycloakSincService {
  static async findAll(params) {
    const response = await apiSSO.get('/sync/imported-users', {
      params,
    })
    return response.data
  }

  static async store() {
    const response = await apiSSO.post(`/sync/import-users`)
    return response.data
  }

  static async update() {
    const response = await apiSSO.post(`/sync/update-users`)
    return response.data
  }

  static async delete(params) {
    const response = await apiSSO.delete(`/sync/delete-all-users`, {
      params,
    })
    return response.data
  }
}

export default KeycloakSincService
