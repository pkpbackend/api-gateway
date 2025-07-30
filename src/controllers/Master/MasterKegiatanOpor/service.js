import { mkApiMaster } from '../../../helpers/internalApi'

const apiMaster = mkApiMaster('/master')

class MasterKegiatanOporService {

  static async findAll(params) {
    const response = await apiMaster.get('/masterkegiatanopor/all', {
      params,
    })
    return response.data
  }

  static async findById(id) {
    const response = await apiMaster.get(`/masterkegiatanopor/${id}`)
    return response.data
  }

}

export default MasterKegiatanOporService
