import { mkApiSSO } from "../../../helpers/internalApi"

class SSOUserService {

  static async findAll(params, accessTokenInternal){
    const apiSSOWithAuth  = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.get('/user',{
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.get(`/user/${id}`)
    return response.data
  }

  static async create(body, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.post('/user', body)
    return response.data
  }

  static async delete(id, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.delete(`/user/${id}`)
    return response.data
  }

  static async update(id, body, accessTokenInternal) {
    const apiSSOWithAuth = mkApiSSO(accessTokenInternal)
    const response = await apiSSOWithAuth.put(`/user/${id}`, body)
    return response.data
  }

}

export default SSOUserService