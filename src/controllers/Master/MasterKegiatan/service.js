import { mkApiMaster } from '../../../helpers/internalApi'

const apiMaster = mkApiMaster('/master')

class MasterKegiatanService {

  static async findAll(params) {
    const response = await apiMaster.get('/masterkegiatan', {
      params,
    })
    return response.data
  }

  static async findById(id) {
    const response = await apiMaster.get(`/masterkegiatan/${id}`)
    return response.data
  }

}

export default MasterKegiatanService
