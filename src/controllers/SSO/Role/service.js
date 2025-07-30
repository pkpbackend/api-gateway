import { mkApiSSO } from "../../../helpers/internalApi"

class SSORoleService {

  static async findAll(params, accessTokenInternal){
    const apiSSOWithAuth  = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.get('/role',{
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.get(`/role/${id}`)
    return response.data
  }

  static async create(body, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.post('/role', body)
    return response.data
  }

  static async delete(id, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.delete(`/role/${id}`)
    return response.data
  }

  static async update(id, body, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.put(`/role/${id}`, body)
    return response.data
  }

}

export default SSORoleService