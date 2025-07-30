import { mkApiMaster } from '../../../helpers/internalApi'

const apiMaster = mkApiMaster('/master')

class PenerimaManfaatService {

  static async findAll(params) {
    const response = await apiMaster.get('/penerimamanfaat', {
      params,
    })
    return response.data
  }

  static async findById(id) {
    const response = await apiMaster.get(`/penerimamanfaat/${id}`)
    return response.data
  }

}

export default PenerimaManfaatService
