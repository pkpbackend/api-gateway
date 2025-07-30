import { mkApiMaster } from '../../../../helpers/internalApi'

const apiMaster = mkApiMaster('/master')

class CityService {

  static async findAll(params) {
    const response = await apiMaster.get('/wilayah/city', {
      params,
    })
    return response.data
  }

  static async findById(id) {
    const response = await apiMaster.get(`/wilayah/city/${id}`)
    return response.data
  }

}

export default CityService
