import { mkApiMaster } from '../../../../helpers/internalApi'

const apiMaster = mkApiMaster('/master')

class KecamatanService {

  static async findAll(params) {
    const response = await apiMaster.get('/wilayah/kecamatan', {
      params,
    })
    return response.data
  }

  static async findById(id) {
    const response = await apiMaster.get(`/wilayah/kecamatan/${id}`)
    return response.data
  }

}

export default KecamatanService
