import { mkApiMaster } from '../../../../helpers/internalApi'

const apiMaster = mkApiMaster('/master')

class ProvinsiService {

  static async findAll(params) {
    const response = await apiMaster.get('/wilayah/provinsi', {
      params,
    })
    return response.data
  }

  static async findById(id) {
    const response = await apiMaster.get(`/wilayah/provinsi/${id}`)
    return response.data
  }

}

export default ProvinsiService
