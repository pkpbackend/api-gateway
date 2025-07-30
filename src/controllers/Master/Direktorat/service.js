import { mkApiMaster } from '../../../helpers/internalApi'

const apiMaster = mkApiMaster('/master')

class DirektoratService {

  static async findAll(params) {
    const response = await apiMaster.get('/direktorat/all', {
      params,
    })
    return response.data
  }

  static async findAllPaginate(params) {
    const response = await apiMaster.get('/direktorat', {
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiMasterWithAuth  = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(`/direktorat/${id}`)
    return response.data
  }

}

export default DirektoratService
