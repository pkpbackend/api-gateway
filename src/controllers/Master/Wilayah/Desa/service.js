import { mkApiMaster } from '../../../../helpers/internalApi'

const apiMaster = mkApiMaster('/master')

class DesaService {

  static async findAll(params) {
    const response = await apiMaster.get('/wilayah/desa', {
      params,
    })
    return response.data
  }

  static async findRTLHByDesaId(id) {
    const response = await apiMaster.get(`/wilayah/desa/${id}/rtlh`)
    return response.data
  }

  static async findById(id) {
    const response = await apiMaster.get(`/wilayah/desa/${id}`)
    return response.data
  }

}

export default DesaService
